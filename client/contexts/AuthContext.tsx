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
  twoFactorEnabled: boolean;
  twoFactorSecret?: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  requiresTwoFactor: boolean;
  tempUserId: string | null;
  login: (
    email: string,
    password: string,
  ) => Promise<{ success: boolean; requiresTwoFactor?: boolean }>;
  verifyTwoFactor: (token: string) => Promise<boolean>;
  setup2FA: () => Promise<{ secret: string; qrCodeUrl: string }>;
  enable2FA: (token: string) => Promise<boolean>;
  disable2FA: (password: string) => Promise<boolean>;
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
  const [requiresTwoFactor, setRequiresTwoFactor] = useState(false);
  const [tempUserId, setTempUserId] = useState<string | null>(null);

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

  const login = async (
    email: string,
    password: string,
  ): Promise<{ success: boolean; requiresTwoFactor?: boolean }> => {
    setIsLoading(true);

    try {
      // Simulate API call - in real app, this would be an actual API endpoint
      // For demo purposes, we'll use hardcoded credentials
      if (email === "admin@stroomup.com" && password === "admin123") {
        // Get stored user data to check if 2FA is enabled
        const stored2FAData = localStorage.getItem("admin_2fa_data");
        const twoFactorEnabled = !!stored2FAData;

        if (twoFactorEnabled) {
          // User has 2FA enabled, require verification
          setTempUserId("admin-1");
          setRequiresTwoFactor(true);
          setIsLoading(false);
          return { success: true, requiresTwoFactor: true };
        } else {
          // Login without 2FA
          const adminUser: User = {
            id: "admin-1",
            email: "admin@stroomup.com",
            name: "Admin User",
            role: "admin",
            twoFactorEnabled: false,
          };

          // Simulate token generation
          const token = `admin_token_${Date.now()}`;

          // Store in localStorage (in production, consider using httpOnly cookies)
          localStorage.setItem("admin_user", JSON.stringify(adminUser));
          localStorage.setItem("admin_token", token);

          setUser(adminUser);
          setIsLoading(false);
          return { success: true, requiresTwoFactor: false };
        }
      } else {
        setIsLoading(false);
        return { success: false };
      }
    } catch (error) {
      console.error("Login error:", error);
      setIsLoading(false);
      return { success: false };
    }
  };

  const verifyTwoFactor = async (token: string): Promise<boolean> => {
    if (!tempUserId) return false;

    try {
      // Get stored 2FA secret
      const stored2FAData = localStorage.getItem("admin_2fa_data");
      if (!stored2FAData) return false;

      const { secret } = JSON.parse(stored2FAData);

      // Verify the token
      const isValid = authenticator.verify({ token, secret });

      if (isValid) {
        // Complete login
        const adminUser: User = {
          id: "admin-1",
          email: "admin@stroomup.com",
          name: "Admin User",
          role: "admin",
          twoFactorEnabled: true,
          twoFactorSecret: secret,
        };

        const authToken = `admin_token_${Date.now()}`;
        localStorage.setItem("admin_user", JSON.stringify(adminUser));
        localStorage.setItem("admin_token", authToken);

        setUser(adminUser);
        setRequiresTwoFactor(false);
        setTempUserId(null);
        return true;
      }

      return false;
    } catch (error) {
      console.error("2FA verification error:", error);
      return false;
    }
  };

  const setup2FA = async (): Promise<{ secret: string; qrCodeUrl: string }> => {
    // Generate a secret for the user
    const secret = authenticator.generateSecret();

    // Generate QR code URL for Google Authenticator
    const service = "StroomUP Admin";
    const account = user?.email || "admin@stroomup.com";
    const qrCodeUrl = authenticator.keyuri(account, service, secret);

    return { secret, qrCodeUrl };
  };

  const enable2FA = async (token: string): Promise<boolean> => {
    try {
      // Get the secret from temp storage or generate new one
      const tempSecret = localStorage.getItem("temp_2fa_secret");
      if (!tempSecret) return false;

      // Verify the token with the secret
      const isValid = authenticator.verify({ token, secret: tempSecret });

      if (isValid) {
        // Store 2FA data
        const twoFactorData = {
          secret: tempSecret,
          enabled: true,
          enabledAt: new Date().toISOString(),
        };

        localStorage.setItem("admin_2fa_data", JSON.stringify(twoFactorData));
        localStorage.removeItem("temp_2fa_secret");

        // Update user
        if (user) {
          const updatedUser = {
            ...user,
            twoFactorEnabled: true,
            twoFactorSecret: tempSecret,
          };
          setUser(updatedUser);
          localStorage.setItem("admin_user", JSON.stringify(updatedUser));
        }

        return true;
      }

      return false;
    } catch (error) {
      console.error("Enable 2FA error:", error);
      return false;
    }
  };

  const disable2FA = async (password: string): Promise<boolean> => {
    try {
      // Verify password
      if (password !== "admin123") return false;

      // Remove 2FA data
      localStorage.removeItem("admin_2fa_data");

      // Update user
      if (user) {
        const updatedUser = {
          ...user,
          twoFactorEnabled: false,
          twoFactorSecret: undefined,
        };
        setUser(updatedUser);
        localStorage.setItem("admin_user", JSON.stringify(updatedUser));
      }

      return true;
    } catch (error) {
      console.error("Disable 2FA error:", error);
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    setRequiresTwoFactor(false);
    setTempUserId(null);
    localStorage.removeItem("admin_user");
    localStorage.removeItem("admin_token");
  };

  const isAuthenticated = !!user;

  const value = {
    user,
    isAuthenticated,
    isLoading,
    requiresTwoFactor,
    tempUserId,
    login,
    verifyTwoFactor,
    setup2FA,
    enable2FA,
    disable2FA,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
