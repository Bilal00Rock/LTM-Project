import { FunctionComponent } from "react";
import styles from "./Styles/Textarea.module.css";

export type TextareaType = {
  className?: string;
};

const Textarea: FunctionComponent<TextareaType> = ({ className = "" }) => {
  return (
    <div className={[styles.textarea, className].join(" ")}>
      <div className={styles.placeholder}>
        <p className={styles.description}>description</p>
        <p className={styles.description}>&nbsp;</p>
      </div>
      <img
        className={styles.bottomIcon}
        loading="lazy"
        alt=""
        src="/bottom@2x.png"
      />
    </div>
  );
};

export default Textarea;
