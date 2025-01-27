"use client"

import { useState, useEffect } from "react"
import { fetchAllServices, fetchServiceDetails } from "@/lib/utils"
import type { Service } from "@/lib/types"
import { ServiceStatus } from "@/components/ServiceStatus"
import { ServiceDetails } from "@/components/ServiceDetails"
import { Button } from "@/components/ui/button"

export default function Dashboard() {
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
    } catch (err) {
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
    } catch (err) {
      setError("Failed to fetch service details")
    } finally {
      setLoading(false)
    }
  }

  if (loading) return <div className="text-center mt-8">Loading...</div>
  if (error) return <div className="text-center mt-8 text-red-500">{error}</div>

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Microservices Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <h2 className="text-xl font-semibold m-2">Services</h2>
          {services.map((service) => (
            <div key={service.id} className="mb-2 m-5" onClick={() => handleServiceClick(service.id)}>
              <ServiceStatus service={service} />
            </div>
          ))}
        </div>
        <div>
          <h2 className="text-xl font-semibold mb-2">Service Details</h2>
          {selectedService ? <ServiceDetails service={selectedService} /> : <p>Select a service to view details</p>}
        </div>
      </div>
    </div>
  )
}