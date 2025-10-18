import z from "zod";

// Zod schema for SMTP validation
const smtpSchema = z.object({
  id: z.union([z.string(), z.number()]).optional(), // Auto-increment ID
  
  type: z
    .string()
    .max(50, "Type must be less than 50 characters")
    .nullable()
    .optional(),

  host: z
    .string()
    .min(1, "Host is required")
    .max(255, "Host must be less than 255 characters"),

  port: z
    .union([z.string(), z.number()])
    .transform((val) => (typeof val === "string" ? parseInt(val, 10) : val))
    .refine((val) => val >= 1 && val <= 65535, {
      message: "Port must be between 1 and 65535",
    }),

  username: z
    .string()
    .min(1, "Username is required")
    .max(255, "Username must be less than 255 characters"),

  password: z
    .string()
    .min(1, "Password is required")
    .max(255, "Password must be less than 255 characters"),

  from_name: z
    .string()
    .min(1, "From name is required")
    .max(255, "From name must be less than 255 characters"),

  from_email: z
    .string()
    .email("Invalid email format")
    .min(1, "From email is required")
    .max(255, "From email must be less than 255 characters"),

  encryption: z
    .enum(["ssl", "tls", "none", ""], {
      errorMap: () => ({ message: "Invalid encryption type" }),
    })
    .nullable()
    .optional(),

  default: z
    .string()
    .max(10, "Default must be less than 10 characters")
    .default("0"),

  is_default: z.boolean().default(false),

  is_active: z.boolean().default(true),

  created_by: z.union([z.string(), z.number()]).nullable().optional(),

  updated_by: z.union([z.string(), z.number()]).nullable().optional(),

  deleted_by: z.union([z.string(), z.number()]).nullable().optional(),

  deleted_at: z.string().datetime().nullable().optional(),

  created_at: z.string().datetime().optional(),

  updated_at: z.string().datetime().optional(),
});

// Schema for creating a new SMTP (excludes auto-generated fields)
const createSmtpSchema = smtpSchema.omit({
  id: true,
  created_at: true,
  updated_at: true,
  deleted_at: true,
  created_by: true,
  updated_by: true,
  deleted_by: true,
});

// Schema for updating SMTP (makes all fields optional except id)
const updateSmtpSchema = smtpSchema.partial().required({
  id: true,
});

// Default values for SMTP form (empty state)
const smtpDefaultValues = {
  type: "smtp",
  host: "",
  port: 587,
  username: "",
  password: "",
  from_name: "",
  from_email: "",
  encryption: "tls",
  default: "0",
  is_default: false,
  is_active: true,
};

// Example filled values (for testing/reference)
const smtpExampleValues = {
  type: "smtp",
  host: "smtp.gmail.com",
  port: 587,
  username: "your-email@gmail.com",
  password: "your-app-password",
  from_name: "Your Company Name",
  from_email: "noreply@yourcompany.com",
  encryption: "tls",
  default: "1",
  is_default: true,
  is_active: true,
};

// Map SMTP data from backend to frontend format
const smtpMapData = (smtp) => {
  return {
    id: smtp.id || "",
    type: smtp.type || "smtp",
    host: smtp.host || "",
    port: smtp.port || 587,
    username: smtp.username || "",
    password: smtp.password || "",
    from_name: smtp.from_name || "",
    from_email: smtp.from_email || "",
    encryption: smtp.encryption || "tls",
    default: smtp.default || "0",
    is_default: smtp.is_default || false,
    is_active: smtp.is_active || true,
    created_at: smtp.created_at || "",
    updated_at: smtp.updated_at || "",
  };
};

// Schema for SMTP form validation (frontend)
const smtpFormSchema = z.object({
  type: z.string().optional(),

  host: z
    .string()
    .min(1, "Host is required")
    .max(255, "Host must be less than 255 characters"),

  port: z
    .union([z.string(), z.number()])
    .transform((val) => (typeof val === "string" ? parseInt(val, 10) : val))
    .refine((val) => !isNaN(val) && val >= 1 && val <= 65535, {
      message: "Port must be between 1 and 65535",
    }),

  username: z
    .string()
    .min(1, "Username is required")
    .max(255, "Username must be less than 255 characters"),

  password: z
    .string()
    .min(1, "Password is required")
    .max(255, "Password must be less than 255 characters"),

  from_name: z
    .string()
    .min(1, "From name is required")
    .max(255, "From name must be less than 255 characters"),

  from_email: z
    .string()
    .email("Invalid email format")
    .min(1, "From email is required")
    .max(255, "From email must be less than 255 characters"),

  encryption: z.enum(["ssl", "tls", "none", ""], {
    errorMap: () => ({ message: "Please select an encryption type" }),
  }).optional(),

  is_default: z.boolean().default(false),

  is_active: z.boolean().default(true),
});

// Format SMTP data for submission (convert to GraphQL mutation format)
const formatSmtpForSubmission = (data, companyId) => {
  return {
    company_id: companyId,
    type: data.type || "smtp",
    host: data.host,
    port: parseInt(data.port, 10),
    username: data.username,
    password: data.password,
    from_name: data.from_name,
    from_email: data.from_email,
    encryption: data.encryption || null,
    default: data.is_default ? "1" : "0",
    is_default: data.is_default,
    is_active: data.is_active,
  };
};

// Common SMTP configurations (presets)
const smtpPresets = {
  gmail: {
    type: "smtp",
    host: "smtp.gmail.com",
    port: 587,
    encryption: "tls",
    label: "Gmail",
    instructions: "Use your email and app-specific password",
  },
  outlook: {
    type: "smtp",
    host: "smtp-mail.outlook.com",
    port: 587,
    encryption: "tls",
    label: "Outlook/Hotmail",
    instructions: "Use your Outlook email and password",
  },
  office365: {
    type: "smtp",
    host: "smtp.office365.com",
    port: 587,
    encryption: "tls",
    label: "Office 365",
    instructions: "Use your Office 365 email and password",
  },
  yahoo: {
    type: "smtp",
    host: "smtp.mail.yahoo.com",
    port: 587,
    encryption: "tls",
    label: "Yahoo Mail",
    instructions: "Use your Yahoo email and app password",
  },
  sendgrid: {
    type: "smtp",
    host: "smtp.sendgrid.net",
    port: 587,
    encryption: "tls",
    label: "SendGrid",
    instructions: "Use 'apikey' as username and your API key as password",
  },
  mailgun: {
    type: "smtp",
    host: "smtp.mailgun.org",
    port: 587,
    encryption: "tls",
    label: "Mailgun",
    instructions: "Use your Mailgun SMTP credentials",
  },
  custom: {
    type: "smtp",
    host: "",
    port: 587,
    encryption: "tls",
    label: "Custom SMTP",
    instructions: "Enter your custom SMTP server details",
  },
};

// Encryption options for dropdown
const encryptionOptions = [
  { value: "tls", label: "TLS (Recommended)" },
  { value: "ssl", label: "SSL" },
  { value: "none", label: "None (Not Secure)" },
  { value: "", label: "Auto" },
];

// Common ports for reference
const commonPorts = {
  tls: [587, 25],
  ssl: [465],
  none: [25, 2525],
};

// Default values for company information
const companyDefaultValues = {
  name: "", // Example existing data
  email: "",
  phone: "",
  website: "",
  address: "",
  tax_number: "",
  registration_number: "",
  country: "",
  state: "",
  city: "",
  zip_code: "",
  description: "",
  language: "en",
  currency: "USD",
  is_active: true,
  is_default: false,
};

// Export schemas and utilities
export {
  smtpDefaultValues,
  smtpExampleValues,
  smtpMapData,
  smtpSchema,
  createSmtpSchema,
  updateSmtpSchema,
  smtpFormSchema,
  formatSmtpForSubmission,
  smtpPresets,
  encryptionOptions,
  commonPorts,
  companyDefaultValues,
};