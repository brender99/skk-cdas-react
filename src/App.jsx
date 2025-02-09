// src/App.jsx
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import { AuthProvider } from './context/AuthContext'
import MainLayout from './components/layout/MainLayout'

// Pages
import Login from './pages/auth/Login'
import Dashboard from './pages/dashboard/Dashboard'
import TruckStatus from './pages/trucks/TruckStatus'
import Workers from './pages/workers/Workers'

// Reports - SKK
import SKKWorkerReport from './pages/reports/skk/WorkerReport'
import SKKBayReport from './pages/reports/skk/BayReport'
import SKKStockReport from './pages/reports/skk/StockReport'
import SKKBayCementReport from './pages/reports/skk/BayCementReport'
import SKKStockCementReport from './pages/reports/skk/StockCementReport'
import SKKCouponReport from './pages/reports/skk/CouponReport'

// Reports - SMK
import SMKWorkerReport from './pages/reports/smk/WorkerReport'
import SMKClampReport from './pages/reports/smk/ClampReport'
import SMKSummaryReport from './pages/reports/smk/SummaryReport'

const router = createBrowserRouter([
  {
    path: '/login',
    element: (
      <AuthProvider>
        <Login />
      </AuthProvider>
    )
  },
  {
    element: (
      <AuthProvider>
        <MainLayout />
      </AuthProvider>
    ),
    children: [
      {
        path: '/',
        element: <Dashboard />
      },
      {
        path: '/trucks',
        element: <TruckStatus />
      },
      {
        path: '/workers',
        element: <Workers />
      },
      // SKK Reports
      {
        path: '/reports/skk/workers',
        element: <SKKWorkerReport />
      },
      {
        path: '/reports/skk/bay',
        element: <SKKBayReport />
      },
      {
        path: '/reports/skk/stock',
        element: <SKKStockReport />
      },
      {
        path: '/reports/skk/bay-cement',
        element: <SKKBayCementReport />
      },
      {
        path: '/reports/skk/stock-cement',
        element: <SKKStockCementReport />
      },
      {
        path: '/reports/skk/coupon',
        element: <SKKCouponReport />
      },
      // SMK Reports
      {
        path: '/reports/smk/workers',
        element: <SMKWorkerReport />
      },
      {
        path: '/reports/smk/clamp',
        element: <SMKClampReport />
      },
      {
        path: '/reports/smk/summary',
        element: <SMKSummaryReport />
      }
    ]
  },
  {
    path: '*',
    element: <Navigate to="/" replace />
  }
], {
  future: {
    v7_startTransition: true,
    v7_relativeSplatPath: true
  }
});

export default function App() {
  return (
    <>
      <RouterProvider 
        router={router}
        future={{
          v7_startTransition: true
        }}
      />
      <Toaster position="top-right" />
    </>
  )
}