import express from 'express'
import { getAll, getById, createNewInvoice } from './invoiceController.ts'



const router = express.Router()

router.get('/:id', getById)
router.post('/create', createNewInvoice)

router.get('/', getAll)


export default router
