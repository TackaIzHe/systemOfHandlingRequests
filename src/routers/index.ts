import {Router} from 'express'
import RequestRouter from './RequestRouter'

const routers = Router()

routers.use('/request',RequestRouter)

export default routers