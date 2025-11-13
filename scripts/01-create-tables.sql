-- Create users table (extends Supabase auth)
CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY REFERENCES auth.users(id),
  email TEXT NOT NULL,
  full_name TEXT,
  phone TEXT,
  role TEXT NOT NULL DEFAULT 'driver',
  company_id UUID,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create companies table
CREATE TABLE IF NOT EXISTS companies (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  address TEXT,
  phone TEXT,
  email TEXT,
  max_vehicles INTEGER DEFAULT 100,
  subscription_status TEXT DEFAULT 'active',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create vehicles table
CREATE TABLE IF NOT EXISTS vehicles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  company_id UUID NOT NULL REFERENCES companies(id),
  registration_number TEXT NOT NULL UNIQUE,
  make TEXT NOT NULL,
  model TEXT NOT NULL,
  year INTEGER,
  vehicle_type TEXT,
  status TEXT DEFAULT 'active',
  fuel_type TEXT,
  vin TEXT UNIQUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create drivers table
CREATE TABLE IF NOT EXISTS drivers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  company_id UUID NOT NULL REFERENCES companies(id),
  user_id UUID REFERENCES users(id),
  license_number TEXT UNIQUE NOT NULL,
  license_expiry DATE,
  phone TEXT,
  status TEXT DEFAULT 'active',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create vehicle assignments table
CREATE TABLE IF NOT EXISTS vehicle_assignments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  vehicle_id UUID NOT NULL REFERENCES vehicles(id),
  driver_id UUID NOT NULL REFERENCES drivers(id),
  assigned_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  completed_at TIMESTAMP WITH TIME ZONE,
  status TEXT DEFAULT 'assigned'
);

-- Create routes table
CREATE TABLE IF NOT EXISTS routes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  company_id UUID NOT NULL REFERENCES companies(id),
  vehicle_assignment_id UUID REFERENCES vehicle_assignments(id),
  name TEXT NOT NULL,
  start_location TEXT NOT NULL,
  end_location TEXT NOT NULL,
  distance_km DECIMAL(10,2),
  estimated_duration_minutes INTEGER,
  status TEXT DEFAULT 'planned',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create gps tracking table
CREATE TABLE IF NOT EXISTS gps_tracking (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  vehicle_id UUID NOT NULL REFERENCES vehicles(id),
  driver_id UUID REFERENCES drivers(id),
  latitude DECIMAL(10, 8),
  longitude DECIMAL(11, 8),
  speed_kmh DECIMAL(6,2),
  heading INTEGER,
  altitude DECIMAL(8,2),
  accuracy DECIMAL(6,2),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create geofences table
CREATE TABLE IF NOT EXISTS geofences (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  company_id UUID NOT NULL REFERENCES companies(id),
  name TEXT NOT NULL,
  latitude DECIMAL(10, 8),
  longitude DECIMAL(11, 8),
  radius_meters INTEGER,
  fence_type TEXT DEFAULT 'inclusion',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create alerts table
CREATE TABLE IF NOT EXISTS alerts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  company_id UUID NOT NULL REFERENCES companies(id),
  vehicle_id UUID REFERENCES vehicles(id),
  alert_type TEXT NOT NULL,
  severity TEXT DEFAULT 'medium',
  message TEXT,
  is_resolved BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  resolved_at TIMESTAMP WITH TIME ZONE
);

-- Create maintenance records table
CREATE TABLE IF NOT EXISTS maintenance_records (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  vehicle_id UUID NOT NULL REFERENCES vehicles(id),
  service_type TEXT NOT NULL,
  description TEXT,
  cost DECIMAL(10,2),
  service_date DATE,
  next_service_date DATE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create fuel logs table
CREATE TABLE IF NOT EXISTS fuel_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  vehicle_id UUID NOT NULL REFERENCES vehicles(id),
  driver_id UUID REFERENCES drivers(id),
  quantity_liters DECIMAL(8,2),
  cost DECIMAL(10,2),
  odometer_reading INTEGER,
  fuel_station TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better query performance
CREATE INDEX idx_vehicles_company ON vehicles(company_id);
CREATE INDEX idx_drivers_company ON drivers(company_id);
CREATE INDEX idx_routes_company ON routes(company_id);
CREATE INDEX idx_gps_vehicle ON gps_tracking(vehicle_id);
CREATE INDEX idx_gps_created ON gps_tracking(created_at DESC);
CREATE INDEX idx_alerts_company ON alerts(company_id);
CREATE INDEX idx_maintenance_vehicle ON maintenance_records(vehicle_id);
CREATE INDEX idx_fuel_vehicle ON fuel_logs(vehicle_id);

-- Enable RLS
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE companies ENABLE ROW LEVEL SECURITY;
ALTER TABLE vehicles ENABLE ROW LEVEL SECURITY;
ALTER TABLE drivers ENABLE ROW LEVEL SECURITY;
ALTER TABLE vehicle_assignments ENABLE ROW LEVEL SECURITY;
ALTER TABLE routes ENABLE ROW LEVEL SECURITY;
ALTER TABLE gps_tracking ENABLE ROW LEVEL SECURITY;
ALTER TABLE geofences ENABLE ROW LEVEL SECURITY;
ALTER TABLE alerts ENABLE ROW LEVEL SECURITY;
ALTER TABLE maintenance_records ENABLE ROW LEVEL SECURITY;
ALTER TABLE fuel_logs ENABLE ROW LEVEL SECURITY;

-- Create RLS policies
-- Users can only see their own data
CREATE POLICY "Users can only view their own data" ON users
  FOR SELECT USING (auth.uid() = id);

-- Companies - users in the company can see it
CREATE POLICY "Users can view their company" ON companies
  FOR SELECT USING (
    EXISTS (SELECT 1 FROM users WHERE users.id = auth.uid() AND users.company_id = companies.id)
  );

-- Vehicles - visible to users in the company
CREATE POLICY "Users can view company vehicles" ON vehicles
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM users 
      WHERE users.id = auth.uid() AND users.company_id = vehicles.company_id
    )
  );

-- Drivers - visible to users in the company
CREATE POLICY "Users can view company drivers" ON drivers
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM users 
      WHERE users.id = auth.uid() AND users.company_id = drivers.company_id
    )
  );

-- GPS Tracking - visible to authorized users
CREATE POLICY "Users can view vehicle tracking" ON gps_tracking
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM vehicles v
      JOIN users u ON u.company_id = v.company_id
      WHERE u.id = auth.uid() AND v.id = gps_tracking.vehicle_id
    )
  );

-- Routes - visible to company users
CREATE POLICY "Users can view company routes" ON routes
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM users 
      WHERE users.id = auth.uid() AND users.company_id = routes.company_id
    )
  );

-- Geofences - visible to company users
CREATE POLICY "Users can view company geofences" ON geofences
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM users 
      WHERE users.id = auth.uid() AND users.company_id = geofences.company_id
    )
  );

-- Alerts - visible to company users
CREATE POLICY "Users can view company alerts" ON alerts
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM users 
      WHERE users.id = auth.uid() AND users.company_id = alerts.company_id
    )
  );

-- Maintenance - visible to company users
CREATE POLICY "Users can view company maintenance" ON maintenance_records
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM vehicles v
      JOIN users u ON u.company_id = v.company_id
      WHERE u.id = auth.uid() AND v.id = maintenance_records.vehicle_id
    )
  );

-- Fuel logs - visible to company users
CREATE POLICY "Users can view company fuel logs" ON fuel_logs
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM vehicles v
      JOIN users u ON u.company_id = v.company_id
      WHERE u.id = auth.uid() AND v.id = fuel_logs.vehicle_id
    )
  );
