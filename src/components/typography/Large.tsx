import React from 'react';

const Large = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  return <div className='text-lg font-semibold'>{children}</div>;
};

export default Large;
