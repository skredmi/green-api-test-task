import { FC, ChangeEvent } from "react";
import { Link } from "react-router-dom";
import { LoginState } from "../../types/UserType";
import styles from "./AuthForm.module.css";
import { Input } from "../../ui/Input/Input";
import { Button } from "../../ui/Button/Button";
import { regexApiTokenInstance, regexIdInstance } from "../../utils/regex";

interface IAuthFormProps {
  user: LoginState;
  handleSubmit: () => void;
  handleIdInstanceChange: (event: ChangeEvent<HTMLInputElement>) => void;
  handleApiTokenInstanceChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

export const AuthForm: FC<IAuthFormProps> = ({
  user,
  handleSubmit,
  handleIdInstanceChange,
  handleApiTokenInstanceChange,
}) => {
  const isValidIdInstance = regexIdInstance.test(user.idInstance);
  const isValidApiTokenInstance = regexApiTokenInstance.test(
    user.apiTokenInstance
  );

  return (
    <form className={styles.form}>
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

      <Link to="/chat">
        <Button
          type="button"
          className={styles.loginButton}
          onClick={handleSubmit}
          disabled={!isValidIdInstance || !isValidApiTokenInstance}
        >
          Login
        </Button>
      </Link>

      <p>
        To get API Token and ID Instance please visit{" "}
        <a
          href="https://green-api.com/#section-connect"
          className={styles.link}
          target="blanc"
        >
          green-api.com
        </a>
      </p>
    </form>
  );
};
