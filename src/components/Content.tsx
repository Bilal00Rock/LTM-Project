import { FunctionComponent } from "react";
import LayoutBlockshorizontal2 from "./LayoutBlockshorizontal2";
import styles from "./Styles/Content.module.css";

export type ContentType = {
  className?: string;
};

const Content: FunctionComponent<ContentType> = ({ className = "" }) => {
  return (
    <div className={[styles.content, className].join(" ")}>
      <div className={styles.layoutblockshorizontal2}>
        <LayoutBlockshorizontal2 />
        <div className={styles.layoutblockshorizontal5}>
          <div className={styles.statisticlegacy}>
            <div className={styles.title}>
              <b className={styles.title1}>
                <span className={styles.titleTxt}>
                  <p className={styles.patients}>Patients</p>
                </span>
              </b>
            </div>
            <div className={styles.statisticContentValue}>
              <div className={styles.autoAddedFrame}>
                <img className={styles.likeIcon} alt="" src="/like.svg" />
              </div>
              <b className={styles.value}>56</b>
              <b className={styles.suffix}>.00</b>
            </div>
          </div>
          <div className={styles.divider}>
            <img className={styles.lineIcon} alt="" src="/line2.svg" />
          </div>
          <div className={styles.statisticlegacy}>
            <div className={styles.title2}>
              <b className={styles.title1}>
                <span>
                  <p className={styles.patients}>Total EEG Analysis</p>
                </span>
              </b>
            </div>
            <div className={styles.statisticContentValue1}>
              <div className={styles.autoAddedFrame1}>
                <img className={styles.likeIcon} alt="" src="/like.svg" />
              </div>
              <b className={styles.value}>80</b>
              <div className={styles.suffix1} />
            </div>
          </div>
          <div className={styles.divider}>
            <img className={styles.lineIcon} alt="" src="/line2.svg" />
          </div>
          <div className={styles.statisticlegacy}>
            <div className={styles.title4}>
              <b className={styles.title5}>
                <p className={styles.patients}>{`Remaining EEG’s `}</p>
                <p className={styles.patients}>to Predict</p>
              </b>
            </div>
            <div className={styles.statisticContentValue2}>
              <div className={styles.autoAddedFrame}>
                <img className={styles.likeIcon} alt="" src="/like.svg" />
              </div>
              <b className={styles.value2}>2</b>
              <b className={styles.suffix}>.00</b>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Content;
