"use client";

import React from "react";
import * as XLSX from "xlsx";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import html2canvas from "html2canvas";

export function useDocToPdf() {
  const fileInputRef = React.useRef(null);
  const [state, setState] = React.useState({
    file: null,
    fileType: null, // "excel" | "docx"
    excel: { sheets: [], activeSheet: 0 },
    docx: { renderedHeight: 0 },
    options: {
      pageSize: "a4", // a4 | letter
      orientation: "portrait", // portrait | landscape
      theme: "light", // light | dark table
      margin: 10,
      filename: "document.pdf",
      includeAllSheets: true, // Convert all sheets or just active
    },
    drawerOpen: false,
  });

  const [exporting, setExporting] = React.useState(false);
  const [snackbar, setSnackbar] = React.useState({ open: false, type: "success", msg: "" });

  const actions = {
    setDrawerOpen: (open) => setState((s) => ({ ...s, drawerOpen: open })),
    triggerUpload: () => fileInputRef.current?.click(),
    setOptions: (next) => setState((s) => ({ ...s, options: { ...s.options, ...next } })),
    setActiveSheet: (idx) => setState((s) => ({ ...s, excel: { ...s.excel, activeSheet: idx } })),
    setDocxHeight: (h) => setState((s) => ({ ...s, docx: { ...s.docx, renderedHeight: h } })),
    loadFile: async (file) => {
      if (!file) return;
      const name = file.name.toLowerCase();
      if (name.endsWith(".xlsx") || name.endsWith(".xls") || name.endsWith(".csv")) {
        // Parse Excel - get ALL rows
        const buf = await file.arrayBuffer();
        const wb = XLSX.read(buf, { type: "array", cellDates: true, cellNF: false, cellText: false });
        const sheets = wb.SheetNames.map((name) => {
          // Get ALL rows without limit
          const rows = XLSX.utils.sheet_to_json(wb.Sheets[name], { header: 1, defval: "" });
          return { name, rows };
        });
        setState((s) => ({ 
          ...s, 
          file, 
          fileType: "excel", 
          excel: { sheets, activeSheet: 0 },
          options: { ...s.options, filename: file.name.replace(/\.[^.]+$/, '.pdf') }
        }));
      } else if (name.endsWith(".docx")) {
        setState((s) => ({ 
          ...s, 
          file, 
          fileType: "docx",
          options: { ...s.options, filename: file.name.replace(/\.[^.]+$/, '.pdf') }
        }));
      } else {
        throw new Error("Unsupported file. Use .xlsx, .xls, .csv, or .docx");
      }
    },
  };

  const resetAll = () =>
    setState({
      file: null,
      fileType: null,
      excel: { sheets: [], activeSheet: 0 },
      docx: { renderedHeight: 0 },
      options: { 
        pageSize: "a4", 
        orientation: "portrait", 
        theme: "light", 
        margin: 10, 
        filename: "document.pdf",
        includeAllSheets: true 
      },
      drawerOpen: false,
    });

  const canConvert = !!state.file;

  const convertExcelToPdf = async () => {
    const { options, excel } = state;
    const doc = new jsPDF({
      orientation: options.orientation,
      unit: "pt",
      format: options.pageSize,
      compress: true,
    });

    const themeStyles =
      options.theme === "dark"
        ? {
            headStyles: { fillColor: [33, 33, 33], textColor: 255, fontStyle: 'bold' },
            bodyStyles: { fillColor: [250, 250, 250], textColor: 33 },
            alternateRowStyles: { fillColor: [245, 245, 245] },
          }
        : {
            headStyles: { fillColor: [66, 139, 202], textColor: 255, fontStyle: 'bold' },
            bodyStyles: { textColor: 33 },
            alternateRowStyles: { fillColor: [248, 249, 250] },
          };

    // Determine which sheets to convert
    const sheetsToConvert = options.includeAllSheets 
      ? excel.sheets 
      : [excel.sheets[excel.activeSheet]];

    sheetsToConvert.forEach((sheet, idx) => {
      if (idx > 0) doc.addPage();
      
      // Handle empty sheets
      if (!sheet.rows || sheet.rows.length === 0) {
        doc.setFontSize(12);
        doc.text("(Empty Sheet)", options.margin, 50);
        return;
      }

      // Separate header and body - ALL rows included
      const headers = sheet.rows[0] || [];
      const bodyRows = sheet.rows.slice(1); // Get ALL rows, no slice limit

      // Convert all cells to strings to prevent rendering issues
      const processedHeaders = headers.map(h => String(h || ""));
      const processedBody = bodyRows.map(row => 
        headers.map((_, colIdx) => String(row[colIdx] ?? ""))
      );

      autoTable(doc, {
        head: [processedHeaders],
        body: processedBody,
        startY: 40,
        margin: { top: 40, right: options.margin, bottom: 30, left: options.margin },
        styles: { 
          fontSize: 8, 
          cellPadding: 3, 
          overflow: 'linebreak',
          halign: 'left',
          valign: 'middle'
        },
        headStyles: {
          fontSize: 9,
          ...themeStyles.headStyles
        },
        columnStyles: {
          // Auto-adjust column widths
        },
        ...themeStyles,
        showHead: 'firstPage',
        theme: 'grid',
        tableLineColor: [200, 200, 200],
        tableLineWidth: 0.1,
        didDrawPage(data) {
          // Header on each page
          doc.setFontSize(11);
          doc.setFont(undefined, 'bold');
          doc.text(
            sheet.name || `Sheet ${excel.sheets.indexOf(sheet) + 1}`, 
            options.margin, 
            25
          );
          
          // Footer with page numbers
          const pageCount = doc.internal.pages.length - 1;
          const currentPage = doc.internal.getCurrentPageInfo().pageNumber;
          doc.setFontSize(8);
          doc.setFont(undefined, 'normal');
          doc.text(
            `Page ${currentPage} of ${pageCount} | Rows: ${bodyRows.length}`,
            doc.internal.pageSize.getWidth() - options.margin,
            doc.internal.pageSize.getHeight() - 15,
            { align: "right" }
          );
        },
      });
    });

    doc.save(options.filename || "excel.pdf");
  };

  const convertDocxToPdf = async () => {
    const preview = document.getElementById("docx-renderer");
    if (!preview) throw new Error("Document not ready. Please wait a moment and try again.");

    const { options } = state;
    const doc = new jsPDF({
      orientation: options.orientation,
      unit: "pt",
      format: options.pageSize,
      compress: true,
    });

    // 1) Freeze scroll to avoid page shaking
    const prevScrollY = window.scrollY || 0;
    const prevBodyPos = document.body.style.position;
    const prevBodyTop = document.body.style.top;
    const prevBodyWidth = document.body.style.width;
    document.body.style.position = "fixed";
    document.body.style.top = `-${prevScrollY}px`;
    document.body.style.width = "100%";

    // 2) Make an offscreen full-height clone (no overflow/maxHeight)
    const clone = preview.cloneNode(true);
    const widthPx = preview.clientWidth || 800;
    Object.assign(clone.style, {
      position: "absolute",
      left: "-99999px",
      top: "0",
      width: `${widthPx}px`,
      maxHeight: "none",
      overflow: "visible",
      height: "auto",
    });
    // If your preview wrapper sets maxHeight via class, also unset here:
    clone.style.setProperty("max-height", "none", "important");
    clone.style.setProperty("overflow", "visible", "important");
    document.body.appendChild(clone);

    try {
      // 3) Render the full clone
      const scale = Math.min(3, (window.devicePixelRatio || 2)); // quality vs memory
      const canvas = await html2canvas(clone, {
        scale,
        backgroundColor: "#ffffff",
        useCORS: true,
        logging: false,
        windowWidth: clone.scrollWidth || widthPx,
        windowHeight: clone.scrollHeight || clone.clientHeight,
        scrollX: 0,
        scrollY: 0,
      });

      // 4) Slice into multiple PDF pages
      const margin = options.margin;
      const pageW = doc.internal.pageSize.getWidth();
      const pageH = doc.internal.pageSize.getHeight();
      const imgW = pageW - margin * 2;
      const imgH = (canvas.height * imgW) / canvas.width;
      const pagePixelH = (pageH - margin * 2) * (canvas.height / imgH); // how many source pixels fit on one page

      let srcY = 0;
      let pageIndex = 0;

      while (srcY < canvas.height) {
        if (pageIndex > 0) doc.addPage();

        const sliceH = Math.min(pagePixelH, canvas.height - srcY);

        const pageCanvas = document.createElement("canvas");
        pageCanvas.width = canvas.width;
        pageCanvas.height = sliceH;
        const ctx = pageCanvas.getContext("2d");
        ctx.drawImage(
          canvas,
          0, srcY, canvas.width, sliceH,
          0, 0, canvas.width, sliceH
        );

        const pageImg = pageCanvas.toDataURL("image/jpeg", 0.95);
        const pageImgH = (sliceH * imgW) / canvas.width;

        doc.addImage(pageImg, "JPEG", margin, margin, imgW, pageImgH, undefined, "FAST");

        srcY += sliceH;
        pageIndex++;
      }

      doc.save(options.filename || "document.pdf");
    } finally {
      // 5) Cleanup + restore scroll
      document.body.removeChild(clone);
      document.body.style.position = prevBodyPos;
      document.body.style.top = prevBodyTop;
      document.body.style.width = prevBodyWidth;
      window.scrollTo(0, prevScrollY);
    }
  };

  const convertToPdf = async () => {
    if (state.fileType === "excel") return convertExcelToPdf();
    if (state.fileType === "docx") return convertDocxToPdf();
    throw new Error("Unsupported file type.");
  };

  return {
    fileInputRef,
    state,
    actions,
    canConvert,
    resetAll,
    convertToPdf,
    exporting,
    setExporting,
    snackbar,
    setSnackbar,
  };
}