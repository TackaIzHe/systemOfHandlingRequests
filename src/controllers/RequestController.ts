import { NextFunction, Request, Response } from "express";
import { ApiError } from "../error/ApiError";
import { DbContext } from "../database/bd";
import { Recourse } from "../entity/Recourse";
import { Responce } from "../entity/Responce";

export class RequestController{
    static async getAll(req:Request, res:Response, next:NextFunction){
        try{
            const recourseRepo = DbContext.getRepository(Recourse)
            const recourses = await recourseRepo.find({relations:['responce']})
            if(recourses.length === 0){
                res.status(200).json("Нет обращений")
            }
            res.status(200).json(recourses)
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
            const createRecourse = recourseRepo.create({state:'new',header:header,text:text})
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

    static async getRecourse(req:Request, res:Response, next:NextFunction){
        try{

        }catch(err){
            console.log(err)
            return next(ApiError.serverError())
        }
    }

    static async cancelAllToWork(req:Request, res:Response, next:NextFunction){
        try{

        }catch(err){
            console.log(err)
            return next(ApiError.serverError())
        }
    }
}