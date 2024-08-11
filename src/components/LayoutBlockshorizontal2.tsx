import { FunctionComponent } from "react";
import styles from "./LayoutBlockshorizontal2.module.css";

export type LayoutBlockshorizontal2Type = {
  className?: string;
};

const LayoutBlockshorizontal2: FunctionComponent<
  LayoutBlockshorizontal2Type
> = ({ className = "" }) => {
  return (
    <div className={[styles.layoutblockshorizontal22, className].join(" ")}>
      <div className={styles.image}>
        <img className={styles.heightIcon} alt="" src="/height3@2x.png" />
        <div className={styles.width}>
          <div className={styles.widthChild} />
          <div className={styles.widthChild} />
        </div>
      </div>
      <div className={styles.layoutblocksvertical2}>
        <div className={styles.texttext}>
          <h3 className={styles.text}>
            Good morning, Dr. Bartolome Oliver, have a great day!
          </h3>
        </div>
        <div className={styles.texttext1}>
          <b className={styles.text1}>
            User interaction expert | ant financial atform department -
            technology department -UED
          </b>
        </div>
      </div>
    </div>
  );
};

export default LayoutBlockshorizontal2;
