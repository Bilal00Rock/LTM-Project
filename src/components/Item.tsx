import { FunctionComponent } from "react";
import ComponentsStepsItemIcon from "./ComponentsStepsItemIcon";
import styles from "./Styles/Item.module.css";

export type ItemType = {
  className?: string;
};

const Item: FunctionComponent<ItemType> = ({ className = "" }) => {
  return (
    <div className={[styles.item06, className].join(" ")}>
      <ComponentsStepsItemIcon number="3" />
      <div className={styles.lastStepTitleContainer}>
        <div className={styles.title}>Done</div>
      </div>
    </div>
  );
};

export default Item;
