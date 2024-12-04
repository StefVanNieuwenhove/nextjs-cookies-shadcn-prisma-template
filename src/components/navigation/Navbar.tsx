import React from 'react';
import { H1 } from '../typography';
import NavLink from './NavLink';
import { getSession } from '@/lib/auth';
import SignOutButton from './SignOutButton';

const Navbar = async () => {
  const { isAuth } = await getSession();
  return (
    <>
      <header className='w-full flex items-center justify-between gap-3 mb-2 py-3 px-6 sticky top-0 z-50 bg-base-100 backdrop-saturate-180 backdrop-blur-xl border-b'>
        <H1>NextJS - Template</H1>
        <nav className='space-x-4'>
          <NavLink name='Home' href='/' />
          {isAuth ? (
            <SignOutButton />
          ) : (
            <NavLink name='Login' href='/sign-in' />
          )}
          {!isAuth && <NavLink name='Sign up' href='/sign-up' />}
        </nav>
      </header>
    </>
  );
};

export default Navbar;
