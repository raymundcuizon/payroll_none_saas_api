export class CreateUserDto {
  email: string;
  cognito_id: string;
  given_name: string;
  family_name: string;
  middle_name?: string;
  phone_number: string;
  profile: string;
  gender: string;
  birthdate: string;
  address: string;
}
