import dotenv from 'dotenv';
dotenv.config()
import { defineConfig } from "drizzle-kit";

export default defineConfig({
    out: './drizzle',
    schema: './connections/database/schema',
    dialect: 'postgresql',
    dbCredentials: {
        url: process.env.DATABASE_URL!,
    },
});
