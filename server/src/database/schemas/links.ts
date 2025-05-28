import { pgTable, text, integer, index, uniqueIndex } from "drizzle-orm/pg-core"
import { uuidv7 } from 'uuidv7'

export const links = pgTable("links", {
  id: text().primaryKey().$defaultFn(() => uuidv7()),
  urlShort: text().notNull(),
  urlDestination: text().notNull(),
  countAccess: integer().default(0).notNull(),
});
