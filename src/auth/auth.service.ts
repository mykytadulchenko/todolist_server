import { Injectable, UnauthorizedException } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Jwt } from './auth.entity'

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Jwt)
    private jwtRepository: Repository<Jwt>,
    private jwtService: JwtService,
  ) {}

  async getTokens(id: string) {
    const tokens = await this.jwtRepository.createQueryBuilder().select().where('id = :id', { id }).getOne()
    return tokens
  }

  async setTokens(id: string, accessToken: string, refreshToken: string) {
    await this.jwtRepository.upsert({ id, access_token: accessToken, refresh_token: refreshToken }, ['id'])
  }

  generateTokens(payload) {
    return {
      accessToken: this.jwtService.sign(payload),
      refreshToken: this.jwtService.sign(payload, {
        expiresIn: process.env.JWT_REFRESH_EXPIRE,
      }),
    }
  }

  async renewToken(token: string) {
    try {
      const payload = this.jwtService.decode(token)
      const tokens = await this.getTokens(payload.id)
      this.jwtService.verify(tokens.refresh_token)
      const { accessToken, refreshToken } = this.generateTokens({
        id: payload.id,
        login: payload.login,
      })
      await this.setTokens(payload.id, accessToken, refreshToken)
      return accessToken
    } catch (err: any) {
      throw new UnauthorizedException({ message: 'User not authorized!' })
    }
  }
}
