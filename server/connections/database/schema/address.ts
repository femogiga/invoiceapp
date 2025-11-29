import { integer, pgEnum, pgSchema, pgTable, varchar, timestamp } from "drizzle-orm/pg-core";
import { relations } from 'drizzle-orm';
import { customers } from "./customer.ts";




export const addresses = pgTable("addresses", {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    street: varchar({ length: 255 }).notNull(),
    city: varchar({ length: 100 }).notNull(),
    postcode: varchar({ length: 50 }).notNull(),
    country: varchar({ length: 255 }).notNull(),
    customerId: integer("customer_id").references(() => customers.id),
    createdAt: timestamp('created_at').defaultNow().notNull(),
    updatedAt: timestamp('updated_at').defaultNow().notNull()

});
