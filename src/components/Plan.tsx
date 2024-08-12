import { FunctionComponent, useMemo, type CSSProperties } from "react";
import Bplan from "./Bplan";
import styles from "./Styles/Plan.module.css";

export type PlanType = {
  className?: string;
  line1?: string;

  /** Style props */
  propHeight?: CSSProperties["height"];
  propPadding?: CSSProperties["padding"];
  propWidth?: CSSProperties["width"];
  propHeight1?: CSSProperties["height"];
  propHeight2?: CSSProperties["height"];
  propWidth1?: CSSProperties["width"];
};

const Plan: FunctionComponent<PlanType> = ({
  className = "",
  propHeight,
  propPadding,
  propWidth,
  propHeight1,
  propHeight2,
  propWidth1,
  line1,
}) => {
  const frameDiv1Style: CSSProperties = useMemo(() => {
    return {
      height: propHeight,
      padding: propPadding,
      width: propWidth,
    };
  }, [propHeight, propPadding, propWidth]);

  const frameDiv2Style: CSSProperties = useMemo(() => {
    return {
      height: propHeight1,
    };
  }, [propHeight1]);

  const frameDiv3Style: CSSProperties = useMemo(() => {
    return {
      height: propHeight2,
      width: propWidth1,
    };
  }, [propHeight2, propWidth1]);

  return (
    <div className={[styles.plan2, className].join(" ")}>
      <div className={styles.frameParent}>
        <div className={styles.personalParent}>
          <h2 className={styles.personal}>Personal</h2>
          <div className={styles.frameWrapper}>
            <div className={styles.parent}>
              <b className={styles.b}>$9.9</b>
              <h2 className={styles.mo}>
                <span className={styles.moTxt}>
                  <span>/</span>
                  <span className={styles.mo1}>mo</span>
                </span>
              </h2>
            </div>
          </div>
        </div>
        <div className={styles.frameGroup}>
          <div className={styles.frameContainer}>
            <div className={styles.frameDiv}>
              <div className={styles.vectorWrapper} style={frameDiv1Style}>
                <img
                  className={styles.vectorIcon}
                  loading="lazy"
                  alt=""
                  src="/vector-1.svg"
                />
              </div>
              <div className={styles.thisFeature}>
                <p className={styles.blankLine}>&nbsp;</p>
                <p className={styles.blankLine}>This feature</p>
              </div>
            </div>
          </div>
          <div className={styles.frameContainer}>
            <div className={styles.frameParent1}>
              <div className={styles.vectorContainer} style={frameDiv2Style}>
                <img
                  className={styles.vectorIcon}
                  loading="lazy"
                  alt=""
                  src="/vector-2.svg"
                />
              </div>
              <div className={styles.thisFeature2}>This feature</div>
            </div>
          </div>
          <div className={styles.frameContainer}>
            <div className={styles.frameParent1}>
              <div className={styles.vectorFrame} style={frameDiv3Style}>
                <img
                  className={styles.vectorIcon}
                  loading="lazy"
                  alt=""
                  src="/vector-2.svg"
                />
              </div>
              <div className={styles.thisFeature3}>
                <p className={styles.blankLine}>&nbsp;</p>
                <p className={styles.blankLine}>This feature</p>
              </div>
            </div>
          </div>
          <img className={styles.frameChild} alt="" src={line1} />
        </div>
      </div>
      <div className={styles.bplanWrapper}>
        <Bplan />
      </div>
    </div>
  );
};

export default Plan;
