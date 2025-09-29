import { GraphQLClient } from "graphql-request";

const endpoint = "http://tijaratplus-admin.test/graphql";

export function getApplogClient(token) {
  return new GraphQLClient(endpoint, {
    credentials: "include",
    headers: token
      ? { Authorization: `Bearer ${token}` }
      : {},
  });
}

// Helper for request with token
export async function applogRequest(query, variables, token) {
  const client = getApplogClient(token);
  try {
    const data = await client.request(query, variables);
    return { data, errors: null };
  } catch (error) {
    return { data: null, errors: error.response?.errors || [error] };
  }
}