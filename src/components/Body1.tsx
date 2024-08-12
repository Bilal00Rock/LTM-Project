import { FunctionComponent } from "react";
import TextText from "./TextText";
import LayoutBlocksbase from "./LayoutBlocksbase";
import styles from "./Styles/Body1.module.css";

export type Body1Type = {
  className?: string;
};

const Body1: FunctionComponent<Body1Type> = ({ className = "" }) => {
  return (
    <div className={[styles.body, className].join(" ")}>
      <div className={styles.layoutBlockshorizontal2}>
        <div className={styles.texttext}>
          <div className={styles.text}>Total EEG Analysis</div>
        </div>
        <div className={styles.iconWrapper}>
          <img
            className={styles.infocircleIcon}
            loading="lazy"
            alt=""
            src="/infocircle.svg"
          />
        </div>
      </div>
      <TextText
        text="78%"
        propWidth="unset"
        propFlexDirection="column"
        propAlignSelf="stretch"
        propHeight="unset"
        propPadding="0px 20px 0px 0px"
        propFlex="unset"
        propMinWidth="unset"
        propOverflow="hidden"
        propHeight1="unset"
        propColor="rgba(0, 0, 0, 0.85)"
        propDisplay="inline-block"
        propMarginTop="unset"
        propFontWeight="500"
        propMinWidth1="57px"
        propTextDecoration="none"
        propFontSize="30px"
      />
      <LayoutBlocksbase />
      <div className={styles.divider}>
        <img
          className={styles.lineIcon}
          loading="lazy"
          alt=""
          src="/line1.svg"
        />
      </div>
      <div className={styles.layoutBlockshorizontal21}>
        <div className={styles.layoutblockshorizontal3}>
          <div className={styles.texttext}>
            <div className={styles.text1}>WoW Change</div>
          </div>
          <TextText
            text="12%"
            propWidth="unset"
            propFlexDirection="column"
            propAlignSelf="unset"
            propHeight="unset"
            propPadding="0px 0px 0px 4px"
            propFlex="unset"
            propMinWidth="unset"
            propOverflow="hidden"
            propHeight1="unset"
            propColor="rgba(0, 0, 0, 0.85)"
            propDisplay="unset"
            propMarginTop="unset"
            propFontWeight="unset"
            propMinWidth1="unset"
            propTextDecoration="unset"
            propFontSize="14px"
          />
          <div className={styles.iconWrapper}>
            <img className={styles.caretupIcon} alt="" src="/caretup.svg" />
          </div>
        </div>
        <div className={styles.texttext2}>
          <div className={styles.text2}>DoD Change</div>
        </div>
      </div>
    </div>
  );
};

export default Body1;
