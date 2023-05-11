import { FC, ReactNode } from "react";
import styles from "./Layout.module.css";
import { Header } from "../Header/Header";

interface ILayoutProp {
  children: ReactNode;
}

export const Layout: FC<ILayoutProp> = ({ children }) => {
  return (
    <div className={styles.container}>
      <Header />
      {children}
    </div>
  );
};
