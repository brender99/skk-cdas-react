import { createContext, useContext, useState, startTransition } from 'react'

const AuthContext = createContext(null)

// Mock credentials
const VALID_CREDENTIALS = {
  skk: { password: 'skk@dmin', role: 'SKK', plants: ['MAIN'] },
  smk: { password: 'smk@dmin', role: 'SMK', plants: ['KK1', 'KK2'] }
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('user')
    return savedUser ? JSON.parse(savedUser) : null
  })

  const login = async ({ username, password }) => {
    // Convert username to lowercase for case-insensitive comparison
    const normalizedUsername = username.toLowerCase()
    
    // Check if username exists and password matches
    const userCredentials = VALID_CREDENTIALS[normalizedUsername]
    if (!userCredentials || userCredentials.password !== password) {
      throw new Error('ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง')
    }

    // Create user object
    const userData = {
      username: normalizedUsername,
      role: userCredentials.role,
      plants: userCredentials.plants,
      currentPlant: userCredentials.plants[0] // Default to first plant
    }

    // Save to localStorage and state
    localStorage.setItem('user', JSON.stringify(userData))
    startTransition(() => {
      setUser(userData)
    })
  }

  const logout = () => {
    localStorage.removeItem('user')
    startTransition(() => {
      setUser(null)
    })
  }

  const switchPlant = (plantId) => {
    if (!user || !user.plants.includes(plantId)) {
      throw new Error('ไม่มีสิทธิ์ในการเข้าถึงโรงงานนี้')
    }

    const updatedUser = {
      ...user,
      currentPlant: plantId
    }

    localStorage.setItem('user', JSON.stringify(updatedUser))
    startTransition(() => {
      setUser(updatedUser)
    })
  }

  return (
    <AuthContext.Provider value={{ user, login, logout, switchPlant }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
