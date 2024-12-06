import { hc } from "hono/client";

import { AppType } from "@/app/api/[[...route]]/route";

export const client = hc<AppType>(
  process.env.NODE_ENV === "development" ? process.env.NEXT_PUBLIC_APP_URL! : ""
);
