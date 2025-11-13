import { createClient } from "@/lib/supabase/server"

export async function createAlert(
  companyId: string,
  alertType: string,
  severity: "low" | "medium" | "high" | "critical",
  message: string,
  vehicleId?: string,
) {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from("alerts")
    .insert({
      company_id: companyId,
      alert_type: alertType,
      severity,
      message,
      vehicle_id: vehicleId,
      is_resolved: false,
    })
    .select()
    .single()

  if (error) throw error
  return data
}

export async function resolveAlert(alertId: string) {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from("alerts")
    .update({
      is_resolved: true,
      resolved_at: new Date().toISOString(),
    })
    .eq("id", alertId)
    .select()
    .single()

  if (error) throw error
  return data
}

export async function getCompanyAlerts(companyId: string, resolved = false) {
  const supabase = await createClient()

  const query = supabase
    .from("alerts")
    .select("*")
    .eq("company_id", companyId)
    .eq("is_resolved", resolved)
    .order("created_at", { ascending: false })

  const { data, error } = await query

  if (error) throw error
  return data
}

export async function getAlertsByVehicle(vehicleId: string, limit = 50) {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from("alerts")
    .select("*")
    .eq("vehicle_id", vehicleId)
    .order("created_at", { ascending: false })
    .limit(limit)

  if (error) throw error
  return data
}

export async function createSpeedingAlert(
  companyId: string,
  vehicleId: string,
  currentSpeed: number,
  speedLimit: number,
) {
  const message = `Vehicle exceeding speed limit: ${currentSpeed} km/h (Limit: ${speedLimit} km/h)`
  return createAlert(companyId, "speeding", "high", message, vehicleId)
}

export async function createGeofenceAlert(
  companyId: string,
  vehicleId: string,
  geofenceName: string,
  fenceType: string,
) {
  const message = `Geofence boundary crossed: ${geofenceName} (${fenceType})`
  return createAlert(companyId, "geofence", "medium", message, vehicleId)
}

export async function createFuelAlert(companyId: string, vehicleId: string, fuelLevel: number) {
  const message = `Low fuel level: ${fuelLevel}%`
  return createAlert(companyId, "fuel", "medium", message, vehicleId)
}

export async function createHarshBrakingAlert(companyId: string, vehicleId: string) {
  const message = "Harsh braking detected"
  return createAlert(companyId, "harsh_braking", "high", message, vehicleId)
}
