import Header from '@/components/derivedcomponents/Header';
import React from 'react';
import pillow from '../../assets/pillow.jpg';
import AppFilter from '@/components/derivedcomponents/filters/AppFilter';
import Card from "../../components/derivedcomponents/card/InvoiceCard"
import InvoiceCard from '../../components/derivedcomponents/card/InvoiceCard';
const Index = () => {
  return (
    <main className=' border col-span-12 md:col-span-10'>
      <section className='py-6'>
        <AppFilter />
      </section>

      <section className='grid gap-y-2'>
        <InvoiceCard />
        <InvoiceCard />
        <InvoiceCard />
        <InvoiceCard />
      </section>
    </main>
  );
};

export default Index;
