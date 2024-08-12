import { FunctionComponent } from "react";
import ComponentsTabLegacy from "./ComponentsTabLegacy";
import TextText from "./TextText";
import styles from "./Styles/ItemsCount.module.css";

export type ItemsCountType = {
  className?: string;
};

const ItemsCount: FunctionComponent<ItemsCountType> = ({ className = "" }) => {
  return (
    <div className={[styles.itemsCount, className].join(" ")}>
      <ComponentsTabLegacy />
      <div className={styles.componentstablegacy}>
        <TextText
          text="Visits"
          propWidth="unset"
          propFlexDirection="column"
          propAlignSelf="unset"
          propHeight="unset"
          propPadding="16px 0px"
          propFlex="unset"
          propMinWidth="unset"
          propOverflow="unset"
          propHeight1="unset"
          propColor="rgba(0, 0, 0, 0.85)"
          propDisplay="unset"
          propMarginTop="unset"
          propFontWeight="unset"
          propMinWidth1="unset"
          propTextDecoration="unset"
          propFontSize="16px"
        />
      </div>
    </div>
  );
};

export default ItemsCount;
