import { FunctionComponent } from "react";
import styles from "./TextParagraph.module.css";

export type TextParagraphType = {
  className?: string;
  text?: string;
};

const TextParagraph: FunctionComponent<TextParagraphType> = ({
  className = "",
  text = "Please add your Patient Information.",
}) => {
  return (
    <div className={[styles.textparagraph, className].join(" ")}>
      <div className={styles.formPagesAre}>{text}</div>
      <div className={styles.widthScrubber}>
        <div className={styles.ignore} />
        <div className={styles.ignore} />
      </div>
    </div>
  );
};

export default TextParagraph;
