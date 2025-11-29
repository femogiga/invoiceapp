import { integer, pgTable, varchar, timestamp } from "drizzle-orm/pg-core";

export const users = pgTable("users", {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    firstname: varchar({ length: 255 }).notNull(),
    lastname: varchar({ length: 255 }).notNull(),
    gender: varchar({ length: 50 }).notNull(),
    email: varchar({ length: 255 }).notNull().unique(),
    password: varchar({ length: 50 }).notNull(),
    createdAt: timestamp('created_at').defaultNow().notNull(),
    updatedAt: timestamp('updated_at').defaultNow().notNull()

});
