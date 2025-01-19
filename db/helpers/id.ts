import { varchar } from "drizzle-orm/pg-core";
import { createId } from "@paralleldrive/cuid2";

export const ID_LENGTH = 24;

export function cuid<Name extends string>(name: Name) {
  return varchar(name, { length: ID_LENGTH })
    .primaryKey()
    .$defaultFn(() => createId());
}
