import { createContext, useState } from 'react';

interface AuthState {
  user?: string; 
  pass?: string;
  accessToken?: string;
} ;

interface AuthContextType {
  auth: AuthState;
  setAuth: React.Dispatch<React.SetStateAction<AuthState>>;
  persist: boolean;
  setPersist:  React.Dispatch<React.SetStateAction<boolean>>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [auth, setAuth] = useState<AuthState>({});
  const [persist, setPersist] = useState<boolean>(() => {
    const storedValue = localStorage.getItem("persist");
    try {
      return storedValue !== null && storedValue !== undefined
        ? JSON.parse(storedValue)
        : false;
    } catch (error) {
      console.error("Failed to parse 'persist' from localStorage:", error);
      return false; // Fallback to `false` in case of error
    }
  });
  return (
    <AuthContext.Provider value={{ auth, setAuth, persist, setPersist }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
