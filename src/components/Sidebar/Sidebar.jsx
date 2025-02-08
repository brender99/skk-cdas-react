import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  ChevronLeft,
  ChevronRight,
  LogOut
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
      className={`h-screen bg-gray-800 text-white transition-all duration-300 ease-in-out
        ${isCollapsed ? 'w-16' : 'w-64'} fixed left-0 top-0 z-50`}
    >
      <div className="flex flex-col h-full">
        {/* Header */}
        <div className="p-4 flex items-center justify-between border-b border-gray-700">
          {!isCollapsed && <span className="text-xl font-bold">CDAS</span>}
          <button
            onClick={toggleSidebar}
            className="p-2 rounded-lg hover:bg-gray-700 transition-colors"
            aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            {isCollapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
          </button>
        </div>

        {/* Navigation Menu */}
        <nav className="flex-1 overflow-y-auto">
          <ul className="py-4">
            {items.map((item, index) => (
              <li key={item.path || index}>
                {item.submenu ? (
                  <div className="mb-2">
                    <button
                      onClick={() => toggleSubmenu(index)}
                      className={`w-full flex items-center px-4 py-2 hover:bg-gray-700 transition-colors
                        ${location.pathname.startsWith(item.path) ? 'bg-gray-700' : ''}`}
                    >
                      <span className="flex items-center">
                        {item.icon}
                        {!isCollapsed && (
                          <span className="ml-3">{item.title}</span>
                        )}
                      </span>
                    </button>
                    {!isCollapsed && openSubmenu === index && (
                      <ul className="ml-4 mt-2 space-y-2">
                        {item.submenu.map((subItem) => (
                          <li key={subItem.path}>
                            <Link
                              to={subItem.path}
                              className={`block px-4 py-2 hover:bg-gray-700 transition-colors rounded-lg
                                ${location.pathname === subItem.path ? 'bg-gray-700' : ''}`}
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
                    className={`flex items-center px-4 py-2 mb-2 hover:bg-gray-700 transition-colors
                      ${location.pathname === item.path ? 'bg-gray-700' : ''}`}
                  >
                    {item.icon}
                    {!isCollapsed && <span className="ml-3">{item.title}</span>}
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </nav>

        {/* Logout Button */}
        <div className="p-4 border-t border-gray-700">
          <button
            onClick={onLogout}
            className="w-full flex items-center px-4 py-2 hover:bg-gray-700 transition-colors rounded-lg"
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
