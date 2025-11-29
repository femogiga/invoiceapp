import { integer, pgSchema, pgTable, varchar, primaryKey, timestamp } from "drizzle-orm/pg-core";
import { relations } from 'drizzle-orm';
import { suppliers } from "./supplier.ts";
import { customers } from "./customer.ts";
import { invoices } from "./invoice.ts";
import { products } from "./product.ts";


// ✅ CORRECT - Define relations on the correct tables
export const invoicesRelations = relations(invoices, ({ many }) => ({
    invoicesToCustomers: many(invoicesToCustomers),
}));

export const customersRelations = relations(customers, ({ many }) => ({
    invoicesToCustomers: many(invoicesToCustomers),
}));



export const invoicesToCustomers = pgTable(
    'invoices_to_customers',
    {
        invoiceId: integer('invoice_id')
            .notNull()
            .references(() => invoices.id),
        customerId: integer('customer_id')
            .notNull()
            .references(() => customers.id),

        createdAt: timestamp('created_at').defaultNow().notNull(),
        updatedAt: timestamp('updated_at').defaultNow().notNull()
    },
    (t) => [
        primaryKey({ columns: [t.invoiceId, t.customerId] })
    ],
);


export const invoicesToCustomersRelations = relations(invoicesToCustomers, ({ one }) => ({
    invoice: one(invoices, {
        fields: [invoicesToCustomers.invoiceId],
        references: [invoices.id],
    }),
    customer: one(customers, {
        fields: [invoicesToCustomers.customerId],
        references: [customers.id],
    }),
}));
