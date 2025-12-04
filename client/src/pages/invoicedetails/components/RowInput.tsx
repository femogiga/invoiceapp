import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Trash } from 'lucide-react';
import React, { useState, useCallback } from 'react';

const RowInput = ({ index, onChange, setInputArray, inputArray }) => {
  const [name, setName] = useState('');
  const [quantity, setQuantity] = useState('');
  const [price, setPrice] = useState('');

  const handleChange = useCallback(() => {
    const updatedArray = [...inputArray];
    updatedArray[index] = { name, quantity, price };
    setInputArray(updatedArray);
  }, [inputArray]);
  console.log(inputArray);

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
          placeholder='1800'
          disabled
          className='border-none'
          onChange={(e) => onChange(index, e.target.value)}
        />
      </div>
      <div className='text-right'>
        <p className='opacity-0 mb-2 md:hidden'>Name</p>
        <Button variant='ghost' size='icon'>
          <Trash />
        </Button>
      </div>
    </div>
  );
};

export default RowInput;
