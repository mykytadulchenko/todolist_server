import { ApiProperty } from "@nestjs/swagger";
import { User } from "src/users/users.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('items')
export class Item {
    @ApiProperty({ 
        example: 'd85d358d-b152-4d97-9d1e-fda0e9a116a1',
        description: 'Item\\`s ID, must be in uuid format',
    })
    @PrimaryGeneratedColumn('uuid')
    id: string

    @ApiProperty({ 
        example: 'Feed the cat!',
        description: 'Todolist item\\`s value',
    })
    @Column()
    value: string

    @ApiProperty({ 
        example: true,
        description: 'Item\\`s status, must be boolean',
    })
    @Column()
    completed: boolean

    @ApiProperty({ 
        example: '2024-01-25 13:15:33.840554',
        description: 'Item\\`s creation date',
    })
    @CreateDateColumn({ type: 'timestamp' })
    created_at: Date

    @ApiProperty({
        example: '2024-01-25 13:15:33.840554',
        description: 'Item\\`s update date'
    })
    @UpdateDateColumn({ type: 'timestamp' })
    updated_at: Date

    @ApiProperty({ 
        example: 'd85d358d-b152-4d97-9d1e-fda0e9a116a1',
        description: 'ID of item\\`s user, must be in uuid format',
    })
    @Column() 
    user_id: string;

    @ManyToOne(() => User, (user) => user.item)
    @JoinColumn({ name: 'user_id' })
    user: User
}