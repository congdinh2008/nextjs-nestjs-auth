import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsString } from 'class-validator';

export class CreateTodoDto {
  @IsString()
  @ApiProperty({ title: 'Name', description: 'Todo name' })
  readonly name: string;

  @IsString()
  @ApiProperty({ title: 'Description', description: 'Todo description' })
  readonly description: string;

  @IsBoolean()
  @ApiProperty({ title: 'Is Completed', description: 'Todo status' })
  readonly isCompleted: boolean;
}
