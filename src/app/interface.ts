export interface SubUser {
    password: string,
    email: string,
  }
export interface User extends SubUser  {
  id: number,
}