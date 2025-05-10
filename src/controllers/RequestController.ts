import { NextFunction, Request, Response } from "express";
import { ApiError } from "../error/ApiError";
import { DbContext } from "../database/bd";
import { Recourse } from "../entity/Recourse";
import { Responce } from "../entity/Responce";

export class RequestController{
    static async getAllOrDate(req:Request, res:Response, next:NextFunction){
        try{
            const {start} = req.params
            console.log(start)
            const recourseRepo = DbContext.getRepository(Recourse)
            const recourses = await recourseRepo.find({relations:['responce']})
            if(recourses.length === 0){
                res.status(200).json("Нет обращений")
            }
            if(start.split('-').length >2){
                const date = start.split('-')
                const sortDate = new Date(Number(date[0]),Number(date[1])-1,Number(date[2])).getTime()
                const endDate = sortDate + +86399999
                const sortRecourse = recourses.map((x)=>{
                    if(x.date>=sortDate && x.date <=endDate){
                        return({
                            id:x.id,
                            state:x.state,
                            header:x.header,
                            text:x.text,
                            date:new Date(x.date),
                            responce:x.responce
                        })
                    }
                })
                if(sortRecourse.length === 0 || sortRecourse[0] == null){
                    return res.status(200).json("Нет обращений")
                }
                return res.status(200).json(sortRecourse)
            }
            return res.status(200).json(recourses.map((x)=>{return({
                id:x.id,
                state:x.state,
                header:x.header,
                text:x.text,
                date:new Date(x.date),
                responce:x.responce
            })}))
            }catch(err){
            console.log(err)
            return next(ApiError.serverError())
        }
    }

    static async postRecourse(req:Request, res:Response, next:NextFunction){
        try{
            const {header, text} = req.body;
            if(!header || typeof header !== 'string' || !text || typeof text !== 'string'){
                return next(ApiError.badData())
            }
            const recourseRepo = DbContext.getRepository(Recourse)
            const createRecourse = recourseRepo.create({state:'new',header:header,text:text,date:new Date().getTime()})
            await recourseRepo.save(createRecourse)
            res.status(201).json('Обращение создано');
        }catch(err){
            console.log(err)
            return next(ApiError.serverError())
        }
    }

    static async takeRecourseToWork(req:Request, res:Response, next:NextFunction){
        try{
            const {id} = req.params
            const parseId = Number(id)
            if(!id || isNaN(parseId)){
                return next(ApiError.badData())
            }
            const recourseRepo = DbContext.getRepository(Recourse)
            const findRecourse = await recourseRepo.findOne({where:{id:parseId}})
            if(!findRecourse){
                return next(ApiError.badData())
            }
            await recourseRepo.update(findRecourse,{state:"inWorking"})
            res.status(200).json("Обращение взято в работу")
        }catch(err){
            console.log(err)
            return next(ApiError.serverError())
        }
    }

    static async completeRecourse(req:Request, res:Response, next:NextFunction){
        try{
            const {id,text} = req.body
            const parseId = Number(id)
            if(!id || isNaN(parseId)){
                return next(ApiError.badData())
            }
            const recourseRepo = DbContext.getRepository(Recourse)
            const findRecourse = await recourseRepo.findOne({where:{id:parseId}})
            if(!findRecourse){
                return next(ApiError.badData())
            }
            await recourseRepo.update(findRecourse,{state:'complete'})
            if(text){
                const responceRepo = DbContext.getRepository(Responce)
                const createdResponce = responceRepo.create({text:text,request:findRecourse})
                await responceRepo.save(createdResponce)
            }
            res.status(200).json("Обращение выполнено")
        }catch(err){
            console.log(err)
            return next(ApiError.serverError())
        }
    }

    static async cancelRecourse(req:Request, res:Response, next:NextFunction){
        try{
            const {id} = req.params
            const parseId = Number(id)
            if(!id || isNaN(parseId)){
                return next(ApiError.badData())
            }
            const recourseRepo = DbContext.getRepository(Recourse)
            const findRecourse = await recourseRepo.findOne({where:{id:parseId}})
            if(!findRecourse){
                return next(ApiError.badData())
            }
            await recourseRepo.update(findRecourse,{state:'cancel'})
            res.status(200).json("Обращение отменено")
        }catch(err){
            console.log(err)
            return next(ApiError.serverError())
        }
    }

    static async getRecourseInBeetwenDate(req:Request, res:Response, next:NextFunction){
        try{

        }catch(err){
            console.log(err)
            return next(ApiError.serverError())
        }
    }

    static async cancelAllToWork(req:Request, res:Response, next:NextFunction){
        try{
            console.log(1)
            res.json("asd")
        }catch(err){
            console.log(err)
            return next(ApiError.serverError())
        }
    }
}