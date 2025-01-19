import { char, pgEnum, pgTable } from "drizzle-orm/pg-core";

export const roleEnum = pgEnum("role", ["coach", "client", "both"]);

export const users = pgTable("users", {
  id: char({ length: 36 }).primaryKey(),
  role: roleEnum(),
});
