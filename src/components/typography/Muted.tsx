import React from 'react';

const Muted = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  return <p className='text-sm text-muted-foreground'>{children}</p>;
};

export default Muted;
