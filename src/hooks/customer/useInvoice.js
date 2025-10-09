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
          customer { name email }
          company { name }
          creator { name }
          items { name description price }
          discounts { discount_type discount_value }
          reminders { timezone schedule_date message }
          links { link is_active expires_at }
          charities { cause_name value }
          checklistables { checklist { title } }
        }
      }
    }
  }
`;

// Mutation: Create a new invoice with all relations
// const CREATE_INVOICE_MUTATION = `
//   mutation CreateInvoice($input: CreateInvoiceInput!) {
//     createInvoice(
//       title: $input.title,
//       invoice_number: $input.invoice_number,
//       customer_id: $input.customer_id,
//       company_id: $input.company_id,
//       creator_id: $input.creator_id,
//       items: $input.items,
//       discounts: $input.discounts,
//       reminders: $input.reminders,
//       links: $input.links,
//       charities: $input.charities,
//       checklistables: $input.checklistables
//     ) {
//       id
//       title
//       // ...other fields
//     }
//   }
// `;

const CREATE_INVOICE_MUTATION = `
  mutation CreateInvoice($input: CreateInvoiceInput!) {
    createInvoice(input: $input) {
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

const DOWNLOAD_INVOICE_MUTATION = `
  mutation DownloadInvoice($id: ID!) {
    downloadInvoice(id: $id) {
      url
      success
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

  // Mutation: Download invoice
  const downloadInvoice = useMutation({
    mutationFn: async (id) => {
      const { data, errors } = await applogRequest(
        DOWNLOAD_INVOICE_MUTATION,
        { id },
        token
      );
      if (errors) throw new Error(errors[0].message);
      return data.downloadInvoice;
    },
  });

  return {
    ...query,
    createInvoice: create.mutate,
    createInvoiceResult: create,
    sendInvoice: sendInvoice.mutate,
    sendInvoiceResult: sendInvoice,
    downloadInvoice: downloadInvoice.mutate,
    downloadInvoiceResult: downloadInvoice,
  };
}
