import { integer, pgTable, varchar, date, timestamp, numeric } from "drizzle-orm/pg-core";



export const products = pgTable("products", {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    name: varchar({ length: 255 }).notNull(),
    price: numeric('price', { precision: 10, scale: 2 }),
    createdAt: timestamp('created_at').defaultNow().notNull(),
    updatedAt: timestamp('updated_at').defaultNow().notNull()

});
