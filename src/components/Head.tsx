import { FunctionComponent } from "react";
import Body2 from "./Body2";
import TextText from "./TextText";
import LayoutBlocksbase from "./LayoutBlocksbase";
import Body1 from "./Body1";
import styles from "./Styles/Head.module.css";

export type HeadType = {
  className?: string;
};

const Head: FunctionComponent<HeadType> = ({ className = "" }) => {
  return (
    <div className={[styles.head, className].join(" ")}>
      <div className={styles.cardlegacy}>
        <Body2 />
      </div>
      <div className={styles.cardlegacy1}>
        <div className={styles.body}>
          <div className={styles.layoutBlockshorizontal2}>
            <div className={styles.texttext}>
              <div className={styles.text}>{`Total Imported EEG’s `}</div>
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
            text="8,846"
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
            propMinWidth1="75px"
            propTextDecoration="none"
            propFontSize="30px"
          />
          <LayoutBlocksbase
            propHeight="44px"
            propBackgroundImage="url('/layoutblocksbase@3x.png')"
          />
          <div className={styles.divider}>
            <img
              className={styles.lineIcon}
              loading="lazy"
              alt=""
              src="/line1.svg"
            />
          </div>
          <div className={styles.layoutBlockshorizontal21}>
            <div className={styles.texttext}>
              <div className={styles.text1}>Daily Visits</div>
            </div>
            <div className={styles.texttext}>
              <div className={styles.text2}>1,234</div>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.cardlegacy2}>
        <Body1 />
      </div>
    </div>
  );
};

export default Head;
