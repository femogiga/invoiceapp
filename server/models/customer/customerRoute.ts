import express from 'express'
import { cardData, getAll } from './customerController.ts'



const router = express.Router()
router.get('/carddata', cardData)

router.get('/', getAll)


export default router
