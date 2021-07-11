import { UseGuards , Body, Controller, Delete, Get, Param, Post, Put, HttpException, HttpStatus, UseInterceptors } from '@nestjs/common';

import { AuthGuard } from 'src/auth.guard';
import { NotFoundInterceptor } from 'src/not-found.interceptor';
import { CreateBoardDto } from './dto/create-board.dto';
import { UpdateBoardDto } from './dto/update-board.dto';
import { IBoard } from './board.entity';
import { BoardsService } from './boards.service';

@Controller('boards')
@UseGuards(AuthGuard)
export class BoardsController {
  constructor(private readonly boardsService: BoardsService) {}

  @Post()
  create(@Body() createBoardDto: CreateBoardDto): Promise<IBoard> {
    return this.boardsService.create(createBoardDto);
  }

  @Get()
  findAll(): Promise<IBoard[]> {
    return this.boardsService.findAll();
  }

  @Get(':id')
  @UseInterceptors(new NotFoundInterceptor('Board not found'))
  findOne(@Param('id') id: string): Promise<IBoard | undefined> {
    return this.boardsService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateBoardDto: UpdateBoardDto): Promise<IBoard> {
    return this.boardsService.update(id, updateBoardDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    const removed = await this.boardsService.remove(id);
    if (!removed) {
      throw new HttpException('Board not found', HttpStatus.NOT_FOUND)
    }
  }
}
