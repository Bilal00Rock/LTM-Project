import { FunctionComponent } from "react";
import TextText from "./TextText";
import styles from "./Body2.module.css";

export type Body2Type = {
  className?: string;
};

const Body2: FunctionComponent<Body2Type> = ({ className = "" }) => {
  return (
    <div className={[styles.body, className].join(" ")}>
      <div className={styles.layoutblockshorizontal2}>
        <div className={styles.texttext}>
          <div className={styles.text}>Total Patients</div>
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
        text="5559"
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
        propMinWidth1="69px"
        propTextDecoration="none"
        propFontSize="30px"
      />
      <div className={styles.layoutblockshorizontal21}>
        <div className={styles.texttext}>
          <div className={styles.text1}>WoW Change 12%</div>
        </div>
        <div className={styles.iconWrapper}>
          <img className={styles.caretupIcon} alt="" src="/caretup.svg" />
        </div>
      </div>
      <div className={styles.layoutblockshorizontal21}>
        <div className={styles.texttext}>
          <div className={styles.text1}>DoD Change 11%</div>
        </div>
        <div className={styles.iconWrapper2}>
          <img className={styles.caretupIcon} alt="" src="/caretdown.svg" />
        </div>
      </div>
      <div className={styles.divider}>
        <img
          className={styles.lineIcon}
          loading="lazy"
          alt=""
          src="/line1.svg"
        />
      </div>
      <div className={styles.layoutblockshorizontal23}>
        <div className={styles.texttext}>
          <div className={styles.text1}>Today’s Patients</div>
        </div>
        <div className={styles.texttext}>
          <div className={styles.text4}>20</div>
        </div>
      </div>
    </div>
  );
};

export default Body2;
