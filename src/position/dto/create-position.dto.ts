import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class CreatePositionDto {
  @IsString()
  @ApiProperty({
    type: String,
    description: 'name',
    default: 'Software developer',
  })
  name: string;

  @IsNumber()
  @ApiProperty({
    type: String,
    description: 'agency_id',
    default: 1,
  })
  agency_id: number;

  @IsNumber()
  @ApiProperty({
    type: String,
    description: 'depatment_id',
    default: 1,
  })
  depatment_id: number;

  @ApiProperty({
    type: String,
    description: 'description',
    default: 'this is a department description or notes.',
  })
  description: string;
}
