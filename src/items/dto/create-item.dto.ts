import { ApiProperty } from "@nestjs/swagger"

export class createItemDto {
    @ApiProperty({ 
        example: 'Feed the cat!',
        description: 'Todolist item\\`s value',
    })
    value: string

    @ApiProperty({ 
        example: 'd85d358d-b152-4d97-9d1e-fda0e9a116a1',
        description: 'ID of item\\`s user, must be in uuid format',
    })
    userId: string
}