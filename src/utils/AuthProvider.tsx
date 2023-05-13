import { createContext, useState, FC, PropsWithChildren } from "react";

interface IAuthContext {
  isAuthenticated: boolean;
  setIsAuthenticated: (value: boolean) => void;
}

export const AuthContext = createContext<IAuthContext | null>(null);

export const AuthProvider: FC<PropsWithChildren<unknown>> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  const value = { isAuthenticated, setIsAuthenticated };

  return (
    <>
      <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
    </>
  );
};
