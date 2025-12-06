import { useDeleteInvoiceProduct } from '@/api/invoices';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { calculateTotalProductPrice } from '@/utils/calculateTotalProductPrice';
import { Trash } from 'lucide-react';
import React, { useState, useCallback, useEffect, useMemo } from 'react';
import { useParams } from 'react-router-dom';

const RowInput = ({
  index,
  onChange,
  setInputArray,
  inputArray,
  item,
  //onDeleteProduct,
  productId,
}) => {
  const id = useParams().id;
  const { deleteProductMutate } = useDeleteInvoiceProduct(id, productId);

  const productName = item?.name;

  const [name, setName] = useState(item.name);
  const [quantity, setQuantity] = useState(item?.quantity || '');
  const [price, setPrice] = useState(item?.price || '');
  const totalCalc = calculateTotalProductPrice(item.price, item.quantity);

  const total = useMemo(() => {
    const priceNum = parseFloat(price) || 0;
    const quantityNum = parseInt(quantity) || 0;
    return (priceNum * quantityNum).toFixed(2);
  }, [price, quantity]);
  // console.log(item)
  const handleChange = () => {
    const updatedArray = [...inputArray];
    updatedArray[index] = { name, quantity, price };
    setInputArray(updatedArray);
  };
  // console.log(inputArray);

  useEffect(() => {
    const updatedArray = [...inputArray];
    updatedArray[index] = { name, quantity, price };
    setInputArray(updatedArray);
  }, [name, quantity, price, index, setInputArray]);
  //console.log(productId)
  //console.log(price);
  //  const handleDeleteProduct = () => {
  //    deleteProductMutate({
  //      onSuccess: () => {},
  //      onError: (error) => console.error(error),
  //    });
  //  };
  const handleRemovefromInputArray = (passedIndex) => {
    const filtered = inputArray.filter((item) => item.name === name);
    console.log(filtered)
    setInputArray(filtered);
  };
  return (
    <div className='grid grid-cols-8 items-center text-left gap-x-2 gap-y-6 gap-y-6 mb-8'>
      <div className='col-span-full md:col-span-3'>
        <p className='mb-2 md:hidden'>Item Name</p>
        <Input
          id='name'
          type='text'
          placeholder='e.g Brand guidelines'
          required
          onChange={(e) => {
            setName(e.target.value);
            handleChange();
          }}
          value={name}
        />
      </div>

      <div className='col-span-2 md:col-span-1'>
        <p className='mb-2 md:hidden'>Qty</p>
        <Input
          id='quantity'
          type='text'
          placeholder='1'
          required
          onChange={(e) => {
            setQuantity(e.target.value);
            setTotal(calculateTotalProductPrice(item.price, item.quantity));
            handleChange();
          }}
          value={quantity}
        />
      </div>
      <div className='col-span-3 md:col-span-1'>
        <p className=' mb-2 md:hidden'>Price</p>
        <Input
          id='price'
          type='text'
          placeholder='e.g £100'
          required
          onChange={(e) => {
            setPrice(e.target.value);
            setTotal(calculateTotalProductPrice(item.price, item.quantity));
            handleChange();
          }}
          value={price}
        />
      </div>
      <div className='col-span-2'>
        <p className='md:hidden mb-2'>Total</p>
        <Input
          id='total'
          type='text'
          placeholder='0'
          disabled
          name='total'
          className='border-none'
          onChange={(e) => onChange(index, e.target.value)}
          value={total}
        />
      </div>
      <div className='text-right'>
        <p className='opacity-0 mb-2 md:hidden'>Name</p>
        <Button
          variant='ghost'
          size='icon'
          onClick={(name)=>handleRemovefromInputArray(name)}>
          <Trash />
        </Button>
      </div>
    </div>
  );
};

export default RowInput;
