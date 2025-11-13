export type User = {
  id: string
  email: string
  full_name: string | null
  phone: string | null
  role: "admin" | "manager" | "driver"
  company_id: string | null
  created_at: string
  updated_at: string
}

export type Company = {
  id: string
  name: string
  address: string | null
  phone: string | null
  email: string | null
  max_vehicles: number
  subscription_status: "active" | "suspended" | "trial"
  created_at: string
  updated_at: string
}

export type Vehicle = {
  id: string
  company_id: string
  registration_number: string
  make: string
  model: string
  year: number | null
  vehicle_type: string | null
  status: "active" | "maintenance" | "inactive"
  fuel_type: string | null
  vin: string | null
  created_at: string
  updated_at: string
}

export type Driver = {
  id: string
  company_id: string
  user_id: string | null
  license_number: string
  license_expiry: string | null
  phone: string | null
  status: "active" | "inactive" | "suspended"
  created_at: string
  updated_at: string
}

export type VehicleAssignment = {
  id: string
  vehicle_id: string
  driver_id: string
  assigned_at: string
  completed_at: string | null
  status: "assigned" | "in_progress" | "completed"
}

export type GPSTracking = {
  id: string
  vehicle_id: string
  driver_id: string | null
  latitude: number
  longitude: number
  speed_kmh: number | null
  heading: number | null
  altitude: number | null
  accuracy: number | null
  created_at: string
}

export type Alert = {
  id: string
  company_id: string
  vehicle_id: string | null
  alert_type: "speeding" | "harsh_braking" | "geofence" | "maintenance" | "fuel"
  severity: "low" | "medium" | "high" | "critical"
  message: string
  is_resolved: boolean
  created_at: string
  resolved_at: string | null
}

export type Route = {
  id: string
  company_id: string
  vehicle_assignment_id: string | null
  name: string
  start_location: string
  end_location: string
  distance_km: number | null
  estimated_duration_minutes: number | null
  status: "planned" | "in_progress" | "completed" | "cancelled"
  created_at: string
  updated_at: string
}

export type Geofence = {
  id: string
  company_id: string
  name: string
  latitude: number
  longitude: number
  radius_meters: number
  fence_type: "inclusion" | "exclusion"
  created_at: string
  updated_at: string
}
