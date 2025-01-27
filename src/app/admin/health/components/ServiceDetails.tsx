import type { Service } from "@/lib/types"
import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

interface ServiceDetailsProps {
  service: Service
}

export function ServiceDetails({ service }: ServiceDetailsProps) {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-4">
        <Card>
          <CardContent className="pt-6">
            <h3 className="text-lg font-semibold mb-2">Performance</h3>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-muted-foreground">Uptime</span>
                  <span>{service.uptime}%</span>
                </div>
                <Progress value={service.uptime} className="w-full" />
              </div>
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>Total Requests: {service.requests}</span>
                <span>Error Rate: {service.errors}%</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <h3 className="text-lg font-semibold mb-2">System Info</h3>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Memory Usage</span>
                <span>{service.memory}MB</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">CPU Usage</span>
                <span>{service.cpu}%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Last Updated</span>
                <span>{new Date(service.lastCheck).toLocaleString()}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardContent className="pt-6">
          <h3 className="text-lg font-semibold mb-2">Dependencies</h3>
          <div className="space-y-2">
            {service.dependencies?.map((dep) => (
              <div key={dep.name} className="flex justify-between">
                <span className="text-muted-foreground">{dep.name}</span>
                <span>{dep.status}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

