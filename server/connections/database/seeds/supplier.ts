import 'dotenv/config';
import { drizzle } from 'drizzle-orm/node-postgres';
import { users } from '../schema/user.ts'; // Changed from .ts to .js
import { suppliers } from '../schema/supplier.js';

const db = drizzle(process.env.DATABASE_URL!);

async function main() {

    const newSuppliers = [{ // Renamed variable to avoid conflict
        street: '11 London Road',
        city: 'London',
        postcode: 'SE1 5XC',
        country: 'United Kingdom',
    },

    {
        street: '11 George Street',
        city: 'Manchester',
        postcode: 'MA2 8PZ',
        country: 'United Kingdom',
    }


    ];





    // Insert new user

    newSuppliers.forEach(async supplier => {
        await db.insert(suppliers).values(supplier);
        console.log('New supplier created!');
    })


    // Select all users (use different variable name)
    const allSuppliers = await db.select().from(suppliers); // Renamed variable
    console.log('Getting all users from the database: ', allSuppliers);
}

main().catch(console.error);
