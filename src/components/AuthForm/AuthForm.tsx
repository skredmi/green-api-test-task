import { FC, FormEvent, ChangeEvent } from "react";
import { LoginState } from "../../types/UserType";
import styles from "./AuthForm.module.css";
import { Input } from "../../ui/Input/Input";
import { Button } from "../../ui/Button/Button";

interface IAuthFormProps {
  user: LoginState;
  handleSubmit: (event: FormEvent<HTMLFormElement>) => void;
  handleIdInstanceChange: (event: ChangeEvent<HTMLInputElement>) => void;
  handleApiTokenInstanceChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

export const AuthForm: FC<IAuthFormProps> = ({
  user,
  handleSubmit,
  handleIdInstanceChange,
  handleApiTokenInstanceChange,
}) => {
  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <p className={styles.title}>Please fill in the form fields</p>
      <div className={styles.fields}>
        <Input
          label="Enter your idInstance"
          placeholder="idInstance..."
          value={user.idInstance}
          onChange={handleIdInstanceChange}
        />
        <Input
          label="Enter your apiTokenInstance"
          placeholder="apiTokenInstance..."
          value={user.apiTokenInstance}
          onChange={handleApiTokenInstanceChange}
        />
      </div>
      <Button type="submit" className={styles.loginButton}>
        Login
      </Button>
      <p>
        To get API Token and ID Instance please visit{" "}
        <a
          href="https://green-api.com/#section-connect"
          className={styles.link}
        >
          green-api.com
        </a>
      </p>
    </form>
  );
};
