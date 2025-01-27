import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export async function fetchAllServices() {
  return fetch("https://api.ultra.markets/health")
}

export async function fetchServiceDetails(id: string) {
  return fetch(`https://api.ultra.markets/health/service/${id}`)
}