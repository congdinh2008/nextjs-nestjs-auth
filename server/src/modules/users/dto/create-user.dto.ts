import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsString } from 'class-validator';
import { RoleType } from 'src/enums/role-type.enum';

export class CreateUserDto {
  @IsString()
  @ApiProperty({
    title: 'First Name',
    description: 'First Name',
    required: true,
  })
  firstName: string;

  @IsString()
  @ApiProperty({ title: 'Last Name', description: 'Last Name', required: true })
  lastName: string;

  @IsString()
  @ApiProperty({ title: 'User Name', description: 'User Name', required: true })
  username: string;

  @IsString()
  @ApiProperty({ title: 'Email', description: 'Email', required: true })
  email: string;

  @IsString()
  @ApiProperty({ title: 'Password', description: 'Password', required: true })
  password: string;

  refreshToken: string;

  @IsEnum(RoleType)
  @ApiProperty({ title: 'Role', description: 'Role' })
  roles?: RoleType[];
}
