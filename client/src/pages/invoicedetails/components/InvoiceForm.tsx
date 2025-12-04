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
const InvoiceForm = ({
  heading,
  onChange,
  onAddInput,
  inputArray,
  onChangeInputArray,
  value,
  setInputArray,
  onHandleSelectChange,
  invoiceData,
  onSubmit,
  onSendDate,
}) => {
 

  return (
    <Card className='col-span-12 md:col-span-10'>
      <CardHeader>
        <CardTitle className='text-left'>{heading || 'Edit #RT3080'}</CardTitle>
      </CardHeader>
      <CardContent>
        <form>
          <FieldGroup>
            <FieldGroup>
              <Field>
                <p className='text-left'>Bill from</p>
                <FieldLabel htmlFor='supplierStreet'>Street Address</FieldLabel>
                <Input
                  id='supplierStreet'
                  type='text'
                  placeholder='10 London street'
                  required
                  onChange={onChange}
                  name='supplierStreet'
                  value={value}
                />
              </Field>
              <FieldGroup className='grid grid-cols-3'>
                <Field>
                  <FieldLabel htmlFor='fromcity'>city</FieldLabel>
                  <Input
                    id='supplierCity'
                    type='text'
                    placeholder='London'
                    required
                    onChange={onChange}
                    name='supplierCity'
                    value={value}
                  />
                </Field>
                <Field>
                  <FieldLabel htmlFor='supplierPostcode'>Post Code</FieldLabel>
                  <Input
                    id='supplierPostcode'
                    type='text'
                    placeholder='LU3 2SJ'
                    required
                    onChange={onChange}
                    name='supplierPostcode'
                  />
                </Field>
                <Field>
                  <FieldLabel htmlFor='supplierCountry'>Country</FieldLabel>
                  <Input
                    id='supplierCountry'
                    type='text'
                    placeholder='United kingdom'
                    required
                    onChange={onChange}
                    name='supplierCountry'
                  />
                </Field>
              </FieldGroup>
            </FieldGroup>

            <FieldGroup>
              <p className='text-left'>Bill To</p>
              <Field>
                <FieldLabel htmlFor='fullname'>Client's name</FieldLabel>
                <Input
                  id='fullname'
                  type='text'
                  placeholder='Jane Doe'
                  required
                  onChange={onChange}
                  name='fullname'
                />
              </Field>
              <Field>
                <FieldLabel htmlFor='email'> Client's Email</FieldLabel>
                <Input
                  id='email'
                  type='email'
                  placeholder='m@example.com'
                  required
                  onChange={onChange}
                  name='email'
                />
              </Field>
              <Field>
                <FieldLabel htmlFor='customerStreet'>Street Address</FieldLabel>
                <Input
                  id='customerStreet'
                  type='text'
                  placeholder='10 London street'
                  required
                  onChange={onChange}
                  name='customerStreet'
                />
              </Field>

              <FieldGroup className='grid grid-cols-2 md:grid-cols-3'>
                <Field>
                  <FieldLabel htmlFor='customerCity'>City</FieldLabel>
                  <Input
                    id='customerCity'
                    type='text'
                    placeholder='London'
                    required
                    onChange={onChange}
                    name='customerCity'
                  />
                </Field>
                <Field>
                  <FieldLabel htmlFor='customerPostcode'>Post Code</FieldLabel>
                  <Input
                    id='customerPostcode'
                    type='text'
                    placeholder='LU3 2SJ'
                    required
                    onChange={onChange}
                    name='customerPostcode'
                  />
                </Field>
                <Field className='col-span-full md:col-span-1'>
                  <FieldLabel htmlFor='customerCountry'>Country</FieldLabel>
                  <Input
                    id='customerCountry'
                    type='text'
                    placeholder='United kingdom'
                    required
                    onChange={onChange}
                    name='customerCountry'
                  />
                </Field>
              </FieldGroup>
            </FieldGroup>

            <FieldGroup className='grid grid-cols-2 items center'>
              <Field>
                <FormCalender onSendDate={onSendDate} />
              </Field>

              <Field>
                <FieldLabel htmlFor='term'>Payment Terms</FieldLabel>
                <Select
                  onValueChange={onHandleSelectChange}
                  name='term'
                  value={invoiceData.term}>
                  <SelectTrigger className=''>
                    <SelectValue placeholder='Term' />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Term</SelectLabel>
                      <SelectItem value='7'>Next 7 Days</SelectItem>
                      <SelectItem value='14'>Next 14 Days</SelectItem>
                      <SelectItem value='21'>Next 21 Days</SelectItem>
                      <SelectItem value='30'>Next 30 Days</SelectItem>
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
                  onChange={onChange}
                  name='description'
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
                  id='name'
                  type='text'
                  placeholder='e.g Brand guidelines'
                  required
                  onChange={onChange}
                  name='name'
                />
              </div>

              <div className='col-span-2 md:col-span-1'>
                <p className='mb-2'>Qty</p>
                <Input
                  id='quantity'
                  type='text'
                  placeholder='1'
                  required
                  name='quantity'
                  onChange={onChange}
                />
              </div>
              <div className='col-span-3 md:col-span-1'>
                <p className='mb-2'>Price</p>
                <Input
                  id='price'
                  type='text'
                  placeholder='e.g £100'
                  required
                  name='price'
                  onChange={onChange}
                />
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
              <RowInput
                index={index}
                key={`rowIndex${index}`}
                onChange={(e) => onChangeInputArray(index, e.target.value)}
                inputArray={inputArray}
                setInputArray={setInputArray}
              />
            ))}
          </article>

          <div className='w-full'>
            <Button
              className='rounded-3xl  block w-full'
              variant={'outline'}
              onClick={onAddInput}>
              + Add New Item
            </Button>
          </div>
          <div className='flex justify-end gap-x-1 mt-6'>
            <Button className='rounded-3xl'>Cancel</Button>
            <Button
              className='rounded-3xl'
              variant='secondary'
              onClick={onSubmit}>
              Save Changes
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default InvoiceForm;
