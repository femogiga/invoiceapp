import React from 'react';

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
} from "@/components/ui/button-group"

const InvoiceForm = () => {
  return (
    <Card className='col-span-12 md:col-span-10'>
      <CardHeader>
        <CardTitle className='text-left'>Edit #RT3080</CardTitle>
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

              <p className='text-left'>ItemList</p>
              <FieldGroup className='grid grid-cols-4 items-center md:grid-cols-5 '>
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
                  <Button variant='ghost' size='icon'>
                    <Trash />
                  </Button>
                </div>
              </FieldGroup>
              <Button className='rounded-3xl' variant={'outline'}>
                + Add New Item
              </Button>
            </FieldGroup>
          </FieldGroup>

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
