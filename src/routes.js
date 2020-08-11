import { Router } from 'express'
import multer from 'multer'
import multerConfig from './config/multer'
import UserController from './app/controllers/UserController'
import SessionController from './app/controllers/SessionController'
import SessionCompanyController from './app/controllers/SessionCompanyController'
import EventController from './app/controllers/EventController'
import OrderController from './app/controllers/OrderController'
import CompanyController from './app/controllers/CompanyController'
import authMiddleware from './app/middleware/auth'
import isUser from './app/middleware/isUser'
import isCompany from './app/middleware/isCompany'
import FileController from './app/controllers/FileController'

const routes = Router()
const upload = multer(multerConfig)

routes.post('/user', UserController.store)
routes.post('/session', SessionController.store)
routes.post('/company', CompanyController.store)
routes.post('/files', upload.single('image'), FileController.store)
routes.post('/company-session', SessionCompanyController.store)
routes.get('/event', EventController.index)
routes.use(authMiddleware)

routes.post('/event', isCompany, EventController.store)
routes.get('/event/company', isCompany, EventController.getCompanyEvent)

routes.post('/order', isUser, OrderController.store)
routes.post('/order/book', isUser, OrderController.book)
routes.get('/order', isUser, OrderController.index)

export default routes
