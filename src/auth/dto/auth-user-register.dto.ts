import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { USER_GENDER_ENUM } from 'src/users/entities/user.entity';

export class AuthUserRegisterDto {
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

  @IsString()
  @ApiProperty({
    type: String,
    description: 'password',
    default: 'P@ssw0rd1234',
  })
  password: string;
}
