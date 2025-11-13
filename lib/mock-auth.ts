// Mock authentication for v0 preview
export const mockUsers = [{ email: "demo@example.com", password: "demo123456", id: "user-1", company_id: "company-1" }]

export const mockSession = {
  user: null as any,
  isAuthenticated: false,
}

export async function mockSignIn(email: string, password: string) {
  const user = mockUsers.find((u) => u.email === email && u.password === password)
  if (!user) {
    throw new Error("Invalid email or password")
  }
  mockSession.user = user
  mockSession.isAuthenticated = true
  localStorage.setItem("auth_session", JSON.stringify(mockSession))
  return user
}

export async function mockSignOut() {
  mockSession.user = null
  mockSession.isAuthenticated = false
  localStorage.removeItem("auth_session")
}

export function getSession() {
  if (typeof window !== "undefined") {
    const stored = localStorage.getItem("auth_session")
    if (stored) {
      const parsed = JSON.parse(stored)
      return parsed
    }
  }
  return { user: null, isAuthenticated: false }
}
