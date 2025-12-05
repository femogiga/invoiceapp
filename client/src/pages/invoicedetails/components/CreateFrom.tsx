import React, { useCallback, useState } from 'react';
import InvoiceForm from './InvoiceForm';
import { useParams, Navigate, useNavigate } from 'react-router-dom';
import { useCreateInvoice } from '@/api/invoices';

const CreateFrom = () => {
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
  const [invoiceData, setInvoiceData] = useState(initialState);
  const [inputArray, setInputArray] = useState<string[]>([]);

  const { mutate, isSuccess, isError, error, reset } = useCreateInvoice();
  //this initialises and add a new input to the ui
  const handleAddInput = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const newArr = [...inputArray, { name: ' ', price: '', quantity: '' }];
    setInputArray(newArr);
  };
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setInvoiceData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSelectChange = (value: string) => {
    setInvoiceData((prev) => ({ ...prev, term: value }));
  };
  console.log(invoiceData);
  const navigate = useNavigate();
  // this handle changes in the input of the productgroup
  const handleChangeInputArray = (e, index: number, value: string) => {
    const updatedInputArray = [...inputArray];
    const obj = updatedInputArray[index];

    updatedInputArray[index] = value; //get the object {name:''}
    // updatedInputArray[index] = value;

    setInputArray(updatedInputArray);
  };

  console.log(invoiceData);

   const getDateFromchild = (childData:any) => {
     console.log('Got data from child:', childData);
 setInvoiceData((prev) => ({ ...prev, invoiceDate: childData }));

     return
   };


  const onSubmit = (e) => {
    e.preventDefault();
    const createData = {
      ...invoiceData,

      productGroup: [...inputArray],
    };
console.log({createData})
    mutate(createData, {
      onSettled: () => {
        // setInvoiceData(initialState);
        // setInputArray([]);
        // navigate('/invoices');
      },
      onError: () => console.log(error),
    });
  };

  return (
    <InvoiceForm
      heading={'Create Invoice'}
      onChange={handleInputChange}
      onAddInput={handleAddInput}
      inputArray={inputArray}
      setInputArray={setInputArray}
      onChangeInputArray={handleChangeInputArray}
      onHandleSelectChange={handleSelectChange}
      onSubmit={onSubmit}
      invoiceData={invoiceData}
      onSendDate={getDateFromchild}
    />
  );
};

export default CreateFrom;
