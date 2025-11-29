import { integer, pgTable, varchar } from "drizzle-orm/pg-core";


export const suppliers = pgTable("suppliers", {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    street: varchar({ length: 255 }).notNull(),
    city: varchar({ length: 100 }).notNull(),
    postcode: varchar({ length: 50 }).notNull(),
    country: varchar({ length: 100 }).notNull(),

});
