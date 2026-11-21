import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatNumber(num: number): string {
  if (num === undefined || num === null || isNaN(num)) return "0";
  return new Intl.NumberFormat("pt-BR").format(num);
}

export function formatCompactNumber(num: number): string {
  if (num === undefined || num === null || isNaN(num)) return "0";
  if (num >= 1_000_000_000) {
    return (num / 1_000_000_000).toFixed(2).replace(".", ",") + "B";
  }
  if (num >= 1_000_000) {
    return (num / 1_000_000).toFixed(1).replace(".", ",") + "M";
  }
  if (num >= 1_000) {
    return (num / 1_000).toFixed(1).replace(".", ",") + "K";
  }
  return num.toString();
}

export function formatDelta(delta: number): string {
  if (delta > 0) return `+${formatNumber(delta)}`;
  if (delta < 0) return formatNumber(delta);
  return "=";
}

export function formatDatePT(dateStr: string): string {
  try {
    const [year, month, day] = dateStr.split("-");
    const months = [
      "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
      "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
    ];
    return `${parseInt(day, 10)} de ${months[parseInt(month, 10) - 1]} de ${year}`;
  } catch {
    return dateStr;
  }
}

export function calculateDaysRemaining(targetDateStr: string): number {
  try {
    const target = new Date(targetDateStr).getTime();
    const now = new Date().getTime();
    const diffDays = Math.ceil((target - now) / (1000 * 60 * 60 * 24));
    return Math.max(0, diffDays);
  } catch {
    return 0;
  }
}
