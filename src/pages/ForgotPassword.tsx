import { FunctionComponent } from "react";
import InputField from "../components/InputField";
import Button from "../components/Button";
import styles from "./ForgotPassword.module.css";

const ForgotPassword: FunctionComponent = () => {
  return (
    <div className={styles.forgotPassword}>
      <main className={styles.main}>
        <section className={styles.frameParent}>
          <div className={styles.headerLogoWithoutBack1Wrapper}>
            <img
              className={styles.headerLogoWithoutBack1Icon}
              loading="lazy"
              alt=""
              src="/headerlogowithoutback-11@2x.png"
            />
          </div>
          <b className={styles.forgotPassword1}>Forgot Password?!</b>
          <div className={styles.pleaseEnterYourEmailToResWrapper}>
            <div className={styles.pleaseEnterYour}>
              Please enter your email to reset the password
            </div>
          </div>
          <div className={styles.inputFieldWrapper}>
            <InputField
              propAlignSelf="unset"
              propGap="10px"
              propWidth="410px"
              password="Email Address"
              propMinWidth="113px"
              propHeight="unset"
              enterYourPassword="alex@email.com"
              icon="/icon.svg"
            />
          </div>
          <div className={styles.inputFieldWrapper}>
            <Button
              title="Reset Password"
              icon={false}
              propWidth="410px"
              propBorderRadius="15px"
              propBackgroundColor="#0245a3"
              propPadding="9px 20px"
              propAlignSelf="unset"
              propBoxShadow="4px 2px 0px rgba(0, 0, 0, 0.04)"
              propBorder="1px solid #1890ff"
              propOverflow="hidden"
              propFlex="unset"
              wrapper="/wrapper3@2x.png"
              propFontFamily="Poppins"
              propColor="#fff"
              propMinWidth="unset"
              propFlex1="unset"
              propFontWeight="bold"
              propDisplay="unset"
            />
          </div>
          <div className={styles.frameWrapper}>
            <div className={styles.frameGroup}>
              <div className={styles.lineWrapper}>
                <div className={styles.frameChild} />
              </div>
              <div className={styles.or}>OR</div>
              <div className={styles.lineWrapper}>
                <div className={styles.frameChild} />
              </div>
            </div>
          </div>
          <div className={styles.inputFieldWrapper}>
            <Button
              title="Back to Login"
              icon={false}
              propWidth="410px"
              propBorderRadius="15px"
              propBackgroundColor="#fff"
              propPadding="9px 15px"
              propAlignSelf="unset"
              propBoxShadow="0px 2px 0px rgba(0, 0, 0, 0.02)"
              propBorder="1px solid #d9d9d9"
              propOverflow="unset"
              propFlex="unset"
              wrapper="/wrapper-12@2x.png"
              propFontFamily="Poppins"
              propColor="rgba(0, 0, 0, 0.85)"
              propMinWidth="unset"
              propFlex1="1"
              propFontWeight="bold"
              propDisplay="inline-block"
            />
          </div>
        </section>
      </main>
    </div>
  );
};

export default ForgotPassword;
