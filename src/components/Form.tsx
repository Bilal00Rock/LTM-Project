import { FunctionComponent } from "react";
import FieldType from "./FieldType";
import styles from "./Form.module.css";

export type FormType = {
  className?: string;
};

const Form: FunctionComponent<FormType> = ({ className = "" }) => {
  return (
    <div className={[styles.form, className].join(" ")}>
      <FieldType />
    </div>
  );
};

export default Form;
