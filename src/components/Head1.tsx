import { FunctionComponent } from "react";
import TabsTopLegacy from "./TabsTopLegacy";
import LayoutBlockshorizontal from "./LayoutBlockshorizontal";
import DatePicker from "./DatePicker";
import styles from "./Styles/Head1.module.css";

export type Head1Type = {
  className?: string;
};

const Head1: FunctionComponent<Head1Type> = ({ className = "" }) => {
  return (
    <div className={[styles.head, className].join(" ")}>
      <div className={styles.titleWrapper}>
        <div className={styles.title}>
          <TabsTopLegacy />
        </div>
        <div className={styles.more}>
          <LayoutBlockshorizontal />
          <DatePicker />
        </div>
      </div>
    </div>
  );
};

export default Head1;
