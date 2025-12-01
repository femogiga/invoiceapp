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
import { Link, useNavigate, useParams } from 'react-router-dom';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { useFetchInvoicesById } from '@/api/invoices';
import { shortenString } from '@/utils/shortener';
import { genFullname } from '@/utils/genFullname';
import { calculateTotalProductPrice } from '@/utils/calculateTotalProductPrice';

const InvoiceDetails = () => {
  const { id } = useParams()
  const { invoiceByIdData } = useFetchInvoicesById(id );
  // console.log({ invoiceByIdData });

  const navigate = useNavigate()
  const handleEditButtonClick = () => {
    navigate(`/invoices/${id}/edit`)
  }
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
            <div className='flex gap-x-4 items-center justify-between w-full md:justify-start'>
              <p className=''>Status</p>
              <StatusBadge status={invoiceByIdData?.status} />
            </div>
            <CardAction className='flex gap-x-4 hidden md:flex'>
              <Button variant='secondary' onClick={handleEditButtonClick}>Edit</Button>
              <Button variant='destructive'>Delete</Button>
            </CardAction>
          </CardContent>
        </Card>
      </section>

      <section className='mb-8'>
        <Card>
          <CardContent className='grid gap-y-10'>
            <article className='grid  gap-y-6 grid-cols-2  md:grid-cols-3'>
              <div className='col-span-full order-1 md:col-start-1 md:col-end-2 '>
                <p className='text-xl font-bold mb-4 md:mb-0'>
                  #{shortenString(invoiceByIdData?.invoiceId)}
                </p>
                <p>{invoiceByIdData?.description}</p>
              </div>
              <address className='col-span-full order-2 md:col-start-3 md:col-end-4 md:justify-self-end'>
                {invoiceByIdData?.supplierStreet}
                <br />
                {invoiceByIdData?.supplierCity}
                <br />
                {invoiceByIdData?.supplierPostcode}
                <br />
                {invoiceByIdData?.supplierCountry}
              </address>

              <div className='order-3'>
                <p>Invoice date</p>
                <p>{invoiceByIdData?.invoiceDate}</p>
              </div>
              <div className='order-4 md:col-start-1 md:col-end-2'>
                <p>Payment due</p>
                <p>{invoiceByIdData?.paymentDate}</p>
              </div>
              <div className='order-5 md:row-start-2 md:row-end-4 md:col-start-3 md:col-end-4'>
                <p>Sent to</p>
                <Link to='mailto:invoiceByIdData?.email'>
                  {invoiceByIdData?.email}
                </Link>
              </div>
              <div className='order-6 col-start-2 col-end-3 row-start-3 row-end-5 md:row-start-2 md:row-end-4'>
                <p className='mb-1'>Bill to</p>
                <p>
                  {genFullname(
                    invoiceByIdData?.firstname,
                    invoiceByIdData?.lastname
                  )}
                </p>
                <address>
                  {invoiceByIdData?.customerStreet}
                  <br />
                  {invoiceByIdData?.customerCity}
                  <br />
                  {invoiceByIdData?.customerPostcode}
                  <br />
                  {invoiceByIdData?.customerCountry}
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
                  {invoiceByIdData &&
                    invoiceByIdData?.products.map((product) => (
                      <TableRow key={product?.id} className='h-8 border-none'>
                        <TableCell className='font-medium px-4 md:px-8 font-wrap'>
                          {product.name}
                        </TableCell>
                        <TableCell className='table-cells md:hidden '></TableCell>
                        <TableCell className='table-cells md:hidden'></TableCell>
                        <TableCell className='px-4 hidden md:table-cell md:px-8'>
                          {product?.quantity}
                        </TableCell>
                        <TableCell className='px-4 hidden md:table-cell md:px-8'>
                          £{product?.price}
                        </TableCell>
                        <TableCell className='text-right px-4 md:px-8'>
                          {' '}
                          £
                          {calculateTotalProductPrice(
                            product?.price,
                            product?.quantity
                          )}
                        </TableCell>
                      </TableRow>
                    ))}


                  <TableRow className='bg-black'>
                    <TableCell
                      colSpan={2}
                      className='font-medium col-span-2 px-4 md:px-8'>
                      Amount due
                    </TableCell>

                    <TableCell
                      colSpan={2}
                      className='text-right font-bold text-3xl py-6 px-4 md:px-8'>
                      £{invoiceByIdData?.total}
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </section>
          </CardContent>
        </Card>
      </section>
      <section className='mb-6 md:hidden'>
        <Card>
          <CardContent className='flex justify-between '>
            <CardAction className='flex gap-x-4 justify-end w-full '>
              <Button variant='secondary'>Edit</Button>
              <Button variant='destructive'>Delete</Button>
            </CardAction>
          </CardContent>
        </Card>
      </section>
    </main>
  );
};

export default InvoiceDetails;
