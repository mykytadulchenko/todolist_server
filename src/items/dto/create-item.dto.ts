import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsString } from 'class-validator'

export class createItemDto {
  @ApiProperty({
    example: 'Feed the cat!',
    description: 'Todolist item\\`s value',
  })
  @IsString()
  @IsNotEmpty()
  value: string

  // @Exclude()
  // @Transform(())
  userId: string
}
