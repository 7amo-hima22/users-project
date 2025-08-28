/* eslint-disable prettier/prettier */
import{ Column, Entity,PrimaryGeneratedColumn } from 'typeorm';
@Entity()
export class user {
    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    name:string;

    @Column()
    age:number;

    @Column()
    email:string;

    @Column()
    phone:number;

    @Column()
    address:string;
    

}
