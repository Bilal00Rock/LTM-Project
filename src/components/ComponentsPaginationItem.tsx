import { FunctionComponent, useMemo, type CSSProperties } from "react";
import styles from "./ComponentsPaginationItem.module.css";

export type ComponentsPaginationItemType = {
  className?: string;
  prop?: string;

  /** Style props */
  propBorder?: CSSProperties["border"];
  propColor?: CSSProperties["color"];
  propFontWeight?: CSSProperties["fontWeight"];
  propMinWidth?: CSSProperties["minWidth"];
};

const ComponentsPaginationItem: FunctionComponent<
  ComponentsPaginationItemType
> = ({
  className = "",
  propBorder,
  prop,
  propColor,
  propFontWeight,
  propMinWidth,
}) => {
  const componentsPaginationItemStyle: CSSProperties = useMemo(() => {
    return {
      border: propBorder,
    };
  }, [propBorder]);

  const divStyle: CSSProperties = useMemo(() => {
    return {
      color: propColor,
      fontWeight: propFontWeight,
      minWidth: propMinWidth,
    };
  }, [propColor, propFontWeight, propMinWidth]);

  return (
    <div
      className={[styles.componentspaginationItem, className].join(" ")}
      style={componentsPaginationItemStyle}
    >
      <div className={styles.div} style={divStyle}>
        {prop}
      </div>
    </div>
  );
};

export default ComponentsPaginationItem;
