import { drizzle } from 'drizzle-orm/node-postgres';
import { db } from '../../connections/database/client.ts'
import { customers, invoices, invoicesToProducts, products, invoicesToProductsRelations, invoicesToCustomers, invoicesToCustomersRelations, suppliersToCustomers, suppliers, addresses } from '../../connections/database/index.ts';
import { eq, sql } from 'drizzle-orm';




export const getAll1 = async (req, res) => {
    try {
        // const result = await db.query.invoices.findMany({});
        const result = await db.select().from(invoices).leftJoin(customers, eq(invoices.id, customers.id)).leftJoin(products, eq(invoices.id, products.id))


        console.log(result)
        res.status(200).json(result)
    } catch (error) {
        console.error(error)
        res.status(500).json(error)

    }
}




export const getAll = async (req, res) => {
    try {
        const result = await db
            .select({
                id: invoices.id,
                invoiceId: invoices.invoiceId,
                term: invoices.term,
                description: invoices.description,
                invoiceDate: invoices.invoiceDate,
                paymentDate: invoices.paymentDate,
                status: invoices.status,
                createdAt: invoices.createdAt,
                updatedAt: invoices.updatedAt,
                firstname: customers.firstname,
                lastname: customers.lastname,
                // Aggregate products into JSON array
                products: sql`COALESCE(
                    JSON_AGG(
                        JSON_BUILD_OBJECT(
                            'id', products.id,
                            'name', products.name,
                            'price', products.price,
                            'quantity', invoices_to_products.quantity,
                            'createdAt', products.created_at,
                            'updatedAt', products.updated_at
                        )
                    ) FILTER (WHERE products.id IS NOT NULL),
                    '[]'::JSON
                )`.as('products'),
                total: sql`SUM(price)`
            })
            .from(invoices)
            .leftJoin(invoicesToProducts, eq(invoices.id, invoicesToProducts.invoiceId))
            .leftJoin(products, eq(invoicesToProducts.productId, products.id))
            .leftJoin(invoicesToCustomers, eq(invoices.id, invoicesToCustomers.invoiceId))
            .leftJoin(customers, eq(invoicesToCustomers.customerId, customers.id))
            .groupBy(
                invoices.id,
                invoices.invoiceId,
                invoices.term,
                invoices.description,
                invoices.invoiceDate,
                invoices.paymentDate,
                invoices.status,
                invoices.createdAt,
                invoices.updatedAt,
                customers.firstname,
                customers.lastname
            ).orderBy(
                invoices.id
            )

        console.log(result);
        res.status(200).json(result);
    } catch (error) {
        console.error(error);
        res.status(500).json(error);
    }
}


export const getById = async (req, res) => {
    try {
        const result = await db
            .select({
                id: invoices.id,
                invoiceId: invoices.invoiceId,
                term: invoices.term,
                description: invoices.description,
                invoiceDate: invoices.invoiceDate,
                paymentDate: invoices.paymentDate,
                status: invoices.status,
                createdAt: invoices.createdAt,
                updatedAt: invoices.updatedAt,
                firstname: customers.firstname,
                lastname: customers.lastname,
                email: customers.email,
                supplierStreet: suppliers.street,
                supplierCity: suppliers.city,
                supplierPostcode: suppliers.postcode,
                supplierCountry: suppliers.country,
                customerStreet: addresses.street,
                customerCity: addresses.city,
                customerPostcode: addresses.postcode,
                customerCountry: addresses.country,

                // Aggregate products into JSON array
                products: sql`COALESCE(
                    JSON_AGG(
                        JSON_BUILD_OBJECT(
                            'id', products.id,
                            'name', products.name,
                            'price', products.price,
                            'quantity', invoices_to_products.quantity,
                            'createdAt', products.created_at,
                            'updatedAt', products.updated_at
                        )
                    ) FILTER (WHERE products.id IS NOT NULL),
                    '[]'::JSON
                )`.as('products'),
                total: sql`SUM(price * quantity)`
            })
            .from(invoices)
            .leftJoin(invoicesToProducts, eq(invoices.id, invoicesToProducts.invoiceId))
            .leftJoin(products, eq(invoicesToProducts.productId, products.id))
            .leftJoin(invoicesToCustomers, eq(invoices.id, invoicesToCustomers.invoiceId))
            .leftJoin(customers, eq(invoicesToCustomers.customerId, customers.id))
            .leftJoin(suppliersToCustomers, eq(suppliersToCustomers.customerId, customers.id))
            .leftJoin(suppliers, eq(suppliersToCustomers.supplierId, suppliers.id))
            .leftJoin(addresses, eq(customers.id, addresses.customerId))
            .where(eq(invoices.id, parseInt(req.params.id)))
            .groupBy(
                invoices.id,
                invoices.invoiceId,
                invoices.term,
                invoices.description,
                invoices.invoiceDate,
                invoices.paymentDate,
                invoices.status,
                invoices.createdAt,
                invoices.updatedAt,
                customers.firstname,
                customers.lastname,
                customers.email,
                suppliers.street,
                suppliers.city,
                suppliers.postcode,
                suppliers.country,
                addresses.street,
                addresses.city,
                addresses.postcode,
                addresses.country,
            )

        console.log(result);
        res.status(200).json(result[0]);
    } catch (error) {
        console.error(error);
        res.status(500).json(error);
    }
}
export default { getAll, getById }
