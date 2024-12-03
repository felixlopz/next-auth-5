import { Hono } from "hono";

import { verifyAuth } from "@/lib/auth/hono";

// const authMiddlerware = createMiddleware(async (c, next) => {
//   const session = await auth();
//   console.log("auth middleware");
//   console.log(session);

//   await next();
// });

const app = new Hono()
  .get("hello-authorized", verifyAuth(), async (c) => {
    return c.json({ msg: "Hello Authorized user" });
  })
  .get("hello", async (c) => {
    return c.json({ msg: "Hello Unathorized user" });
  });

export default app;
