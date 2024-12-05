import { Hono } from "hono";

import { getAuthUser, verifyAuth } from "@/lib/auth/hono";

import { zValidator } from "@hono/zod-validator";
import { insertUserSchema, users } from "@/db/schema";
import { db } from "@/db/drizzle";
import { createId } from "@paralleldrive/cuid2";
import z from "zod";
import { eq } from "drizzle-orm";
import { hashUserPassword } from "@/features/user/utils/password";

const app = new Hono()
  .get(
    "/:email",
    zValidator("param", z.object({ email: z.string().email() })),
    async (c) => {
      const { email } = c.req.valid("param");

      if (email == null) {
        return c.json({ error: "Missing email" }, 400);
      }

      const [data] = await db
        .select({ id: users.id, name: users.name })
        .from(users)
        .where(eq(users.email, email));

      if (data == null) {
        return c.json({ error: "Not Found" }, 404);
      }

      return c.json({ data });
    }
  )
  .get("hello-authorized", verifyAuth(), async (c) => {
    const user = await getAuthUser(c);

    return c.json({ msg: `Hello ${user?.token?.name}, Authorized user` });
  })
  .get("hello", async (c) => {
    return c.json({ msg: "Hello Unathorized user" });
  })
  .post(
    "/",
    zValidator(
      "json",
      insertUserSchema.pick({ name: true, email: true, password: true })
    ),
    async (c) => {
      const { email, name, password } = c.req.valid("json");

      // TODO: handler erros
      // 1. duplicated user - 400
      // 2. password strength - 400
      const hashedPassword = hashUserPassword(password);

      const [data] = await db
        .insert(users)
        .values({ id: createId(), name, email, password: hashedPassword })
        .returning();

      return c.json({ data });
    }
  );

export default app;
