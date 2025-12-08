import { Card, CardContent } from '@/components/ui/card';
import { ChevronRight } from 'lucide-react';
import StatusBadge from '../StatusBadge';
import { shortenString } from '@/utils/shortener';
import type React from 'react';

interface InvoiceCardProps {
  paymentDate: string;
  invoiceId: string;
  firstname: string;
  lastname: string;
  total: number;
  status: 'PENDING' | 'PAID';
}
const InvoiceCard: React.FC<InvoiceCardProps> = ({
  paymentDate,
  invoiceId,
  firstname,
  lastname,
  total,
  status,
}) => {
  return (
    <Card className='w-full max-w-full shadow-none'>
      <CardContent className='grid grid-cols-2  grid-rows-3 justify-items-start items-center gap-x-1  md:flex md:justify-between md:items-center '>
        <p className='col-start-1 col-end-2 text-xl font-bold mb-4 md:mb-0 md:w-1/8'>
          #{shortenString(invoiceId)}
        </p>
        <p className='col-start-1 md:w-1/8'>
          <span>Due </span>
          {paymentDate}
        </p>
        <p className='col-start-2 col-end-3 row-start-1 row-end-2 mb-4 justify-self-end md:mb-0 md:w-2/8'>
          {firstname + ' ' + lastname}
        </p>
        <p className='col-start-1  font-bold align-self-start relative bottom-2 text-end md:bottom-0 md:text-2xl md:w-2/8 '>
          <span>£ </span> {total}
        </p>
        <div className='flex col-start-2 col-end-3  row-start-2  row-end-4 self-center  items-center gap-x-2 justify-self-end md:w-2/8 md:justify-end'>
          <StatusBadge status={status} />
          <ChevronRight className='hidden md:block' />
        </div>
      </CardContent>
    </Card>
  );
};

export default InvoiceCard;
