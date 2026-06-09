import { useAuth } from "../../context/AuthContext";
import { useTheme } from "../../context/ThemeContext";
import { useSearch } from "../../context/SearchContext";
import Button from "../Button/Button";
import { Search, LogOut, Bell, User, Sun, Moon, X } from "lucide-react";
import "./Navbar.css";

export default function Navbar() {
  const { logout, user } = useAuth();
  const { isDark, toggleTheme } = useTheme();
  const { searchTerm, setSearchTerm } = useSearch();

  return (
    <header className="topbar">
      <div className="topbar-search">
        <Search size={18} className="search-icon" />
        <input 
          type="text" 
          placeholder="Buscar..." 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        {searchTerm && (
          <X 
            size={16} 
            className="clear-search" 
            onClick={() => setSearchTerm("")} 
            style={{ cursor: 'pointer', color: '#9ca3af' }}
          />
        )}
      </div>
      
      <div className="topbar-actions">
        <button className="icon-btn" onClick={toggleTheme}>
          {isDark ? <Sun size={20} /> : <Moon size={20} />}
        </button>
        <button className="icon-btn"><Bell size={20} /></button>
        <div className="user-profile">
          <div className="user-info">
            <span className="user-name">{user?.nombre || 'Usuario'}</span>
            <span className="user-role">{user?.role === 'ROLE_ADMIN' ? 'Administrador' : 'Cliente'}</span>
          </div>
          <div className="user-avatar">
            <User size={20} />
          </div>
        </div>
        <Button variant="secondary" onClick={logout} className="logout-btn">
          <LogOut size={16} />
          <span>Cerrar Sesión</span>
        </Button>
      </div>
    </header>
  );
}
