'use server';

import { createSession, deleteSession } from '@/lib/auth';
import prisma from '@/lib/prisma';
import { FormResponse, LoginProps } from '@/lib/types';
import { User } from '@prisma/client';
import { compare, hash } from 'bcrypt-ts';
import { revalidatePath } from 'next/cache';

type CreateUserProps = Omit<User, 'id' | 'createdAt' | 'updatedAt'>;

export const register = async ({
  name,
  email,
  password,
}: CreateUserProps): Promise<FormResponse> => {
  try {
    // 1. Check if user already exists
    const userExists = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (userExists) {
      return { message: 'User already exists', type: 'error' };
    }

    // 2. Hash the password and create the user
    const hashedPassword = await hash(password, 10);

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });

    if (!user) {
      return { message: 'Error creating user', type: 'error' };
    }

    // 3. Create the session
    await createSession({
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      },
    });
    revalidatePath('/');
    return { message: 'Success', type: 'success' };
  } catch (error) {
    return { message: `Error: ${error}`, type: 'error' };
  }
};

export const login = async ({
  email,
  password,
}: LoginProps): Promise<FormResponse> => {
  try {
    // 1. Check if user already exists
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) {
      return { message: 'User does not exist', type: 'error' };
    }

    // 2. Hash the password and create the user
    const hashedPassword = await compare(password, user.password);

    if (!hashedPassword) {
      return { message: 'Invalid credentials', type: 'error' };
    }

    // 3. Create the session
    await createSession({
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      },
    });
    revalidatePath('/');
    return { message: 'Success', type: 'success' };
  } catch (error) {
    return { message: `Error: ${error}`, type: 'error' };
  }
};

export const logout = async (): Promise<FormResponse> => {
  'use server';
  await deleteSession();
  revalidatePath('/');
  return { message: 'Success', type: 'success' };
};
