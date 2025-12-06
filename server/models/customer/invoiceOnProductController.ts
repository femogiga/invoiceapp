import { drizzle } from 'drizzle-orm/node-postgres';
import { db } from '../../connections/database/client.ts'
import { customers, suppliers } from '../../connections/database/index.ts';
import { eq } from 'drizzle-orm';
import { invoicesToProducts } from './../../connections/database/schema/invoicesOnProducts';



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




