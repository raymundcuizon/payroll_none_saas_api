import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class CreateAllowanceDto {
  @IsString()
  @ApiProperty({
    type: String,
    description: 'name',
    default: 'meal allowance',
  })
  name: string;

  @IsNumber()
  @ApiProperty({
    type: String,
    description: 'agency_id',
    default: 1,
  })
  agency_id: number;

  @ApiProperty({
    type: String,
    description: 'description',
    default: 'this is a allowance description or notes.',
  })
  description: string;
}
