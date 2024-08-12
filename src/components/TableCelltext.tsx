import { FunctionComponent, useMemo, type CSSProperties } from "react";
import styles from "./Styles/TableCelltext.module.css";

export type TableCelltextType = {
  className?: string;
  text?: string;

  /** Style props */
  propAlignSelf?: CSSProperties["alignSelf"];
  propWidth?: CSSProperties["width"];
  propWidth1?: CSSProperties["width"];
  propHeight?: CSSProperties["height"];
  propColor?: CSSProperties["color"];
  propMinWidth?: CSSProperties["minWidth"];
  propAlignSelf1?: CSSProperties["alignSelf"];
};

const TableCelltext: FunctionComponent<TableCelltextType> = ({
  className = "",
  propAlignSelf,
  propWidth,
  text,
  propWidth1,
  propHeight,
  propColor,
  propMinWidth,
  propAlignSelf1,
}) => {
  const tableCelltext1Style: CSSProperties = useMemo(() => {
    return {
      alignSelf: propAlignSelf,
      width: propWidth,
    };
  }, [propAlignSelf, propWidth]);

  const text3Style: CSSProperties = useMemo(() => {
    return {
      width: propWidth1,
      height: propHeight,
      color: propColor,
      minWidth: propMinWidth,
      alignSelf: propAlignSelf1,
    };
  }, [propWidth1, propHeight, propColor, propMinWidth, propAlignSelf1]);

  return (
    <div
      className={[styles.tableCelltext, className].join(" ")}
      style={tableCelltext1Style}
    >
      <div className={styles.text} style={text3Style}>
        {text}
      </div>
    </div>
  );
};

export default TableCelltext;
