import { FunctionComponent } from "react";
import styles from "./Avatar.module.css";

export type AvatarType = {
  className?: string;
};

const Avatar: FunctionComponent<AvatarType> = ({ className = "" }) => {
  return (
    <div className={[styles.avatar, className].join(" ")}>
      <div className={styles.wrapper}>
        <img
          className={styles.addCircleIcon}
          loading="lazy"
          alt=""
          src="/add-circle.svg"
        />
      </div>
    </div>
  );
};

export default Avatar;
