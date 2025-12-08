import AppFilter from '@/components/derivedcomponents/filters/AppFilter';
import InvoiceCard from '../../components/derivedcomponents/card/InvoiceCard';
import { useFetchAllInvoices } from '@/api/invoices';
import { Link } from 'react-router-dom';
import { useEffect, useMemo, useState } from 'react';
const Index = () => {

  const { invoiceData } = useFetchAllInvoices();
  const [selectedStatusOption, setSelectedStatusOption] = useState('');
//console.log(invoiceData)
  const handleSelectedStatusOptionChange = (selectedValue:string) => {
    setSelectedStatusOption(selectedValue)
  }


   const totalInvoices = useMemo(() => {
     const total =
       invoiceData &&
       invoiceData.filter((invoice) => {
         if (!['PAID', 'DRAFT', 'PENDING'].includes(selectedStatusOption)) {
           return invoiceData.length;
         }

         return (
           invoice?.status.toLowerCase() === selectedStatusOption.toLowerCase()
         );
       });
     return total;
   }, [selectedStatusOption, invoiceData]);
//
  //console.log(totalInvoices.length.toString());
  useEffect(() => { }, [selectedStatusOption]);
  return (
    <main className='  col-span-12 md:col-span-10'>
      <section className='py-6'>
        <AppFilter
          onChange={handleSelectedStatusOptionChange}
          totalInvoices={totalInvoices}
          selectedStatusOption={selectedStatusOption}
        />
      </section>

      <section className='grid gap-y-2'>
        {invoiceData &&
          invoiceData
            .filter((invoice) => {
              return selectedStatusOption
                ? invoice?.status.toLowerCase() ==
                    selectedStatusOption.toLowerCase()
                : ' ';
            })
            .map((invoice) => (
              <Link
                to={`/invoices/${invoice.id}`}
                key={`invoicecard${invoice.id}`}>
                <InvoiceCard {...invoice} />
              </Link>
            ))}
      </section>
    </main>
  );
};

export default Index;
