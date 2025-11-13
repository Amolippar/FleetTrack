"use client"

import { useEffect, useState, useCallback } from "react"
import { getSupabaseClient } from "@/lib/supabase/client"
import type { Alert } from "@/lib/types"

export function useAlerts(companyId?: string) {
  const [alerts, setAlerts] = useState<Alert[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchAlerts = useCallback(async () => {
    try {
      const supabase = getSupabaseClient()
      let query = supabase
        .from("alerts")
        .select("*")
        .eq("is_resolved", false)
        .order("created_at", { ascending: false })
        .limit(50)

      if (companyId) {
        query = query.eq("company_id", companyId)
      }

      const { data, error: err } = await query

      if (err) throw err
      setAlerts(data || [])
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch alerts")
    } finally {
      setLoading(false)
    }
  }, [companyId])

  useEffect(() => {
    fetchAlerts()

    const supabase = getSupabaseClient()
    const channel = supabase
      .channel("alerts_changes")
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "alerts",
        },
        (payload) => {
          const newAlert = payload.new as Alert
          if (!companyId || newAlert.company_id === companyId) {
            setAlerts((prev) => [newAlert, ...prev])
          }
        },
      )
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [fetchAlerts, companyId])

  const resolveAlert = useCallback(async (alertId: string) => {
    try {
      const supabase = getSupabaseClient()
      const { error: err } = await supabase.from("alerts").update({ is_resolved: true }).eq("id", alertId)

      if (err) throw err
      setAlerts((prev) => prev.filter((a) => a.id !== alertId))
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to resolve alert")
    }
  }, [])

  return { alerts, loading, error, refetch: fetchAlerts, resolveAlert }
}
