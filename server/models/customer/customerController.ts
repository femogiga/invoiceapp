import { drizzle } from 'drizzle-orm/node-postgres';
import {db} from '../../connections/database/client.ts'
import { customers, suppliers } from '../../connections/database/index.ts';
import { eq } from 'drizzle-orm';




export const getAll = async (req, res) => {
    try {
        const result = await db.query.customers.findMany();
        console.log(result)
        res.status(200).json(result)
    } catch (error) {
        console.error(error)
        res.status(500).json(error)

    }
}



export const cardData = async (req, res) => {
    const result = await db.select().from(suppliers).leftJoin(customers, eq(customers.id, suppliers.id));
    res.status(200).json(result)

}


export default {getAll,cardData}
