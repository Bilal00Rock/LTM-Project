import { FunctionComponent, useMemo, type CSSProperties } from "react";
import styles from "./Cell1.module.css";

export type Cell1Type = {
  className?: string;
  label?: string;

  /** Style props */
  propWidth?: CSSProperties["width"];
  propMinWidth?: CSSProperties["minWidth"];
  propDisplay?: CSSProperties["display"];
  propFlex?: CSSProperties["flex"];
  propWidth1?: CSSProperties["width"];
  propFlexDirection?: CSSProperties["flexDirection"];
};

const Cell1: FunctionComponent<Cell1Type> = ({
  className = "",
  propWidth,
  label,
  propMinWidth,
  propDisplay,
  propFlex,
  propWidth1,
  propFlexDirection,
}) => {
  const cellStyle: CSSProperties = useMemo(() => {
    return {
      width: propWidth,
    };
  }, [propWidth]);

  const label1Style: CSSProperties = useMemo(() => {
    return {
      minWidth: propMinWidth,
      display: propDisplay,
      flex: propFlex,
    };
  }, [propMinWidth, propDisplay, propFlex]);

  const colonStyle: CSSProperties = useMemo(() => {
    return {
      width: propWidth1,
      flexDirection: propFlexDirection,
    };
  }, [propWidth1, propFlexDirection]);

  return (
    <div className={[styles.cell, className].join(" ")} style={cellStyle}>
      <div className={styles.label} style={label1Style}>
        {label}
      </div>
      <div className={styles.colon} style={colonStyle}>
        <div className={styles.div}>:</div>
      </div>
    </div>
  );
};

export default Cell1;
