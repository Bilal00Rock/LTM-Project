import { FunctionComponent, useMemo, type CSSProperties } from "react";
import TableCelltext from "./TableCelltext";
import TableCellaction from "./TableCellaction";
import styles from "./TableCelltext1.module.css";

export type TableCelltext1Type = {
  className?: string;
  text?: string;
  invite?: string;

  /** Style props */
  propAlignSelf?: CSSProperties["alignSelf"];
  propFlexWrap?: CSSProperties["flexWrap"];
  propRowGap?: CSSProperties["rowGap"];
};

const TableCelltext1: FunctionComponent<TableCelltext1Type> = ({
  className = "",
  propAlignSelf,
  propFlexWrap,
  propRowGap,
  text,
  invite,
}) => {
  const tableCelltextStyle: CSSProperties = useMemo(() => {
    return {
      alignSelf: propAlignSelf,
      flexWrap: propFlexWrap,
      rowGap: propRowGap,
    };
  }, [propAlignSelf, propFlexWrap, propRowGap]);

  return (
    <div
      className={[styles.tableCelltext, className].join(" ")}
      style={tableCelltextStyle}
    >
      <TableCelltext
        propAlignSelf="unset"
        propWidth="163px"
        text={text}
        propWidth1="343px"
        propHeight="22px"
        propColor="rgba(0, 0, 0, 0.85)"
        propMinWidth="unset"
        propAlignSelf1="unset"
      />
      <TableCellaction
        propAlignSelf="unset"
        propFlex="1"
        propHeight="55px"
        propMinWidth="unset"
        invite={invite}
        propAlignSelf1="stretch"
        propWidth="unset"
        propMinWidth1="unset"
        propDisplay="unset"
        propFlex1="1"
        propHeight1="unset"
        inviteTextDecoration="unset"
      />
    </div>
  );
};

export default TableCelltext1;
