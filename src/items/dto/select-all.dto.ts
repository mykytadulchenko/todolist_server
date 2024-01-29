import { ApiProperty } from '@nestjs/swagger'
import { IsBoolean, IsNotEmpty, IsString } from 'class-validator'

export class selectAllDto {
  @ApiProperty({
    example: true,
    description: 'Select all flag, must be boolean',
  })
  @IsBoolean()
  @IsNotEmpty()
  selectAll: boolean

  @ApiProperty({
    example: 'd85d358d-b152-4d97-9d1e-fda0e9a116a1',
    description: 'ID of item\\`s user, must be in uuid format',
  })
  @IsString()
  @IsNotEmpty()
  userId: string
}
