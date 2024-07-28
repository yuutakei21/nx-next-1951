import { NextApiRequest } from 'next'

export function POST(req: NextApiRequest) {
  return Response.json({
    token: 'abctoken',
    user: {
      firstName: 'test',
      lastName: 'user',
      role: 'admin',
    },
  })
}
