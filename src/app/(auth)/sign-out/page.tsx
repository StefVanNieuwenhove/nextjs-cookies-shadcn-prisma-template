import { NavLink } from '@/components/navigation';
import { H3, P } from '@/components/typography';
import React from 'react';

const LogoutPage = () => {
  return (
    <>
      <H3>You have been logged out</H3>
      <P>
        Go to{' '}
        <span>
          <NavLink
            href='/'
            name='Home'
            variant={'default'}
            className='underline'
          />
        </span>
      </P>
    </>
  );
};

export default LogoutPage;
