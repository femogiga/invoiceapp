import React, { useEffect, useMemo, useState } from 'react';
import InvoiceForm from './InvoiceForm';
import { useNavigate, useParams } from 'react-router-dom';
import { useDeleteInvoiceProduct, useFetchInvoicesById, useUpdateInvoice } from '@/api/invoices';
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
  const params = useParams();
  const id = params.id;
  // if(!id) return
  const { invoiceByIdData } = useFetchInvoicesById(id);
  console.log(invoiceByIdData);
  const heading = 'Edit #' + shortenString(invoiceByIdData?.invoiceId);
  const [invoiceData, setInvoiceData] = useState(initialState);
  const [inputArray, setInputArray] = useState<string[]>();

  const { mutate, isPending } = useUpdateInvoice(id);
const { deleteProductMutate } = useDeleteInvoiceProduct(id);
  useEffect(() => {
    if (invoiceByIdData) {
      setInvoiceData(invoiceByIdData);
      setInputArray(invoiceByIdData?.products || []);
    }
  }, [invoiceByIdData]);
  const navigate = useNavigate();
  //console.log(inputArray);

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


   const getDateFromchild = (childData: any) => {
     console.log('Got data from child:', childData);
     setInvoiceData((prev) => ({ ...prev, invoiceDate: childData }));

     return;
   };
console.log(invoiceData.invoiceDate)
  const onSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const {
      term,
      description,
      invoiceDate,
      firstname,
      lastname,
      email,
      customerCity,
      customerCountry,
      customerPostcode,
      customerStreet,
      supplierCity,
      supplierCountry,
      supplierPostcode,
      supplierStreet,
    } = invoiceData;
    const invoicesData = { term, description, invoiceDate: invoiceDate };
    const customerData = { firstname, lastname, email };
    const addressData = {
      street: customerStreet,
      postcode: customerPostcode,
      city: customerCity,
      country: customerCountry,
    };
    const supplierData = {
      street: supplierStreet,
      postcode: supplierPostcode,
      city: supplierCity,
      country: supplierCountry,
    };
    const data = {
      invoicesData,
      customerData,
      addressData,
      supplierData,
      productGroup: inputArray,
    };

    console.log(data);

    mutate(data, {
      onSuccess: () => {
        navigate(`/invoices/${id}`);
      },
      onError: (error) => console.error(error),
    });
  };


  // const handleDeleteProduct = (productId:number) => {
  //   deleteProductMutate(productId, {
  //     onSuccess: () => {

  //     },
  //     onError:()=>console.error(error)
  //   } );
  // }

  //console.log(invoiceData);
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
      invoiceData={invoiceData}
      onSendDate={getDateFromchild}
      // onDeleteProduct = {handleDeleteProduct}

    />
  );
};

export default EditForm;
