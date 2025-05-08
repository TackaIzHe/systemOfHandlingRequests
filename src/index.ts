import express, { Errback, NextFunction, Request, Response } from 'express'
import { DbContext } from './database/bd'
import routers from './routers/index'
require('dotenv').config({path:'src/.env'})
const ErrorMiddleware = require('./middleware/ErrorMiddleware')

const port = process.env.PORT || 5000
const app = express()
app.use(express.json())
app.use('/',routers)
app.use(ErrorMiddleware)

DbContext.initialize()
.then(()=>{  
    app.listen(port,()=>{
        console.log(`server started on http://localhost:${port}`)
    })
}).catch((err)=>{console.log(err)})

