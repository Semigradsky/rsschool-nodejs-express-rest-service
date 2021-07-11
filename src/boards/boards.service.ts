import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateBoardDto } from './dto/create-board.dto';
import { UpdateBoardDto } from './dto/update-board.dto';
import { IBoard, Board } from './board.entity';

@Injectable()
export class BoardsService {
  constructor(
    @InjectRepository(Board)
    private readonly boardsRepository: Repository<Board>,
  ) {}

  /**
   * Create a new board
   * @param createBoardDto - Board data
   * @returns New board data
   */
  async create(createBoardDto: CreateBoardDto): Promise<IBoard> {
    const user = new Board({
      title: createBoardDto.title,
      columns: createBoardDto.columns,
    });

    return this.boardsRepository.save(user);
  }

  /**
   * Get all boards
   * @returns Array of all boards
   */
  async findAll(): Promise<IBoard[]> {
    return this.boardsRepository.find();
  }

  /**
   * Get board by ID
   * @param boardId - ID of a board
   * @returns Object with a particular board data
   */
  async findOne(boardId: string): Promise<IBoard | undefined> {
    return this.boardsRepository.findOne(boardId);
  }

  /**
   * Update existing board or create new
   * @param boardId - ID of an user
   * @param updateBoardDto - Board data for updating
   * @returns Updated board data
   */
  async update(boardId: string, updateBoardDto: UpdateBoardDto): Promise<IBoard> {
    const { columns, ...data } = updateBoardDto
    await this.boardsRepository.update(boardId, data)
    const board = await this.findOne(boardId)
    return board!
  }

  /**
   * Remove a board
   * @param boardId - ID of a board
   * @returns Board was removed
   */
  async remove(boardId: string): Promise<boolean> {
    const res = await this.boardsRepository.delete(boardId);
    return !!res.affected
  }
}
