import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class CreateDeductionDto {
  @IsString()
  @ApiProperty({
    type: String,
    description: 'name',
    default: 'SSS contribution',
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
    default: 'this is a SSS contribution description or notes.',
  })
  description: string;
}
