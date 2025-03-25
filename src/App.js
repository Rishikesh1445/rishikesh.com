import React, { useState, useEffect, useRef } from "react";
import { Home, User, FolderOpenDot, Phone, BookOpenText } from "lucide-react";
import AboutMePage from "./pages/AboutMe";
import HomePage from "./pages/HomePage";
import ProjectsPage from "./pages/Projects";
import BlogsPage from "./pages/Blog";
import ContactsPage from "./pages/Contact";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";

function App() {
  const [isOpen, setIsOpen] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const menuRef = useRef(null);

  const menuItems = [
    { icon: Home, element: HomePage, label: "Home", path: "/" },
    { icon: User, element: AboutMePage, label: "About Me", path: "/aboutMe" },
    {
      icon: FolderOpenDot,
      element: ProjectsPage,
      label: "Projects",
      path: "/projects",
    },
    { icon: Phone, element: ContactsPage, label: "Contact", path: "/contact" },
    { icon: BookOpenText, element: BlogsPage, label: "Blog", path: "/blog" },
  ];

  useEffect(() => {
    const handleDoubleClick = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
      setIsOpen(true);
    };

    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("dblclick", handleDoubleClick);
    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("dblclick", handleDoubleClick);
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const NavigationButtons = () => {
    const navigate = useNavigate();

    return (
      <div
        ref={menuRef}
        className={`fixed transition-all duration-300 z-50 ${
          isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        style={{
          left: position.x,
          top: position.y,
          transform: 'translate(-50%, -50%)'
        }}
      >
        {isOpen && (
          <div 
            className="fixed inset-0 bg-black/20 backdrop-blur-sm transition-opacity duration-300 -z-10"
          />
        )}
  
        <div className="relative">
          {menuItems.map((item, index) => {
            const angle = (index * 360) / menuItems.length;
            const radius = 100;
            const Icon = item.icon;
            
            return (
              <button
                key={item.label}
                onClick={() => {
                  setIsOpen(false);
                  navigate(item.path);
                }}
                className={`
                  absolute p-4 rounded-full bg-white shadow-lg
                  hover:bg-gray-50 hover:scale-110
                  transform transition-all duration-500 ease-in-out
                  group
                  ${isOpen ? 'scale-100' : 'scale-0'}
                `}
                style={{
                  transform: isOpen
                    ? `translate(${radius * Math.cos((angle * Math.PI) / 180)}px, ${
                        radius * Math.sin((angle * Math.PI) / 180)
                      }px) scale(1)`
                    : 'translate(0, 0) scale(0)',
                  transition: `transform 500ms ease ${index * 70}ms`
                }}
              >
                <Icon className="w-6 h-6 text-gray-600" />
                <span className="absolute bg-gray-800 text-white px-2 py-1 rounded text-sm 
                               opacity-0 group-hover:opacity-100 transition-opacity duration-200
                               whitespace-nowrap left-1/2 -translate-x-1/2 -bottom-8">
                  {item.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <Router>
      <NavigationButtons />
      <Routes>
        {menuItems.map((item) => (
          <Route key={item.path} path={item.path} element={<item.element />} />
        ))}
      </Routes>
    </Router>
  );
}

export default App;
