import { FunctionComponent, useMemo, type CSSProperties } from "react";
import styles from "./Styles/TitleConfirm.module.css";

export type TitleConfirmType = {
  className?: string;
  checkMark?: string;
  defaultButton?: string;

  /** Style props */
  propWidth?: CSSProperties["width"];
  propAlignSelf?: CSSProperties["alignSelf"];
  propColor?: CSSProperties["color"];
  propMinWidth?: CSSProperties["minWidth"];
};

const TitleConfirm: FunctionComponent<TitleConfirmType> = ({
  className = "",
  checkMark,
  propWidth,
  defaultButton,
  propAlignSelf,
  propColor,
  propMinWidth,
}) => {
  const frameDiv4Style: CSSProperties = useMemo(() => {
    return {
      width: propWidth,
    };
  }, [propWidth]);

  const defaultButtonStyle: CSSProperties = useMemo(() => {
    return {
      alignSelf: propAlignSelf,
      color: propColor,
      minWidth: propMinWidth,
    };
  }, [propAlignSelf, propColor, propMinWidth]);

  return (
    <div className={[styles.titleConfirm, className].join(" ")}>
      <img
        className={styles.checkMarkIcon}
        loading="lazy"
        alt=""
        src={checkMark}
      />
      <div className={styles.defaultButtonWrapper} style={frameDiv4Style}>
        <a className={styles.defaultButton} style={defaultButtonStyle}>
          {defaultButton}
        </a>
      </div>
    </div>
  );
};

export default TitleConfirm;
