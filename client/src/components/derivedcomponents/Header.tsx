import { Hamburger, Handbag, Menu, Search } from 'lucide-react';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  const [navMenuVisible, setNavMenuVisible] = useState(false);

  const handleNavMenuVisibility = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    setNavMenuVisible(!navMenuVisible);
  };
  return (
    <header className=' flex justify-between items-center relative'>
      <h1 className='sitetitle text-3xl font-bold'>Sonnette</h1>
      {navMenuVisible && (
        <nav
          className={`navigation  absolute right-0 -bottom-52 z-5  md:relative md:bottom-[initial] `}>
          <ul className='grid gap-y-4 shadow-sm p-4 rounded-sm md:flex Md:justify-between md:gap-x-4 md:items-center md:shadow-none p-0'>
            <li className='nav'>
              <Link to=''>Explore</Link>
            </li>
            <li className='nav'>
              <Link to=''>Bedroom</Link>
            </li>
            <li className='nav'>
              <Link to=''>Sleepwear</Link>
            </li>
            <li className='nav'>
              <Link to=''>Blog</Link>
            </li>
            <li className='nav'>
              <Link to=''>Abouts us</Link>
            </li>
          </ul>
        </nav>
      )}

      <div className='flex justify-between gap-x-4'>
        <Link to=''>
          <span className='hidden md:block'>Search</span>
          <Search className='block md:hidden' />
        </Link>
        <Link to='' className='flex gap-x-2'>
          <span className='hidden md:block'>Bag</span>
          <Handbag className='' />
        </Link>
        <Link to='#' onClick={handleNavMenuVisibility} className='flex gap-x-2'>
          <Menu className='block md:hidden' />
        </Link>
      </div>
    </header>
  );
};

export default Header;
