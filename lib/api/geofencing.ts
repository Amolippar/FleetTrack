import { createClient } from "@/lib/supabase/server"

const EARTH_RADIUS_METERS = 6371000

function degreesToRadians(degrees: number) {
  return degrees * (Math.PI / 180)
}

export function calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const dLat = degreesToRadians(lat2 - lat1)
  const dLon = degreesToRadians(lon2 - lon1)

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(degreesToRadians(lat1)) * Math.cos(degreesToRadians(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2)

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
  return EARTH_RADIUS_METERS * c
}

export async function checkGeofenceBreach(vehicleId: string, latitude: number, longitude: number) {
  const supabase = await createClient()

  const { data: geofences, error: geoError } = await supabase.from("geofences").select("*")

  if (geoError) throw geoError

  const breaches = []

  for (const geofence of geofences || []) {
    const distance = calculateDistance(latitude, longitude, geofence.latitude, geofence.longitude)

    const isInside = distance <= geofence.radius_meters
    const isBreach =
      (geofence.fence_type === "inclusion" && !isInside) || (geofence.fence_type === "exclusion" && isInside)

    if (isBreach) {
      breaches.push({
        geofence_id: geofence.id,
        geofence_name: geofence.name,
        fence_type: geofence.fence_type,
        distance,
      })
    }
  }

  return breaches
}

export async function createGeofence(data: any, companyId: string) {
  const supabase = await createClient()

  const { data: geofence, error } = await supabase
    .from("geofences")
    .insert({
      ...data,
      company_id: companyId,
    })
    .select()
    .single()

  if (error) throw error
  return geofence
}

export async function updateGeofence(geofenceId: string, data: any) {
  const supabase = await createClient()

  const { data: geofence, error } = await supabase.from("geofences").update(data).eq("id", geofenceId).select().single()

  if (error) throw error
  return geofence
}

export async function deleteGeofence(geofenceId: string) {
  const supabase = await createClient()

  const { error } = await supabase.from("geofences").delete().eq("id", geofenceId)

  if (error) throw error
}

export async function getGeofencesByCompany(companyId: string) {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from("geofences")
    .select("*")
    .eq("company_id", companyId)
    .order("created_at", { ascending: false })

  if (error) throw error
  return data
}
