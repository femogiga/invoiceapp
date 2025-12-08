import * as React from 'react';

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';


interface IAppSelect {
  onChange: (value:string) => void;
}
 const AppSelect:React.FC<IAppSelect> = ({onChange})=> {
  return (
    <Select onValueChange={(value) => onChange(value)}>
      <SelectTrigger className='w-[100px]'>
        <SelectValue placeholder='Filter by status' />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Filter by status</SelectLabel>
          <SelectItem value='PENDING'>Pending</SelectItem>
          <SelectItem value='PAID'>Paid</SelectItem>
          <SelectItem value='DRAFT'>Draft</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}


export default AppSelect
