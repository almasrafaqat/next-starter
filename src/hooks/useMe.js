import { useQuery } from "@tanstack/react-query";
import { applogRequest } from "@/lib/applog";
import { useSession } from "next-auth/react";

const ME_QUERY = `
  query Me {
    me {
      id
      name
      email
      language
      email_verified_at
      created_at
      updated_at
      companies {
        id
        name
        plans {
          id
          name
        }
      }
    }
  }
`;

// {
//   "query": "query { me { id name email companies { id name plans { id name } } } }"
// }

export function useMe(options = {}) {
  const { data: session } = useSession();
  console.log("Session:", session?.accessToken);
  const token = session?.accessToken; // or session?.user?.token, depending on your NextAuth config

  return useQuery({
    queryKey: ["me", token],
    queryFn: async () => {
      const { data, errors } = await applogRequest(ME_QUERY, undefined, token);
      if (errors) throw new Error(errors[0].message);
      return data.me;
    },
    enabled: !!token, // only run if token exists
    ...options,
  });
}