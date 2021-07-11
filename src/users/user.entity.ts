import { v4 as uuid } from 'uuid';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { createHashFromPassword } from 'src/utils/auth';

export interface IUser {
  id: string;
  name: string;
  login: string;
  passwordHash: string;
}

type IUserForReponse = Omit<IUser, 'passwordHash'>

/**
 * Class representing an user
 */
@Entity()
export class User implements IUser {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 100 })
  name: string;

  @Column({ length: 100 })
  login: string;

  @Column({ length: 100 })
  passwordHash: string;

  constructor({
    id = uuid(),
    name = 'USER',
    login = 'user',
    password = 'P@55w0rd',
  }: Partial<IUser & { password?: string }> = {}) {
    this.id = id;
    this.name = name;
    this.login = login;
    this.passwordHash = createHashFromPassword(password);
  }

  /**
   * Prepare user data to return in response
   */
  static toResponse(user: IUser): IUserForReponse {
    const { id, name, login } = user;
    return { id, name, login };
  }
}
