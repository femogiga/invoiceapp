import 'dotenv/config';
import { drizzle } from 'drizzle-orm/node-postgres';
import { users } from '../schema/user.ts'; // Changed from .ts to .js
import { invoices } from '../schema/invoice.ts';

const db = drizzle(process.env.DATABASE_URL!);

async function main() {

    const newInvoice = [{ // Renamed variable to avoid conflict
        term: '7 Days',
        description: 'Rebranding',
        invoiceDate: '22/10/2021',
        paymentDate: '29/10/2021',


    },

    {
        term: '21 Days',
        description: 'Frontend',
        invoiceDate: '04/11/2023',
        paymentDate: '25/11/2023',

    }


    ];





    // Insert new user

    newInvoice.forEach(async invoice => {
        await db.insert(invoices).values(invoice);
        console.log('New supplier created!');
    })


    // Select all users (use different variable name)
    const allInvoices = await db.select().from(invoices); // Renamed variable
    console.log('Getting all users from the database: ', allInvoices);
}

main().catch(console.error);
