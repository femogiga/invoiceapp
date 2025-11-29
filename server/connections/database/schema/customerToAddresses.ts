
import { relations } from 'drizzle-orm';
import { addresses } from './address.ts';
import { customers } from './customer.ts';


export const customersRelations = relations(customers, ({ many }) => ({
    addresses: many(addresses),
}));

export const addressRelations = relations(addresses, ({ one }) => ({
    customer: one(customers, {
        fields: [addresses.customerId],
        references: [customers.id],
    }),
}));
