import React from 'react';

const Small = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  return <small className='text-sm font-medium leading-none'>{children}</small>;
};

export default Small;
