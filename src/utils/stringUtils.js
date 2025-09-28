export function capitalizeFirstLetter(string = '') {
  return string.replace(/\b(\w)/g, s => s.toUpperCase());
}


export const safeParseJSON = (jsonString, defaultValue = {}) => {
  try {
    return JSON.parse(jsonString);
  } catch (e) {
    console.error("Error parsing JSON:", e);
    return defaultValue;
  }
};
