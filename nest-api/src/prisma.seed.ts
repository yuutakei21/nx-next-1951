import * as bcrypt from 'bcrypt';
import { PrismaClient } from './endpoints/@generated/prisma-client';

const prisma = new PrismaClient();
async function main() {
  const tenant = await prisma.tenant.create({
    data: {
      name: 'TENANT001',
    },
  });
  const department = await prisma.department.create({
    data: {
      tenantId: tenant.id,
      name: 'DEP001',
    },
  });
  const salt = await bcrypt.genSalt(10);
  const password = 'Ss123123';
  const hash = await bcrypt.hash(password, salt);

  await prisma.user.create({
    data: {
      tenantId: tenant.id,
      departmentId: department.id,
      firstName: 'ADMIN',
      lastName: 'USER',
      role: 'ADMIN',
      email: 'admin@example.com',
      password: hash,
    },
  });
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
