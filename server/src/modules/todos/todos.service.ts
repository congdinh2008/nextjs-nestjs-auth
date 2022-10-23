import {
  ForbiddenException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateTodoDto } from './dto/create-todo.dto';
import { Todo, TodoDocument } from './schemas/todo.schema';

@Injectable()
export class TodosService {
  constructor(
    @InjectModel(Todo.name) private model: Model<TodoDocument>,
    @Inject(REQUEST) private req: Request,
  ) {}

  async getAll(): Promise<Todo[]> {
    return await this.model.find().exec();
  }

  async getById(id: string): Promise<Todo> {
    const found = await this.model.findOne({ _id: id }).exec();
    if (!found) {
      throw new NotFoundException('Todo not found');
    }
    return found;
  }

  async create(obj: CreateTodoDto): Promise<Todo> {
    const found = await this.model.findOne({ name: obj.name }).exec();

    if (found) {
      throw new ForbiddenException('Todo already exists');
    }

    return await this.model.create(obj);
  }

  async update(id: string, obj: CreateTodoDto): Promise<Todo> {
    const found = await this.model.findOne({ _id: id }).exec();
    if (!found) {
      throw new NotFoundException('Todo not found');
    }

    const existed = await this.model.findOne({ name: obj.name }).exec();
    if (existed) {
      throw new ForbiddenException('Todo already exists');
    }

    return await this.model.findOneAndUpdate(obj);
  }

  async delete(id: string): Promise<Todo> {
    const found = await this.model.findOne({ _id: id }).exec();
    if (!found) {
      throw new NotFoundException('Todo not found');
    }

    const deleted = await this.model
      .findByIdAndUpdate({ _id: found._id }, { isDeleted: true })
      .exec();
    return deleted;
  }
}
