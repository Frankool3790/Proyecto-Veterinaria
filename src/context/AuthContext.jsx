import { createContext, useState, useContext, useEffect } from "react";
import api from "../services/api";

export const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth debe ser usado dentro de un AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");
    const cliente_id = localStorage.getItem("cliente_id");
    const userData = JSON.parse(localStorage.getItem("userData") || "{}");

    if (token) {
      setUser({ ...userData, token, role, cliente_id });
      api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    }
    setLoading(false);
  }, []);

  const login = async (username, password) => {
    try {
      const response = await api.post("/auth/login", { username, password });
      const { token, role, cliente_id, ...userData } = response.data;
      
      localStorage.setItem("token", token);
      localStorage.setItem("role", role);
      if (cliente_id) localStorage.setItem("cliente_id", cliente_id);
      localStorage.setItem("userData", JSON.stringify(userData));

      api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      setUser({ ...userData, token, role, cliente_id });
      return { success: true };
    } catch (error) {
      console.error("Error en login:", error);
      return { 
        success: false, 
        message: error.response?.data?.message || "Error al iniciar sesión" 
      };
    }
  };

  const register = async (userData) => {
    try {
      const response = await api.post("/auth/register", userData);
      return { success: true, message: response.data.message };
    } catch (error) {
      console.error("Error en registro:", error);
      return { 
        success: false, 
        message: error.response?.data?.message || "Error al registrarse" 
      };
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("cliente_id");
    localStorage.removeItem("userData");
    delete api.defaults.headers.common["Authorization"];
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      login, 
      register, 
      logout, 
      isAuthenticated: !!user, 
      isAdmin: user?.role === 'ROLE_ADMIN',
      isClient: user?.role === 'ROLE_USER',
      clienteId: user?.cliente_id,
      loading 
    }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
