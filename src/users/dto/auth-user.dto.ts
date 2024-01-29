import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsString, MaxLength, MinLength, minLength } from 'class-validator'

export class authUserDto {
  @ApiProperty({
    example: 'username',
    description: 'Username, max length 16 symbols',
  })
  @IsString()
  @MinLength(4)
  @MaxLength(16)
  login: string

  @ApiProperty({
    example: 'pasSwoRd',
    description: 'Password field',
  })
  @IsString()
  @MinLength(4)
  @MaxLength(16)
  password: string
}
