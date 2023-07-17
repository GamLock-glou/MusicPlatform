import { SERVER_URL } from "@/config/config"

export function getServerStaticUrl(url: string): string {
  return `${SERVER_URL}/${url}`
}