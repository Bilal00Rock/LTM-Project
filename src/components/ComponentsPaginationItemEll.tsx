import { FunctionComponent, useMemo, type CSSProperties } from "react";
import styles from "./ComponentsPaginationItemEll.module.css";

export type ComponentsPaginationItemEllType = {
  className?: string;

  /** Style props */
  propHeight?: CSSProperties["height"];
  propFlex?: CSSProperties["flex"];
  propAlignSelf?: CSSProperties["alignSelf"];
  propFlex1?: CSSProperties["flex"];
  propDisplay?: CSSProperties["display"];
  propMinWidth?: CSSProperties["minWidth"];
};

const ComponentsPaginationItemEll: FunctionComponent<
  ComponentsPaginationItemEllType
> = ({
  className = "",
  propHeight,
  propFlex,
  propAlignSelf,
  propFlex1,
  propDisplay,
  propMinWidth,
}) => {
  const componentsPaginationItemEllStyle: CSSProperties = useMemo(() => {
    return {
      height: propHeight,
      flex: propFlex,
    };
  }, [propHeight, propFlex]);

  const ellipsisStyle: CSSProperties = useMemo(() => {
    return {
      alignSelf: propAlignSelf,
      flex: propFlex1,
      display: propDisplay,
      minWidth: propMinWidth,
    };
  }, [propAlignSelf, propFlex1, propDisplay, propMinWidth]);

  return (
    <div
      className={[styles.componentspaginationItemEll, className].join(" ")}
      style={componentsPaginationItemEllStyle}
    >
      <div className={styles.ellipsis} style={ellipsisStyle}>
        •••
      </div>
    </div>
  );
};

export default ComponentsPaginationItemEll;
