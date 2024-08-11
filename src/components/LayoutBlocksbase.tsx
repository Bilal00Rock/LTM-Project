import { FunctionComponent, useMemo, type CSSProperties } from "react";
import styles from "./LayoutBlocksbase.module.css";

export type LayoutBlocksbaseType = {
  className?: string;

  /** Style props */
  propHeight?: CSSProperties["height"];
  propBackgroundImage?: CSSProperties["backgroundImage"];
};

const LayoutBlocksbase: FunctionComponent<LayoutBlocksbaseType> = ({
  className = "",
  propHeight,
  propBackgroundImage,
}) => {
  const layoutBlocksbaseStyle: CSSProperties = useMemo(() => {
    return {
      height: propHeight,
      backgroundImage: propBackgroundImage,
    };
  }, [propHeight, propBackgroundImage]);

  return (
    <div
      className={[styles.layoutblocksbase, className].join(" ")}
      style={layoutBlocksbaseStyle}
    >
      <div className={styles.label} />
    </div>
  );
};

export default LayoutBlocksbase;
