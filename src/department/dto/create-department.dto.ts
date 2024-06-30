import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class CreateDepartmentDto {
  @IsString()
  @ApiProperty({
    type: String,
    description: 'name',
    default: 'IT department',
  })
  name: string;

  @IsNumber()
  @ApiProperty({
    type: Number,
    description: 'agency_id',
    default: 1,
  })
  agency_id: number;

  @ApiProperty({
    type: String,
    description: 'description',
    default: 'this is a department description or notes.',
  })
  description: string;
}
