import { FunctionComponent } from "react";
import styles from "./Styles/BLogin.module.css";

export type BLoginType = {
  className?: string;
};

const BLogin: FunctionComponent<BLoginType> = ({ className = "" }) => {
  return (
    <div className={[styles.blogin, className].join(" ")}>
      <div className={styles.bloginChild} />
      <div className={styles.loginNow}>Choose this Plan</div>
    </div>
  );
};

export default BLogin;
