import { FunctionComponent, useMemo, type CSSProperties } from "react";
import styles from "./ComponentsTab.module.css";

export type ComponentsTabType = {
  className?: string;
  text?: string;

  /** Style props */
  propDisplay?: CSSProperties["display"];
  propMinWidth?: CSSProperties["minWidth"];
};

const ComponentsTab: FunctionComponent<ComponentsTabType> = ({
  className = "",
  text,
  propDisplay,
  propMinWidth,
}) => {
  const text4Style: CSSProperties = useMemo(() => {
    return {
      display: propDisplay,
      minWidth: propMinWidth,
    };
  }, [propDisplay, propMinWidth]);

  return (
    <div className={[styles.componentstab, className].join(" ")}>
      <div className={styles.title}>
        <b className={styles.text} style={text4Style}>
          {text}
        </b>
      </div>
    </div>
  );
};

export default ComponentsTab;
