import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Responce } from "./Responce";

@Entity()
export class Recourse{
    @PrimaryGeneratedColumn()
    id!:number

    @Column()
    state!:string

    @Column()
    header!:string

    @Column()
    text!:string

    @Column()
    date!:number

    @OneToOne(()=>Responce,(responce)=>responce.request)
    @JoinColumn()
    responce!:Responce
}