import { Button } from '@/components/ui/button';
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { ChevronRight, Dot } from 'lucide-react';
import StatusBadge from '../StatusBadge';

const InvoiceCard = () => {
  return (
    <Card className='w-full max-w-full '>
      <CardContent className='grid grid-cols-2  grid-rows-3 justify-items-start items-center gap-x-1  md:flex md:justify-between md:items-center '>
        <p className='col-start-1 col-end-2 text-xl font-bold mb-4 md:mb-0'>
          #{'RT3080'}
        </p>
        <p className='col-start-1'>
          <span>Due </span> 19 Aug 2021
        </p>
        <p className='col-start-2 col-end-3 row-start-1 row-end-2 mb-4 md:mb-0 justify-self-end'>
          Jason Mark
        </p>
        <p className='col-start-1 text-3xl font-bold align-self-start relative bottom-2 md:bottom-0'>
          <span>£ </span> 1,800
        </p>
        <div className='flex col-start-2 col-end-3  row-start-2  row-end-4 self-center  items-center gap-x-2 justify-self-end'>
          <StatusBadge/>
          <ChevronRight className='hidden md:block' />
        </div>
      </CardContent>
    </Card>
  );
};

export default InvoiceCard;
