import { createClient } from "@/lib/supabase/server"

export async function updateCompanySettings(companyId: string, settings: any) {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from("companies")
    .update({
      ...settings,
      updated_at: new Date().toISOString(),
    })
    .eq("id", companyId)
    .select()
    .single()

  if (error) throw error
  return data
}

export async function getCompanySettings(companyId: string) {
  const supabase = await createClient()

  const { data, error } = await supabase.from("companies").select("*").eq("id", companyId).single()

  if (error) throw error
  return data
}

export async function updateUserPreferences(userId: string, preferences: any) {
  const supabase = await createClient()

  // Store preferences in a user profile table or use metadata
  const { data, error } = await supabase
    .from("users")
    .update({
      ...preferences,
      updated_at: new Date().toISOString(),
    })
    .eq("id", userId)
    .select()
    .single()

  if (error) throw error
  return data
}
