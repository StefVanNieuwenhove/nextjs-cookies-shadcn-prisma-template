import React from 'react';

const H4 = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  return (
    <h4 className='scroll-m-20 text-xl font-semibold tracking-tight'>
      {children}
    </h4>
  );
};

export default H4;
