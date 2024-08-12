import { FunctionComponent } from "react";
import ComponentsTableCellCheckbox from "./ComponentsTableCellCheckbox";
import styles from "./Styles/ComponentsTableColumnCheck.module.css";

export type ComponentsTableColumnCheckType = {
  className?: string;
};

const ComponentsTableColumnCheck: FunctionComponent<
  ComponentsTableColumnCheckType
> = ({ className = "" }) => {
  return (
    <div className={[styles.componentstableColumncheck, className].join(" ")}>
      <ComponentsTableCellCheckbox propBackgroundColor="#fafafa" />
      <ComponentsTableCellCheckbox propBackgroundColor="unset" />
      <ComponentsTableCellCheckbox propBackgroundColor="unset" />
      <ComponentsTableCellCheckbox propBackgroundColor="unset" />
      <ComponentsTableCellCheckbox propBackgroundColor="unset" />
      <ComponentsTableCellCheckbox propBackgroundColor="unset" />
      <ComponentsTableCellCheckbox propBackgroundColor="unset" />
      <ComponentsTableCellCheckbox propBackgroundColor="unset" />
      <ComponentsTableCellCheckbox propBackgroundColor="unset" />
      <ComponentsTableCellCheckbox propBackgroundColor="unset" />
      <ComponentsTableCellCheckbox />
    </div>
  );
};

export default ComponentsTableColumnCheck;
