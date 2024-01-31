import { Item } from 'src/items/items.entity'
import { Column, Entity, OneToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm'
import { Jwt } from '../auth/auth.entity'

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ length: 16 })
  login: string

  @Column()
  email: string

  @Column()
  password: string

  @Column()
  role: string

  @OneToMany(() => Item, (item) => item.user)
  item: Item[]

  @OneToOne(() => Jwt, (jwt) => jwt.user)
  jwt: Jwt
}
