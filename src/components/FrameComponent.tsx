import { FunctionComponent, useCallback } from "react";
import InputField from "./InputField";
import Checkbox from "./Checkbox";
import { useNavigate } from "react-router-dom";
import Button from "./Button";
import styles from "./FrameComponent.module.css";

export type FrameComponentType = {
  className?: string;
};

const FrameComponent: FunctionComponent<FrameComponentType> = ({
  className = "",
}) => {
  const navigate = useNavigate();

  const onTextClick = useCallback(() => {
    navigate("/forgot-password");
  }, [navigate]);

  return (
    <div className={[styles.subHeaderParent, className].join(" ")}>
      <div className={styles.subHeader}>
        <img
          className={styles.headerLogoWithoutBack1Icon}
          loading="lazy"
          alt=""
          src="/headerlogowithoutback-1@2x.png"
        />
      </div>
      <b className={styles.loginIntoYour}>Login into your account</b>
      <InputField
        propAlignSelf="stretch"
        propGap="16px"
        propWidth="unset"
        password="Email Address"
        propMinWidth="113px"
        enterYourPassword="alex@email.com"
        icon="/icon.svg"
      />
      <InputField
        password="Password"
        enterYourPassword="Enter your password"
        icon="/icon-1.svg"
      />
      <div className={styles.frameWrapper}>
        <div className={styles.checkboxContainerParent}>
          <div className={styles.checkboxContainer}>
            <Checkbox />
          </div>
          <div className={styles.button}>
            <div className={styles.iconWrapper}>
              <img
                className={styles.wrapperIcon}
                alt=""
                src="/wrapper1@2x.png"
              />
            </div>
            <div className={styles.text} onClick={onTextClick}>
              Forgot Password?
            </div>
          </div>
        </div>
      </div>
      <Button
        title="Login Now"
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
        wrapper="/wrapper1@2x.png"
        propFontFamily="Poppins"
        propColor="#fff"
        propMinWidth="unset"
        propFlex1="1"
        propFontWeight="bold"
        propDisplay="inline-block"
      />
      <div className={styles.frameParent}>
        <div className={styles.lineWrapper}>
          <div className={styles.frameChild} />
        </div>
        <div className={styles.or}>OR</div>
        <div className={styles.lineWrapper}>
          <div className={styles.frameChild} />
        </div>
      </div>
      <Button
        title="Sign up Now"
        icon={false}
        propWidth="unset"
        propBorderRadius="15px"
        propBackgroundColor="#fff"
        propPadding="9px 15px"
        propAlignSelf="stretch"
        propBoxShadow="0px 2px 0px rgba(0, 0, 0, 0.02)"
        propBorder="1px solid #d9d9d9"
        propOverflow="unset"
        propFlex="unset"
        wrapper="/wrapper1@2x.png"
        propFontFamily="Poppins"
        propColor="rgba(0, 0, 0, 0.85)"
        propMinWidth="unset"
        propFlex1="1"
        propFontWeight="bold"
        propDisplay="inline-block"
      />
    </div>
  );
};

export default FrameComponent;
