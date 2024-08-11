import { FunctionComponent, useMemo, type CSSProperties } from "react";
import BadgeStatus from "./BadgeStatus";
import styles from "./TableCell.module.css";

export type TableCellType = {
  className?: string;

  /** Style props */
  propAlignSelf?: CSSProperties["alignSelf"];
  propFlex?: CSSProperties["flex"];
};

const TableCell: FunctionComponent<TableCellType> = ({
  className = "",
  propAlignSelf,
  propFlex,
}) => {
  const tableCellStyle: CSSProperties = useMemo(() => {
    return {
      alignSelf: propAlignSelf,
      flex: propFlex,
    };
  }, [propAlignSelf, propFlex]);

  return (
    <div
      className={[styles.tableCell, className].join(" ")}
      style={tableCellStyle}
    >
      <BadgeStatus
        text="General"
        height="/height1@2x.png"
        rectangleDiv
        rectangleDiv1
      />
    </div>
  );
};

export default TableCell;
