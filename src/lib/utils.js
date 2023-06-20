import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs) {
  return twMerge(clsx(inputs))
}


export function formatDate(date, seperator = "-") {
  if (date instanceof Date)
    return `${formatNumberto0(date.getMonth() + 1)}${seperator}${formatNumberto0(date.getDate())}${seperator}${date.getFullYear()}`
  else ""
}


export function formatNumberto0(num) {
  return num >= 10 ? `${num}` : `0${num}`;
}


export function formatPrice(price) {
  // Convert the price to a string
  let priceStr = price.toString();

  // Check if the price contains a decimal point
  let decimalIndex = priceStr.indexOf(".");
  let decimalPart = "";
  if (decimalIndex !== -1) {
    // Extract the decimal part of the price
    decimalPart = priceStr.slice(decimalIndex);
    priceStr = priceStr.slice(0, decimalIndex);
  }

  // Add commas every three digits from the right
  let formattedPrice = "";
  for (let i = priceStr.length - 1, count = 0; i >= 0; i--, count++) {
    if (count && count % 3 === 0) {
      formattedPrice = "," + formattedPrice;
    }
    formattedPrice = priceStr[i] + formattedPrice;
  }

  // Append the decimal part and return the formatted price
  return formattedPrice + decimalPart;
}




export function formatDateTimeForMsg(date) {
  if (date instanceof Date) {
    const now = new Date();
    const diff = now - date; // Difference in milliseconds
    // Format time if the date is today
    if (diff < 86400000 && date.getDate() === now.getDate()) {
      return date.toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric' });
    }
    // Format as "Yesterday" if the date is yesterday
    if (diff < 172800000 && date.getDate() === now.getDate() - 1) {
      return 'Yesterday ' + date.toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric' });
    }
    return date.toLocaleString('en-US');
  }
  else return ""
}