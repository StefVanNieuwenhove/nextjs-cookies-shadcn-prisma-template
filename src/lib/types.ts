import { User } from '@prisma/client';

export type FormResponse = {
  message: string;
  type: 'success' | 'error';
};

export type CreateUserProps = Omit<User, 'id' | 'createdAt' | 'updatedAt'>;
export type UserSession = Omit<User, 'password'>;

export type SessionPayload = {
  user: UserSession;
};

export type VerifySession = {
  user: UserSession | null;
  isAuth: boolean;
};

export type LoginProps = {
  email: string;
  password: string;
};

export type ForgotPasswordProps = {
  email: string;
  password: string;
};
