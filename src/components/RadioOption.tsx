import { FunctionComponent, useMemo, type CSSProperties } from "react";
import styles from "./RadioOption.module.css";

export type RadioOptionType = {
  className?: string;
  private1?: string;

  /** Style props */
  propMinWidth?: CSSProperties["minWidth"];
};

const RadioOption: FunctionComponent<RadioOptionType> = ({
  className = "",
  private1,
  propMinWidth,
}) => {
  const privateStyle: CSSProperties = useMemo(() => {
    return {
      minWidth: propMinWidth,
    };
  }, [propMinWidth]);

  return (
    <div className={[styles.radioOption, className].join(" ")}>
      <div className={styles.radioWrapper}>
        <div className={styles.radio} />
      </div>
      <div className={styles.private} style={privateStyle}>
        {private1}
      </div>
    </div>
  );
};

export default RadioOption;
