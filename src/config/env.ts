import 'dotenv/config';
import { treeifyError, z } from 'zod';

export const envSchema = z
  .object({
    PORT: z
      .string()
      .min(1, 'PORT is required')
      .transform((val) => Number(val)),
    ALLOWED_ORIGINS: z
      .string()
      .min(1, 'ALLOWED_ORIGINS is required')
      .transform((val) => val.split(',').map((origin) => origin.trim())),
    POSTGRES_USER: z.string().min(1, 'POSTGRES_USER is required'),
    POSTGRES_PASSWORD: z.string().min(1, 'POSTGRES_PASSWORD is required'),
    POSTGRES_DB: z.string().min(1, 'POSTGRES_DB is required'),
    DATABASE_URL: z.string().min(1, 'DATABASE_URL is required'),

    REFRESH_TOKEN_SECRET: z.string().min(1, 'REFRESH_TOKEN_SECRET is required'),
    REFRESH_TOKEN_EXPIRES: z
      .string()
      .min(1, 'REFRESH_TOKEN_EXPIRES is required'),

    ACCESS_TOKEN_SECRET: z.string().min(1, 'ACCESS_TOKEN_SECRET is required'),
    ACCESS_TOKEN_EXPIRES: z.string().min(1, 'ACCESS_TOKEN_EXPIRES is required'),
  })
  .loose();
type EnvType = z.infer<typeof envSchema>;

const envParsed = envSchema.safeParse(process.env);
if (!envParsed.success) {
  const error = treeifyError(envParsed.error);
  console.error('Invalid environment variables:', JSON.stringify(error));
  throw new Error('Invalid environment variables');
}

export const envs: EnvType = envParsed.data;
