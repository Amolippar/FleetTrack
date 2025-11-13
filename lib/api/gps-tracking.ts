import { createClient } from "@/lib/supabase/server"

export async function getLatestTracking() {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from("gps_tracking")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(100)

  if (error) throw error
  return data
}

export async function getVehicleTrackingHistory(vehicleId: string, hours = 24) {
  const supabase = await createClient()

  const cutoffTime = new Date(Date.now() - hours * 60 * 60 * 1000).toISOString()

  const { data, error } = await supabase
    .from("gps_tracking")
    .select("*")
    .eq("vehicle_id", vehicleId)
    .gte("created_at", cutoffTime)
    .order("created_at", { ascending: true })

  if (error) throw error
  return data
}

export async function insertGPSTracking(
  vehicleId: string,
  latitude: number,
  longitude: number,
  speed: number,
  heading: number,
  driverId?: string,
) {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from("gps_tracking")
    .insert({
      vehicle_id: vehicleId,
      driver_id: driverId,
      latitude,
      longitude,
      speed_kmh: speed,
      heading,
    })
    .select()
    .single()

  if (error) throw error
  return data
}
