import { ApiProperty } from "@nestjs/swagger"

export class editItemDto {
    @ApiProperty({ 
        example: 'd85d358d-b152-4d97-9d1e-fda0e9a116a1',
        description: 'Item\\`s ID, must be in uuid format',
    })
    id: string

    @ApiProperty({ 
        example: 'Feed the cat',
        description: 'Todolist item`s value',
    })
    value: string

    @ApiProperty({ 
        example: true,
        description: 'Item\\`s status, must be boolean',
    })
    completed: boolean

    @ApiProperty({ 
        example: 'd85d358d-b152-4d97-9d1e-fda0e9a116a1',
        description: 'ID of item\\`s user, must be in uuid format',
    })
    user_id: string
}