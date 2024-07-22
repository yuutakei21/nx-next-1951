export interface JwtPayload {
  _id: string
  email: string
  expiration?: Date
}
