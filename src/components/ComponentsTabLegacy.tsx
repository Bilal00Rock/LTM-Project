import { FunctionComponent } from "react";
import TextText from "./TextText";
import styles from "./ComponentsTabLegacy.module.css";

export type ComponentsTabLegacyType = {
  className?: string;
};

const ComponentsTabLegacy: FunctionComponent<ComponentsTabLegacyType> = ({
  className = "",
}) => {
  return (
    <div className={[styles.componentstablegacy, className].join(" ")}>
      <TextText
        text="Patients Chart"
        propWidth="unset"
        propFlexDirection="column"
        propAlignSelf="stretch"
        propHeight="unset"
        propPadding="16px 0px"
        propFlex="unset"
        propMinWidth="unset"
        propOverflow="unset"
        propHeight1="unset"
        propColor="rgba(0, 0, 0, 0.83)"
        propDisplay="inline-block"
        propMarginTop="unset"
        propFontWeight="500"
        propMinWidth1="103px"
        propTextDecoration="unset"
        propFontSize="16px"
      />
      <div className={styles.ink} />
    </div>
  );
};

export default ComponentsTabLegacy;
