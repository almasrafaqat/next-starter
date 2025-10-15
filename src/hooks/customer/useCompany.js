import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { applogRequest } from "@/lib/applog";
import { useSession } from "next-auth/react";

// Query: Fetch all companies for the logged-in user
const GET_COMPANIES_QUERY = `
  query {
    myCompanies {
      id
      name
      email
      phone
      address
      website
      tax_number
      registration_number
      country
      state
      city
      zip_code
      description
      language
      currency
      is_active
      is_default
    }
  }
`;

// Query: Fetch a single company
const GET_COMPANY_QUERY = `
  query GetCompany($id: ID!) {
    company(id: $id) {
      id
      name
      email
      phone
      address
      website
      tax_number
      registration_number
      country
      state
      city
      zip_code
      description
      language
      currency
      is_active
      is_default
    }
  }
`;

// Mutation: Create company
const CREATE_COMPANY_MUTATION = `
  mutation CreateCompany($input: CreateCompanyInput!) {
    createCompany(input: $input) {
      success
      message
      company {
        id
        name
        email
        phone
        address
        website
        tax_number
        registration_number
        country
        state
        city
        zip_code
        description
        language
        currency
        is_active
        is_default
      }
    }
  }
`;

// Mutation: Update company
const UPDATE_COMPANY_MUTATION = `
  mutation UpdateCompany($input: UpdateCompanyInput!) {
    updateCompany(input: $input) {
      success
      message
      company {
        id
        name
        email
        phone
        address
        website
        tax_number
        registration_number
        country
        state
        city
        zip_code
        description
        language
        currency
        is_active
        is_default
      }
    }
  }
`;

// Mutation: Delete company
const DELETE_COMPANY_MUTATION = `
  mutation DeleteCompany($id: ID!) {
    deleteCompany(id: $id) {
      success
      message
    }
  }
`;

// Mutation: Set default company
const SET_DEFAULT_COMPANY_MUTATION = `
  mutation SetDefaultCompany($id: ID!) {
    setDefaultCompany(id: $id) {
      success
      message
      company {
        id
        name
        is_default
      }
    }
  }
`;

/**
 * Hook to manage companies with CRUD operations
 * @param {Object} options - Options for the query
 * @returns {Object} - Companies data and mutation functions
 */
export function useCompany(options = {}) {
  const { data: session } = useSession();
  const token = session?.accessToken;
  const queryClient = useQueryClient();
  const queryKey = ["companies", token];

  // Query: Fetch all companies
  const query = useQuery({
    queryKey: queryKey,
    queryFn: async () => {
      const { data, errors } = await applogRequest(
        GET_COMPANIES_QUERY,
        undefined,
        token
      );
      if (errors) throw new Error(errors[0].message);
      return data.myCompanies;
    },
    enabled: !!token,
    ...options,
  });

  // Mutation: Create company
  const create = useMutation({
    mutationFn: async (args) => {
      console.log("Creating company with args:", args);
      const { data, errors } = await applogRequest(
        CREATE_COMPANY_MUTATION,
        { input: args },
        token
      );
      if (errors) throw new Error(errors[0].message);
      console.log("Company created successfully:", data.createCompany);
      return data.createCompany;
    },
    onSuccess: () => {
      queryClient.invalidateQueries([queryKey]);
    },
    onError: (error) => {
      console.error("Error creating company:", error);
    },
  });

  // Mutation: Update company
  const update = useMutation({
    mutationFn: async (args) => {
      console.log("Updating company with args:", args);
      const { data, errors } = await applogRequest(
        UPDATE_COMPANY_MUTATION,
        { input: args },
        token
      );
      if (errors) throw new Error(errors[0].message);
      console.log("Company updated successfully:", data.updateCompany);
      return data.updateCompany;
    },
    onSuccess: () => {
      queryClient.invalidateQueries([queryKey]);
    },
    onError: (error) => {
      console.error("Error updating company:", error);
    },
  });

  // Mutation: Delete company
  const deleteCompany = useMutation({
    mutationFn: async (id) => {
      console.log("Deleting company with id:", id);
      const { data, errors } = await applogRequest(
        DELETE_COMPANY_MUTATION,
        { id },
        token
      );
      if (errors) throw new Error(errors[0].message);
      console.log("Company deleted successfully:", data.deleteCompany);
      return data.deleteCompany;
    },
    onSuccess: () => {
      queryClient.invalidateQueries([queryKey]);
    },
    onError: (error) => {
      console.error("Error deleting company:", error);
    },
  });

  // Mutation: Set default company
  const setDefault = useMutation({
    mutationFn: async (id) => {
      console.log("Setting default company with id:", id);
      const { data, errors } = await applogRequest(
        SET_DEFAULT_COMPANY_MUTATION,
        { id },
        token
      );
      if (errors) throw new Error(errors[0].message);
      console.log("Default company set successfully:", data.setDefaultCompany);
      return data.setDefaultCompany;
    },
    onSuccess: () => {
      queryClient.invalidateQueries([queryKey]);
    },
    onError: (error) => {
      console.error("Error setting default company:", error);
    },
  });

  return {
    ...query,
    companies: query.data || [],
    createCompany: create.mutate,
    createCompanyResult: create,
    updateCompany: update.mutate,
    updateCompanyResult: update,
    deleteCompany: deleteCompany.mutate,
    deleteCompanyResult: deleteCompany,
    setDefaultCompany: setDefault.mutate,
    setDefaultCompanyResult: setDefault,
  };
}

/**
 * Hook to fetch a single company by ID
 * @param {String|Number} id - Company ID
 * @param {Object} options - Options for the query
 * @returns {Object} - Company data
 */
export function useGetCompany(id, options = {}) {
  const { data: session } = useSession();
  const token = session?.accessToken;

  const query = useQuery({
    queryKey: ["company", id, token],
    queryFn: async () => {
      const { data, errors } = await applogRequest(
        GET_COMPANY_QUERY,
        { id },
        token
      );
      if (errors) throw new Error(errors[0].message);
      return data.company;
    },
    enabled: !!token && !!id,
    ...options,
  });

  return {
    ...query,
    company: query.data,
  };
}


