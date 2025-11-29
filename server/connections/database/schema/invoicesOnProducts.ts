import { integer, pgSchema, pgTable, varchar, primaryKey, timestamp } from "drizzle-orm/pg-core";
import { relations } from 'drizzle-orm';
import { suppliers } from "./supplier.ts";
import { customers } from "./customer.ts";
import { invoices } from "./invoice.ts";
import { products } from "./product.ts";


export const invoicesRelations = relations(invoices, ({ many }) => ({
    invoicesToProducts: many(invoicesToProducts),
}));

export const productsRelations = relations(products, ({ many }) => ({
    invoicesToProducts: many(invoicesToProducts),
}));




export const invoicesToProducts = pgTable(
    'invoices_to_products',
    {
        invoiceId: integer('invoice_id')
            .notNull()
            .references(() => invoices.id),
        productId: integer('product_id')
            .notNull()
            .references(() => products.id),
        quantity: integer(),
        createdAt: timestamp('created_at').defaultNow().notNull(),
        updatedAt: timestamp('updated_at').defaultNow().notNull()
    },
    (t) => [
        primaryKey({ columns: [t.invoiceId, t.productId] })
    ],
);


export const invoicesToProductsRelations = relations(invoicesToProducts, ({ one }) => ({
    invoice: one(invoices, {
        fields: [invoicesToProducts.invoiceId],
        references: [invoices.id],
    }),
    product: one(products, {
        fields: [invoicesToProducts.productId],
        references: [products.id],
    }),
}));





