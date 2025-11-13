"use client"

import { useEffect, useState, useCallback } from "react"
import { getSupabaseClient } from "@/lib/supabase/client"
import type { GPSTracking } from "@/lib/types"

export function useGPSTracking(vehicleId?: string) {
  const [tracking, setTracking] = useState<GPSTracking[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchTracking = useCallback(async () => {
    try {
      const supabase = getSupabaseClient()
      let query = supabase.from("gps_tracking").select("*").order("created_at", { ascending: false }).limit(100)

      if (vehicleId) {
        query = query.eq("vehicle_id", vehicleId)
      }

      const { data, error: err } = await query

      if (err) throw err
      setTracking(data || [])
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch tracking data")
    } finally {
      setLoading(false)
    }
  }, [vehicleId])

  useEffect(() => {
    fetchTracking()

    // Set up real-time subscription
    const supabase = getSupabaseClient()
    const channel = supabase
      .channel("gps_tracking_changes")
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "gps_tracking",
        },
        (payload) => {
          setTracking((prev) => [payload.new as GPSTracking, ...prev].slice(0, 100))
        },
      )
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [fetchTracking])

  return { tracking, loading, error, refetch: fetchTracking }
}
