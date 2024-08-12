import { FunctionComponent, useMemo, type CSSProperties } from "react";
import BadgeDot from "./BadgeDot";
import styles from "./Styles/BadgeStatus.module.css";

export type BadgeStatusType = {
  className?: string;
  text?: string;
  height?: string;
  rectangleDiv?: boolean;
  rectangleDiv1?: boolean;

  /** Style props */
  propAlignSelf?: CSSProperties["alignSelf"];
  propFlex?: CSSProperties["flex"];
  propAlignSelf1?: CSSProperties["alignSelf"];
  propFlex1?: CSSProperties["flex"];
  propDisplay?: CSSProperties["display"];
  propMinWidth?: CSSProperties["minWidth"];
  badgeStatusWidth?: CSSProperties["width"];
};

const BadgeStatus: FunctionComponent<BadgeStatusType> = ({
  className = "",
  propAlignSelf,
  propFlex,
  text,
  propAlignSelf1,
  propFlex1,
  propDisplay,
  propMinWidth,
  height,
  rectangleDiv,
  rectangleDiv1,
  badgeStatusWidth,
}) => {
  const badgeStatusStyle: CSSProperties = useMemo(() => {
    return {
      alignSelf: propAlignSelf,
      flex: propFlex,
      width: badgeStatusWidth,
    };
  }, [propAlignSelf, propFlex, badgeStatusWidth]);

  const text2Style: CSSProperties = useMemo(() => {
    return {
      alignSelf: propAlignSelf1,
      flex: propFlex1,
      display: propDisplay,
      minWidth: propMinWidth,
    };
  }, [propAlignSelf1, propFlex1, propDisplay, propMinWidth]);

  return (
    <div
      className={[styles.badgestatus, className].join(" ")}
      style={badgeStatusStyle}
    >
      <BadgeDot
        height={height}
        rectangleDiv={rectangleDiv}
        rectangleDiv1={rectangleDiv1}
      />
      <div className={styles.text} style={text2Style}>
        {text}
      </div>
    </div>
  );
};

export default BadgeStatus;
