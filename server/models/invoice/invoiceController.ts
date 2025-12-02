import { drizzle } from 'drizzle-orm/node-postgres';
import { db } from '../../connections/database/client.ts'
import { customers, invoices, invoicesToProducts, products, invoicesToProductsRelations, invoicesToCustomers, invoicesToCustomersRelations, suppliersToCustomers, suppliers, addresses } from '../../connections/database/index.ts';
import { eq, sql } from 'drizzle-orm';
import { paymentDueDateCalculator } from '../../src/util/paymentDueDateCalculator.ts';
// import { products } from './../../connections/database/schema/product';




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




export const createNewInvoice = async (req, res, next) => {
    try {



        const { invoiceId, term, description, invoiceDate, firstname, lastname, gender, email, customerStreet, customerCity, customerPostcode, customerId, customerCountry, supplierId, supplierStreet, supplierCity, supplierPostcode, supplierCountry, productName, productPrice, productId, quantity,productGroup } = req.body
        console.log({ term, description, invoiceDate })



        // calculate paymentDueDate

        const paymentDate = paymentDueDateCalculator(invoiceDate, term);
        const invoiceResult = await db.insert(invoices).values({ term, description, invoiceDate, paymentDate }).returning({ id: invoices.id });

        const returnInvoiceId = invoiceResult[0]?.id
        console.log(returnInvoiceId)
        // inserting customer schema
        const customerResult = await db.insert(customers).values({ firstname, lastname, gender, email }).returning({ id: customers.id });
        const returnedCustomerId = customerResult[0]?.id


        //inserting invoice_to_customer
        const invoiceToCustomerJoinTable = await db.insert(invoicesToCustomers).values({ invoiceId: invoiceId || returnInvoiceId, customerId: customerId || returnedCustomerId })

        //inserting address
        const addressResult = await db.insert(addresses).values({ street: customerStreet, city: customerCity, country: customerCountry, postcode: customerPostcode, customerId: customerId || returnedCustomerId })

        //inserting supplier address
        const supplierResult = await db.insert(suppliers).values({ street: supplierStreet, city: supplierCity, postcode: supplierPostcode, country: supplierCountry }).returning({ id: customers.id });

        const supplierAddressId = supplierResult[0]?.id

        const supplierToCustomerJoinTable = await db.insert(suppliersToCustomers).values({ customerId: customerId || returnedCustomerId, supplierId: supplierId || supplierAddressId })



        //inserting product

        if (!Array.isArray(productGroup) || productGroup.length === 0) {
            return res.status(400).json({ error: 'Products array is required' });
        }
        // const productResult = await db.insert(products).values({ name: productName, price: productPrice }).returning({ id: products.id })

        // const returnProductId = productResult[0]?.id

        const productResult = await db.insert(products).values(productGroup.map(item => ({ name: item.name, price: item.price }))).returning({ id: products.id })

        if (productResult.length !== productGroup.length) {
            throw new Error('Failed to create all products');
        }

        const mappedRelations = productGroup.map((product,index) => ({
            invoiceId:invoiceId || returnInvoiceId,
            productId: productResult[index]?.id ||productId,
            quantity:product.quantity || 1
       }))

        //inserting  invoice_on_product jointable
        // const invoiceOnProductsJoinTable = await db.insert(invoicesToProducts).values({invoiceId:invoiceId || returnInvoiceId,productId:productId || returnProductId,quantity:quantity})
       const final =  await db.insert(invoicesToProducts).values(mappedRelations);

        res.status(201).json({ message: 'invoice successfully created' })


    }
    catch (error) {
        console.error(error)
        res.status(500).json({ message: 'INTERNAL SERVER ERROR' })
    };
}






export default { getAll, getById, createNewInvoice }
