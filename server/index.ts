import express from 'express'
import morgan from 'morgan'
import cors from 'cors'
import dotenv from 'dotenv'
dotenv.config()
import { drizzle } from 'drizzle-orm/node-postgres';
import invoiceRouter from './models/invoice/invoiceRoute.ts'
import customerRouter from './models/customer/customerRoute.ts'


const app = express();
app.use(express.json())
app.use(morgan('tiny'))
app.use(cors());



app.use('/invoices', invoiceRouter)
app.use('/customers', customerRouter)


app.get('/', (req, res) => {

    res.status(200).json("Welcome to my app")
})
const port: number = 7000
app.listen(port, () => {
    console.log('listening on port ', port);
})
