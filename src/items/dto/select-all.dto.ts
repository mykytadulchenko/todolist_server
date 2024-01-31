import { ApiProperty } from '@nestjs/swagger'
import { IsBoolean, IsNotEmpty } from 'class-validator'

export class selectAllDto {
  @ApiProperty({
    example: true,
    description: 'Select all flag, must be boolean',
  })
  @IsBoolean()
  @IsNotEmpty()
  selectAll: boolean

  userId: string
}
