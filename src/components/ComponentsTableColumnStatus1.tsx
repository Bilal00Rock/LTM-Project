import { FunctionComponent } from "react";
import TableCellheader from "./TableCellheader";
import TableCellstatus from "./TableCellstatus";
import styles from "./ComponentsTableColumnStatus1.module.css";

export type ComponentsTableColumnStatus1Type = {
  className?: string;
};

const ComponentsTableColumnStatus1: FunctionComponent<
  ComponentsTableColumnStatus1Type
> = ({ className = "" }) => {
  return (
    <div className={[styles.componentstableColumnstatus, className].join(" ")}>
      <TableCellheader
        propAlignSelf="stretch"
        title="Status"
        propFlex="1"
        propDisplay="unset"
        propMinWidth="unset"
      />
      <TableCellstatus propFlex="unset" propAlignSelf="stretch" />
      <TableCellstatus propFlex="unset" propAlignSelf="unset" />
      <TableCellstatus propFlex="unset" propAlignSelf="stretch" />
      <TableCellstatus propFlex="unset" propAlignSelf="stretch" />
      <TableCellstatus propFlex="unset" propAlignSelf="stretch" />
      <TableCellstatus propFlex="unset" propAlignSelf="stretch" />
      <TableCellstatus propFlex="unset" propAlignSelf="stretch" />
      <TableCellstatus propFlex="unset" propAlignSelf="stretch" />
      <TableCellstatus propFlex="unset" propAlignSelf="stretch" />
      <TableCellstatus />
    </div>
  );
};

export default ComponentsTableColumnStatus1;
