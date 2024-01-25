import { ApiProperty } from "@nestjs/swagger"

export class authUserDto {
    @ApiProperty({ 
        example: 'username',
        description: 'Username, max length 16 symbols',
    })
    login: string

    @ApiProperty({ 
        example: 'pasSwoRd',
        description: 'Password field',
    })
    password: string
}