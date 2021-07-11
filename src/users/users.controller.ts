import { UseGuards , Body, Controller, Delete, Get, Param, Post, Put, HttpException, HttpStatus, UseInterceptors } from '@nestjs/common';

import { AuthGuard } from 'src/auth.guard';
import { NotFoundInterceptor } from 'src/not-found.interceptor';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { IUser } from './user.entity';
import { UsersService } from './users.service';

@Controller('users')
@UseGuards(AuthGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto): Promise<IUser> {
    return this.usersService.create(createUserDto);
  }

  @Get()
  findAll(): Promise<IUser[]> {
    return this.usersService.findAll();
  }

  @Get(':id')
  @UseInterceptors(new NotFoundInterceptor('User not found'))
  findOne(@Param('id') id: string): Promise<IUser | undefined> {
    return this.usersService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto): Promise<IUser> {
    return this.usersService.update(id, updateUserDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    const removed = await this.usersService.remove(id);
    if (!removed) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND)
    }
  }
}
