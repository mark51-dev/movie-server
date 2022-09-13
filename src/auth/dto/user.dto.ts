import { IsEmail, IsNotEmpty } from 'class-validator';

export class UserDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;
  username: string;
  // @Min(8)
  @IsNotEmpty()
  password: string;
  refreshToken: string;
}
