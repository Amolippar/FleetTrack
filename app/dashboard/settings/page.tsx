"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Settings, Bell, Lock, Users, Palette, Database, Save } from "lucide-react"
import { Header } from "@/components/layout/header"
import { Sidebar } from "@/components/layout/sidebar"
import { useTheme } from "@/components/theme/theme-provider"

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("general")
  const { theme, setTheme } = useTheme()
  const [saved, setSaved] = useState(false)

  const handleSave = () => {
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  const tabs = [
    { id: "general", label: "General", icon: Settings },
    { id: "notifications", label: "Notifications", icon: Bell },
    { id: "security", label: "Security", icon: Lock },
    { id: "team", label: "Team", icon: Users },
    { id: "appearance", label: "Appearance", icon: Palette },
    { id: "data", label: "Data", icon: Database },
  ]

  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header user={{ email: "user@example.com" }} />
        <main className="flex-1 overflow-auto">
          <div className="p-6 space-y-6">
            <h1 className="text-3xl font-bold text-foreground">Settings</h1>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
              <div className="lg:col-span-1">
                <Card className="border border-border/50 bg-card/50 p-4">
                  <div className="space-y-2">
                    {tabs.map((tab) => {
                      const Icon = tab.icon
                      return (
                        <button
                          key={tab.id}
                          onClick={() => setActiveTab(tab.id)}
                          className={`w-full flex items-center gap-3 px-4 py-2 rounded-lg transition-colors text-sm font-medium ${
                            activeTab === tab.id
                              ? "bg-primary text-primary-foreground"
                              : "text-muted-foreground hover:bg-muted/50"
                          }`}
                        >
                          <Icon className="w-4 h-4" />
                          {tab.label}
                        </button>
                      )
                    })}
                  </div>
                </Card>
              </div>

              <div className="lg:col-span-3">
                {activeTab === "general" && (
                  <Card className="border border-border/50 bg-card/50 p-6">
                    <h2 className="text-xl font-semibold text-foreground mb-6">General Settings</h2>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-2">Company Name</label>
                        <Input
                          defaultValue="FleetTrack Inc."
                          placeholder="Your Company"
                          className="bg-input border-border/50"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-2">Email</label>
                        <Input
                          defaultValue="admin@company.com"
                          placeholder="company@example.com"
                          className="bg-input border-border/50"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-2">Phone</label>
                        <Input
                          defaultValue="+1-555-0000"
                          placeholder="+1-555-0000"
                          className="bg-input border-border/50"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-2">Address</label>
                        <Input
                          defaultValue="123 Fleet Street, City, State 12345"
                          placeholder="Company address"
                          className="bg-input border-border/50"
                        />
                      </div>
                      <Button onClick={handleSave} className="bg-primary hover:bg-primary/90 text-primary-foreground">
                        <Save className="w-4 h-4 mr-2" />
                        Save Changes
                      </Button>
                      {saved && <p className="text-sm text-green-600">Changes saved successfully!</p>}
                    </div>
                  </Card>
                )}

                {activeTab === "notifications" && (
                  <Card className="border border-border/50 bg-card/50 p-6">
                    <h2 className="text-xl font-semibold text-foreground mb-6">Notification Preferences</h2>
                    <div className="space-y-4">
                      <label className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted/50 cursor-pointer">
                        <input type="checkbox" defaultChecked className="w-4 h-4 rounded" />
                        <div>
                          <p className="font-medium text-foreground">Critical Alerts</p>
                          <p className="text-sm text-muted-foreground">Speeding, harsh braking, geofence violations</p>
                        </div>
                      </label>
                      <label className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted/50 cursor-pointer">
                        <input type="checkbox" defaultChecked className="w-4 h-4 rounded" />
                        <div>
                          <p className="font-medium text-foreground">Maintenance Reminders</p>
                          <p className="text-sm text-muted-foreground">Scheduled maintenance and service alerts</p>
                        </div>
                      </label>
                      <label className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted/50 cursor-pointer">
                        <input type="checkbox" defaultChecked className="w-4 h-4 rounded" />
                        <div>
                          <p className="font-medium text-foreground">Daily Reports</p>
                          <p className="text-sm text-muted-foreground">Daily fleet summary and analytics</p>
                        </div>
                      </label>
                      <label className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted/50 cursor-pointer">
                        <input type="checkbox" className="w-4 h-4 rounded" />
                        <div>
                          <p className="font-medium text-foreground">Weekly Reports</p>
                          <p className="text-sm text-muted-foreground">Weekly performance and cost analysis</p>
                        </div>
                      </label>
                      <Button onClick={handleSave} className="bg-primary hover:bg-primary/90 text-primary-foreground">
                        <Save className="w-4 h-4 mr-2" />
                        Save Preferences
                      </Button>
                    </div>
                  </Card>
                )}

                {activeTab === "security" && (
                  <Card className="border border-border/50 bg-card/50 p-6">
                    <h2 className="text-xl font-semibold text-foreground mb-6">Security Settings</h2>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-2">Current Password</label>
                        <Input type="password" className="bg-input border-border/50" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-2">New Password</label>
                        <Input type="password" className="bg-input border-border/50" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-2">Confirm Password</label>
                        <Input type="password" className="bg-input border-border/50" />
                      </div>
                      <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
                        <Save className="w-4 h-4 mr-2" />
                        Update Password
                      </Button>

                      <div className="pt-6 border-t border-border/50">
                        <h3 className="font-semibold text-foreground mb-3">Two-Factor Authentication</h3>
                        <p className="text-sm text-muted-foreground mb-3">
                          Add an extra layer of security to your account
                        </p>
                        <Button variant="outline" className="border-border/50 bg-transparent">
                          Enable 2FA
                        </Button>
                      </div>
                    </div>
                  </Card>
                )}

                {activeTab === "appearance" && (
                  <Card className="border border-border/50 bg-card/50 p-6">
                    <h2 className="text-xl font-semibold text-foreground mb-6">Appearance Settings</h2>
                    <div className="space-y-6">
                      <div>
                        <p className="font-medium text-foreground mb-3">Theme</p>
                        <div className="flex gap-3">
                          <label
                            className={`flex items-center gap-2 p-4 rounded-lg border-2 cursor-pointer transition-all ${
                              theme === "dark" ? "border-primary bg-muted" : "border-border/50 hover:border-border"
                            }`}
                          >
                            <input
                              type="radio"
                              name="theme"
                              checked={theme === "dark"}
                              onChange={() => setTheme("dark")}
                              className="w-4 h-4"
                            />
                            <div>
                              <p className="font-medium text-foreground">Dark</p>
                              <p className="text-xs text-muted-foreground">Professional dark mode</p>
                            </div>
                          </label>
                          <label
                            className={`flex items-center gap-2 p-4 rounded-lg border-2 cursor-pointer transition-all ${
                              theme === "light" ? "border-primary bg-muted" : "border-border/50 hover:border-border"
                            }`}
                          >
                            <input
                              type="radio"
                              name="theme"
                              checked={theme === "light"}
                              onChange={() => setTheme("light")}
                              className="w-4 h-4"
                            />
                            <div>
                              <p className="font-medium text-foreground">Light</p>
                              <p className="text-xs text-muted-foreground">Bright light mode</p>
                            </div>
                          </label>
                        </div>
                      </div>

                      <div>
                        <p className="font-medium text-foreground mb-3">Color Scheme</p>
                        <div className="flex gap-3">
                          <button className="w-12 h-12 rounded-lg bg-blue-500 border-2 border-border/50 hover:border-border transition-all" />
                          <button className="w-12 h-12 rounded-lg bg-teal-500 border-2 border-primary transition-all" />
                          <button className="w-12 h-12 rounded-lg bg-green-500 border-2 border-border/50 hover:border-border transition-all" />
                          <button className="w-12 h-12 rounded-lg bg-purple-500 border-2 border-border/50 hover:border-border transition-all" />
                        </div>
                      </div>

                      <div>
                        <label className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted/50 cursor-pointer">
                          <input type="checkbox" defaultChecked className="w-4 h-4 rounded" />
                          <div>
                            <p className="font-medium text-foreground">Reduce Motion</p>
                            <p className="text-sm text-muted-foreground">Minimize animations and transitions</p>
                          </div>
                        </label>
                      </div>

                      <Button onClick={handleSave} className="bg-primary hover:bg-primary/90 text-primary-foreground">
                        <Save className="w-4 h-4 mr-2" />
                        Save Appearance
                      </Button>
                    </div>
                  </Card>
                )}

                {activeTab === "team" && (
                  <Card className="border border-border/50 bg-card/50 p-6">
                    <h2 className="text-xl font-semibold text-foreground mb-6">Team Members</h2>
                    <div className="space-y-4 mb-6">
                      <div className="p-4 rounded-lg border border-border/50 flex items-center justify-between">
                        <div>
                          <p className="font-medium text-foreground">admin@company.com</p>
                          <p className="text-sm text-muted-foreground">Administrator</p>
                        </div>
                        <Button variant="ghost" size="sm" disabled>
                          Owner
                        </Button>
                      </div>
                      <div className="p-4 rounded-lg border border-border/50 flex items-center justify-between">
                        <div>
                          <p className="font-medium text-foreground">manager@company.com</p>
                          <p className="text-sm text-muted-foreground">Fleet Manager</p>
                        </div>
                        <Button variant="outline" size="sm" className="border-border/50 bg-transparent">
                          Remove
                        </Button>
                      </div>
                    </div>
                    <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
                      Invite Team Member
                    </Button>
                  </Card>
                )}

                {activeTab === "data" && (
                  <Card className="border border-border/50 bg-card/50 p-6">
                    <h2 className="text-xl font-semibold text-foreground mb-6">Data Management</h2>
                    <div className="space-y-4">
                      <div className="p-4 rounded-lg bg-muted/50 border border-border/50">
                        <p className="font-medium text-foreground mb-2">Export All Data</p>
                        <p className="text-sm text-muted-foreground mb-3">Download all your fleet data as CSV</p>
                        <Button variant="outline" className="border-border/50 bg-transparent">
                          Export Data
                        </Button>
                      </div>
                      <div className="p-4 rounded-lg bg-muted/50 border border-border/50">
                        <p className="font-medium text-foreground mb-2">Database Maintenance</p>
                        <p className="text-sm text-muted-foreground mb-3">Optimize database and clear old records</p>
                        <Button variant="outline" className="border-border/50 bg-transparent">
                          Run Maintenance
                        </Button>
                      </div>
                      <div className="p-4 rounded-lg bg-destructive/5 border border-destructive/30">
                        <p className="font-medium text-foreground mb-2">Danger Zone</p>
                        <p className="text-sm text-muted-foreground mb-3">
                          Permanently delete your account and all associated data
                        </p>
                        <Button variant="destructive">Delete Account</Button>
                      </div>
                    </div>
                  </Card>
                )}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
