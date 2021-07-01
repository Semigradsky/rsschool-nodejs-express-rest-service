import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { IUser, User } from './user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  /**
   * Create a new user
   * @param createUserDto - User data
   * @returns New user data
   */
  create(createUserDto: CreateUserDto): Promise<User> {
    const user = new User({
      login: createUserDto.login,
      name: createUserDto.name,
      password: createUserDto.password,
    });

    return this.usersRepository.save(user);
  }

  /**
   * Get all users
   * @returns Array of all users
   */
  async findAll(): Promise<IUser[]> {
    return this.usersRepository.find();
  }

  /**
   * Get user by ID
   * @param userId - ID of an user
   * @returns Object with a particular user data
   */
  async findOne(id: string): Promise<IUser | undefined> {
    return this.usersRepository.findOne(id);
  }

  /**
   * Get user by login
   * @param login - login of an user
   * @returns Object with a particular user data
   */
  async findByLogin(login: string): Promise<IUser | undefined> {
    return this.usersRepository.findOne({ where: { login } });
  }

  /**
   * Update existing user or create new
   * @param userId - ID of an user
   * @param updateUserDto - User data for updating
   * @returns Updated user data
   */
  async update(id: string, updateUserDto: UpdateUserDto): Promise<IUser> {
    await this.usersRepository.update(id, updateUserDto)
    const user = await this.findOne(id)
    return user!
  }

  /**
   * Remove an user
   * @param userId - ID of an user
   * @returns User was removed
   */
  async remove(id: string): Promise<void> {
    await this.usersRepository.delete(id);
  }
}
