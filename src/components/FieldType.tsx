import { FunctionComponent } from "react";
import SizeChanger from "./SizeChanger";
import Field from "./Field";
import Button from "./Button";
import styles from "./Styles/FieldType.module.css";

export type FieldTypeType = {
  className?: string;
};

const FieldType: FunctionComponent<FieldTypeType> = ({ className = "" }) => {
  return (
    <form className={[styles.fieldType, className].join(" ")}>
      <div className={styles.formIteminput}>
        <div className={styles.labelWrapper}>
          <div className={styles.label}>
            <div className={styles.title}>Current Password</div>
            <div className={styles.emptyInputTitles}>:</div>
          </div>
        </div>
        <SizeChanger
          propAlignSelf="unset"
          propAlignSelf1="unset"
          propWidth="unset"
          propAlignSelf2="unset"
          propFlex="unset"
          propDisplay="inline-block"
          propMinWidth="79px"
          sizeChangerOverflow="hidden"
          sizeChangerMinWidth="248px"
          selectionItemFlex="1"
          page="*************"
          showIcon={false}
          iconPadding="0px 6px"
          iconHeight="24px"
          iconWidth="24px"
        />
      </div>
      <div className={styles.formIteminput}>
        <div className={styles.labelWrapper}>
          <div className={styles.label1}>
            <div className={styles.title1}>New Password</div>
            <div className={styles.emptyInputTitles}>:</div>
          </div>
        </div>
        <Field />
      </div>
      <div className={styles.formIteminput}>
        <div className={styles.labelWrapper}>
          <div className={styles.label2}>
            <div className={styles.title2}>New Password (Confirm)</div>
            <div className={styles.emptyInputTitles}>:</div>
          </div>
        </div>
        <div className={styles.input}>
          <div className={styles.inputAddonlabel}>
            <div className={styles.wrapper}>
              <div className={styles.text}>http://</div>
            </div>
          </div>
          <div className={styles.input1}>
            <img
              className={styles.inputPrefixIcon}
              alt=""
              src="/inputprefix6@2x.png"
            />
            <div className={styles.input2}>***********</div>
            <img
              className={styles.inputPrefixIcon}
              alt=""
              src="/inputsuffix5@2x.png"
            />
          </div>
          <div className={styles.inputAddonicon}>
            <img
              className={styles.iconWrapper}
              alt=""
              src="/iconwrapper-15@2x.png"
            />
          </div>
        </div>
      </div>
      <Button
        title="Submit"
        icon={false}
        propWidth="77px"
        propBorderRadius="2px"
        propBackgroundColor="#1890ff"
        propPadding="3px 15px"
        propAlignSelf="unset"
        propBoxShadow="0px 2px 0px rgba(0, 0, 0, 0.04)"
        propBorder="1px solid #1890ff"
        propOverflow="hidden"
        propFlex="unset"
        wrapper="/wrapper-52@2x.png"
        propFontFamily="Roboto"
        propColor="#fff"
        propMinWidth="45px"
        propFlex1="unset"
        propFontWeight="unset"
        propDisplay="inline-block"
      />
    </form>
  );
};

export default FieldType;
