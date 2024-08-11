import { FunctionComponent, useMemo, type CSSProperties } from "react";
import styles from "./TableCellheader.module.css";

export type TableCellheaderType = {
  className?: string;
  title?: string;

  /** Style props */
  propAlignSelf?: CSSProperties["alignSelf"];
  propFlex?: CSSProperties["flex"];
  propDisplay?: CSSProperties["display"];
  propMinWidth?: CSSProperties["minWidth"];
};

const TableCellheader: FunctionComponent<TableCellheaderType> = ({
  className = "",
  propAlignSelf,
  title,
  propFlex,
  propDisplay,
  propMinWidth,
}) => {
  const tableCellheaderStyle: CSSProperties = useMemo(() => {
    return {
      alignSelf: propAlignSelf,
    };
  }, [propAlignSelf]);

  const title3Style: CSSProperties = useMemo(() => {
    return {
      flex: propFlex,
      display: propDisplay,
      minWidth: propMinWidth,
    };
  }, [propFlex, propDisplay, propMinWidth]);

  return (
    <div
      className={[styles.tableCellheader, className].join(" ")}
      style={tableCellheaderStyle}
    >
      <div className={styles.divider} />
      <div className={styles.title} style={title3Style}>
        {title}
      </div>
    </div>
  );
};

export default TableCellheader;
