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
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export const DeleteDialog = () =>{
  return (
    <Dialog >
      <form>
        <DialogTrigger asChild>
          <Button variant='destructive'>Delete</Button>
        </DialogTrigger>
        <DialogContent className='sm:max-w-[425px]'>
          <DialogHeader>
            <DialogTitle>Delete invoice</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete invoice.Any deletion is irrecoverable.
            </DialogDescription>
          </DialogHeader>

          <DialogFooter>
            <DialogClose asChild>
              <Button variant='outline'>Cancel</Button>
            </DialogClose>
            <Button type='submit' variant="destructive">Delete</Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  );
}
 export default DeleteDialog;
