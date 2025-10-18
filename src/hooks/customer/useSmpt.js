import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { applogRequest } from "@/lib/applog";
import { useSession } from "next-auth/react";
import { formatSmtpForSubmission } from "@/utils/formatSmtpData";

// Reusable SMTP fields
const SMTP_FIELDS = `
  id
  type
  host
  port
  username
  password
  from_name
  from_email
  encryption
  default
  is_default
  is_active
  created_by
`;

const USER_COMPANIES_SMTP_QUERY = `
  query {
    me {
      id
      name
      companies {
        id
        name
        mailSettings {
          ${SMTP_FIELDS}
        }
      }
    }
  }
`;

/**
  NOTE: Adjust mutation names/types below if your backend differs.
  Names follow your invoice pattern:
    - createCompanyMailSetting(input: CreateCompanyMailSettingInput!)
    - updateCompanyMailSetting(id: ID!, input: UpdateCompanyMailSettingInput!)
    - deleteCompanyMailSetting(id: ID!)
    - setDefaultCompanyMailSetting(id: ID!)
    - toggleActiveCompanyMailSetting(id: ID!, is_active: Boolean!)
*/

const CREATE_SMTP_MUTATION = `
  mutation CreateCompanyMailSetting($input: CreateCompanyMailSettingInput!) {
    createCompanyMailSetting(input: $input) {
      ${SMTP_FIELDS}
    }
  }
`;

const UPDATE_SMTP_MUTATION = `
  mutation UpdateCompanyMailSetting($id: ID!, $input: UpdateCompanyMailSettingInput!) {
    updateCompanyMailSetting(id: $id, input: $input) {
      ${SMTP_FIELDS}
    }
  }
`;

const DELETE_SMTP_MUTATION = `
  mutation DeleteCompanyMailSetting($id: ID!) {
    deleteCompanyMailSetting(id: $id)
  }
`;

const SET_DEFAULT_SMTP_MUTATION = `
  mutation SetDefaultCompanyMailSetting($id: ID!) {
    setDefaultCompanyMailSetting(id: $id) {
      success
      message
    }
  }
`;

const TOGGLE_ACTIVE_SMTP_MUTATION = `
  mutation ToggleActiveCompanyMailSetting($id: ID!, $is_active: Boolean!) {
    toggleActiveCompanyMailSetting(id: $id, is_active: $is_active) {
      success
      message
    }
  }
`;

export function useSmtp(options = {}) {
  const { data: session } = useSession();
  const token = session?.accessToken;
  const queryClient = useQueryClient();
//   const queryKey = ["user-companies-smtp", token];
const queryKey = ["companies", token];

  // Query: Fetch companies + SMTP settings
  const query = useQuery({
    queryKey,
    queryFn: async () => {
      const { data, errors } = await applogRequest(
        USER_COMPANIES_SMTP_QUERY,
        undefined,
        token
      );
      if (errors) throw new Error(errors[0].message);
      return data.me;
    },
    enabled: !!token,
    ...options,
  });

  // Helpers
  const invalidate = () => queryClient.invalidateQueries({ queryKey });

  // Create SMTP
  const createSmtp = useMutation({
    mutationFn: async ({ data, companyId }) => {
      const input = formatSmtpForSubmission(data, companyId);
      const { data: resp, errors } = await applogRequest(
        CREATE_SMTP_MUTATION,
        { input },
        token
      );
      if (errors) throw new Error(errors[0].message);
      return resp.createCompanyMailSetting;
    },
   onSuccess: () => {
      queryClient.invalidateQueries([queryKey]);
    },
  });

  // Update SMTP
  const updateSmtp = useMutation({
    mutationFn: async ({ id, data, companyId }) => {
      const input = formatSmtpForSubmission(data, companyId);
      const { data: resp, errors } = await applogRequest(
        UPDATE_SMTP_MUTATION,
        { id, input },
        token
      );
      if (errors) throw new Error(errors[0].message);
      return resp.updateCompanyMailSetting;
    },
    onSuccess: invalidate,
  });

  // Delete SMTP
  const deleteSmtp = useMutation({
    mutationFn: async (id) => {
      const { data: resp, errors } = await applogRequest(
        DELETE_SMTP_MUTATION,
        { id },
        token
      );
      if (errors) throw new Error(errors[0].message);
      return resp.deleteCompanyMailSetting;
    },
    onSuccess: invalidate,
  });

  // Make Default
  const setDefaultSmtp = useMutation({
    mutationFn: async (id) => {
      const { data: resp, errors } = await applogRequest(
        SET_DEFAULT_SMTP_MUTATION,
        { id },
        token
      );
      if (errors) throw new Error(errors[0].message);
      return resp.setDefaultCompanyMailSetting;
    },
    onSuccess: invalidate,
  });

  // Toggle Active
  const toggleActiveSmtp = useMutation({
    mutationFn: async ({ id, is_active }) => {
      const { data: resp, errors } = await applogRequest(
        TOGGLE_ACTIVE_SMTP_MUTATION,
        { id, is_active },
        token
      );
      if (errors) throw new Error(errors[0].message);
      return resp.toggleActiveCompanyMailSetting;
    },
    onSuccess: invalidate,
  });

  // Selector to get a single company's SMTP list easily
  const getCompanySmtps = (companyId) =>
    query.data?.companies?.find((c) => String(c.id) === String(companyId))
      ?.mailSettings || [];

  return {
    // query
    ...query,
    getCompanySmtps,

    // actions
    createSmtp: createSmtp.mutate,
    createSmtpResult: createSmtp,

    updateSmtp: updateSmtp.mutate,
    updateSmtpResult: updateSmtp,

    deleteSmtp: deleteSmtp.mutate,
    deleteSmtpResult: deleteSmtp,

    setDefaultSmtp: setDefaultSmtp.mutate,
    setDefaultSmtpResult: setDefaultSmtp,

    toggleActiveSmtp: toggleActiveSmtp.mutate,
    toggleActiveSmtpResult: toggleActiveSmtp,
  };
}