'use client';

import React from 'react';
import { Button } from '../ui/button';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { logout } from '@/data-acces/auth';

const SignOutButton = () => {
  const router = useRouter();
  const handleClick = async () => {
    const response = await logout();

    if (response.type === 'success') {
      toast.success('You have been logged out');
      router.push('/');
    }
  };
  return <Button onClick={handleClick}>Logout</Button>;
};

export default SignOutButton;
