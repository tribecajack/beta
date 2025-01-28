import type { Service } from "@/lib/types"
import { Progress } from "@/components/ui/progress"

interface ServiceStatusProps {
  service: Service
}

export function ServiceStatus({ service }: ServiceStatusProps) {
  const formatNumber = (num: number | undefined) => {
    if (typeof num === 'undefined') return '0'
    return num.toLocaleString()
  }

  return (
    <div className="space-y-2">
      <div className="flex justify-between text-sm">
        <span className="text-muted-foreground">Uptime</span>
        <span>{formatNumber(service?.uptime)}s</span>
      </div>
      <Progress value={service.uptime ?? 0} className="h-1.5" />
      <div className="flex justify-between text-sm text-muted-foreground">
        <span>Requests: {formatNumber(service.req_count)}</span>
        <span>Errors: {service?.err_count ?? 0 / service?.req_count ?? 0}%</span>
      </div>
    </div>
  )
} 