import { FunctionComponent, useMemo, type CSSProperties } from "react";
import styles from "./ComponentsSeparator.module.css";

export type ComponentsSeparatorType = {
  className?: string;

  /** Style props */
  propFlexDirection?: CSSProperties["flexDirection"];
};

const ComponentsSeparator: FunctionComponent<ComponentsSeparatorType> = ({
  className = "",
  propFlexDirection,
}) => {
  const componentsSeparatorStyle: CSSProperties = useMemo(() => {
    return {
      flexDirection: propFlexDirection,
    };
  }, [propFlexDirection]);

  return (
    <div
      className={[styles.componentsseparator, className].join(" ")}
      style={componentsSeparatorStyle}
    >
      <div className={styles.separator}>/</div>
    </div>
  );
};

export default ComponentsSeparator;
