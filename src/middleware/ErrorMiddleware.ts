import { Errback, NextFunction, Request, Response } from "express";
import { ApiError } from "../error/ApiError";

module.exports = (err:Errback,req:Request,res:Response,next:NextFunction)=>{
    if(err instanceof ApiError){
        return res.status(err.cod).json(err.mess)
    }
    return res.status(500).json('Необработаная ошибка')
}