import { Badge } from "@/components/ui/badge"
import type { Service } from "@/lib/types"

export function ServiceStatus({ service }: { service: Service }) {
  return (
    <div className="flex items-center justify-between p-4 border rounded-lg shadow-sm">
      <div>
        <h3 className="text-lg font-semibold">{service.name}</h3>
        <p className="text-sm text-gray-500">Last ping: {new Date(service.last_successful_ping).toLocaleString()}</p>
      </div>
      <Badge variant={service.status === "OK" ? "success" : "destructive" as any}>{service.status}</Badge>
    </div>
  )
}