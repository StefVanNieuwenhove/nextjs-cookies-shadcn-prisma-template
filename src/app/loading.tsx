import { Spinner } from '@/components/loaders';
import React from 'react';

const loading = () => {
  return (
    <main className='flex w-full min-h-screen items-center justify-center'>
      <Spinner />;
    </main>
  );
};

export default loading;
