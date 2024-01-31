import * as bcrypt from 'bcrypt'

export const passwordHasher = async (password: string) => {
    const saltRounds = Number(process.env.SALT_ROUNDS)
    const hash = await bcrypt.hash(password, saltRounds)
    return hash
  }

export const passwordCompare = async (password: string, hash: string) => {
    const result = await bcrypt.compare(password, hash)
    return result
  }