import { DataSource } from "typeorm";
import { Recourse } from "../entity/Recourse";
import { Responce } from "../entity/Responce";

export const DbContext = new DataSource({
    type:'sqlite',
    database:'db.sqlite',
    synchronize:true,
    logging:true,
    entities:[
        Recourse,
        Responce
    ]
})