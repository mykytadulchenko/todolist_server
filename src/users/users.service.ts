import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { AuthService } from 'src/auth/auth.service'
import { User } from './users.entity'
import { createUserDto } from './dto/create-user.dto'
import { authUserDto } from './dto/auth-user.dto'
import { passwordCompare, passwordHasher } from './users.helpers'
import { ROLES } from './users.enums'

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private authService: AuthService,
  ) {}

  async signIn(dto: authUserDto) {
    const { login, password } = dto
    const user = await this.userRepository.createQueryBuilder('user').select().where('user.login = :login', { login }).getOne()

    const passwordCheck = passwordCompare(password, user.password)
    if (!user || !passwordCheck) return null
    const { accessToken, refreshToken } = this.authService.generateTokens({
      id: user.id,
      login: user.login,
    })
    await this.authService.setTokens(user.id, accessToken, refreshToken)
    return accessToken
  }

  async signUp(dto: createUserDto) {
    const { login, email, password } = dto
    const hashedPass = await passwordHasher(password)
    const user = await this.userRepository
      .createQueryBuilder()
      .insert()
      .into(User)
      .values({ login, email, password: hashedPass, role: ROLES.user })
      .returning(['id', 'login'])
      .execute()

    const { accessToken, refreshToken } = this.authService.generateTokens(user.raw[0])
    await this.authService.setTokens(user.raw[0].id, accessToken, refreshToken)
    return accessToken
  }
}
