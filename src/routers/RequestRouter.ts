import { NextFunction, Request, Response, Router } from "express";
import { RequestController } from "../controllers/RequestController";

const router = Router()

router.get('/:start',async(req:Request,res:Response,next:NextFunction)=>{
    RequestController.getAllOrDate(req,res,next)
})

router.post('/',async(req:Request,res:Response,next:NextFunction)=>{
    RequestController.postRecourse(req,res,next)
})

router.put('/:id',async(req:Request,res:Response,next:NextFunction)=>{
    RequestController.takeRecourseToWork(req,res,next)  
})

router.post('/complete',async(req:Request,res:Response,next:NextFunction)=>{
    RequestController.completeRecourse(req,res,next)
})

router.put('/cancel/:id',async(req:Request,res:Response,next:NextFunction)=>{
    RequestController.cancelRecourse(req,res,next)
})

router.get('/:start/:end',async(req:Request,res:Response,next:NextFunction)=>{
    RequestController.getRecourseInBeetwenDate(req,res,next)
})

router.get('/cancel/all/work',async(req:Request,res:Response,next:NextFunction)=>{
    RequestController.cancelAllToWork(req,res,next)
})
export default router