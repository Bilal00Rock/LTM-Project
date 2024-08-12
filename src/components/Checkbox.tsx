import { FunctionComponent } from "react";
import styles from "./Styles/Checkbox.module.css";

export type CheckboxType = {
  className?: string;
};

const Checkbox: FunctionComponent<CheckboxType> = ({ className = "" }) => {
  return (
    <div className={[styles.checkbox, className].join(" ")}>
      <div className={styles.checkboxInputWrapper}>
        <div className={styles.checkboxInput}>
          <div className={styles.bg} />
          <div className={styles.border} />
          <img className={styles.checkIcon} alt="" src="/check.svg" />
        </div>
      </div>
      <div className={styles.label}>Remember me</div>
    </div>
  );
};

export default Checkbox;
