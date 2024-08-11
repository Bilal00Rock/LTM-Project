import { FunctionComponent, useMemo, type CSSProperties } from "react";
import BadgeStatus from "./BadgeStatus";
import styles from "./TableCellstatus.module.css";

export type TableCellstatusType = {
  className?: string;

  /** Style props */
  propFlex?: CSSProperties["flex"];
  propAlignSelf?: CSSProperties["alignSelf"];
};

const TableCellstatus: FunctionComponent<TableCellstatusType> = ({
  className = "",
  propFlex,
  propAlignSelf,
}) => {
  const tableCellstatusStyle: CSSProperties = useMemo(() => {
    return {
      flex: propFlex,
      alignSelf: propAlignSelf,
    };
  }, [propFlex, propAlignSelf]);

  return (
    <div
      className={[styles.tableCellstatus, className].join(" ")}
      style={tableCellstatusStyle}
    >
      <BadgeStatus
        propAlignSelf="unset"
        propFlex="1"
        text="Error"
        propAlignSelf1="stretch"
        propFlex1="1"
        propDisplay="unset"
        propMinWidth="unset"
        height="/height1@2x.png"
        rectangleDiv={false}
        rectangleDiv1={false}
        badgeStatusWidth="45px"
      />
    </div>
  );
};

export default TableCellstatus;
