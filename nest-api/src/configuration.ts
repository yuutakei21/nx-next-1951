export default () => ({
  // port: parseInt(process.env.PORT, 10) || 3000,
  // database: {
  //   host: process.env.DATABASE_HOST,
  //   port: parseInt(process.env.DATABASE_PORT, 10) || 5432,
  // },
  jwt: {
    expires_in: parseInt(process.env.DATABASE_PORT, 10) || 7200,
    secret: process.env.JWT_SECRET || 'hide-jwt-secret',
  } as JwtConfig,
});

export interface JwtConfig {
  expires_in: number;
  secret: string;
}
