import { ApiProperty } from '@nestjs/swagger'
import { IsEmail, IsString, MaxLength, MinLength } from 'class-validator'

export class createUserDto {
  @ApiProperty({
    example: 'username',
    description: 'Username, max length 16 symbols',
  })
  @IsString()
  @MinLength(4)
  @MaxLength(16)
  login: string

  @ApiProperty({
    example: 'mail@mail.com',
    description: 'Email field',
  })
  @IsEmail()
  email: string

  @ApiProperty({
    example: 'pasSwoRd',
    description: 'Password field',
  })
  @IsString()
  @MinLength(4)
  @MaxLength(16)
  password: string
}
