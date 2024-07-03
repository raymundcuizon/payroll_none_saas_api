import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsISO8601 } from 'class-validator';

export class CreateEmployeeAllowanceDto {
  @IsNumber()
  @ApiProperty({
    type: Number,
    default: 0,
  })
  employee_id: number;

  @IsNumber()
  @ApiProperty({
    type: Number,
    description: '1 = Monthly, 2= Semi-Monthly, 3 = once',
    default: 2,
  })
  type: number;

  @IsNumber()
  @ApiProperty({
    type: Number,
    default: 0,
  })
  allowance_id: number;

  @IsNumber()
  @ApiProperty({
    type: Number,
    default: 1000,
  })
  amount: number;

  @IsISO8601()
  @ApiProperty({
    type: String,
    default: '2024-01-01',
  })
  effective_date: Date;
}
