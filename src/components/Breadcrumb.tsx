import { FunctionComponent, useMemo, type CSSProperties } from "react";
import ComponentsSeparator from "./ComponentsSeparator";
import styles from "./Styles/Breadcrumb.module.css";

export type BreadcrumbType = {
  className?: string;
  lastItemLabel?: string;

  /** Style props */
  propAlignSelf?: CSSProperties["alignSelf"];
  propPadding?: CSSProperties["padding"];
};

const Breadcrumb: FunctionComponent<BreadcrumbType> = ({
  className = "",
  propAlignSelf,
  propPadding,
  lastItemLabel,
}) => {
  const breadcrumbStyle: CSSProperties = useMemo(() => {
    return {
      alignSelf: propAlignSelf,
      padding: propPadding,
    };
  }, [propAlignSelf, propPadding]);

  return (
    <nav
      className={[styles.breadcrumb, className].join(" ")}
      style={breadcrumbStyle}
    >
      <div className={styles.stItem}>
        <a className={styles.firstLevelMenu}>Home</a>
      </div>
      <ComponentsSeparator propFlexDirection="column" />
      <div className={styles.stItem}>
        <a className={styles.secondLevelMenu}>Patients</a>
      </div>
      <ComponentsSeparator />
      <div className={styles.lastItem}>
        <div className={styles.lastItemLabel}>{lastItemLabel}</div>
      </div>
    </nav>
  );
};

export default Breadcrumb;
