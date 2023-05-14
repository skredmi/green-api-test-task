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
      try {
        const { idInstance, apiTokenInstance } = JSON.parse(
          storagedUser
        ) as LoginState;
        setUser({ idInstance, apiTokenInstance });
      } catch (error) {
        console.error(error);
      }
    }
  }, []);

  const handleIdInstanceChange = ({
    target: { value: idInstance },
  }: ChangeEvent<HTMLInputElement>) => {
    setUser({ ...user, idInstance });
  };
  const handleApiTokenInstanceChange = ({
    target: { value: apiTokenInstance },
  }: ChangeEvent<HTMLInputElement>) => {
    setUser({ ...user, apiTokenInstance });
  };

  const handleSubmit = () => {
    if (!user.idInstance || !user.apiTokenInstance) {
      return;
    }
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
