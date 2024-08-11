import { FunctionComponent, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./HeadingLeft.module.css";

export type HeadingLeftType = {
  className?: string;
};

const HeadingLeft: FunctionComponent<HeadingLeftType> = ({
  className = "",
}) => {
  const navigate = useNavigate();

  const onArrowLeftIconClick = useCallback(() => {
    navigate("/dashboardmain");
  }, [navigate]);

  return (
    <div className={[styles.headingLeft, className].join(" ")}>
      <img
        className={styles.arrowleftIcon}
        loading="lazy"
        alt=""
        src="/arrowleft.svg"
        onClick={onArrowLeftIconClick}
      />
      <div className={styles.wrapper}>
        <img
          className={styles.classgmailGroupsIcon}
          loading="lazy"
          alt=""
          src="/classgmail-groups.svg"
        />
        <a className={styles.title}>Patients</a>
      </div>
    </div>
  );
};

export default HeadingLeft;
