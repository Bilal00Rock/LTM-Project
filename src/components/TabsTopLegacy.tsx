import { FunctionComponent } from "react";
import ItemsCount from "./ItemsCount";
import styles from "./Styles/TabsTopLegacy.module.css";

export type TabsTopLegacyType = {
  className?: string;
};

const TabsTopLegacy: FunctionComponent<TabsTopLegacyType> = ({
  className = "",
}) => {
  return (
    <div className={[styles.tabsToplegacy, className].join(" ")}>
      <ItemsCount />
      <div className={styles.boxShadow} />
    </div>
  );
};

export default TabsTopLegacy;
