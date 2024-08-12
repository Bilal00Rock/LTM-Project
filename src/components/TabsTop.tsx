import { FunctionComponent } from "react";
import TabsGroup from "./TabsGroup";
import styles from "./Styles/TabsTop.module.css";

export type TabsTopType = {
  className?: string;
};

const TabsTop: FunctionComponent<TabsTopType> = ({ className = "" }) => {
  return (
    <div className={[styles.tabstop, className].join(" ")}>
      <div className={styles.wrapper}>
        <div className={styles.boxShadow} />
        <TabsGroup />
      </div>
    </div>
  );
};

export default TabsTop;
