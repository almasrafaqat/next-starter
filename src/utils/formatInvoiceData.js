import { formatDateForLighthouse } from "./dateFormatter";

export function formatInvoiceData(data) {
  return {
    // ...data,
    invoice_number: data.invoice_number,
    amount_paid: Number(data.amount_paid) || 0,
    balance_due: Number(data.balance_due) || 0,
    total: Number(data.total) || 0,
    importance: data.importance || "normal",
    title: data.title || "",
    notes: data.notes || "",
    payment_status: data.paid ? "paid" : "unpaid",
    template_id: data.template_id || null,
    valid_until: data.valid_until || null,
    status: data.status || "pending",
    paid_on: data.paid_on || null,
    payment_method: data.payment_method ?? data.payment_method,
    reference: data.reference || null,
    description: data.description || "",
    currency: data.currency || "USD",
    currency_rate: Number(data.currency_rate) || 1,
    total_pkr: Number(data.total_pkr) || 0,
    // Format date fields to ISO strings
    date: data.date ? formatDateForLighthouse(data.date) : "",
    timeframe: data.timeframe ? formatDateForLighthouse(data.timeframe) : "",
    discounts: data.discounts?.map((d) => ({
      discount_type: d.discount_type,
      discount_value: Number(d.discount_value),
      discount_name: d.discount_name || "",
      discount_amount: Number(d.discount_amount) || 0,
    })) || [
      {
        discount_type: data.discount_type,
        discount_value: Number(data.discount_value),
        discount_name: data.discount_name || "",
        discount_amount: Number(data.discount_amount) || 0,
      },
    ],
    taxes: data.taxes?.map((d) => ({
      tax_type: d.tax_type,
      tax_value: Number(d.tax_value),
      tax_name: d.tax_name || "",
      tax_amount: Number(d.tax_amount) || 0,
    })) || [
      {
        tax_type: data.tax_type,
        tax_value: Number(data.tax_value),
        tax_name: data.tax_name || "",
        tax_amount: Number(data.tax_amount) || 0,
      },
    ],
    items: data.items.map((item) => ({
      // ...item,
      name: item.title,
      description: item.description || "",
      quantity: Number(item.quantity) || 0,
      price: Number(item.price) || 0,
      subtotal: Number(item.subtotal) || 0,
      is_discounted: item.itemHasDiscount ?? false,
      is_excluded_invoice_discount: item.excludeFromInvoiceDiscount ?? false,
      is_taxed: item.isTaxed ?? false,
      is_excluded_invoice_taxed: item.excludedFromInvoiceTaxed ?? false,
      discount_type: item.itemDiscountType || "",
      discount_value: Number(item.itemDiscountValue) || 0,
      discount_amount: item.itemHasDiscount
        ? Number(item.discount_amount) || 0
        : 0,
      total: Number(item.total) || 0,
    })),
    customers: data.customers.map((cust) => ({
      ...cust,
      credit_balance: cust.credit_balance ? Number(cust.credit_balance) : 0,
    })),
    // Format reminders and dates
    reminders:
      data.reminders?.map((reminder) => ({
        ...reminder,
        schedule_date: reminder.schedule_date
          ? formatDateForLighthouse(reminder.schedule_date)
          : "",
        expiry_date: reminder.expiry_date
          ? formatDateForLighthouse(reminder.expiry_date)
          : "",
      })) || [],
  };
}
