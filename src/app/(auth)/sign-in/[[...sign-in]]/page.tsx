'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { z } from 'zod';
import { SignInSchema } from '@/lib/validation';
import { Input } from '@/components/ui/input';
import { H2, Small } from '@/components/typography';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { login } from '@/data-acces/user';

const SignInPage = () => {
  const router = useRouter();
  const form = useForm<z.infer<typeof SignInSchema>>({
    resolver: zodResolver(SignInSchema),
    defaultValues: {
      email: 'stef@gmail.com',
      password: 'Stef123!',
    },
  });

  const handleSubmit = async (data: z.infer<typeof SignInSchema>) => {
    const response = await login({
      email: data.email,
      password: data.password,
    });
    console.log(response);
    if (response.type === 'success') {
      toast.success(response.message);
      router.push('/');
    } else {
      toast.error(response.message);
      form.reset();
    }
  };
  return (
    <section className='w-full flex items-center justify-center'>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleSubmit)}
          className='w-full md:max-w-prose border border-primary rounded-md px-10 py-5 space-y-5 h-fit'>
          <div className='w-full flex flex-col items-center justify-center space-y-2 border-b border-primary'>
            <H2>Sign In</H2>
          </div>
          <FormField
            control={form.control}
            name='email'
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Email <span className='text-red-500'>*</span>
                </FormLabel>
                <FormControl>
                  <Input
                    type='email'
                    placeholder='john.doe@gmail.com'
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='password'
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Password <span className='text-red-500'>*</span>
                </FormLabel>
                <FormControl>
                  <Input
                    type='password'
                    placeholder='**************'
                    {...field}
                  />
                </FormControl>
                <FormDescription className='flex justify-end'>
                  <span className='text-primary hover:underline hover:cursor-pointer'>
                    <Link href={'/forgot-password'}>Forgot password?</Link>
                  </span>
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className='w-full flex space-x-4 pb-3'>
            <Button
              className='w-full border-primary hover:underline'
              variant={'outline'}
              type='reset'
              disabled={form.formState.isSubmitting}
              onClick={() => form.reset()}>
              Reset
            </Button>
            <Button
              className='w-full hover:underline'
              type='submit'
              disabled={form.formState.isSubmitting}>
              Submit
            </Button>
          </div>
          <Small>
            Don&apos;t have an account?{' '}
            <span className='text-primary hover:underline hover:cursor-pointer'>
              <Link href={'/sign-up'}>Sign up</Link>
            </span>
          </Small>
        </form>
      </Form>
    </section>
  );
};

export default SignInPage;
