import { env } from '@zod/env'
import type { Config } from 'drizzle-kit'
export default {
  dbCredentials: {
    url: env.DATABASE_URL,
  },
  dialect: 'postgresql',
  schema: 'src/database/schemas/*',
  out: 'src/database/migrations',
} satisfies Config
