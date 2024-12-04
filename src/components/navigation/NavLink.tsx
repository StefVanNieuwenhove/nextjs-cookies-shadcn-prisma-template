import React from 'react';
import { Button, ButtonProps } from '../ui/button';
import Link from 'next/link';
import { cn } from '@/lib/utils';

type NavLinkProps = {
  href: string;
  name: string | React.ReactNode;
  variant?: ButtonProps['variant'];
  className?: string;
};

const NavLink = ({
  href,
  name,
  variant = 'default',
  className,
}: NavLinkProps) => {
  return (
    <Button
      asChild
      variant={variant}
      className={cn(className, 'hover:underline')}>
      <Link href={href}>{name}</Link>
    </Button>
  );
};

export default NavLink;
