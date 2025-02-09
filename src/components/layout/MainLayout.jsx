import { useState } from 'react'
import { useAuth } from '../../context/AuthContext'
import { Navigate, Outlet, useLocation } from 'react-router-dom'
import Sidebar from '../Sidebar/Sidebar'
import { 
  LayoutDashboard,
  Truck,
  Users,
  ClipboardList
} from 'lucide-react'

const menuItems = {
  SKK: [
    { title: 'แดชบอร์ด', icon: <LayoutDashboard size={20} />, path: '/' },
    { title: 'จัดการรถ', icon: <Truck size={20} />, path: '/trucks' },
    { title: 'จัดการคนยก', icon: <Users size={20} />, path: '/workers' },
    { 
      title: 'รายงาน',
      icon: <ClipboardList size={20} />,
      path: '/reports/skk',
      submenu: [
        { title: 'รายงานคนยก', path: '/reports/skk/workers' },
        { title: 'รายงานรางจ่าย', path: '/reports/skk/bay' },
        { title: 'รายงานสต็อก', path: '/reports/skk/stock' },
        { title: 'รายงานการจ่ายปูนในรางจ่าย', path: '/reports/skk/bay-cement' },
        { title: 'รายงานการจ่ายปูนในสต็อก', path: '/reports/skk/stock-cement' },
        { title: 'รายงานการจ่ายคูปอง', path: '/reports/skk/coupon' }
      ]
    }
  ],
  SMK: [
    { title: 'แดชบอร์ด', icon: <LayoutDashboard size={20} />, path: '/' },
    { title: 'จัดการรถ', icon: <Truck size={20} />, path: '/trucks' },
    { title: 'จัดการคนยก', icon: <Users size={20} />, path: '/workers' },
    {
      title: 'รายงาน',
      icon: <ClipboardList size={20} />,
      path: '/reports/smk',
      submenu: [
        { title: 'รายงานคนยก', path: '/reports/smk/workers' },
        { title: 'รายงานรถ Clamp', path: '/reports/smk/clamp' },
        { title: 'รายงาน Summary', path: '/reports/smk/summary' }
      ]
    }
  ]
}

const MainLayout = () => {
  const { user, logout } = useAuth()
  const location = useLocation()
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(window.innerWidth <= 1024)

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  return (
    <div className="flex min-h-screen bg-gray-100 overflow-hidden">
      <Sidebar 
        user={user} 
        onLogout={logout} 
        items={menuItems[user.role] || []} 
        onToggle={setIsSidebarCollapsed}
      />
      <main 
        className={`flex-1 transition-all duration-300 ${
          isSidebarCollapsed ? 'ml-16' : 'ml-64'
        } overflow-auto`}
      >
        <div className="w-full px-2">
          <Outlet />
        </div>
      </main>
    </div>
  )
}

export default MainLayout
