import React from 'react'
import InvoiceForm from './InvoiceForm'
import { useParams } from 'react-router-dom';

const CreateFrom = () => {
    
  return <InvoiceForm heading={'Create Invoice'} />;
}

export default CreateFrom
