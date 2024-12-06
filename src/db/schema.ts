import { pgTable, text, varchar, pgEnum, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";

export const userRole = pgEnum("role", ["user", "admin"]);

export const users = pgTable("users", {
  id: text("id").primaryKey().notNull(), // UUID or other unique identifier
  name: varchar("name", { length: 100 }).notNull(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  password: varchar("password", { length: 255 }).notNull(),
  role: userRole().default("user").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(), // Default timestamp
});

export const insertUserSchema = createInsertSchema(users, {
  email: (schema) => schema.email.email(),
  password: (schema) =>
    schema.password.min(8, "Password must be at least 8 characters long."),
});

// Schema for selecting a user - can be used to validate API responses
export const selectUserSchema = createSelectSchema(users);
