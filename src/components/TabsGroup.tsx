import { FunctionComponent } from "react";
import ComponentsTab from "./ComponentsTab";
import styles from "./Styles/TabsGroup.module.css";

export type TabsGroupType = {
  className?: string;
};

const TabsGroup: FunctionComponent<TabsGroupType> = ({ className = "" }) => {
  return (
    <div className={[styles.tabsGroup, className].join(" ")}>
      <div className={styles.componentstab}>
        <div className={styles.wrapper}>
          <div className={styles.title}>
            <b className={styles.text}>Personal Information</b>
          </div>
          <div className={styles.inkBar} />
        </div>
      </div>
      <ComponentsTab
        text="Subscription   Details"
        propDisplay="unset"
        propMinWidth="unset"
      />
      <ComponentsTab text="Feedback" />
    </div>
  );
};

export default TabsGroup;
