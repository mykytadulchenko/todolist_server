import { Body, Controller, Post, UsePipes, ValidationPipe } from '@nestjs/common'
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'
import { createUserDto } from './dto/create-user.dto'
import { authUserDto } from './dto/auth-user.dto'
import { UsersService } from './users.service'

@ApiTags('User endpoints')
@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}

  @ApiOperation({ summary: 'User sign-in endpoint' })
  @ApiResponse({
    status: 201,
    description:
      'Returns JWT auth token in Authorization header on success, token\\`s payload object includes user\\`s "id" and "login" fields',
  })
  @Post('sign-in')
  @UsePipes(new ValidationPipe())
  async signIn(@Body() dto: authUserDto) {
    const response = await this.userService.signIn(dto)
    return response
  }

  @ApiOperation({ summary: 'User sign-up endpoint' })
  @ApiResponse({
    status: 201,
    description:
      'Returns JWT auth token in Authorization header on success, token\\`s payload object includes user\\`s "id" and "login" fields',
  })
  @Post('sign-up')
  @UsePipes(new ValidationPipe())
  async signUp(@Body() dto: createUserDto) {
    const response = await this.userService.signUp(dto)
    return response
  }
}
