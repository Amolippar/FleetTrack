import { createClient } from "@/lib/supabase/server"

export async function createVehicle(data: any, companyId: string) {
  const supabase = await createClient()

  const { data: vehicle, error } = await supabase
    .from("vehicles")
    .insert({
      ...data,
      company_id: companyId,
      status: "active",
    })
    .select()
    .single()

  if (error) throw error
  return vehicle
}

export async function updateVehicle(vehicleId: string, data: any) {
  const supabase = await createClient()

  const { data: vehicle, error } = await supabase.from("vehicles").update(data).eq("id", vehicleId).select().single()

  if (error) throw error
  return vehicle
}

export async function deleteVehicle(vehicleId: string) {
  const supabase = await createClient()

  const { error } = await supabase.from("vehicles").delete().eq("id", vehicleId)

  if (error) throw error
}

export async function getVehiclesByCompany(companyId: string) {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from("vehicles")
    .select("*")
    .eq("company_id", companyId)
    .order("created_at", { ascending: false })

  if (error) throw error
  return data
}
