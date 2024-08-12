import { FunctionComponent, useMemo, type CSSProperties } from "react";
import styles from "./Styles/CheckboxInput.module.css";

export type CheckboxInputType = {
  className?: string;

  /** Style props */
  propBackgroundColor?: CSSProperties["backgroundColor"];
};

const CheckboxInput: FunctionComponent<CheckboxInputType> = ({
  className = "",
  propBackgroundColor,
}) => {
  const checkboxInputStyle: CSSProperties = useMemo(() => {
    return {
      backgroundColor: propBackgroundColor,
    };
  }, [propBackgroundColor]);

  return (
    <div
      className={[styles.checkboxInput, className].join(" ")}
      style={checkboxInputStyle}
    >
      <div className={styles.bg} />
    </div>
  );
};

export default CheckboxInput;
