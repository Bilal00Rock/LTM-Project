import { FunctionComponent } from "react";
import TextText from "./TextText";
import Image1 from "./Image1";
import styles from "./Styles/LayoutBlocksvertical.module.css";

export type LayoutBlocksverticalType = {
  className?: string;
};

const LayoutBlocksvertical: FunctionComponent<LayoutBlocksverticalType> = ({
  className = "",
}) => {
  return (
    <div className={[styles.layoutblocksvertical2, className].join(" ")}>
      <TextText
        text="Stores Sales Trend"
        propWidth="unset"
        propFlexDirection="row"
        propAlignSelf="stretch"
        propHeight="unset"
        propPadding="unset"
        propFlex="unset"
        propMinWidth="unset"
        propOverflow="hidden"
        propHeight1="unset"
        propColor="rgba(0, 0, 0, 0.85)"
        propDisplay="inline-block"
        propMarginTop="unset"
        propFontWeight="unset"
        propMinWidth1="117px"
        propTextDecoration="unset"
        propFontSize="14px"
      />
      <Image1 />
    </div>
  );
};

export default LayoutBlocksvertical;
