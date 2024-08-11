import { FunctionComponent, useMemo, type CSSProperties } from "react";
import styles from "./InputField.module.css";

export type InputFieldType = {
  className?: string;
  password?: string;
  enterYourPassword?: string;
  icon?: string;

  /** Style props */
  propAlignSelf?: CSSProperties["alignSelf"];
  propGap?: CSSProperties["gap"];
  propWidth?: CSSProperties["width"];
  propMinWidth?: CSSProperties["minWidth"];
  propHeight?: CSSProperties["height"];
};

const InputField: FunctionComponent<InputFieldType> = ({
  className = "",
  propAlignSelf,
  propGap,
  propWidth,
  password,
  propMinWidth,
  propHeight,
  enterYourPassword,
  icon,
}) => {
  const inputFieldStyle: CSSProperties = useMemo(() => {
    return {
      alignSelf: propAlignSelf,
      gap: propGap,
      width: propWidth,
    };
  }, [propAlignSelf, propGap, propWidth]);

  const passwordStyle: CSSProperties = useMemo(() => {
    return {
      minWidth: propMinWidth,
    };
  }, [propMinWidth]);

  const frameDivStyle: CSSProperties = useMemo(() => {
    return {
      height: propHeight,
    };
  }, [propHeight]);

  return (
    <div
      className={[styles.inputField, className].join(" ")}
      style={inputFieldStyle}
    >
      <div className={styles.password} style={passwordStyle}>
        {password}
      </div>
      <div className={styles.input}>
        <div className={styles.enterYourPasswordWrapper}>
          <div className={styles.enterYourPassword}>{enterYourPassword}</div>
        </div>
        <img className={styles.icon} loading="lazy" alt="" src={icon} />
      </div>
    </div>
  );
};

export default InputField;
