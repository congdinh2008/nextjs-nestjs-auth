import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type TodoDocument = Todo & Document;

@Schema({ timestamps: true })
export class Todo {
  @Prop()
  name: string;

  @Prop()
  description: string;

  @Prop()
  createdAt: Date;

  @Prop()
  updatedAt: Date;

  @Prop({ default: true })
  isCompleted: boolean;

  @Prop()
  @Prop({ default: false })
  isDeleted: boolean;
}

const TodoSchema = SchemaFactory.createForClass(Todo);

export { TodoSchema };
