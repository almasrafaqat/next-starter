import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { applogRequest } from "@/lib/applog";
import { useSession } from "next-auth/react";

// Query: Fetch invoices for all companies of the logged-in user
const USER_COMPANIES_INVOICES_QUERY = `
  query {
    me {
      id
      name
      companies {
        id
        name
        invoices {
          id
          title
          invoice_number
          currency
          balance_due
          amount_paid
          payment_status
          status
          date

          customer { id name email address phone company credit_balance cc bcc }
          company { id name }
          creator { id name }
          items { id name description price quantity total is_discounted is_excluded_invoice_discount is_taxed is_excluded_invoice_taxed
           discounts {
              id
              discount_type
              discount_value
              discount_name
              discount_amount
            }}
          discounts { id discount_type discount_value discount_name }
          taxes { id tax_type tax_value tax_name tax_amount }
          reminders { id timezone schedule_date message }
          links { id link is_active expires_at }
          charities { id cause_name value }
          checklistables { id checklist { title } }
        }
      }
    }
  }
`;

const CREATE_INVOICE_MUTATION = `
  mutation CreateInvoice($input: CreateInvoiceInput!) {
    createInvoice(input: $input) {
      title
     
    }
  }
`;

const UPDATE_INVOICE_MUTATION = `
  mutation UpdateInvoice($id: ID!, $input: CreateInvoiceInput!) {
    updateInvoice(id: $id, input: $input) {
      id
      title
    }
  }
`;

const SEND_INVOICE_MUTATION = `
  mutation SendInvoice($id: ID!) {
    sendInvoice(id: $id) {
      message
      success
    }
  }
`;

const DUPLICATE_INVOICE_MUTATION = `
  mutation DuplicateInvoice($id: ID!) {
    duplicateInvoice(id: $id) {
      id
      title
    }
  }
`;

const DELETE_INVOICE_MUTATION = `
  mutation DeleteInvoice($id: ID!) {
    deleteInvoice(id: $id)
  }
`;

// Define the SEARCH_CUSTOMERS_QUERY
const SEARCH_CUSTOMERS_QUERY = `
  query SearchCustomers($query: String!, $companyId: ID!, $userId: ID!) {
    searchCustomers(query: $query, companyId: $companyId, userId: $userId) {
      id
      name
      email
      company
      phone
      address
      credit_balance
      cc
      bcc
    }
  }
`;

export function useInvoice(options = {}) {
  const { data: session } = useSession();
  const token = session?.accessToken;
  const queryClient = useQueryClient();
  const queryKey = ["user-companies-invoices", token];

  // Query: Fetch invoices
  const query = useQuery({
    queryKey: queryKey,
    queryFn: async () => {
      const { data, errors } = await applogRequest(
        USER_COMPANIES_INVOICES_QUERY,
        undefined,
        token
      );
      if (errors) throw new Error(errors[0].message);
      return data.me;
    },
    enabled: !!token,
    ...options,
  });

  // Mutation: Create invoice
  const create = useMutation({
    mutationFn: async (args) => {
      console.log("Creating invoice with args:", args);
      const { data, errors } = await applogRequest(
        CREATE_INVOICE_MUTATION,
        { input: args },
        token
      );
      if (errors) throw new Error(errors[0].message);
      console.log("Invoice created successfully:", data.createInvoice);
      return data.createInvoice;
    },
    onSuccess: () => {
      queryClient.invalidateQueries([queryKey]);
    },
    onError: (error) => {
      // Optionally show a toast or notification here
    },
  });

  // Mutation: Send invoice
  const sendInvoice = useMutation({
    mutationFn: async (id) => {
      const { data, errors } = await applogRequest(
        SEND_INVOICE_MUTATION,
        { id },
        token
      );
      if (errors) throw new Error(errors[0].message);
      return data.sendInvoice;
    },
  });

  // Mutation: Delete invoice
  const deleteInvoice = useMutation({
    mutationFn: async (id) => {
      const { data, errors } = await applogRequest(
        DELETE_INVOICE_MUTATION,
        { id },
        token
      );
      if (errors) throw new Error(errors[0].message);
      return data.deleteInvoice;
    },
    onSuccess: () => {
      queryClient.invalidateQueries([queryKey]);
    },
    onError: (error) => {
      // Optionally show a toast or notification here
    },
  });

  // Mutation: Update invoice
  const updateInvoice = useMutation({
    mutationFn: async ({ id, args }) => {
      console.log("Updating invoice with args:", { id, args });
      const { data: resp, errors } = await applogRequest(
        UPDATE_INVOICE_MUTATION,
        { id, input: args },
        token
      );
      if (errors) throw new Error(errors[0].message);
      return resp.updateInvoice;
    },
    onSuccess: () => {
      queryClient.invalidateQueries([queryKey]);
    },
    onError: (error) => {
      // Optionally show a toast or notification here
    },
  });

  // Mutation: Duplicate invoice
  const duplicateInvoice = useMutation({
    mutationFn: async (id) => {
      console.log("Duplicating invoice with id:", id);
      const { data, errors } = await applogRequest(
        DUPLICATE_INVOICE_MUTATION,
        { id },
        token
      );
      if (errors) throw new Error(errors[0].message);
      return data.duplicateInvoice;
    },
    onSuccess: () => {
      queryClient.invalidateQueries([queryKey]);
    },
    onError: (error) => {
      // Optionally show a toast or notification here
    },
  });

  return {
    ...query,
    createInvoice: create.mutate,
    createInvoiceResult: create,
    updateInvoice: updateInvoice.mutate,
    updateInvoiceResult: updateInvoice,
    sendInvoice: sendInvoice.mutate,
    sendInvoiceResult: sendInvoice,
    deleteInvoice: deleteInvoice.mutate,
    deleteInvoiceResult: deleteInvoice,
    duplicateInvoice: duplicateInvoice.mutate,
    duplicateInvoiceResult: duplicateInvoice,
  };
}

// Add the useSearchCustomers function
export function useSearchCustomers(query, companyId,  options = {}) {
  const { data: session } = useSession();
  const userId = session?.user?.id;
  const token = session?.accessToken;

  // Query: Search customers
  const searchQuery = useQuery({
    queryKey: ["search-customers", query, companyId, userId],
    queryFn: async () => {
      const { data, errors } = await applogRequest(
        SEARCH_CUSTOMERS_QUERY,
        { query, companyId, userId },
        token
      );
      if (errors) throw new Error(errors[0].message);
      return data.searchCustomers;
    },
    enabled: !!token && !!query, // Only run the query if token and query are available
    ...options,
  });

  return {
    ...searchQuery,
    searchCustomers: searchQuery.refetch, // Optionally expose refetch for manual triggering
  };
}
