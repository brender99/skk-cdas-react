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

// Reports
import WorkerReport from './pages/reports/WorkerReport'
import BayReport from './pages/reports/BayReport'
import StockReport from './pages/reports/StockReport'
import BayCementReport from './pages/reports/BayCementReport'
import StockCementReport from './pages/reports/StockCementReport'
import CouponReport from './pages/reports/CouponReport'
import ClampReport from './pages/reports/ClampReport'
import SummaryReport from './pages/reports/SummaryReport'

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
      {
        path: '/reports/workers',
        element: <WorkerReport />
      },
      {
        path: '/reports/bay',
        element: <BayReport />
      },
      {
        path: '/reports/stock',
        element: <StockReport />
      },
      {
        path: '/reports/bay-cement',
        element: <BayCementReport />
      },
      {
        path: '/reports/stock-cement',
        element: <StockCementReport />
      },
      {
        path: '/reports/coupon',
        element: <CouponReport />
      },
      {
        path: '/reports/clamp',
        element: <ClampReport />
      },
      {
        path: '/reports/summary',
        element: <SummaryReport />
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
  );
}