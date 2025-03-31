import { Outlet } from "react-router";
import styles from "./index.module.css";
import { FCWithChildren } from "../../types/react";

export const Container: FCWithChildren = ({children}) => (
  <div className={styles.container}>
    { children || <Outlet />}
  </div>
);
