import React, { useEffect, useState } from 'react';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import FormCalender from './FormCalender';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Trash } from 'lucide-react';
import {
  ButtonGroup,
  ButtonGroupSeparator,
  ButtonGroupText,
} from '@/components/ui/button-group';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import RowInput from './RowInput';
import { useNavigate } from 'react-router-dom';
const InvoiceForm = ({heading}) => {
  const [inputArray, setInputArray] = useState<number[]>([]);

  const handleAddInput = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const newArr = [...inputArray, 1];
    setInputArray(newArr);
  };
  // useEffect(() => {

  // },[inputArray])



  return (
    <Card className='col-span-12 md:col-span-10'>
      <CardHeader>
        <CardTitle className='text-left'>{heading ||'Edit #RT3080'}</CardTitle>
      </CardHeader>
      <CardContent>
        <form>
          <FieldGroup>
            <FieldGroup>
              <Field>
                <p className='text-left'>Bill from</p>
                <FieldLabel htmlFor='fromstreetaddress'>
                  Street Address
                </FieldLabel>
                <Input
                  id='fromstreetaddress'
                  type='text'
                  placeholder='10 London street'
                  required
                />
              </Field>
              <FieldGroup className='grid grid-cols-3'>
                <Field>
                  <FieldLabel htmlFor='fromcity'>city</FieldLabel>
                  <Input
                    id='fromcity'
                    type='text'
                    placeholder='London'
                    required
                  />
                </Field>
                <Field>
                  <FieldLabel htmlFor='frompostcode'>Post Code</FieldLabel>
                  <Input
                    id='frompostcode'
                    type='text'
                    placeholder='LU3 2SJ'
                    required
                  />
                </Field>
                <Field>
                  <FieldLabel htmlFor='fromcountry'>Country</FieldLabel>
                  <Input
                    id='fromcountry'
                    type='text'
                    placeholder='United kingdom'
                    required
                  />
                </Field>
              </FieldGroup>
            </FieldGroup>

            <FieldGroup>
              <p className='text-left'>Bill To</p>
              <Field>
                <FieldLabel htmlFor='clientname'>Client's name</FieldLabel>
                <Input
                  id='clientname'
                  type='text'
                  placeholder='Jane Doe'
                  required
                />
              </Field>
              <Field>
                <FieldLabel htmlFor='email'> Client's Email</FieldLabel>
                <Input
                  id='email'
                  type='email'
                  placeholder='m@example.com'
                  required
                />
              </Field>
              <Field>
                <FieldLabel htmlFor='fromstreetaddress'>
                  Street Address
                </FieldLabel>
                <Input
                  id='fromstreetaddress'
                  type='text'
                  placeholder='10 London street'
                  required
                />
              </Field>

              <FieldGroup className='grid grid-cols-2 md:grid-cols-3'>
                <Field>
                  <FieldLabel htmlFor='fromcity'>City</FieldLabel>
                  <Input
                    id='fromcity'
                    type='text'
                    placeholder='London'
                    required
                  />
                </Field>
                <Field>
                  <FieldLabel htmlFor='frompostcode'>Post Code</FieldLabel>
                  <Input
                    id='frompostcode'
                    type='text'
                    placeholder='LU3 2SJ'
                    required
                  />
                </Field>
                <Field className='col-span-full md:col-span-1'>
                  <FieldLabel htmlFor='fromcountry'>Country</FieldLabel>
                  <Input
                    id='fromcountry'
                    type='text'
                    placeholder='United kingdom'
                    required
                  />
                </Field>
              </FieldGroup>
            </FieldGroup>

            <FieldGroup className='grid grid-cols-2 items center'>
              <Field>
                <FormCalender />
              </Field>

              <Field>
                <FieldLabel htmlFor='term'>Payment Terms</FieldLabel>
                <Select>
                  <SelectTrigger className=''>
                    <SelectValue placeholder='Term' />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Term</SelectLabel>
                      <SelectItem value='apple'>Apple</SelectItem>
                      <SelectItem value='banana'>Banana</SelectItem>
                      <SelectItem value='blueberry'>Blueberry</SelectItem>
                      <SelectItem value='grapes'>Grapes</SelectItem>
                      <SelectItem value='pineapple'>Pineapple</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </Field>
            </FieldGroup>
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor='description'>Description</FieldLabel>
                <Input
                  id='description'
                  type='text'
                  placeholder='Description'
                  required
                />
              </Field>

              <p className='text-left mb-6'>ItemList</p>
              {/* <FieldGroup className='grid grid-cols-4 items-center md:grid-cols-5 '>
                <Field className='col-span-full md:col-span-1'>
                  <FieldLabel htmlFor='itemname'>Item Name</FieldLabel>
                  <Input
                    id='quantity'
                    type='text'
                    placeholder='e.g Brand guidelines'
                    required
                  />
                </Field>

                <Field>
                  <FieldLabel htmlFor='quantity'>Qty</FieldLabel>
                  <Input id='quantity' type='text' placeholder='1' required />
                </Field>

                <Field>
                  <FieldLabel htmlFor='price'>Price</FieldLabel>
                  <Input
                    id='price'
                    type='text'
                    placeholder='e.g £100'
                    required
                  />
                </Field>

                <Field>
                  <FieldLabel htmlFor='total'>Total</FieldLabel>
                  <Input
                    id='total'
                    type='text'
                    placeholder='1800'
                    disabled
                    className='border-none'
                  />
                </Field>
                <div>
                  <p className='text-transparent'>fdfdf</p>
                  <div>
                    <Button variant='ghost' size='icon'>
                      <Trash />
                    </Button>
                  </div>
                  {inputArray.map((input) => (
                    <div>
                      <Button variant='ghost' size='icon'>
                        <Trash />
                      </Button>
                    </div>
                  ))}
                </div>
              </FieldGroup> */}
              {/* <Button
                className='rounded-3xl'
                variant={'outline'}
                onClick={handleAddInput}>
                + Add New Item
              </Button> */}
            </FieldGroup>
          </FieldGroup>
          {/* <Table>
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
              <TableRow>
                <TableCell>
                  <Input
                    id='quantity'
                    type='text'
                    placeholder='e.g Brand guidelines'
                    required
                  />
                </TableCell>
                <TableCell>
                  <Input id='quantity' type='text' placeholder='1' required />
                </TableCell>
                <TableCell>
                  <Input
                    id='price'
                    type='text'
                    placeholder='e.g £100'
                    required
                  />
                </TableCell>
                <TableCell>
                  {' '}
                  <Input
                    id='total'
                    type='text'
                    placeholder='1800'
                    disabled
                    className='border-none'
                  />
                </TableCell>
                <TableCell>
                  <div>
                    <Button variant='ghost' size='icon'>
                      <Trash />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
              {inputArray.map((input) => (
                <RowInput />
              ))}
            </TableBody>
          </Table> */}
          <article>
            <div className='grid grid-cols-8 items-center text-left gap-x-2 gap-y-6 mb-6'>
              <div className='col-span-full md:col-span-3'>
                <p className='mb-2'>Item Name</p>
                <Input
                  id='quantity'
                  type='text'
                  placeholder='e.g Brand guidelines'
                  required
                />
              </div>

              <div className='col-span-2 md:col-span-1'>
                <p className='mb-2'>Qty</p>
                <Input id='quantity' type='text' placeholder='1' required />
              </div>
              <div className='col-span-3 md:col-span-1'>
                <p className='mb-2'>Price</p>
                <Input id='price' type='text' placeholder='e.g £100' required />
              </div>
              <div className='col-span-2'>
                <p className='mb-2'>Total</p>
                <Input
                  id='total'
                  type='text'
                  placeholder='1800'
                  disabled
                  className='border-none'
                />
              </div>
              <div className='text-right'>
                <p className='opacity-0 mb-2'>Name</p>
                <Button variant='ghost' size='icon'>
                  <Trash />
                </Button>
              </div>
            </div>
            {inputArray.map((item, index) => (
              <RowInput index={index} />
            ))}
          </article>

          <div className='w-full'>
            <Button
              className='rounded-3xl  block w-full'
              variant={'outline'}
              onClick={handleAddInput}>
              + Add New Item
            </Button>
          </div>
          <div className='flex justify-end gap-x-1 mt-6'>
            <Button className='rounded-3xl'>Cancel</Button>
            <Button className='rounded-3xl' variant='secondary'>
              Save Changes
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default InvoiceForm;
