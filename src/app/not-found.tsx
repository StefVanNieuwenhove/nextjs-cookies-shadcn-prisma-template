import { H1 } from '@/components/typography';
import Link from 'next/link';
import React from 'react';

const NotFoundPage = () => {
  return (
    <main className='h-screen container mx-auto flex flex-col justify-center items-center'>
      <H1>Page not found</H1>
      <p>The page you are looking for does not exist.</p>
      <Link href='/'>
        Terug naar{' '}
        <span className='hover:cursor-pointer underline'>homepage</span>
      </Link>
    </main>
  );
};

export default NotFoundPage;
