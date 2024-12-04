import { pgTable, text, varchar, pgEnum } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";

export const userRole = pgEnum("role", ["user", "admin"]);

export const users = pgTable("users", {
  id: text("id").primaryKey().notNull(), // UUID or other unique identifier
  name: varchar("name", { length: 100 }).notNull(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  password: varchar("password", { length: 255 }).notNull(),
  role: userRole().default("user").notNull(),
  createdAt: text("created_at").default("now()").notNull(), // Default timestamp
});

export const insertUserSchema = createInsertSchema(users, {
  email: (schema) => schema.email.email(),
  password: (schema) =>
    schema.password.min(4, "Password must be at least 4 characters long."),
});
