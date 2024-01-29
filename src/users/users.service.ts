import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { User } from './users.entity'
import { Repository } from 'typeorm'
import * as bcrypt from 'bcrypt'
import { AuthService } from 'src/auth/auth.service'
import { createUserDto } from './dto/create-user.dto'
import { authUserDto } from './dto/auth-user.dto'

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private authService: AuthService,
  ) {}

  passwordHasher = async (password: string) => {
    const saltRounds = Number(process.env.SALT_ROUNDS)
    const hash = await bcrypt.hash(password, saltRounds)
    return hash
  }

  passwordCompare = async (password: string, hash: string) => {
    const result = await bcrypt.compare(password, hash)
    return result
  }

  async signIn(dto: authUserDto) {
    const { login, password } = dto
    const user = await this.userRepository.createQueryBuilder('user').select().where('user.login = :login', { login }).getOne()

    const passwordCheck = this.passwordCompare(password, user.password)
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
    const hashedPass = await this.passwordHasher(password)
    const user = await this.userRepository
      .createQueryBuilder()
      .insert()
      .into(User)
      .values({ login, email, password: hashedPass })
      .returning(['id', 'login'])
      .execute()

    const { accessToken, refreshToken } = this.authService.generateTokens(user.raw[0])
    await this.authService.setTokens(user.raw[0].id, accessToken, refreshToken)
    return accessToken
  }
}
