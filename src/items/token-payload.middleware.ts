import { Injectable, NestMiddleware, UnauthorizedException } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { NextFunction, Request, Response } from 'express'

@Injectable()
export class TokenPayloadMiddleware implements NestMiddleware {
  constructor(private jwtService: JwtService) {}

  use(request: Request, _: Response, next: NextFunction) {
    try {
      const authToken = request.headers.authorization.split(' ')[1]
      request.user = this.jwtService.decode(authToken)
      if (!request.user.id) {
        throw new UnauthorizedException('User not authorized!')
      }
      next()
    } catch (err: any) {
      throw new UnauthorizedException('User not authorized!')
    }
  }
}
