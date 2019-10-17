import {Entity, PrimaryColumn, Column, ManyToOne} from "typeorm";

@Entity()
export class Place{
    @PrimaryColumn()
    id:String;
    label:String;
    logo:String;
    pkCategory:String;
    locations:Location[];
}