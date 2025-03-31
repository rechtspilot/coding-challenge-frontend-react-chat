import { FCWithChildren } from "../../types/react";
import styles from "./index.module.css";

export const CenterWrap: FCWithChildren = ({ children }) => (
  <main className={styles.main}>{children}</main>
);
