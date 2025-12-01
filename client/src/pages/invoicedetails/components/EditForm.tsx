import React from 'react'
import InvoiceForm from './InvoiceForm'
import { useParams } from 'react-router-dom';
import { useFetchInvoicesById } from '@/api/invoices';
import { shortenString } from '@/utils/shortener';

const EditForm = () => {
    const { id } = useParams();
      const { invoiceByIdData } = useFetchInvoicesById(id );
    const heading = "Edit #" + shortenString(invoiceByIdData?.invoiceId);
  return <InvoiceForm heading={heading} />;
}

export default EditForm
