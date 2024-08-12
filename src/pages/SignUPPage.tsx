import { FunctionComponent } from "react";
import FrameComponent1 from "../components/FrameComponent1";
import Plan from "../components/Plan";
import styles from "./Styles/SignUPPage.module.css";

const SignUPPage: FunctionComponent = () => {
  return (
    <div className={styles.signupPage}>
      <FrameComponent1 />
      <div className={styles.planContainerWrapper}>
        <div className={styles.planContainer}>
          <div className={styles.planHeader}>
            <h1 className={styles.simpleTransparent}>{`Plans & Pricing`}</h1>
            <div className={styles.contractInfo}>
              <div className={styles.noContractsNo}>
                Whether your time-saving automation needs are large or small,
                we’re here to help you scale.
              </div>
            </div>
          </div>
          <div className={styles.planOptions}>
            <Plan
              propHeight="unset"
              propPadding="25px 0px 0px"
              propWidth="unset"
              propHeight1="unset"
              propHeight2="unset"
              propWidth1="unset"
              line1="/line-1.svg"
            />
            <Plan line1="/line-1.svg" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUPPage;
