import React from 'react';

const Blockquote = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  return (
    <blockquote className='mt-6 border-l-2 pl-6 italic'>{children}</blockquote>
  );
};

export default Blockquote;
