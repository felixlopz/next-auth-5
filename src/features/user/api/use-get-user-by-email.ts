import { useQuery } from "@tanstack/react-query";

import { client } from "@/lib/hono";

export const useGetUserByEmail = (email: string) => {
  const query = useQuery({
    enabled: !!email,
    queryKey: ["user", { email }],
    queryFn: async () => {
      const response = await client.api.users[":email"].$get({
        param: { email },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch user");
      }

      const { data } = await response.json();

      return data;
    },
  });

  return query;
};
