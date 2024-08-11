import { FunctionComponent, useMemo, type CSSProperties } from "react";
import styles from "./BadgeDot.module.css";

export type BadgeDotType = {
  className?: string;
  height?: string;
  rectangleDiv?: boolean;
  rectangleDiv1?: boolean;

  /** Style props */
  propBackgroundColor?: CSSProperties["backgroundColor"];
  propBackgroundColor1?: CSSProperties["backgroundColor"];
  propWidth?: CSSProperties["width"];
};

const BadgeDot: FunctionComponent<BadgeDotType> = ({
  className = "",
  propBackgroundColor,
  propBackgroundColor1,
  height,
  propWidth,
  rectangleDiv,
  rectangleDiv1,
}) => {
  const badgeDotStyle: CSSProperties = useMemo(() => {
    return {
      backgroundColor: propBackgroundColor,
    };
  }, [propBackgroundColor]);

  const dotStyle: CSSProperties = useMemo(() => {
    return {
      backgroundColor: propBackgroundColor1,
    };
  }, [propBackgroundColor1]);

  const widthStyle: CSSProperties = useMemo(() => {
    return {
      width: propWidth,
    };
  }, [propWidth]);

  return (
    <div
      className={[styles.badgedot, className].join(" ")}
      style={badgeDotStyle}
    >
      <div className={styles.dot} style={dotStyle}>
        <img className={styles.heightIcon} alt="" src={height} />
        <div className={styles.width} style={widthStyle}>
          {!rectangleDiv && <div className={styles.widthChild} />}
          {!rectangleDiv1 && <div className={styles.widthChild} />}
        </div>
      </div>
    </div>
  );
};

export default BadgeDot;
