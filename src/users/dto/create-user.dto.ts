import { ApiProperty } from "@nestjs/swagger"

export class createUserDto {
    @ApiProperty({ 
        example: 'username',
        description: 'Username, max length 16 symbols',
    })
    login: string 

    @ApiProperty({ 
        example: 'mail@mail.com',
        description: 'Email field',
    })
    email: string

    @ApiProperty({ 
        example: 'pasSwoRd',
        description: 'Password field',
    })
    password: string
}