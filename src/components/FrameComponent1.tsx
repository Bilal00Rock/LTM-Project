import { FunctionComponent, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import Button from "./Button";
import styles from "./FrameComponent1.module.css";

export type FrameComponent1Type = {
  className?: string;
};

const FrameComponent1: FunctionComponent<FrameComponent1Type> = ({
  className = "",
}) => {
  const navigate = useNavigate();

  const onNavigationContainerClick = useCallback(() => {
    navigate("/login-page");
  }, [navigate]);

  return (
    <div className={[styles.headerLogoWithoutBack1Parent, className].join(" ")}>
      <img
        className={styles.headerLogoWithoutBack1Icon}
        loading="lazy"
        alt=""
        src="/headerlogowithoutback-12@2x.png"
      />
      <b className={styles.createYourOwn}>Create your own account</b>
      <div className={styles.navigation} onClick={onNavigationContainerClick}>
        <img
          className={styles.backIcon}
          loading="lazy"
          alt=""
          src="/vector.svg"
        />
        <div className={styles.back}>Back to Login</div>
        <div className={styles.navigationChild} />
      </div>
      <div className={styles.inputField}>
        <a className={styles.fullName}>Full Name</a>
        <div className={styles.input}>
          <img className={styles.nameIcon} alt="" src="/name@2x.png" />
          <div className={styles.davoodRezaei}>Davood Rezaei</div>
        </div>
      </div>
      <div className={styles.inputField}>
        <a className={styles.emailAddress}>Email Address</a>
        <div className={styles.input1}>
          <img className={styles.icon} loading="lazy" alt="" src="/icon.svg" />
          <div className={styles.alexemailcom}>alex@email.com</div>
        </div>
      </div>
      <div className={styles.inputField}>
        <a className={styles.password}>Password</a>
        <div className={styles.input}>
          <img
            className={styles.icon}
            loading="lazy"
            alt=""
            src="/icon-1.svg"
          />
          <div className={styles.davoodRezaei}>Enter your password</div>
        </div>
      </div>
      <div className={styles.inputField}>
        <a className={styles.password1}>Password-repeat</a>
        <div className={styles.input}>
          <img
            className={styles.icon}
            loading="lazy"
            alt=""
            src="/icon-1.svg"
          />
          <div className={styles.davoodRezaei}>Enter your password</div>
        </div>
      </div>
      <div className={styles.inputField}>
        <a className={styles.phoneNumber}>Phone Number</a>
        <div className={styles.input1}>
          <img
            className={styles.nameIcon}
            loading="lazy"
            alt=""
            src="/phone@2x.png"
          />
          <div className={styles.davoodRezaei}>09123456789</div>
        </div>
      </div>
      <Button
        title="Sign up Now"
        icon={false}
        propWidth="unset"
        propBorderRadius="15px"
        propBackgroundColor="#0245a3"
        propPadding="9px 15px"
        propAlignSelf="stretch"
        propBoxShadow="4px 2px 0px rgba(0, 0, 0, 0.04)"
        propBorder="1px solid #1890ff"
        propOverflow="hidden"
        propFlex="unset"
        wrapper="/wrapper4@2x.png"
        propFontFamily="Poppins"
        propColor="#fff"
        propMinWidth="unset"
        propFlex1="1"
        propFontWeight="bold"
        propDisplay="inline-block"
      />
    </div>
  );
};

export default FrameComponent1;
