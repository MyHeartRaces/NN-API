import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Transaction } from './Transaction';

@Entity()
export class User {
    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @Column({ unique: true })
    email!: string;

    @Column()
    password!: string;

    @Column({ default: 'client' })
    role!: 'client' | 'admin';

    @Column({ type: 'decimal', default: 0 })
    balance!: number;

    @OneToMany(() => Transaction, transaction => transaction.user)
    transactions!: Transaction[];
}
