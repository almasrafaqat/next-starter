import { useQuery } from "@tanstack/react-query";
import { applogRequest } from "@/lib/applog";
import { useSession } from "next-auth/react";

const ME_QUERY = `
  query {
  myCompanies {
    id
    name
    metas {
      id
      meta_key
      meta_value
    }
    plans {
      id
      name
      metas {
        meta_key
        meta_value
      }
    }
  }
}
`;



export function usePlan(options = {}) {
  const { data: session } = useSession();
  const token = session?.accessToken; // or session?.user?.token, depending on your NextAuth config

  return useQuery({
    queryKey: ["plan", token],
    queryFn: async () => {
      const { data, errors } = await applogRequest(ME_QUERY, undefined, token);
      if (errors) throw new Error(errors[0].message);
      return data.myCompanies;
    },
    enabled: !!token, // only run if token exists
    ...options,
  });
}
