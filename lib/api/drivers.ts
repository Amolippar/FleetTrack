import { createClient } from "@/lib/supabase/server"

export async function createDriver(data: any, companyId: string) {
  const supabase = await createClient()

  const { data: driver, error } = await supabase
    .from("drivers")
    .insert({
      ...data,
      company_id: companyId,
      status: "active",
    })
    .select()
    .single()

  if (error) throw error
  return driver
}

export async function updateDriver(driverId: string, data: any) {
  const supabase = await createClient()

  const { data: driver, error } = await supabase.from("drivers").update(data).eq("id", driverId).select().single()

  if (error) throw error
  return driver
}

export async function deleteDriver(driverId: string) {
  const supabase = await createClient()

  const { error } = await supabase.from("drivers").delete().eq("id", driverId)

  if (error) throw error
}

export async function assignDriverToVehicle(vehicleId: string, driverId: string) {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from("vehicle_assignments")
    .insert({
      vehicle_id: vehicleId,
      driver_id: driverId,
      status: "assigned",
    })
    .select()
    .single()

  if (error) throw error
  return data
}

export async function getDriversByCompany(companyId: string) {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from("drivers")
    .select("*")
    .eq("company_id", companyId)
    .order("created_at", { ascending: false })

  if (error) throw error
  return data
}
