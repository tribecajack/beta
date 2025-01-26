import type { Outage, Service as ServiceDetailsType } from "@/lib/types"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export function ServiceDetails({ service }: { service: ServiceDetailsType }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>{service.name}</span>
          <Badge variant={service.status === "OK" ? "success" : "destructive" as any}>{service.status}</Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="mb-4">Last successful ping: {new Date(service.last_successful_ping).toLocaleString()} UTC</p>
        <h4 className="font-semibold mb-2">Outages:</h4>
        {(service?.outages?.length ?? 0) === 0 ? (
          <p>No outages reported.</p>
        ) : (
          <ul className="space-y-2">
            {service?.outages?.map((outage: Outage, index) => (
              <li key={index} className="bg-gray-100 p-2 rounded">
                Start: {new Date(outage.start).toLocaleString()}
                <br />
                End: {outage?.end as any === 0 ? "Ongoing" : new Date(outage.end).toLocaleString()}
              </li>
            ))}
          </ul>
        )}
      </CardContent>
    </Card>
  )
}

