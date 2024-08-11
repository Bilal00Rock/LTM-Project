import { FunctionComponent, useMemo, type CSSProperties } from "react";
import styles from "./Cell.module.css";

export type CellType = {
  className?: string;
  description?: string;

  /** Style props */
  propFlex?: CSSProperties["flex"];
  propMinWidth?: CSSProperties["minWidth"];
  propWidth?: CSSProperties["width"];
  propDisplay?: CSSProperties["display"];
  propFontFamily?: CSSProperties["fontFamily"];
};

const Cell: FunctionComponent<CellType> = ({
  className = "",
  propFlex,
  propMinWidth,
  propWidth,
  description,
  propDisplay,
  propFontFamily,
}) => {
  const cell1Style: CSSProperties = useMemo(() => {
    return {
      flex: propFlex,
      minWidth: propMinWidth,
      width: propWidth,
    };
  }, [propFlex, propMinWidth, propWidth]);

  const descriptionStyle: CSSProperties = useMemo(() => {
    return {
      display: propDisplay,
      fontFamily: propFontFamily,
    };
  }, [propDisplay, propFontFamily]);

  return (
    <div className={[styles.cell, className].join(" ")} style={cell1Style}>
      <div className={styles.description} style={descriptionStyle}>
        {description}
      </div>
    </div>
  );
};

export default Cell;
