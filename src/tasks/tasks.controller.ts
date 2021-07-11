import { UseGuards , Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';

import { AuthGuard } from 'src/auth.guard';
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
  findOne(@Param('boardId') boardId: string, @Param('id') id: string): Promise<ITask | undefined> {
    return this.tasksService.findOne(boardId, id);
  }

  @Put(':id')
  update(@Param('boardId') boardId: string, @Param('id') id: string, @Body() updateTaskDto: UpdateTaskDto): Promise<ITask> {
    return this.tasksService.update(boardId, id, updateTaskDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.tasksService.remove(id);
  }
}
