import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn } from 'typeorm';
import { User } from './User';

@Entity()
export class Transaction {
    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @Column({ type: 'decimal' })
    amount!: number;

    @CreateDateColumn()
    date!: Date;

    @ManyToOne(() => User, user => user.transactions)
    user!: User;

    @Column()
    description!: string;
}
