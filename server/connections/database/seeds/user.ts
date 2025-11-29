import 'dotenv/config';
import { drizzle } from 'drizzle-orm/node-postgres';
import { users } from '../schema/user.ts'; // Changed from .ts to .js

const db = drizzle(process.env.DATABASE_URL!);

async function main() {

    const newUsers = [{ // Renamed variable to avoid conflict
        firstname: 'James',
        lastname: 'Madden',
        gender: 'MALE',
        email: 'james@mail.com',
        password: "james",
    },

    {
        firstname: 'Jill',
        lastname: 'Craven',
        gender: 'FEMALE',
        email: 'jill@mail.com',
        password: "jill",
    }


    ];

    // Insert new user
    
    newUsers.forEach(async user => {
        await db.insert(users).values(user);
        console.log('New user created!');
    })


    // Select all users (use different variable name)
    const allUsers = await db.select().from(users); // Renamed variable
    console.log('Getting all users from the database: ', allUsers);
}

main().catch(console.error);
