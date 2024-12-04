import { Hono } from "hono";

import { verifyAuth } from "@/lib/auth/hono";

const app = new Hono()
  .get("hello-authorized", verifyAuth(), async (c) => {
    return c.json({ msg: "Hello Authorized user" });
  })
  .get("hello", async (c) => {
    return c.json({ msg: "Hello Unathorized user" });
  });

export default app;
