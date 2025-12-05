import express from 'express'
import { getAll, getById, createNewInvoice ,update} from './invoiceController.ts'



const router = express.Router()

router.get('/:id', getById)
router.post('/create', createNewInvoice)
router.put('/:id/edit',update)
router.get('/', getAll)


export default router
