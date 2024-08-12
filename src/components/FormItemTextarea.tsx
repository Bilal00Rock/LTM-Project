import { FunctionComponent } from "react";
import Textarea from "./Textarea";
import styles from "./Styles/FormItemTextarea.module.css";

export type FormItemTextareaType = {
  className?: string;
};

const FormItemTextarea: FunctionComponent<FormItemTextareaType> = ({
  className = "",
}) => {
  return (
    <div className={[styles.formItemtextarea, className].join(" ")}>
      <div className={styles.labelWrapper}>
        <div className={styles.label}>
          <div className={styles.title}>Patient Description</div>
          <div className={styles.div}>:</div>
        </div>
      </div>
      <Textarea />
    </div>
  );
};

export default FormItemTextarea;
