import { FunctionComponent, useMemo, type CSSProperties } from "react";
import styles from "./Styles/TableCellaction.module.css";

export type TableCellactionType = {
  className?: string;
  invite?: string;

  /** Style props */
  propAlignSelf?: CSSProperties["alignSelf"];
  propFlex?: CSSProperties["flex"];
  propHeight?: CSSProperties["height"];
  propMinWidth?: CSSProperties["minWidth"];
  propAlignSelf1?: CSSProperties["alignSelf"];
  propWidth?: CSSProperties["width"];
  propMinWidth1?: CSSProperties["minWidth"];
  propDisplay?: CSSProperties["display"];
  propFlex1?: CSSProperties["flex"];
  propHeight1?: CSSProperties["height"];
  inviteTextDecoration?: CSSProperties["textDecoration"];
};

const TableCellaction: FunctionComponent<TableCellactionType> = ({
  className = "",
  propAlignSelf,
  propFlex,
  propHeight,
  propMinWidth,
  invite,
  propAlignSelf1,
  propWidth,
  propMinWidth1,
  propDisplay,
  propFlex1,
  propHeight1,
  inviteTextDecoration,
}) => {
  const tableCellactionStyle: CSSProperties = useMemo(() => {
    return {
      alignSelf: propAlignSelf,
      flex: propFlex,
      height: propHeight,
      minWidth: propMinWidth,
    };
  }, [propAlignSelf, propFlex, propHeight, propMinWidth]);

  const inviteStyle: CSSProperties = useMemo(() => {
    return {
      alignSelf: propAlignSelf1,
      width: propWidth,
      minWidth: propMinWidth1,
      display: propDisplay,
      flex: propFlex1,
      height: propHeight1,
      textDecoration: inviteTextDecoration,
    };
  }, [
    propAlignSelf1,
    propWidth,
    propMinWidth1,
    propDisplay,
    propFlex1,
    propHeight1,
    inviteTextDecoration,
  ]);

  return (
    <div
      className={[styles.tableCellaction, className].join(" ")}
      style={tableCellactionStyle}
    >
      <div className={styles.invite} style={inviteStyle}>
        {invite}
      </div>
    </div>
  );
};

export default TableCellaction;
