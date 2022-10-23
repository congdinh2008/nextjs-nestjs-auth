import {
  Controller,
  Get,
  Post,
  Res,
  Body,
  Param,
  Put,
  Delete,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import { TodosService } from './todos.service';
import { Response } from 'express';
import { CreateTodoDto } from './dto/create-todo.dto';
import { Todo } from './schemas/todo.schema';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { AccessTokenGuard } from '../auth/guards/access-token.guard';

@ApiTags('todos')
@Controller('todos')
export class TodosController {
  constructor(private readonly services: TodosService) {}

  @ApiOperation({ summary: 'Get all todos' })
  @Get()
  async getAll(@Res({ passthrough: true }) res: Response): Promise<Todo[]> {
    res.status(HttpStatus.OK);
    return this.services.getAll();
  }

  @ApiOperation({ summary: 'Get a todo by id' })
  @Get(':id')
  async getById(
    @Param('id') id: string,
    @Res({ passthrough: true }) res: Response,
  ): Promise<Todo> {
    res.status(HttpStatus.OK);
    return this.services.getById(id);
  }

  @UseGuards(AccessTokenGuard)
  @ApiOperation({ summary: 'Create a todo' })
  @Post()
  async create(
    @Body() obj: CreateTodoDto,
    @Res({ passthrough: true }) res: Response,
  ): Promise<Todo> {
    res.status(HttpStatus.CREATED);
    return this.services.create(obj);
  }

  @ApiOperation({ summary: 'Update a todo' })
  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() obj: CreateTodoDto,
    @Res({ passthrough: true }) res: Response,
  ): Promise<Todo> {
    res.status(HttpStatus.OK);
    return this.services.update(id, obj);
  }

  @ApiOperation({ summary: 'Delete a todo' })
  @Delete(':id')
  async delete(
    @Param('id') id: string,
    @Res({ passthrough: true }) res: Response,
  ): Promise<Todo> {
    res.status(HttpStatus.OK);
    return this.services.delete(id);
  }
}
