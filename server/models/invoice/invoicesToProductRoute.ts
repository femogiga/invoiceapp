
import  express from 'express'
import { deleteProduct } from '../customer/invoiceOnProductController'


const router = express.Router()




router.delete("/delete" ,deleteProduct)



export default router
