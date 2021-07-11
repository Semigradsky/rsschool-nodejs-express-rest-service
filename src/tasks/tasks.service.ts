import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { ITask, Task } from './task.entity';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private readonly tasksRepository: Repository<Task>,
  ) {}

  /**
   * Create a new task
   * @param boardId - ID of a board
   * @param createTaskDto - Task data
   * @returns New task data
   */
  async create(boardId: string, createTaskDto: CreateTaskDto): Promise<ITask> {
    const user = new Task(boardId, createTaskDto);
    return this.tasksRepository.save(user);
  }

  /**
   * Get all tasks
   * @param boardId - ID of a board
   * @returns Array of all tasks
   */
  async findAll(boardId: string): Promise<ITask[]> {
    return this.tasksRepository.find({ where: { boardId } });
  }

  /**
   * Get task by ID
   * @param boardId - ID of a board
   * @param taskId - ID of a task
   * @returns Object with a particular task data
   */
  async findOne(boardId: string, taskId: string): Promise<ITask | undefined> {
    return this.tasksRepository.findOne(taskId, { where: { boardId } });
  }

  /**
   * Update existing task or create new
   * @param boardId - ID of a board
   * @param taskId - ID of a task
   * @param data - Task data for updating
   * @returns Updated task data
   */
  async update(boardId: string, taskId: string, updateTaskDto: UpdateTaskDto): Promise<ITask> {
    await this.tasksRepository.update(taskId, updateTaskDto)
    const task = await this.findOne(boardId, taskId)
    return task!
  }

  /**
   * Remove a task
   * @param taskId - ID of a task
   * @returns Task was removed
   */
  async remove(taskId: string): Promise<boolean> {
    const res = await this.tasksRepository.delete(taskId);
    return !!res.affected
  }
}
