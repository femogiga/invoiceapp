import StatusBadge from '@/components/derivedcomponents/StatusBadge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardAction,
  CardContent,
  CardHeader,
} from '@/components/ui/card';
import { ChevronLeft } from 'lucide-react';
import React from 'react';
import { Link } from 'react-router-dom';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

const InvoiceDetails = () => {
  return (
    <main className='col-span-12 md:col-span-10 text-start '>
      <section className='pb-6 mt-4'>
        <Link to='/invoices' className='flex gap-x-2 items-center '>
          <ChevronLeft /> <span>Go back</span>
        </Link>
      </section>
      <section className='mb-6'>
        <Card>
          <CardContent className='flex justify-between'>
            <div className='flex gap-x-4 items-center'>
              <p className='hidden md:block'>Status</p>
              <StatusBadge />
            </div>
            <CardAction className='flex gap-x-4'>
              <Button variant='secondary'>Edit</Button>
              <Button variant='destructive'>Delete</Button>
            </CardAction>
          </CardContent>
        </Card>
      </section>

      <section>
        <Card>
          <CardContent className='grid gap-y-10'>
            <article className='grid  gap-y-6 grid-cols-2  md:grid-cols-3'>
              <div className='col-span-full order-1 md:col-start-1 md:col-end-2 '>
                <p className='text-xl font-bold mb-4 md:mb-0'>#{'RT3080'}</p>
                <p>Re-branding</p>
              </div>
              <address className='col-span-full order-2 md:col-start-3 md:col-end-4 md:justify-self-end'>
                19 Union Terrace
                <br />
                London
                <br />
                E1 3EZ
                <br />
                United Kingdom
              </address>

              <div className='order-3'>
                <p>Invoice date</p>
                <p>18 Aug 2021</p>
              </div>
              <div className='order-4 md:col-start-1 md:col-end-2'>
                <p>Payment due</p>
                <p>19 Aug 2021</p>
              </div>
              <div className='order-5 md:row-start-2 md:row-end-4 md:col-start-3 md:col-end-4'>
                <p>Sent to</p>
                <p>Jenseh@mail.com</p>
              </div>
              <div className='order-6 col-start-2 col-end-3 row-start-3 row-end-5 md:row-start-2 md:row-end-4'>
                <p className='mb-1'>Bill to</p>
                <p>Jenseh Huang</p>
                <address>
                  106 Kendell Street
                  <br />
                  Sharrington
                  <br />
                  NR24 5WQ
                  <br />
                  United Kingdom
                </address>
              </div>
            </article>
            <section className='py-6'>
              <Table className='rounded-xl border border-separate border-spacing-0 overflow-hidden'>
                <TableHeader className=''>
                  <TableRow className='border-none'>
                    <TableHead className='px-4  hidden md:px-8 md:table-cell'>
                      Item name
                    </TableHead>
                    <TableHead className='px-4 hidden md:table-cell md:px-8'>
                      Quantity
                    </TableHead>
                    <TableHead className='px-4 hidden md:table-cell md:px-8'>
                      Price
                    </TableHead>
                    <TableHead className='px-4 text-right hidden md:table-cell md:px-8'>
                      Total
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody className=''>
                  <TableRow className='h-8 border-none'>
                    <TableCell className='font-medium px-4 md:px-8 font-wrap'>
                      Brand Guidelines
                    </TableCell>
                    <TableCell className='table-cells md:hidden '></TableCell>
                    <TableCell className='table-cells md:hidden'></TableCell>
                    <TableCell className='px-4 hidden md:table-cell md:px-8'>
                      1
                    </TableCell>
                    <TableCell className='px-4 hidden md:table-cell md:px-8'>
                      £250.00
                    </TableCell>
                    <TableCell className='text-right px-4 md:px-8'>
                      {' '}
                      £250.00
                    </TableCell>
                  </TableRow>

                  <TableRow className='h-8 border-none'>
                    <TableCell className='font-medium px-4 md:px-8'>
                      Brand Guidelines
                    </TableCell>
                    <TableCell className='table-cells md:hidden'></TableCell>
                    <TableCell className='table-cells md:hidden'></TableCell>
                    <TableCell className='px-4 hidden md:table-cell md:px-8'>
                      1
                    </TableCell>
                    <TableCell className=' px-4 hidden md:table-cell md:px-8'>
                      £250.00
                    </TableCell>
                    <TableCell className='text-right px-4 md:px-8 '>
                      £250.00
                    </TableCell>
                  </TableRow>

                  <TableRow className='bg-black'>
                    <TableCell
                      colSpan={2}
                      className='font-medium col-span-2 px-4 md:px-8'>
                      Amount due
                    </TableCell>

                    <TableCell
                      colSpan={2}
                      className='text-right font-bold text-3xl py-6 px-4 md:px-8'>
                      £250.00
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </section>
          </CardContent>
        </Card>
      </section>
    </main>
  );
};

export default InvoiceDetails;
