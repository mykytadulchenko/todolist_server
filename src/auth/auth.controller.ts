import { Controller, Get, Headers, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Response } from 'express';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Auth endpoints')
@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}
    
    @ApiOperation({ summary: 'Refresh token endpoint'})
    @ApiResponse({ status: 200, description: 'Returns JWT auth token in Authorization header on success' })
    @Get()
    async validateToken(@Headers('Authorization') header: string, @Res() response: Response,) {
        const token = header.split(' ')[1]
        const result = await this.authService.renewToken(token)
        response.header('Authorization', `Bearer ${result}`)
        response.send()
    }
}
