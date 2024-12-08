import { createEnv } from '@t3-oss/env-nextjs';
import { z } from 'zod';

export const env = createEnv({
  server: {
    DATABASE_URL: z.string().url(),
    NODE_ENV: z.enum(['development', 'test', 'production']),
    SESSION_SECRET: z.string().min(1),
    TOKEN_NAME: z.string().min(1),
    SALT_ROUNDS: z.string().min(1),
  },
  client: {},
  runtimeEnv: {
    NODE_ENV: process.env.NODE_ENV,
    DATABASE_URL: process.env.DATABASE_URL,
    SESSION_SECRET: process.env.SESSION_SECRET,
    TOKEN_NAME: process.env.TOKEN_NAME,
    SALT_ROUNDS: process.env.SALT_ROUNDS,
  },
});

// default env values
//NODE_ENV='development'
//DATABASE_URL=postgresql://postgres:example@localhost:5432/postgres
