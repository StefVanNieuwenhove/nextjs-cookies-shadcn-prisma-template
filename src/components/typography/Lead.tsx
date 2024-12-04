import React from 'react';

const Lead = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  return <p className='text-xl text-muted-foreground'>{children}</p>;
};

export default Lead;
