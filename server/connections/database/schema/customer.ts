import { integer, pgEnum, pgSchema, pgTable, varchar, timestamp } from "drizzle-orm/pg-core";
import { relations } from 'drizzle-orm';
import { addresses } from "./address.ts";


export const genders = pgEnum('gender', ['MALE', 'FEMALE', 'GAY', 'OTHERS']);


export const customers = pgTable("customers", {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    firstname: varchar({ length: 255 }).notNull(),
    lastname: varchar({ length: 255 }).notNull(),
    gender: genders().default('MALE'),
    email: varchar({ length: 255 }).notNull().unique(),
    password: varchar({ length: 50 }),
    createdAt: timestamp('created_at').defaultNow().notNull(),
    updatedAt: timestamp('updated_at').defaultNow().notNull()

});
