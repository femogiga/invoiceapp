import { integer, pgSchema, pgTable, varchar, primaryKey } from "drizzle-orm/pg-core";
import { relations } from 'drizzle-orm';
import { suppliers } from "./supplier.ts";
import { customers } from "./customer.ts";


export const supplierRelations = relations(suppliers, ({ many }) => ({
    suppliersToCustomers: many(suppliersToCustomers),
}));

export const customersRelations = relations(customers, ({ many }) => ({
    suppliersToCustomers: many(suppliersToCustomers),
}));




export const suppliersToCustomers = pgTable(
    'suppliers_to_customers',
    {
        supplierId: integer('supplier_id')
            .notNull()
            .references(() => suppliers.id),
        customerId: integer('customer_id')
            .notNull()
            .references(() => customers.id),
    },
    (t) => [
        primaryKey({ columns: [t.supplierId, t.customerId] })
    ],
);


export const suppliersToCustomersRelations = relations(suppliersToCustomers, ({ one }) => ({
    supplier: one(suppliers, {
        fields: [suppliersToCustomers.supplierId],
        references: [suppliers.id],
    }),
    customer: one(customers, {
        fields: [suppliersToCustomers.customerId],
        references: [customers.id],
    }),
}));
