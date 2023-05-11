import { useState, ChangeEvent, FormEvent } from "react";
import { AuthForm } from "../AuthForm/AuthForm";
import { LoginState } from "../../types/UserType";

export const Auth = () => {
  const [user, setUser] = useState<LoginState>({
    idInstance: "",
    apiTokenInstance: "",
  });

  const handleIdInstanceChange = (event: ChangeEvent<HTMLInputElement>) => {
    setUser({ ...user, idInstance: event.target.value });
  };

  const handleApiTokenInstanceChange = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    setUser({ ...user, apiTokenInstance: event.target.value });
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    localStorage.setItem("user", JSON.stringify(user));
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
