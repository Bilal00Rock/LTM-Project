import { FunctionComponent } from "react";
import styles from "./Field.module.css";

export type FieldType = {
  className?: string;
};

const Field: FunctionComponent<FieldType> = ({ className = "" }) => {
  return (
    <div className={[styles.field, className].join(" ")}>
      <div className={styles.inputAddonLeft}>
        <div className={styles.text}>Alipay</div>
        <img className={styles.downIcon} alt="" src="/down.svg" />
      </div>
      <div className={styles.inputField}>
        <div className={styles.input}>
          <div className={styles.input1}>***********</div>
        </div>
      </div>
    </div>
  );
};

export default Field;
