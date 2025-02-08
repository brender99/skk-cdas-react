import { useAuth } from '../../context/AuthContext';
import SKKDashboard from './SKKDashboard';
import SMKDashboard from './SMKDashboard';

const Dashboard = () => {
  const { user } = useAuth();
  
  // Render appropriate dashboard based on user role
  return user?.role === 'SMK' ? <SMKDashboard /> : <SKKDashboard />;
};

export default Dashboard;
