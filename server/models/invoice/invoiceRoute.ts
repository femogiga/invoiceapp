import express from 'express'
import { getAll, getById, createNewInvoice, update, deleteProduct, deleteInvoice, setInvoiceStatus } from './invoiceController.ts'



const router = express.Router()
router.delete("/:invoiceId/products/:productId/delete", deleteProduct)
router.delete('/:invoiceId', deleteInvoice)
router.get('/:id', getById)
router.post('/create', createNewInvoice)
router.put('/:invoiceId', setInvoiceStatus)
router.put('/:id/edit', update)
router.get('/', getAll)


export default router
