import 'dotenv/config';
import { drizzle } from 'drizzle-orm/node-postgres';
import { customers } from '../schema/customer.ts';

const db = drizzle(process.env.DATABASE_URL!);

async function main() {

    const newUsers = [{ // Renamed variable to avoid conflict
        firstname: 'Luke',
        lastname: 'Walker',
        gender: 'MALE',
        email: 'luke@mail.com',
        password: "luke",
    },

    {
        firstname: 'Agnes',
        lastname: 'Hill',
        gender: 'FEMALE',
        email: 'agnes@mail.com',
        password: "agnes",
    }


    ];

    // Insert new user

    newUsers.forEach(async user => {
        await db.insert(customers).values(user);
        console.log('New user created!');
    })


    // Select all users (use different variable name)
    const allUsers = await db.select().from(customers); // Renamed variable
    console.log('Getting all customers from the database: ', allUsers);
}

main().catch(console.error);
