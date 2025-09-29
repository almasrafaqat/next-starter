export function formatDate(dateString) {
  if (!dateString) return null;

  const date = new Date(dateString);

  // Check if the date is valid
  if (isNaN(date.getTime())) return null;

  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  };

  return date.toLocaleString("en-US", options);
}

import { formatDistanceToNow } from "date-fns";

export const dayDifferenceDate = (createdAt) => {
  const date = formatDistanceToNow(new Date(createdAt), { addSuffix: true });

  return date;
};
