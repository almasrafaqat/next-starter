import { TableView } from "@/components/TableView/TableView";
import InvoiceReminder from "../InvoiceReminder/InvoiceReminder";
import InvoiceLink from "../InvoiceLink/InvoiceLink";
import InvoiceCharity from "../InvoiceCharity/InvoiceCharity";
import InvoiceChecklist from "../InvoiceChecklist/InvoiceChecklist";
import InvoiceItem from "../InvoiceItem/InvoiceItem";
import InvoiceDiscount from "../InvoiceDiscount/InvoiceDiscount";
import { useInvoice } from "@/hooks/customer/useInvoice";

export default function InvoiceTable({ invoices, isLoading }) {

  const {
  sendInvoice,
  sendInvoiceResult,
  downloadInvoice,
  downloadInvoiceResult,
} = useInvoice();

function handleSendInvoice(id) {
  sendInvoice(id);
}

function handleDownloadInvoice(id) {
  downloadInvoice(id);
}


  const columns = [
    { field: "title", headerName: "Title", primary: true, sortable: true },
    {
      field: "customer",
      headerName: "Customer",
      valueFormatter: (v) => v?.name,
      secondary: true,
    },
    { field: "company", headerName: "Company", valueFormatter: (v) => v?.name },
    { field: "creator", headerName: "Creator", valueFormatter: (v) => v?.name },
    { field: "items", headerName: "Items", valueFormatter: (v) => v?.length },
    {
      field: "discounts",
      headerName: "Discounts",
      valueFormatter: (v) => v?.length,
    },
    {
      field: "reminders",
      headerName: "Reminders",
      valueFormatter: (v) => v?.length,
    },
    { field: "links", headerName: "Links", valueFormatter: (v) => v?.length },
    {
      field: "charities",
      headerName: "Charities",
      valueFormatter: (v) => v?.length,
    },
    {
      field: "checklistables",
      headerName: "Checklists",
      valueFormatter: (v) => v?.length,
    },
  ];

  return (
    <TableView
      data={invoices}
      columns={columns}
      idField="id"
      title="Invoices"
      loading={isLoading}
      expandable
      actions={{
        onEdit: (invoice) => handleDownloadInvoice(invoice.id),
        onDelete: (invoice) => console.log("Delete action clicked", invoice.id),
        onView: (invoice) => handleSendInvoice(invoice.id),
      }}
      renderExpandedRow={(invoice) => (
        <div>
          <strong>Items:</strong>
          {invoice.items?.map((item, idx) => (
            <InvoiceItem key={idx} item={item} />
          ))}
          <strong>Discounts:</strong>
          {invoice.discounts?.map((discount, idx) => (
            <InvoiceDiscount key={idx} discount={discount} />
          ))}
          <strong>Reminders:</strong>
          {invoice.reminders?.map((reminder, idx) => (
            <InvoiceReminder key={idx} reminder={reminder} />
          ))}
          <strong>Links:</strong>
          {invoice.links?.map((link, idx) => (
            <InvoiceLink key={idx} link={link} />
          ))}
          <strong>Charities:</strong>
          {invoice.charities?.map((charity, idx) => (
            <InvoiceCharity key={idx} charity={charity} />
          ))}
          <strong>Checklists:</strong>
          {invoice.checklistables?.map((checklistable, idx) => (
            <InvoiceChecklist key={idx} checklistable={checklistable} />
          ))}
        </div>
      )}
    />
  );
}
