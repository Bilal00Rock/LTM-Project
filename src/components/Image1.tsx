import { FunctionComponent } from "react";
import styles from "./Image1.module.css";

export type Image1Type = {
  className?: string;
};

const Image1: FunctionComponent<Image1Type> = ({ className = "" }) => {
  return (
    <div className={[styles.image, className].join(" ")}>
      <img
        className={styles.heightIcon}
        loading="lazy"
        alt=""
        src="/height2@2x.png"
      />
      <div className={styles.width}>
        <div className={styles.widthChild} />
        <div className={styles.widthChild} />
      </div>
    </div>
  );
};

export default Image1;
