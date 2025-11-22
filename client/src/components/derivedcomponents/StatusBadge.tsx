import { Dot } from 'lucide-react';
import React from 'react';

const StatusBadge = () => {
  return (
    <div className='flex justify-center items-center border px-8  py-1 gap-x-1 bg-green-300/30 w-20 rounded-sm'>
      <span>
        <Dot />
      </span>
      <span>Paid</span>
    </div>
  );
};

export default StatusBadge;
