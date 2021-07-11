import { UseGuards , Body, Controller, Delete, Get, Param, Post, Put, HttpException, HttpStatus, UseInterceptors } from '@nestjs/common';

import { AuthGuard } from 'src/auth.guard';
import { NotFoundInterceptor } from 'src/not-found.interceptor';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { ITask } from './task.entity';
import { TasksService } from './tasks.service';

@Controller('boards/:boardId/tasks')
@UseGuards(AuthGuard)
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post()
  create(@Param('boardId') boardId: string, @Body() createUserDto: CreateTaskDto): Promise<ITask> {
    return this.tasksService.create(boardId, createUserDto);
  }

  @Get()
  findAll(@Param('boardId') boardId: string): Promise<ITask[]> {
    return this.tasksService.findAll(boardId);
  }

  @Get(':id')
  @UseInterceptors(new NotFoundInterceptor('Task not found'))
  findOne(@Param('boardId') boardId: string, @Param('id') id: string): Promise<ITask | undefined> {
    return this.tasksService.findOne(boardId, id);
  }

  @Put(':id')
  update(@Param('boardId') boardId: string, @Param('id') id: string, @Body() updateTaskDto: UpdateTaskDto): Promise<ITask> {
    return this.tasksService.update(boardId, id, updateTaskDto);
  }

  @Delete(':id')
  async remove(@Param('boardId') _boardId: string, @Param('id') id: string): Promise<void> {
    const removed = await this.tasksService.remove(id);
    if (!removed) {
      throw new HttpException('Task not found', HttpStatus.NOT_FOUND)
    }
  }
}
