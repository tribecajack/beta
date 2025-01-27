"use client"

import { useState, useEffect } from "react"
import { fetchAllServices, fetchServiceDetails } from "@/lib/utils"
import type { Service } from "@/lib/types"
import { ServiceStatus } from "@/app/admin/components/ServiceStatus"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { RefreshCw, Server, Activity, HardDrive } from "lucide-react"


export default function HealthDashboard() {
  const [services, setServices] = useState<Service[]>([])
  const [selectedService, setSelectedService] = useState<Service | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchServices()
  }, [])

  const fetchServices = async () => {
    try {
      setLoading(true)
      const data = await fetchAllServices()
      setServices(await data.json())
      setError(null)
    } catch  {
      setError("Failed to fetch services")
    } finally {
      setLoading(false)
    }
  }

  const handleServiceClick = async (id: string) => {
    try {
      setLoading(true)
      const data = await fetchServiceDetails(id).then((res) => res.json())
      setSelectedService(data)
      setError(null)
    } catch {
      setError("Failed to fetch service details")
    } finally {
      setLoading(false)
    }
  }

  const getStatusVariant = (status: Service["status"]) => {
    switch (status) {
      case "OK":
        return "default"
      case "FAILED":
        return "destructive"
      default:
        return "default"
    }
  }

  const formatNumber = (num: number | undefined) => {
    if (typeof num === 'undefined') return '0'
    return num.toLocaleString()
  }

  if (loading) return <div className="flex items-center justify-center h-screen">Loading...</div>
  if (error) return <div className="flex items-center justify-center h-screen text-red-500">{error}</div>

  return (
    <div className="container mx-auto p-4 space-y-6">
      <header className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold">Microservices Health</h1>
          <p className="text-muted-foreground mt-1">Monitor and manage your service infrastructure</p>
        </div>
        <Button onClick={fetchServices} variant="outline" size="sm">
          <RefreshCw className="mr-2 h-4 w-4" /> Refresh
        </Button>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1 space-y-4">
          <h2 className="text-xl font-semibold mb-4">Services Overview</h2>
          {services.map((service) => (
            <Card
              key={service.id}
              className={`cursor-pointer transition-all duration-300 ${
                selectedService?.id === service.id
                  ? "ring-2 ring-primary"
                  : "hover:shadow-lg hover:border-primary/50"
              }`}
              onClick={() => handleServiceClick(service.id)}
            >
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium flex items-center gap-2">
                  <Server className="h-4 w-4" />
                  {service.name}
                </CardTitle>
                <Badge variant={getStatusVariant(service.status)}>{service.status}</Badge>
              </CardHeader>
              <CardContent>
                <ServiceStatus service={service} />
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="lg:col-span-2">
          {selectedService ? (
            <div className="space-y-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <div>
                    <CardTitle className="text-xl">{selectedService.name}</CardTitle>
                  </div>
                  <Badge variant={getStatusVariant(selectedService.status)} className="text-sm">
                    {selectedService.status}
                  </Badge>
                </CardHeader>
                <CardContent className="grid gap-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <Activity className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm font-medium">Performance</span>
                      </div>
                      <div className="space-y-1">
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Uptime</span>
                          <span>{selectedService.uptime.toFixed(0)}s</span>
                        </div>
                        <Progress value={selectedService.uptime ?? 0} className="h-2" />
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Total Requests</span>
                        <span>{formatNumber(selectedService.req_count)}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Outages</span>
                        <span>{selectedService.outages?.length ?? 0}</span>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <HardDrive className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm font-medium">Resources</span>
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Memory Usage</span>
                          <span>{selectedService?.usage?.[0]?.mem.toFixed(2) ?? 0} MB</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">CPU Usage</span>
                          <span>{((selectedService?.usage?.[0]?.cpu ?? 0) * 100).toFixed(2)}%</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Last Updated</span>
                          <span>{selectedService.last_successful_ping ? new Date(selectedService.last_successful_ping).toLocaleString() : 'Never'}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {selectedService.dependencies && selectedService.dependencies.length > 0 && (
                    <div>
                      <h3 className="text-sm font-medium mb-2">Dependencies</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        {selectedService.dependencies.map((dep) => (
                          <div
                            key={dep.name}
                            className="flex items-center justify-between p-2 rounded-md bg-muted/50"
                          >
                            <span className="text-sm">{dep.name}</span>
                            <Badge variant={dep.healthy ? "default" : "destructive"}>{dep.healthy ? "Ok" : "Down"}</Badge>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {selectedService.errors && selectedService.errors.length > 0 && (
                    <div>
                      <h3 className="text-sm font-medium mb-2">Recent Error Logs</h3>
                      <pre className="text-sm bg-muted p-4 rounded-md overflow-x-auto max-h-48">
                        {
                          selectedService.errors
                            .map(err => err.createdAt.toLocaleString() + " - "  + err.message)
                            .join("\n")
                        }
                      </pre>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          ) : (
            <div className="flex items-center justify-center h-full min-h-[400px] rounded-lg border-2 border-dashed">
              <div className="text-center">
                <Server className="mx-auto h-12 w-12 text-muted-foreground/50" />
                <h3 className="mt-4 text-lg font-semibold">No Service Selected</h3>
                <p className="text-sm text-muted-foreground">Select a service from the list to view details</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
} 