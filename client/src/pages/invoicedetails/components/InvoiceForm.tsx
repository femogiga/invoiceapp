import React from 'react';

import { Button } from '@/components/ui/button';
import {
  Card,
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

const InvoiceForm = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Edit #RT3080</CardTitle>
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

              <FieldGroup className='grid grid-cols-3'>
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
              
            </FieldGroup>
          </FieldGroup>
        </form>
      </CardContent>
    </Card>
  );
};

export default InvoiceForm;
