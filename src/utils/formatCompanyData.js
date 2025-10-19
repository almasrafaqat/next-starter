import z from "zod";
import { sanitizeInput } from "./formHelper";

// Helper: optional URL (allows '', null, undefined; validates when present; auto-prefix https)
const optionalUrl = z.preprocess(
  (v) => {
    if (v === null || v === undefined) return undefined;            // allow null/undefined
    if (typeof v === "string") {
      const s = v.trim();
      if (s === "") return undefined;                                // allow empty string
      return /^https?:\/\//i.test(s) ? s : `https://${s}`;           // auto-prefix https
    }
    return v;
  },
  z.string().url("Invalid website URL format").optional()
);

const companySchema = z.object({
  id: z.union([z.string(), z.number()]).optional(), // Auto-increment ID
  name: z
    .string()
    .min(1, "Company name is required")
    .max(255, "Company name must be less than 255 characters"),

  email: z
    .string()
    .email("Invalid email format")
    .max(255, "Email must be less than 255 characters")
    .nullable()
    .optional(),

  phone: z
    .string()
    .max(20, "Phone number must be less than 20 characters")
    .nullable()
    .optional(),

  address: z
    .string()
    .max(500, "Address must be less than 500 characters")
    .nullable()
    .optional(),

  website: optionalUrl,                                             // validate only if present

  logo: z
    .string()
    .max(255, "Logo path must be less than 255 characters")
    .nullable()
    .optional(),

  tax_number: z
    .string()
    .max(50, "Tax number must be less than 50 characters")
    .nullable()
    .optional(),

  registration_number: z
    .string()
    .max(50, "Registration number must be less than 50 characters")
    .nullable()
    .optional(),

  country: z
    .string()
    .max(100, "Country must be less than 100 characters")
    .nullable()
    .optional(),

  state: z
    .string()
    .max(100, "State must be less than 100 characters")
    .nullable()
    .optional(),

  city: z
    .string()
    .max(100, "City must be less than 100 characters")
    .nullable()
    .optional(),

  zip_code: z
    .string()
    .max(20, "Zip code must be less than 20 characters")
    .nullable()
    .optional(),

  description: z
    .string()
    .max(1000, "Description must be less than 1000 characters")
    .nullable()
    .optional(),

  language: z
    .string()
    .min(2, "Language code must be at least 2 characters")
    .max(10, "Language code must be less than 10 characters")
    .default("en"),

  currency: z
    .string()
    .min(3, "Currency code must be exactly 3 characters")
    .max(3, "Currency code must be exactly 3 characters")
    .default("USD"),

  is_active: z.boolean().default(true),

  is_default: z.boolean().default(false),

  created_by: z.union([z.string(), z.number()]).nullable().optional(),

  updated_by: z.union([z.string(), z.number()]).nullable().optional(),

  deleted_by: z.union([z.string(), z.number()]).nullable().optional(),

  deleted_at: z.string().datetime().nullable().optional(),

  created_at: z.string().datetime().optional(),

  updated_at: z.string().datetime().optional(),
});

// Schema for creating a new company (excludes auto-generated fields)
const createCompanySchema = companySchema.omit({
  id: true,
  created_at: true,
  updated_at: true,
  deleted_at: true,
  created_by: true,
  updated_by: true,
  deleted_by: true,
});

// Schema for updating a company (makes all fields optional except id)
const updateCompanySchema = companySchema.partial().required({
  id: true,
});

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

// const companyDefaultValues = {
//   name: "Acme Corporation", // Example existing data
//   email: "contact@acme.com",
//   phone: "+1 (555) 123-4567",
//   website: "https://acme.com",
//   address: "123 Business St, Business City, BC 12345",
//   tax_number: "TAX123456789",
//   registration_number: "REG987654321",
//   country: "United States",
//   state: "California",
//   city: "San Francisco",
//   zip_code: "94102",
//   description: "Leading provider of innovative solutions",
//   language: "en",
//   currency: "USD",
//   is_active: true,
//   is_default: false,
// };

const companyMapData = (company) => {
  return {
    id: company.id || "",
    name: company.name || "",
    email: company.email || "",
    phone: company.phone || "",
    address: company.address || "",
    website: company.website === "" ? null : company.website ?? null,
    logo: company.logo || "",
    tax_number: company.tax_number || "",
    registration_number: company.registration_number || "",
    country: company.country || "",
    state: company.state || "",
    city: company.city || "",
    zip_code: company.zip_code || "",
    description: company.description || "",
    language: company.language || "",
    currency: company.currency || "",
    is_active: company.is_active || false,
    is_default: company.is_default || false,
    created_at: company.created_at || "",
    updated_at: company.updated_at || "",
  };
};

export const formatCompanyForSubmission = (values) => ({
  name: sanitizeInput(values.name),
  email: sanitizeInput(values.email || null),
  phone: sanitizeInput(values.phone || null),
  address: sanitizeInput(values.address || null),
  website: sanitizeInput(values.website === "" ? null : values.website ?? null), // always present
  logo: sanitizeInput(values.logo || null),
  tax_number: sanitizeInput(values.tax_number || null),
  registration_number: sanitizeInput(values.registration_number || null),
  country: sanitizeInput(values.country || null),
  state: sanitizeInput(values.state || null),
  city: sanitizeInput(values.city || null),
  zip_code: sanitizeInput(values.zip_code || null),
  description: sanitizeInput(values.description || null),
  language: sanitizeInput(values.language || "en"),
  currency: sanitizeInput(values.currency || "USD"),
  is_active: !!values.is_active,
  is_default: !!values.is_default,
});

// Schema for company form validation (frontend)
const companyFormSchema = z.object({
  name: z
    .string()
    .min(1, "Company name is required")
    .max(255, "Company name must be less than 255 characters"),

  email: z.string().email("Invalid email format").or(z.literal("")).optional(),

  phone: z.string().nullable().optional(),
  address: z.string().nullable().optional(),
  website: optionalUrl,                                             // same behavior in form
  logo: z.string().or(z.instanceof(File)).nullable().optional(),
  tax_number: z.string().nullable().optional(),
  registration_number: z.string().nullable().optional(),
  country: z.string().nullable().optional(),
  state: z.string().nullable().optional(),
  city: z.string().nullable().optional(),
  zip_code: z.string().nullable().optional(),
  description: z.string().nullable().optional(),
  language: z.string().default("en"),
  currency: z.string().default("USD"),
  is_active: z.boolean().default(true),
  is_default: z.boolean().default(false),
});

// Export schemas
export {
  companyDefaultValues,
  companyMapData,
  companySchema,
  createCompanySchema,
  updateCompanySchema,
  companyFormSchema,
};
