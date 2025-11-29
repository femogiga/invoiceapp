import express from 'express'
import { getAll, getById } from './invoiceController.ts'



const router = express.Router()

router.get('/:id', getById)
router.get('/', getAll)


export default router

