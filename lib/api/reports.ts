import { createClient } from "@/lib/supabase/server"

export async function generateTripsReport(companyId: string, startDate: Date, endDate: Date) {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from("routes")
    .select("*, vehicle_assignments(driver_id)")
    .eq("company_id", companyId)
    .gte("created_at", startDate.toISOString())
    .lte("created_at", endDate.toISOString())

  if (error) throw error
  return data
}

export async function generateFuelReport(companyId: string, startDate: Date, endDate: Date) {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from("fuel_logs")
    .select("*")
    .gte("created_at", startDate.toISOString())
    .lte("created_at", endDate.toISOString())

  if (error) throw error
  return data
}

export async function generateMaintenanceReport(companyId: string) {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from("maintenance_records")
    .select("*")
    .order("service_date", { ascending: false })

  if (error) throw error
  return data
}

export async function generateDriverPerformanceReport(companyId: string) {
  const supabase = await createClient()

  const { data: drivers, error } = await supabase
    .from("drivers")
    .select("*, vehicle_assignments(*)")
    .eq("company_id", companyId)

  if (error) throw error
  return drivers
}

export async function exportReportAsCSV(data: any[], filename: string) {
  if (!data || data.length === 0) {
    throw new Error("No data to export")
  }

  const headers = Object.keys(data[0])
  const csv = [
    headers.join(","),
    ...data.map((row) =>
      headers
        .map((header) => {
          const value = row[header]
          if (typeof value === "string" && value.includes(",")) {
            return `"${value}"`
          }
          return value
        })
        .join(","),
    ),
  ].join("\n")

  const blob = new Blob([csv], { type: "text/csv" })
  const url = window.URL.createObjectURL(blob)
  const a = document.createElement("a")
  a.href = url
  a.download = `${filename}-${Date.now()}.csv`
  document.body.appendChild(a)
  a.click()
  window.URL.revokeObjectURL(url)
  document.body.removeChild(a)
}
