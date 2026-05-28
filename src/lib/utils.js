import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export function isUrl(value) {
  const trimmed = value.trim();

  if (!trimmed || /\s/.test(trimmed) || trimmed.includes("@")) {
    return false;
  }

  if (/^https?:\/\//i.test(trimmed)) {
    try {
      return Boolean(new URL(trimmed).hostname);
    } catch {
      return false;
    }
  }

  return /^(www\.|(?:[a-z0-9-]+\.)+[a-z]{2,})(?:[/:?#].*)?$/i.test(trimmed);
}

export function normalizeUrl(value) {
  const trimmed = value.trim();

  if (isUrl(trimmed) && !/^https?:\/\//i.test(trimmed)) {
    return `https://${trimmed}`;
  }

  return trimmed;
}
