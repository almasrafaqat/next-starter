export function getInitialTranslations(locales, fields, initial = {}) {
  if (Object.keys(initial).length > 0) return initial;
  return locales.reduce((acc, code) => {
    acc[code] = fields.reduce((facc, f) => {
      facc[f.key] = "";
      return facc;
    }, {});
    return acc;
  }, {});
}

export function groupTranslationsByLocale(translationsArray, fields) {
  const result = {};
  translationsArray && translationsArray.forEach((item) => {
    const locale = item.locale;
    if (!result[locale]) result[locale] = {};
    fields.forEach((field) => {
      result[locale][field.key] = item[field.key] || "";
    });
  });
  return result;
}
