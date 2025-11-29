import React from 'react';
import AppFilter from '@/components/derivedcomponents/filters/AppFilter';
import InvoiceCard from '../../components/derivedcomponents/card/InvoiceCard';
import { useFetchAllInvoices } from '@/api/invoices';
import { Link } from 'react-router-dom';
const Index = () => {

  const { invoiceData } = useFetchAllInvoices();
  console.log(invoiceData)
  return (
    <main className=' border col-span-12 md:col-span-10'>
      <section className='py-6'>
        <AppFilter />
      </section>

      <section className='grid gap-y-2'>
        {invoiceData &&
          invoiceData.map((invoice) => (
            <Link to={`/invoices/${invoice.id}`}>
              <InvoiceCard {...invoice} />
            </Link>
          ))}

        {/* <InvoiceCard />
        <InvoiceCard />
        <InvoiceCard /> */}
      </section>
    </main>
  );
};

export default Index;
