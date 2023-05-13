import { FC, ReactNode, useContext  } from "react";
import { Navigate } from "react-router-dom";

import { AuthContext } from "./AuthProvider";

interface IRequireAuthProps {
  children: ReactNode;
}

export const RequireAuth: FC<IRequireAuthProps> = ({ children }) => {
  const auth = useContext(AuthContext);


  return auth?.isAuthenticated ? <>{children}</> : <Navigate to="/green-api-test-task" />;
};
