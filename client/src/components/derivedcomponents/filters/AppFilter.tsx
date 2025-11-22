import React from 'react';
import AppSelect from './AppSelect';
import { Button } from '@/components/ui/button';
import { PlusCircle } from 'lucide-react';

const AppFilter = () => {
  return (
    <article>
      <div className='flex justify-between'>
        <div className='text-left'>
          <p className='text-3xl font-bold'>Invoices</p>
          <p className='flex gap-x-1'>
            <span className='hidden md:block'>There are </span>7
            <span className='hidden md:block'> total</span> invoices
          </p>
        </div>
        <div className='flex items-center gap-x-2'>
          <div>
            <AppSelect />
          </div>
          <div>
            <Button size='lg' className='rounded-4xl'>
              <PlusCircle />
              <p>New</p>
            </Button>
          </div>
        </div>
      </div>
    </article>
  );
};

export default AppFilter;
