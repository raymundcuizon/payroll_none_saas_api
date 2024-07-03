import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';
import { USER_GENDER_ENUM } from 'src/users/entities/user.entity';

export class CreateEmployeeDto {
  @IsString()
  @ApiProperty({
    type: String,
    description: 'email',
    default: 'sample@email.com',
  })
  email: string;

  @IsString()
  @ApiProperty({ type: String, description: 'given_name', default: 'Pedro' })
  given_name: string;

  @IsString()
  @ApiProperty({ type: String, description: 'family_name', default: 'Lopez' })
  family_name: string;

  @ApiProperty({ type: String, description: 'middle_name', default: '' })
  middle_name: string;

  @IsString()
  @ApiProperty({
    type: String,
    description: 'phone_number',
    default: '+639980987872',
  })
  phone_number: string;

  @ApiProperty({ type: String, description: 'profile', default: '' })
  profile: string;

  @IsString()
  @ApiProperty({
    enum: USER_GENDER_ENUM,
    description: 'gender',
    default: USER_GENDER_ENUM.OTHERS,
  })
  gender: USER_GENDER_ENUM;

  @IsString()
  @ApiProperty({
    type: String,
    description: 'birthdate',
    default: '1991-06-21',
  })
  birthdate: string;

  @IsString()
  @ApiProperty({
    type: String,
    description: 'address',
    default: 'pob zone 1 villasis, pangasinan',
  })
  address: string;

  @IsNumber()
  @ApiProperty({
    type: Number,
    description: 'agency_id',
    default: 1,
  })
  agency_id: number;

  //   @ApiProperty({
  //     type: [Number],
  //     description: 'Allowances',
  //     examples: [1],
  //   })
  //   allowances: number[];

  //   @ApiProperty({
  //     type: [Number],
  //     description: 'Deduction',
  //     examples: [1],
  //   })
  //   deductions: number[];

  @IsString()
  @ApiProperty({
    type: Number,
    description: 'employee_no',
    default: 'EMP-001',
  })
  employee_no: string;

  @IsNumber()
  @ApiProperty({
    type: Number,
    description: 'employee_no',
    default: 20000,
  })
  salary: number;
}
