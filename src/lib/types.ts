import { User } from '@prisma/client';

export type FormResponse = {
  message: string;
  type: 'success' | 'error';
};

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
