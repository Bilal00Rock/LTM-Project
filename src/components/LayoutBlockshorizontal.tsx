import { FunctionComponent } from "react";
import TextText from "./TextText";
import styles from "./LayoutBlockshorizontal.module.css";

export type LayoutBlockshorizontalType = {
  className?: string;
};

const LayoutBlockshorizontal: FunctionComponent<LayoutBlockshorizontalType> = ({
  className = "",
}) => {
  return (
    <div className={[styles.layoutblockshorizontal4, className].join(" ")}>
      <TextText
        text="All day"
        propWidth="unset"
        propFlexDirection="column"
        propAlignSelf="unset"
        propHeight="unset"
        propPadding="0px 0px 0px 24px"
        propFlex="unset"
        propMinWidth="unset"
        propOverflow="hidden"
        propHeight1="unset"
        propColor="rgba(0, 0, 0, 0.85)"
        propDisplay="inline-block"
        propMarginTop="unset"
        propFontWeight="unset"
        propMinWidth1="42px"
        propTextDecoration="unset"
        propFontSize="14px"
      />
      <TextText
        text="All week"
        propWidth="unset"
        propFlexDirection="column"
        propAlignSelf="unset"
        propHeight="unset"
        propPadding="0px 0px 0px 24px"
        propFlex="1"
        propMinWidth="49px"
        propOverflow="hidden"
        propHeight1="unset"
        propColor="rgba(0, 0, 0, 0.85)"
        propDisplay="inline-block"
        propMarginTop="unset"
        propFontWeight="unset"
        propMinWidth1="52px"
        propTextDecoration="unset"
        propFontSize="14px"
      />
      <TextText
        text="All month"
        propWidth="unset"
        propFlexDirection="column"
        propAlignSelf="unset"
        propHeight="unset"
        propPadding="0px 0px 0px 24px"
        propFlex="1"
        propMinWidth="55px"
        propOverflow="hidden"
        propHeight1="unset"
        propColor="rgba(0, 0, 0, 0.85)"
        propDisplay="inline-block"
        propMarginTop="unset"
        propFontWeight="unset"
        propMinWidth1="60px"
        propTextDecoration="unset"
        propFontSize="14px"
      />
      <TextText
        text="All year"
        propWidth="unset"
        propFlexDirection="column"
        propAlignSelf="unset"
        propHeight="unset"
        propPadding="0px 0px 0px 24px"
        propFlex="unset"
        propMinWidth="unset"
        propOverflow="hidden"
        propHeight1="unset"
        propColor="#1890ff"
        propDisplay="inline-block"
        propMarginTop="unset"
        propFontWeight="unset"
        propMinWidth1="46px"
        propTextDecoration="unset"
        propFontSize="14px"
      />
    </div>
  );
};

export default LayoutBlockshorizontal;
