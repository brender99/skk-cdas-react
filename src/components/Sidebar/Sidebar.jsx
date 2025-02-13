import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  ChevronLeft,
  ChevronRight,
  LogOut,
  Truck,
  User,
  Building2
} from 'lucide-react';

const Sidebar = ({ user, onLogout, items = [], onToggle }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [openSubmenu, setOpenSubmenu] = useState(null);
  const location = useLocation();

  // Check window width on mount and resize
  useEffect(() => {
    const checkWidth = () => {
      const shouldCollapse = window.innerWidth <= 1024;
      setIsCollapsed(shouldCollapse);
      onToggle?.(shouldCollapse);
    };

    checkWidth();
    window.addEventListener('resize', checkWidth);
    return () => window.removeEventListener('resize', checkWidth);
  }, [onToggle]);

  const toggleSidebar = () => {
    const newState = !isCollapsed;
    setIsCollapsed(newState);
    onToggle?.(newState);
  };

  const toggleSubmenu = (index) => {
    if (!isCollapsed) {
      setOpenSubmenu(openSubmenu === index ? null : index);
    }
  };

  return (
    <div 
      className={`h-screen bg-gradient-to-b from-primary-900 to-primary-800 text-white transition-all duration-300 ease-in-out
        ${isCollapsed ? 'w-16' : 'w-64'} fixed left-0 top-0 z-50 shadow-xl`}
    >
      <div className="flex flex-col h-full">
        {/* Header with Logo */}
        <div className="p-4 flex flex-col items-center border-b border-white/10">
          <div className="flex items-center justify-between w-full mb-2">
            {!isCollapsed && (
              <div className="flex items-center">
                <Truck size={24} className="text-white" />
                <span className="text-xl font-bold ml-2 text-white">CDAS</span>
              </div>
            )}
            <button
              onClick={toggleSidebar}
              className="p-1.5 rounded-lg hover:bg-white/10 transition-colors"
              aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
            >
              {isCollapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
            </button>
          </div>
          
          {/* User Info Section */}
          {!isCollapsed && user && (
            <div className="w-full p-3 rounded-lg bg-white/5 mb-2">
              <div className="flex items-center">
                <User size={18} className="text-white/90" />
                <span className="ml-2 text-sm font-medium text-white">{user.username}</span>
              </div>
            </div>
          )}
        </div>

        {/* Navigation Menu */}
        <nav className="flex-1 overflow-y-auto">
          <ul className="py-4 px-2">
            {items.map((item, index) => (
              <li key={item.path || index}>
                {item.submenu ? (
                  <div className="mb-2">
                    <button
                      onClick={() => toggleSubmenu(index)}
                      className={`w-full flex items-center px-3 py-2 rounded-lg hover:bg-white/10 transition-colors
                        ${location.pathname.startsWith(item.path) ? 'bg-white/20' : ''}`}
                    >
                      <span className="flex items-center">
                        {item.icon && <span className="text-white/90">{item.icon}</span>}
                        {!isCollapsed && (
                          <span className="ml-3 text-white">{item.title}</span>
                        )}
                      </span>
                    </button>
                    {!isCollapsed && openSubmenu === index && (
                      <ul className="ml-4 mt-2 space-y-1">
                        {item.submenu.map((subItem) => (
                          <li key={subItem.path}>
                            <Link
                              to={subItem.path}
                              className={`block px-3 py-2 text-sm hover:bg-white/10 transition-colors rounded-lg
                                ${location.pathname === subItem.path ? 'bg-white/20 text-white' : 'text-white/80'}`}
                            >
                              {subItem.title}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                ) : (
                  <Link
                    to={item.path}
                    className={`flex items-center px-3 py-2 mb-2 rounded-lg hover:bg-white/10 transition-colors
                      ${location.pathname === item.path ? 'bg-white/20' : ''}`}
                  >
                    {item.icon && <span className="text-white/90">{item.icon}</span>}
                    {!isCollapsed && <span className="ml-3 text-white">{item.title}</span>}
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </nav>

        {/* Logout Button */}
        <div className="p-4 border-t border-white/10">
          <button
            onClick={onLogout}
            className="w-full flex items-center px-3 py-2 hover:bg-white/10 transition-colors rounded-lg text-white/90 hover:text-white"
          >
            <LogOut size={20} />
            {!isCollapsed && <span className="ml-3">ออกจากระบบ</span>}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
