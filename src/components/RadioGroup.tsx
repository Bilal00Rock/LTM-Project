import { FunctionComponent } from "react";
import RadioOption from "./RadioOption";
import styles from "./Styles/RadioGroup.module.css";

export type RadioGroupType = {
  className?: string;
};

const RadioGroup: FunctionComponent<RadioGroupType> = ({ className = "" }) => {
  return (
    <div className={[styles.radioGroup, className].join(" ")}>
      <div className={styles.publicOption}>
        <div className={styles.publicRadio}>
          <div className={styles.radio}>
            <div className={styles.halo} />
            <div className={styles.rectangle} />
            <div className={styles.rectangle1} />
          </div>
        </div>
        <a className={styles.public}>General</a>
      </div>
      <RadioOption private1="Focal" propMinWidth="34px" />
      <RadioOption private1="Temporal" />
    </div>
  );
};

export default RadioGroup;
