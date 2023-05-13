import { useState, ChangeEvent, useContext, useEffect } from "react";
import { AuthForm } from "../AuthForm/AuthForm";
import { LoginState } from "../../types/UserType";
import { AuthContext } from "../../utils/AuthProvider";

export const Auth = () => {
  const [user, setUser] = useState<LoginState>({
    idInstance: "",
    apiTokenInstance: "",
  });

  const auth = useContext(AuthContext);

  useEffect(() => {
    const storagedUser = sessionStorage.getItem("user");
    if (storagedUser) {
      const user = JSON.parse(storagedUser);
      setUser({
        idInstance: user.idInstance,
        apiTokenInstance: user.apiTokenInstance,
      });
    }
  }, []);

  const handleIdInstanceChange = (event: ChangeEvent<HTMLInputElement>) => {
    setUser({ ...user, idInstance: event.target.value });
  };

  const handleApiTokenInstanceChange = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    setUser({ ...user, apiTokenInstance: event.target.value });
  };

  const handleSubmit = () => {
    sessionStorage.setItem("user", JSON.stringify(user));
    auth?.setIsAuthenticated(true);
  };

  return (
    <AuthForm
      user={user}
      handleIdInstanceChange={handleIdInstanceChange}
      handleApiTokenInstanceChange={handleApiTokenInstanceChange}
      handleSubmit={handleSubmit}
    />
  );
};
