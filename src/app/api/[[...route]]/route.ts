import { Hono } from "hono";
import { handle } from "hono/vercel";

// Routes
import user from "./user";
import { initAuthConfig } from "@/lib/auth/hono";

export const runtime = "edge";

const app = new Hono().basePath("/api").use(
  "/*",
  initAuthConfig(() => ({ providers: [] }))
);

const routes = app.route("/users", user);

export const GET = handle(app);
export const POST = handle(app);

export type AppType = typeof routes;
