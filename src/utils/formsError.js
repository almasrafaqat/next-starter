export function transformInvoiceErrors(errors) {
  const result = [];

  function traverse(obj, path = "") {
    if (typeof obj !== "object" || obj === null) return;
    for (const key in obj) {
      if (Array.isArray(obj[key])) {
        obj[key].forEach((item, idx) => traverse(item, `${path}${key}[${idx}].`));
      } else if (typeof obj[key] === "object" && obj[key] !== null && obj[key].message) {
        result.push({
          field: `${path}${key}`,
          message: obj[key].message,
          type: obj[key].type,
        });
      } else if (typeof obj[key] === "object" && obj[key] !== null) {
        traverse(obj[key], `${path}${key}.`);
      }
    }
  }

  traverse(errors);
  return result;
}