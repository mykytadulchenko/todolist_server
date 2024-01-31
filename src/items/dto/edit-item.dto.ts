import { ApiProperty } from '@nestjs/swagger'
import { IsBoolean, IsNotEmpty, IsString } from 'class-validator'

export class editItemDto {
  @ApiProperty({
    example: 'd85d358d-b152-4d97-9d1e-fda0e9a116a1',
    description: 'Item\\`s ID, must be in uuid format',
  })
  @IsString()
  @IsNotEmpty()
  id: string

  @ApiProperty({
    example: 'Feed the cat',
    description: 'Todolist item`s value',
  })
  @IsString()
  @IsNotEmpty()
  value: string

  @ApiProperty({
    example: true,
    description: 'Item\\`s status, must be boolean',
  })
  @IsBoolean()
  @IsNotEmpty()
  completed: boolean

  user_id: string
}
