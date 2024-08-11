import { FunctionComponent, useMemo, type CSSProperties } from "react";
import CheckboxInput from "./CheckboxInput";
import styles from "./ComponentsTableCellCheckbox.module.css";

export type ComponentsTableCellCheckboxType = {
  className?: string;

  /** Style props */
  propBackgroundColor?: CSSProperties["backgroundColor"];
};

const ComponentsTableCellCheckbox: FunctionComponent<
  ComponentsTableCellCheckboxType
> = ({ className = "", propBackgroundColor }) => {
  const componentsTableCellCheckboxStyle: CSSProperties = useMemo(() => {
    return {
      backgroundColor: propBackgroundColor,
    };
  }, [propBackgroundColor]);

  return (
    <div
      className={[styles.componentstableCellcheckbox, className].join(" ")}
      style={componentsTableCellCheckboxStyle}
    >
      <CheckboxInput />
    </div>
  );
};

export default ComponentsTableCellCheckbox;
