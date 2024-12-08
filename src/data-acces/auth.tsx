'use server';

import { env } from '@/env';
import { createSession, deleteSession } from '@/lib/auth';
import prisma from '@/lib/prisma';
import {
  CreateUserProps,
  ForgotPasswordProps,
  FormResponse,
  LoginProps,
} from '@/lib/types';
import { compare, hash } from 'bcrypt-ts';
import { revalidatePath } from 'next/cache';

const SALT_ROUNDS = parseInt(env.SALT_ROUNDS);

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
    const hashedPassword = await hash(password, SALT_ROUNDS);

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
    return { message: 'Successfully registered', type: 'success' };
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
    return { message: 'Successfully logged in', type: 'success' };
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

export const forgotPassword = async ({
  email,
  password,
}: ForgotPasswordProps): Promise<FormResponse> => {
  try {
    // 1. Check if user already exists
    const userExists = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!userExists) {
      return { message: 'User does not exist', type: 'error' };
    }

    // 2. Hash the password and create the user
    const hashedPassword = await hash(password, SALT_ROUNDS);

    const user = await prisma.user.update({
      where: {
        email,
      },
      data: {
        password: hashedPassword,
      },
    });

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
    return { message: 'Successfully reset password', type: 'success' };
  } catch (error) {
    return { message: `Error: ${error}`, type: 'error' };
  }
};
