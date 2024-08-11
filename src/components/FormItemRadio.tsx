import { FunctionComponent } from "react";
import RadioGroup from "./RadioGroup";
import styles from "./FormItemRadio.module.css";

export type FormItemRadioType = {
  className?: string;
};

const FormItemRadio: FunctionComponent<FormItemRadioType> = ({
  className = "",
}) => {
  return (
    <div className={[styles.formItemradio, className].join(" ")}>
      <img
        className={styles.labelWrapperIcon}
        loading="lazy"
        alt=""
        src="/label-wrapper@2x.png"
      />
      <RadioGroup />
    </div>
  );
};

export default FormItemRadio;
