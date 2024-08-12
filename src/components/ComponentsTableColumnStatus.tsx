import { FunctionComponent, useMemo, type CSSProperties } from "react";
import TableCellheader from "./TableCellheader";
import TableCell from "./TableCell";
import styles from "./Styles/ComponentsTableColumnStatus.module.css";

export type ComponentsTableColumnStatusType = {
  className?: string;
  title?: string;

  /** Style props */
  propHeight?: CSSProperties["height"];
};

const ComponentsTableColumnStatus: FunctionComponent<
  ComponentsTableColumnStatusType
> = ({ className = "", propHeight, title }) => {
  const componentsTableColumnStatusStyle: CSSProperties = useMemo(() => {
    return {
      height: propHeight,
    };
  }, [propHeight]);

  return (
    <div
      className={[styles.componentstableColumnstatus, className].join(" ")}
      style={componentsTableColumnStatusStyle}
    >
      <TableCellheader
        propAlignSelf="stretch"
        title={title}
        propFlex="1"
        propDisplay="unset"
        propMinWidth="unset"
      />
      <TableCell propAlignSelf="unset" propFlex="unset" />
      <TableCell propAlignSelf="unset" propFlex="unset" />
      <TableCell propAlignSelf="unset" propFlex="unset" />
      <TableCell propAlignSelf="unset" propFlex="unset" />
      <TableCell propAlignSelf="stretch" propFlex="1" />
      <TableCell propAlignSelf="stretch" propFlex="1" />
      <TableCell propAlignSelf="stretch" propFlex="1" />
      <TableCell propAlignSelf="stretch" propFlex="1" />
      <TableCell propAlignSelf="stretch" propFlex="1" />
      <TableCell />
    </div>
  );
};

export default ComponentsTableColumnStatus;
