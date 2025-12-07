import { useDeleteInvoice } from '@/api/invoices';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { useState } from 'react';

import { useNavigate, useParams } from 'react-router-dom';

export const DeleteDialog = () => {
  const params = useParams();
  const invoiceId = params.id || '';
  const navigate = useNavigate();
  const { mutate, isSuccess, isError, error, reset, isPending } =
    useDeleteInvoice(invoiceId);
  const [message, setMessage] = useState<string>('');

  const handleDeleteInvoice = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    mutate(invoiceId, {
      onSuccess: (data) => {
        setTimeout(() => navigate('/invoices'), 3000);
        setMessage(data.message);
      },
      onError: (error) => {
        setMessage(' domething went wrong ! Delete was not successfull');
      },
    });
  };
  return (
    <Dialog>
      <form>
        <DialogTrigger asChild>
          <Button variant='destructive'>Delete</Button>
        </DialogTrigger>
        <DialogContent className='sm:max-w-[425px]'>
          <DialogHeader>
            <DialogTitle>Delete invoice</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete invoice.Any deletion is
              irrecoverable.
            </DialogDescription>
          </DialogHeader>

          <DialogFooter>
            <DialogClose asChild>
              <Button variant='outline'>Cancel</Button>
            </DialogClose>
            <Button
              type='submit'
              variant='destructive'
              disabled={isPending ? true : false}
              onClick={handleDeleteInvoice}>
              Delete
            </Button>
          </DialogFooter>
          <p>{message}</p>
        </DialogContent>
      </form>
    </Dialog>
  );
};
export default DeleteDialog;
