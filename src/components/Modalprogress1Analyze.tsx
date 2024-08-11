import { FunctionComponent } from "react";
import ProgressCircleStatusNormal from "./ProgressCircleStatusNormal";
import Button from "./Button";
import styles from "./Modalprogress1Analyze.module.css";

export type Modalprogress1AnalyzeType = {
  className?: string;
  onClose?: () => void;
};

const Modalprogress1Analyze: FunctionComponent<Modalprogress1AnalyzeType> = ({
  className = "",
  onClose,
}) => {
  return (
    <div className={[styles.modalprogress1analyze, className].join(" ")}>
      <div className={styles.header}>
        <a className={styles.analyzing}>Analyzing</a>
        <div className={styles.closeWrapper}>
          <img className={styles.closeIcon} alt="" src="/close.svg" />
        </div>
      </div>
      <section className={styles.content}>
        <div className={styles.progressCirclestatusNormalWrapper}>
          <ProgressCircleStatusNormal />
        </div>
        <div className={styles.analyzingPleaseWait}>
          Analyzing Please wait...
        </div>
      </section>
      <div className={styles.footer}>
        <Button
          title="Cancel"
          icon={false}
          propWidth="75px"
          propBorderRadius="2px"
          propBackgroundColor="#fff"
          propPadding="3px 15px"
          propAlignSelf="unset"
          propBoxShadow="0px 2px 0px rgba(0, 0, 0, 0.02)"
          propBorder="1px solid #d9d9d9"
          propOverflow="unset"
          propFlex="unset"
          wrapper="/wrapper-12@2x.png"
          propFontFamily="Roboto"
          propColor="rgba(0, 0, 0, 0.85)"
          propMinWidth="43px"
          propFlex1="unset"
          propFontWeight="unset"
          propDisplay="inline-block"
        />
        <Button title="OK" icon wrapper="/wrapper-14@2x.png" />
      </div>
    </div>
  );
};

export default Modalprogress1Analyze;
