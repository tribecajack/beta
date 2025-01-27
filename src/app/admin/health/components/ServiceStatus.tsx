import type { Service } from "@/lib/types"

interface ServiceStatusProps {
  service: Service
}

export function ServiceStatus({ service }: ServiceStatusProps) {
  return (
    <div className="space-y-2">
      <div className="flex justify-between text-sm">
        <span className="text-muted-foreground">Version:</span>
      </div>
      <div className="flex justify-between text-sm">
        <span className="text-muted-foreground">Uptime:</span>
        <span>{service.uptime}</span>
      </div>
      <div className="flex justify-between text-sm">
        <span className="text-muted-foreground">Last Check:</span>
        <span>{new Date(service.last_successful_ping).toLocaleString()}</span>
      </div>
    </div>
  )
}

