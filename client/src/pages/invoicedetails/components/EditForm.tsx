import React, { useEffect, useState } from 'react';
import InvoiceForm from './InvoiceForm';
import { useParams } from 'react-router-dom';
import { useFetchInvoicesById } from '@/api/invoices';
import { shortenString } from '@/utils/shortener';

const EditForm = ({}) => {
  const initialState = {
    term: '',
    description: '',
    invoiceDate: '',
    firstname: '',
    lastname: '',
    gender: '',
    email: '',
    customerStreet: '',
    customerCity: '',
    customerPostcode: '',
    customerCountry: '',
    supplierStreet: '',
    supplierCity: '',
    supplierPostcode: '',
    supplierCountry: '',
    productName: '',
    productPrice: '',
    quantity: '',
    productGroup: [{}],
  };
  const params   = useParams()
  const  id  = params.id;
  // if(!id) return
  const { invoiceByIdData } = useFetchInvoicesById(id);
  console.log(invoiceByIdData)
  const heading = 'Edit #' + shortenString(invoiceByIdData?.invoiceId);
  const [invoiceData, setInvoiceData] = useState(initialState  );
  const [inputArray, setInputArray] = useState<string[]>(

  );


useEffect(() => {
  if (invoiceByIdData) {
    setInvoiceData(invoiceByIdData);
    setInputArray(invoiceByIdData?.products || []);
  }
}, [invoiceByIdData]);

 // console.log(inputArray)

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setInvoiceData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSelectChange = (value: string) => {
    setInvoiceData((prev) => ({ ...prev, term: value }));
  };
  const handleAddInput = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const newArr = [...inputArray, { name: ' ', price: '', quantity: '' }];
    setInputArray(newArr);
  };
  const handleChangeInputArray = (e, index: number, value: string) => {
    const updatedInputArray = [...inputArray];
    const obj = updatedInputArray[index];

    updatedInputArray[index] = value; //get the object {name:''}
    // updatedInputArray[index] = value;

    setInputArray(updatedInputArray);
  };

  const onSubmit = {}



  console.log(invoiceData)
  return (
    <InvoiceForm
      heading={'Edit Invoice'}
      onChange={handleInputChange}
      onAddInput={handleAddInput}
      inputArray={inputArray}
      setInputArray={setInputArray}
      onChangeInputArray={handleChangeInputArray}
      onHandleSelectChange={handleSelectChange}
      onSubmit={onSubmit}
      invoiceData={invoiceByIdData}
      onSendDate={'getDateFromchild'}
    />
  );
};

export default EditForm;
