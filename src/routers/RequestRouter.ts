import { NextFunction, Request, Response, Router } from "express";
import { RequestController } from "../controllers/RequestController";

const router = Router()

router.get('/',(req:Request,res:Response,next:NextFunction)=>{
    RequestController.getAll(req,res,next)
    })

router.post('/',async(req:Request,res:Response,next:NextFunction)=>{
    RequestController.postRecourse(req,res,next)
})

router.put('/:id',(req:Request,res:Response,next:NextFunction)=>{
    RequestController.takeRecourseToWork(req,res,next)  
})

router.post('/complete',(req:Request,res:Response,next:NextFunction)=>{
    RequestController.completeRecourse(req,res,next)
})

router.put('/cancel/:id',(req:Request,res:Response,next:NextFunction)=>{
    RequestController.cancelRecourse(req,res,next)
})

// router.get('/',(req:Request,res:Response,next:NextFunction)=>{
    
// })

// router.get('/',(req:Request,res:Response,next:NextFunction)=>{
    
// })
export default router