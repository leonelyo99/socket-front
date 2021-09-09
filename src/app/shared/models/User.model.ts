export class User {
  constructor(
    public username: string,
    public token?: string,
    public _id?: string,
    public email?: string,
    public password?: string
  ) {}
}
