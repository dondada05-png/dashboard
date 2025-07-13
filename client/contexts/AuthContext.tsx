import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { authenticator } from "otplib";

interface User {
  id: string;
  email: string;
  name: string;
  role: "admin";
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Check for existing session on mount
  useEffect(() => {
    const storedUser = localStorage.getItem("admin_user");
    const storedToken = localStorage.getItem("admin_token");

    if (storedUser && storedToken) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
      } catch (error) {
        console.error("Failed to parse stored user:", error);
        localStorage.removeItem("admin_user");
        localStorage.removeItem("admin_token");
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);

    try {
      // Simulate API call - in real app, this would be an actual API endpoint
      // For demo purposes, we'll use hardcoded credentials
      if (email === "admin@stroomup.com" && password === "admin123") {
        const adminUser: User = {
          id: "admin-1",
          email: "admin@stroomup.com",
          name: "Admin User",
          role: "admin",
        };

        // Simulate token generation
        const token = `admin_token_${Date.now()}`;

        // Store in localStorage (in production, consider using httpOnly cookies)
        localStorage.setItem("admin_user", JSON.stringify(adminUser));
        localStorage.setItem("admin_token", token);

        setUser(adminUser);
        setIsLoading(false);
        return true;
      } else {
        setIsLoading(false);
        return false;
      }
    } catch (error) {
      console.error("Login error:", error);
      setIsLoading(false);
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("admin_user");
    localStorage.removeItem("admin_token");
  };

  const isAuthenticated = !!user;

  const value = {
    user,
    isAuthenticated,
    isLoading,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
