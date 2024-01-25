import { Column, Entity, JoinColumn, OneToOne, PrimaryColumn } from "typeorm";
import { User } from "../users/users.entity";

@Entity('tokens')
export class Jwt {
    @PrimaryColumn("uuid")
    id: string

    @Column()
    access_token: string

    @Column()
    refresh_token: string

    @OneToOne(() => User, (user) => user.jwt)
    @JoinColumn({name: 'id'})
    user: User
}