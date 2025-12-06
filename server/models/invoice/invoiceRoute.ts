import express from 'express'
import { getAll, getById, createNewInvoice, update, deleteProduct } from './invoiceController.ts'



const router = express.Router()
router.delete("/:invoiceId/products/:productId/delete" ,deleteProduct)
router.get('/:id', getById)
router.post('/create', createNewInvoice)
router.put('/:id/edit',update)
router.get('/', getAll)


export default router
