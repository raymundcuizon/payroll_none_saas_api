import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateAgencyDto {
  @IsString()
  @ApiProperty({
    type: String,
    description: 'name',
    default: 'Payroll HRIS inc.',
  })
  name: string;

  @IsString()
  @ApiProperty({
    type: String,
    description: 'slug',
    default: 'payroll-hris-inc.',
  })
  slug: string;

  @IsString()
  @ApiProperty({
    type: String,
    description: 'address',
    default: 'Pob zone 1 villasis, pangasinan',
  })
  address: string;

  @IsString()
  @ApiProperty({
    type: String,
    description: 'contact_number',
    default: '0990283746',
  })
  contact_number: string;
}
