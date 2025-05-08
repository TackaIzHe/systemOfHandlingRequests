import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Recourse } from "./Recourse";

@Entity()
export class Responce{
    @PrimaryGeneratedColumn()
    id!:number

    @Column()
    text!:string

    @OneToOne(()=>Recourse,(recourse)=>recourse.responce)
    request!:Recourse
}