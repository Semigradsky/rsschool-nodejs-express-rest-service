import { v4 as uuid } from 'uuid';

export interface IUser {
  id: string;
  name: string;
  login: string;
  password: string;
}

type IUserForReponse = Omit<IUser, 'password'>

/**
 * Class representing an user
 */
class User implements IUser {
  id: string;

  name: string;

  login: string;

  password: string;

  constructor({
    id = uuid(),
    name = 'USER',
    login = 'user',
    password = 'P@55w0rd',
  }: Partial<IUser> = {}) {
    this.id = id;
    this.name = name;
    this.login = login;
    this.password = password;
  }

  /**
   * Prepare user data to return in response
   */
  static toResponse(user: IUser): IUserForReponse {
    const { id, name, login } = user;
    return { id, name, login };
  }
}

export default User;
