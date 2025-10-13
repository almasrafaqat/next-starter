import { TableView } from "@/components/TableView/TableView";
import InvoiceReminder from "../InvoiceReminder/InvoiceReminder";
import InvoiceLink from "../InvoiceLink/InvoiceLink";
import InvoiceCharity from "../InvoiceCharity/InvoiceCharity";
import InvoiceChecklist from "../InvoiceChecklist/InvoiceChecklist";
import InvoiceItem from "../InvoiceItem/InvoiceItem";
import InvoiceDiscount from "../InvoiceDiscount/InvoiceDiscount";
import { useInvoice } from "@/hooks/customer/useInvoice";
import { useDialog } from "@/hooks/useDialog";
import { useEffect } from "react";
import CreateInvoice from "../CreateInvoice/CreateInvoice";
import { useDrawer } from "@/hooks/useDrawer";
import { icons } from "@/config/routeIcons";
import {
  BooleanField,
  DateField,
  ImportanceField,
  LabelsField,
  LineItemsField,
  StatusField,
  TextArrayField,
} from "@/components/TableView/FieldRenderers";

export default function InvoiceTable({ invoices, isLoading }) {
  console.log("Invoices:", invoices);
  const {
    sendInvoice,
    sendInvoiceResult,
    deleteInvoice,
    deleteInvoiceResult,
    updateInvoice,
    updateInvoiceResult,
    duplicateInvoice,
    duplicateInvoiceResult,
  } = useInvoice();
  const { showDrawer, hideDrawer } = useDrawer();
  const {
    open: openDialog,
    close: closeDialog,
    loading: showLoading,
    alert,
    confirm: confirmDialog,
  } = useDialog();

  useEffect(() => {
    if (sendInvoiceResult.isPending) {
      showLoading({
        title: "sending Invoice...",
        message: "Sending invoice...",
      });
    } else {
      closeDialog();
    }
    if (sendInvoiceResult.isSuccess) {
      // Optionally show success message
      alert({
        title: "Success",
        message: sendInvoiceResult.data.message || "Invoice sent successfully!",
        type: "success",
      });
    }
    if (sendInvoiceResult.isError) {
      alert({
        title: "Error",
        message: sendInvoiceResult.error.message || "Failed to send invoice.",
        type: "error",
      });
    }
  }, [
    sendInvoiceResult.isPending,
    sendInvoiceResult.isSuccess,
    sendInvoiceResult.isError,
    sendInvoiceResult.error,
    sendInvoiceResult.data,
    alert,
    showLoading,
    closeDialog,
  ]);

  useEffect(() => {
    if (deleteInvoiceResult.isPending) {
      showLoading({
        title: "Deleting Invoice...",
        message: "Please wait while deleting invoice...",
      });
    } else {
      closeDialog();
    }
    if (deleteInvoiceResult.isSuccess) {
      // Optionally show success message
      alert({
        title: "Success",
        message:
          deleteInvoiceResult.data.message || "Invoice deleted successfully!",
        type: "success",
      });
    }
    if (deleteInvoiceResult.isError) {
      alert({
        title: "Error",
        message:
          deleteInvoiceResult.error.message || "Failed to delete invoice.",
        type: "error",
      });
    }
  }, [
    deleteInvoiceResult.isPending,
    deleteInvoiceResult.isSuccess,
    deleteInvoiceResult.isError,
    deleteInvoiceResult.error,
    deleteInvoiceResult.data,
    alert,
    showLoading,
    closeDialog,
  ]);

  /**UPDATE INVOICE LOADER */
  useEffect(() => {
    if (updateInvoiceResult.isPending) {
      showLoading({
        title: "Updating Invoice",
        message: "Updating invoice...",
      });
    } else {
      closeDialog();
    }
    if (updateInvoiceResult.isSuccess) {
      // Optionally show success message
      alert({
        title: "Success",
        message:
          updateInvoiceResult.data.message || "Invoice updated successfully!",
        type: "success",
      });
    }
    if (updateInvoiceResult.isError) {
      alert({
        title: "Error",
        message:
          updateInvoiceResult.error.message || "Failed to update invoice.",
        type: "error",
      });
    }
  }, [
    updateInvoiceResult.isPending,
    updateInvoiceResult.isSuccess,
    updateInvoiceResult.isError,
    updateInvoiceResult.error,
    updateInvoiceResult.data,
    alert,
    showLoading,
    closeDialog,
  ]);

  /**DUPLICATE INVOICE LOADER */
  useEffect(() => {
    if (duplicateInvoiceResult.isPending) {
      showLoading({
        title: "Duplicating Invoice",
        message: "Please wait while duplicating invoice...",
      });
    } else {
      closeDialog();
    }
    if (duplicateInvoiceResult.isSuccess) {
      // Optionally show success message
      alert({
        title: "Success",
        message:
          duplicateInvoiceResult.data.message ||
          "Invoice duplicated successfully!",
        type: "success",
      });
    }
    if (duplicateInvoiceResult.isError) {
      alert({
        title: "Error",
        message:
          duplicateInvoiceResult.error.message || "Failed to duplicate invoice.",
        type: "error",
      });
    }
  }, [
    duplicateInvoiceResult.isPending,
    duplicateInvoiceResult.isSuccess,
    duplicateInvoiceResult.isError,
    duplicateInvoiceResult.error,
    duplicateInvoiceResult.data,
    alert,
    showLoading,
    closeDialog,
  ]);

  function handleSendInvoice(id) {
    sendInvoice(id);
  }
  function handleDeleteInvoice(id) {
    confirmDialog({
      title: "Confirm Deletion",
      message: "Are you sure you want to delete this invoice?",
      onConfirm: () => performDeleteInvoice(id),
      type: "error",
    });
  }

  function performDeleteInvoice(id) {
    deleteInvoice(id);
  }

  function handleDownloadInvoice(id) {
    window.open(
      `http://export-pocket-admin.test/invoice/${id}/download`,
      "_blank"
    );
  }
  function handleViewInvoice(id) {
    window.open(`http://export-pocket-admin.test/invoice/${id}/view`);
  }

  const handleUpdateInvoice = (invoice) => {
    showDrawer(
      <CreateInvoice
        companyId={1}
        invoice={invoice}
        handleSubmitInvoice={updateInvoiceHandler}
      />,
      "update Invoice",
      "bottom"
    );
  };

  const updateInvoiceHandler = (formData) => {
    const InvoiceId = formData.id;
    console.log("Updating invoice:", InvoiceId);
    updateInvoice({ id: InvoiceId, args: formData });
  };

  const duplicateInvoiceHandler = (invoice) => {
    // Call the duplicateInvoice mutation
    // Assuming you have a duplicateInvoice function from useInvoice hook
    duplicateInvoice(invoice.id);
  };

  const customRowActions = [
    {
      label: "Send",
      icon: <icons.SEND color="success" />,
      onClick: (invoice) => handleSendInvoice(invoice.id),
      variant: "ghost",
    },
    {
      label: "Download",
      icon: <icons.DOWNLOAD color="primary" sx={{ fontSize: 20 }} />,
      onClick: (invoice) => handleDownloadInvoice(invoice.id),
      variant: "ghost",
    },
    {
      label: "Duplicate",
      icon: <icons.COPY color="primary" sx={{ fontSize: 20 }} />,
      onClick: (invoice) => duplicateInvoiceHandler(invoice),
      variant: "ghost",
    },
  ];

  const bulkActions = [
    {
      label: "Send Selected",
      icon: <icons.PROFILE className="w-4 h-4" />,
      onClick: (selectedIds) => {
        selectedIds.forEach((id) => sendInvoice(id));
      },
      variant: "default",
    },
    {
      label: "Download All",
      icon: <icons.PROFILE className="w-4 h-4" />,
      onClick: (selectedIds) => {
        selectedIds.forEach((id) =>
          window.open(`${API_URL}/invoice/${id}/download`, "_blank")
        );
      },
      variant: "default",
    },
    {
      label: "Delete Selected",
      icon: <icons.PROFILE className="w-4 h-4" />,
      onClick: (selectedIds) => handleBulkDelete(selectedIds),
      variant: "destructive",
    },
  ];

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
        onEdit: (invoice) => handleUpdateInvoice(invoice),
        // onEdit: (invoice) => handleDownloadInvoice(invoice.id),
        onDelete: (invoice) => handleDeleteInvoice(invoice.id),
        onView: (invoice) => handleViewInvoice(invoice.id),
        // onView: (invoice) => handleSendInvoice(invoice.id),
      }}
      bulkActions={bulkActions}
      customRowActions={customRowActions}
      renderExpandedRow={(invoice) => (
        <div>
          <ImportanceField label="Status" level={invoice.status} />
          <DateField label="Invoice Date" value={invoice.date} />
          <StatusField label="Invoice Status" status={invoice.status} />
          {/* <strong>Items:</strong>
          {invoice.items?.map((item, idx) => (
            <InvoiceItem key={idx} item={item} />
          ))} */}
          <LineItemsField label="Items" items={invoice.items} />
          <BooleanField
            label="Paid"
            value={invoice.payment_status === "paid"}
          />
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
