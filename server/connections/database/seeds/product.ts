import 'dotenv/config';
import { drizzle } from 'drizzle-orm/node-postgres';
import { users } from '../schema/user.ts'; // Changed from .ts to .js
import { products } from '../schema/product.ts';

const db = drizzle(process.env.DATABASE_URL!);

async function main() {

    const newProducts = [{ // Renamed variable to avoid conflict
        name: 'Apple MacBook',
        price: 234.00,

    },

    {
        name: 'Ruler',
        price: 104.00,
    }


    ];





    // Insert new user

    newProducts.forEach(async product => {
        await db.insert(products).values(product);
        console.log('Product!');
    })


    // Select all users (use different variable name)
    const allProducts = await db.select().from(products); // Renamed variable
    console.log('Getting all products from the database: ', allProducts);
}

main().catch(console.error);


//DATABASE_URL = postgresql://postgres:lara@localhost:5432/invoice

