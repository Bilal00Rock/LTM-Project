import { FunctionComponent } from "react";
import styles from "./ProgressCircleStatusNormal.module.css";

export type ProgressCircleStatusNormalType = {
  className?: string;
};

const ProgressCircleStatusNormal: FunctionComponent<
  ProgressCircleStatusNormalType
> = ({ className = "" }) => {
  return (
    <div className={[styles.progressCirclestatusNormal, className].join(" ")}>
      <img
        className={styles.progressCircleIcon}
        loading="lazy"
        alt=""
        src="/progresscircle.svg"
      />
      <div className={styles.textWrapper}>
        <div className={styles.div}>75%</div>
      </div>
    </div>
  );
};

export default ProgressCircleStatusNormal;
