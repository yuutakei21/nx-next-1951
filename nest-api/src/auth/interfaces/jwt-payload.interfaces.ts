export interface JwtPayload {
  _id: string;
  role: string;
  email: string;
  expiration?: Date;
}
