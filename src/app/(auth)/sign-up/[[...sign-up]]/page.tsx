'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { z } from 'zod';
import { SignUpSchema } from '@/lib/validation';
import { Input } from '@/components/ui/input';
import Link from 'next/link';
import { H2, Small } from '@/components/typography';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { register } from '@/data-acces/user';

const SignUpPage = () => {
  const router = useRouter();
  const form = useForm<z.infer<typeof SignUpSchema>>({
    resolver: zodResolver(SignUpSchema),
    defaultValues: {
      name: 'stef',
      email: 'stef@gmail.com',
      password: 'Stef123!',
      checkPassword: 'Stef123!',
    },
  });

  const handleSubmit = async (data: z.infer<typeof SignUpSchema>) => {
    const response = await register({
      name: data.name,
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
            <H2>Sign up</H2>
          </div>
          <FormField
            control={form.control}
            name='name'
            render={({ field }) => (
              <FormItem className='w-full'>
                <FormLabel>
                  Name <span className='text-red-500'>*</span>
                </FormLabel>
                <FormControl>
                  <Input placeholder='John' autoFocus {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
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
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='checkPassword'
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Repeat password<span className='text-red-500'>*</span>
                </FormLabel>
                <FormControl>
                  <Input
                    type='password'
                    placeholder='**************'
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className='w-full flex space-x-4 pb-3'>
            <Button
              className='w-full border-primary hover:underline'
              variant={'outline'}
              type='reset'
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
            Do you have an account?{' '}
            <span className='text-primary hover:underline hover:cursor-pointer'>
              <Link href={'/sign-in'}>Sign in</Link>
            </span>
          </Small>
        </form>
      </Form>
    </section>
  );
};

export default SignUpPage;
