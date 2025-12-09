import { AppSidebar } from '@/components/app-sidebar';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { Separator } from '@/components/ui/separator';
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from '@/components/ui/sidebar';
import { Donut, Moon, Sun } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useForm, type SubmitHandler } from 'react-hook-form';

import Logo from '../../assets/logo.svg';
import { useTheme } from '../providers/ThemeProvider';
import { Button } from '../ui/button';
import {
  Menubar,
  MenubarCheckboxItem,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarRadioGroup,
  MenubarRadioItem,
  MenubarSeparator,
  MenubarShortcut,
  MenubarSub,
  MenubarSubContent,
  MenubarSubTrigger,
  MenubarTrigger,
} from '@/components/ui/menubar';
import { Link } from 'react-router-dom';
const HeaderSidebar = () => {
  const { theme, setTheme } = useTheme();
  // console.log(theme);
  const handleThemeChange = () => {
    if (theme === 'dark') {
      setTheme('light');
    }
    if (theme === 'light') {
      setTheme('dark');
    }
  };
  return (
    <Menubar className=' flex justify-between shadow-none max-w-full min-h-max md:flex-col md:h-dvh  md:max-w-max  col-start-1 col-end-12 md:col-span-1 md:sticky top-[.1rem]  bottom-0'>
      <Link to="invoices" className='bg-red-500 rounded-e-4xl'>
        <img src={Logo} className='p-4 ' />
      </Link>
      <div className='flex items-center gap-x-8 md:flex-col md:gap-y-8'>
        <div>
          <Button size='icon' onClick={handleThemeChange}>
            {theme === 'dark' ? <Sun /> : <Moon />}
          </Button>
        </div>
        <Button
          size='icon'
          className='border-none rounded-3xl cursor-pointer'
          variant={'ghost'}>
          <Avatar>
            <AvatarImage src='https://github.com/shadcn.png' alt='@shadcn' />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </Button>
      </div>
    </Menubar>
  );
};

export default HeaderSidebar;
