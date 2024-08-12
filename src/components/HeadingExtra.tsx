import { FunctionComponent, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Styles/HeadingExtra.module.css";

export type HeadingExtraType = {
  className?: string;
};

const HeadingExtra: FunctionComponent<HeadingExtraType> = ({
  className = "",
}) => {
  const navigate = useNavigate();

  const onHeadingExtraContainerClick = useCallback(() => {
    navigate("/dashboardpatientsaddpatients");
  }, [navigate]);

  return (
    <div
      className={[styles.headingExtra, className].join(" ")}
      onClick={onHeadingExtraContainerClick}
    >
      <div className={styles.button}>
        <img className={styles.addIcon} loading="lazy" alt="" src="/add.svg" />
        <a className={styles.text}>Add Patient</a>
      </div>
    </div>
  );
};

export default HeadingExtra;
