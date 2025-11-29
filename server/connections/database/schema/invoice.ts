import { integer, pgTable, varchar, date, timestamp, uuid, pgEnum } from "drizzle-orm/pg-core";
import { sql } from "drizzle-orm";


export const statuses = pgEnum('status', ['PAID', 'PENDING']);




export const invoices = pgTable("invoices", {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    invoiceId: uuid('uuid2').default(sql`gen_random_uuid()`),
    term: varchar({ length: 56 }).notNull(),
    description: varchar({ length: 255 }).notNull(),
    invoiceDate: date({ mode: "string" }),
    paymentDate: date({ mode: "string" }),
    status: statuses().default('PENDING'),
    createdAt: timestamp('created_at').defaultNow().notNull(),
    updatedAt: timestamp('updated_at').defaultNow().notNull()
});
