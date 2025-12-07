import { drizzle } from 'drizzle-orm/node-postgres';
import { db } from '../../connections/database/client.ts'
import { customers, invoices, invoicesToProducts, products, invoicesToProductsRelations, invoicesToCustomers, invoicesToCustomersRelations, suppliersToCustomers, suppliers, addresses } from '../../connections/database/index.ts';
import { and, desc, eq, sql } from 'drizzle-orm';
import { paymentDueDateCalculator } from '../../src/util/paymentDueDateCalculator.ts';
import { splitName } from '../../src/util/splitNames.ts';
// import { products } from './../../connections/database/schema/product';
import { useParams } from 'react-router-dom';




export const getAll1 = async (req, res) => {
    try {
        // const result = await db.query.invoices.findMany({});
        const result = await db.select().from(invoices).leftJoin(customers, eq(invoices.id, customers.id)).leftJoin(products, eq(invoices.id, products.id))


        // console.log(result)
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
                total: sql`SUM(price *quantity)`
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
                desc(invoices.status)
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


        // console.log(req.body)
        const { description, term, invoiceDate, fullname, email, customerStreet, customerCity, customerPostcode, customerCountry, supplierId, supplierStreet, supplierCity, supplierPostcode, supplierCountry, productGroup } = req.body
        //  console.log({ term, description, invoiceDate })

        const splittedName = splitName(fullname)
        const firstname = splittedName.firstname
        const lastname = splittedName.lastname
        // calculate paymentDueDate

        const paymentDate = paymentDueDateCalculator(invoiceDate, term);
        const invoiceResult = await db.insert(invoices).values({ term, description, invoiceDate, paymentDate }).returning({ id: invoices.id });

        const returnInvoiceId = invoiceResult[0]?.id
        // console.log(returnInvoiceId)
        // inserting customer schema
        const customerResult = await db.insert(customers).values({ firstname, lastname, email }).returning({ id: customers.id });
        const returnedCustomerId = customerResult[0]?.id


        //inserting invoice_to_customer
        const invoiceToCustomerJoinTable = await db.insert(invoicesToCustomers).values({ invoiceId: returnInvoiceId, customerId: returnedCustomerId })

        //inserting address
        const addressResult = await db.insert(addresses).values({ street: customerStreet, city: customerCity, country: customerCountry, postcode: customerPostcode, customerId: returnedCustomerId })

        //inserting supplier address
        const supplierResult = await db.insert(suppliers).values({ street: supplierStreet, city: supplierCity, postcode: supplierPostcode, country: supplierCountry }).returning({ id: customers.id });

        const supplierAddressId = supplierResult[0]?.id

        const supplierToCustomerJoinTable = await db.insert(suppliersToCustomers).values({ customerId: returnedCustomerId, supplierId: supplierId || supplierAddressId })



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

        const mappedRelations = productGroup.map((product, index) => ({
            invoiceId: returnInvoiceId,
            productId: productResult[index]?.id,
            quantity: product.quantity || 1
        }))

        //inserting  invoice_on_product jointable
        // const invoiceOnProductsJoinTable = await db.insert(invoicesToProducts).values({invoiceId:invoiceId || returnInvoiceId,productId:productId || returnProductId,quantity:quantity})
        const final = await db.insert(invoicesToProducts).values(mappedRelations);

        res.status(201).json({ message: 'invoice successfully created' })


    }
    catch (error) {
        console.error(error)
        res.status(500).json({ message: 'INTERNAL SERVER ERROR' })
    };
}



export const update = async (req, res) => {
    try {
        const {
            invoicesData,
            customerData,
            addressData,
            supplierData,
            productGroup
        } = req.body;
        //console.log(invoicesData.invoiceDate);

        const { id } = req.params;
        const invoiceId = parseInt(id);

        if (isNaN(invoiceId)) {
            return res.status(400).json({ error: 'Invalid invoice ID' });
        }

        const result = await db.transaction(async (tx) => {
            const updatedPaymentDate = paymentDueDateCalculator(invoicesData.invoiceDate, invoicesData.term)
            const updatedInvoiceDataWithTerm = { ...invoicesData, paymentDate: updatedPaymentDate }
            // 1. Update the invoice itself
            const [updatedInvoice] = await tx.update(invoices)
                .set(updatedInvoiceDataWithTerm)
                .where(eq(invoices.id, invoiceId))
                .returning();

            if (!updatedInvoice) {
                throw new Error('Invoice not found');
            }

            // 2. Get customer ID from invoice-customer relationship
            const invoiceCustomer = await tx.query.invoicesToCustomers
                .findFirst({
                    where: eq(invoicesToCustomers.invoiceId, invoiceId)
                });

            let customerId = null;
            if (invoiceCustomer) {
                customerId = invoiceCustomer.customerId;

                // 3. Update customer data if provided
                if (customerData) {
                    await tx.update(customers)
                        .set(customerData)
                        .where(eq(customers.id, customerId));

                    // 4. Update customer address if provided
                    if (addressData) {
                        await tx.update(addresses)
                            .set(addressData)
                            .where(eq(addresses.customerId, customerId));
                    }
                }

                // 5. Handle supplier update
                if (supplierData) {
                    // Get existing supplier-customer relationship
                    const supplierCustomer = await tx.query.suppliersToCustomers
                        .findFirst({
                            where: eq(suppliersToCustomers.customerId, customerId)
                        });

                    if (supplierCustomer) {
                        // Update existing supplier
                        await tx.update(suppliers)
                            .set(supplierData)
                            .where(eq(suppliers.id, supplierCustomer.supplierId));
                    } else {
                        // Create new supplier and link to customer
                        const [newSupplier] = await tx.insert(suppliers)
                            .values(supplierData)
                            .returning();

                        await tx.insert(suppliersToCustomers)
                            .values({
                                customerId: customerId,
                                supplierId: newSupplier.id
                            });
                    }
                }

                // 6. Handle product updates
                if (productGroup && Array.isArray(productGroup)) {
                    // Remove all existing product relationships for this invoice
                    await tx.delete(invoicesToProducts)
                        .where(eq(invoicesToProducts.invoiceId, invoiceId));

                    // Process each product in the group
                    const productRelations = [];

                    for (const product of productGroup) {
                        let productId;

                        if (product.productId) {
                            // 1. Use existing product ID
                            productId = product.productId;
                        } else if (product.name && product.price) {
                            // 2. Create NEW product
                            const [newProduct] = await tx.insert(products)
                                .values({
                                    name: product.name,
                                    price: product.price
                                })
                                .returning({ id: products.id });
                            productId = newProduct.id;
                        } else {
                            throw new Error(`Product must have either productId or name+price`);
                        }

                        // Add to relationships array
                        productRelations.push({
                            invoiceId,
                            productId,
                            quantity: product.quantity || 1
                        });
                    }

                    // Insert all relationships
                    if (productRelations.length > 0) {
                        await tx.insert(invoicesToProducts)
                            .values(productRelations);
                    }
                }
            }

            return {
                invoice: updatedInvoice,
                customerId: customerId
            };
        });

        res.status(200).json({
            message: 'Invoice and all related data updated successfully',
            ...result
        });

    } catch (error) {
        console.error('Update error:', error);
        res.status(500).json({ error: error.message });
    }
};


export const deleteProduct = async (req, res) => {
    try {
        const { invoiceId, productId } = req.params;

        // Validate parameters
        const parsedInvoiceId = parseInt(invoiceId);
        const parsedProductId = parseInt(productId);

        if (isNaN(parsedInvoiceId) || isNaN(parsedProductId)) {
            return res.status(400).json({ error: 'Invalid invoice or product ID' });
        }

        // Delete the specific product from the invoice
        const result = await db.delete(invoicesToProducts)
            .where(
                and(
                    eq(invoicesToProducts.invoiceId, parsedInvoiceId),
                    eq(invoicesToProducts.productId, parsedProductId)
                )
            );

        // Check if anything was deleted
        if (result.rowCount === 0) {
            return res.status(404).json({
                error: 'Product not found on this invoice'
            });
        }

        res.status(200).json({
            message: 'Product removed from invoice successfully',
            invoiceId: parsedInvoiceId,
            productId: parsedProductId
        });

    } catch (error) {
        console.error('Delete product error:', error);
        res.status(500).json({ error: error.message });
    }
};





export const deleteInvoice = async (req, res) => {
    const { invoiceId } = req.params
    try {


        await db.transaction(async (tx) => {
            await tx.delete(invoicesToCustomers).where(eq(invoicesToCustomers.invoiceId, invoiceId))
            await tx.delete(invoicesToProducts).where(eq(invoicesToProducts.invoiceId, invoiceId))
            await tx.delete(invoices).where(eq(invoices.id, invoiceId))

        })
        res.status(200).json({ message: 'invoice succussfully deleted' })
    }
    catch (error) {
        console.error(error)
        res.status(500).json({ message: 'internal server error' })

    }

}


export const setInvoiceStatus = async (req, res) => {
    try {
        const { invoiceId } = req.params
        const { status } = req.body

        const result = await db.update(invoices).set({ status: status }).where(eq(invoices.id, invoiceId))
        res.status(200).json({ message: `invoice status updated to ${status}` })

    }
    catch (error) {
        console.log(error)
        res.status(500).json({ message: 'internal server error' })

    }

}
export default { getAll, getById, createNewInvoice, update, deleteProduct, deleteInvoice, setInvoiceStatus }
