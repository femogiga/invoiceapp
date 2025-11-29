import { Dot } from 'lucide-react';
import React from 'react';

interface StatusBadgeProps {
  status: 'PENDING' | 'PAID';
}
const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
  return (
    <div className='flex justify-center items-center border px-4 text-sm  py-1 gap-x-[0.051rem] bg-green-300/30 max-w-22 rounded-sm'>
      <span>
        <Dot />
      </span>
      <p className='capitalize'>{status?.toLowerCase()}</p>
    </div>
  );
};

export default StatusBadge;
