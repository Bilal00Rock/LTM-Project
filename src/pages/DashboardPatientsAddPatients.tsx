import { FunctionComponent, useCallback } from "react";
import SiderantFinance from "../components/SiderantFinance";
import Breadcrumb from "../components/Breadcrumb";
import { useNavigate } from "react-router-dom";
import Avatar from "../components/Avatar";
import TextParagraph from "../components/TextParagraph";
import FormItemInput from "../components/FormItemInput";
import FormItemTextarea from "../components/FormItemTextarea";
import FormItemRadio from "../components/FormItemRadio";
import TextText from "../components/TextText";
import Button from "../components/Button";
import styles from "./Styles/DashboardPatientsAddPatients.module.css";

const DashboardPatientsAddPatients: FunctionComponent = () => {
  const navigate = useNavigate();

  const onArrowLeftIconClick = useCallback(() => {
    navigate("/");
  }, [navigate]);

  return (
    <div className={styles.dashboardpatientsaddpatients}>
      <SiderantFinance lOGO="/logo@2x.png" />
      <main className={styles.dashboardWrapper}>
        <section className={styles.dashboard}>
          <div className={styles.pageHeaderlegacy}>
            <Breadcrumb
              propAlignSelf="unset"
              propPadding="unset"
              lastItemLabel="Add Patient"
            />
            <div className={styles.headingLeft}>
              <img
                className={styles.arrowleftIcon}
                loading="lazy"
                alt=""
                src="/arrowleft.svg"
                onClick={onArrowLeftIconClick}
              />
              <div className={styles.wrapper}>
                <Avatar />
                <a className={styles.title}>Add Patient Form</a>
              </div>
            </div>
            <TextParagraph text="Please add your Patient Information." />
          </div>
          <div className={styles.cardBody}>
            <div className={styles.wrapper1}>
              <FormItemInput
                propHeight="unset"
                propFlexWrap="wrap"
                propRowGap="20px"
                propWidth="unset"
                title="Patient Full Name"
                propMinWidth="111px"
                inputPrefix="/inputprefix@2x.png"
                placeholder="Name"
                inputSuffix="/inputsuffix@2x.png"
                iconWrapper="/iconwrapper-1@2x.png"
                suffix={false}
                addonBefore={false}
                addonAfter={false}
                prefix={false}
                placeholder1
                formItemInputPadding="0px 0px 24px"
                labelMarginLeft="-125px"
              />
              <FormItemInput
                propHeight="unset"
                propFlexWrap="wrap"
                propRowGap="20px"
                propWidth="unset"
                title="Patient status"
                propMinWidth="87px"
                inputPrefix="/inputprefix@2x.png"
                placeholder="Status"
                inputSuffix="/inputsuffix@2x.png"
                iconWrapper="/iconwrapper-1@2x.png"
                suffix={false}
                addonBefore={false}
                addonAfter={false}
                prefix={false}
                placeholder1
                formItemInputPadding="0px 0px 24px"
                labelMarginLeft="-101px"
              />
              <FormItemTextarea />
              <FormItemInput
                propHeight="unset"
                propFlexWrap="wrap"
                propRowGap="20px"
                propWidth="unset"
                title="Patient ID"
                propMinWidth="61px"
                inputPrefix="/inputprefix1@2x.png"
                placeholder="ID"
                inputSuffix="/inputsuffix1@2x.png"
                iconWrapper="/iconwrapper-3@2x.png"
                suffix={false}
                addonBefore={false}
                addonAfter={false}
                prefix={false}
                placeholder1
                formItemInputPadding="unset"
                labelMarginLeft="-77px"
              />
              <FormItemInput
                propHeight="unset"
                propFlexWrap="wrap"
                propRowGap="20px"
                propWidth="unset"
                title="Phone Number"
                propMinWidth="94px"
                inputPrefix="/inputprefix1@2x.png"
                placeholder="09123456789"
                inputSuffix="/inputsuffix1@2x.png"
                iconWrapper="/iconwrapper-3@2x.png"
                suffix={false}
                addonBefore={false}
                addonAfter={false}
                prefix={false}
                placeholder1
                formItemInputPadding="unset"
                labelMarginLeft="-110px"
              />
              <FormItemInput
                title="Gender"
                inputPrefix="/inputprefix1@2x.png"
                placeholder="male"
                inputSuffix="/inputsuffix1@2x.png"
                iconWrapper="/iconwrapper-3@2x.png"
                suffix={false}
                addonBefore={false}
                addonAfter={false}
                prefix={false}
                placeholder1
              />
              <div className={styles.labelWrapper}>
                <div className={styles.label}>
                  <div className={styles.titleParent}>
                    <div className={styles.title1}>Date of Birth</div>
                    <div className={styles.div}>:</div>
                  </div>
                </div>
              </div>
              <div className={styles.dateRadioWrapper}>
                <div className={styles.datePicker}>
                  <div className={styles.input}>
                    <div className={styles.placeholderLeft}>Select date</div>
                    <div className={styles.dateIcon}>
                      <img
                        className={styles.unionIcon}
                        alt=""
                        src="/union.svg"
                      />
                    </div>
                  </div>
                </div>
                <FormItemRadio />
              </div>
              <TextText
                text="Customers and invitees are shared by default"
                propWidth="unset"
                propFlexDirection="row"
                propAlignSelf="stretch"
                propHeight="42px"
                propPadding="0px 0px 22px"
                propFlex="unset"
                propMinWidth="unset"
                propOverflow="hidden"
                propHeight1="unset"
                propColor="rgba(0, 0, 0, 0.45)"
                propDisplay="unset"
                propMarginTop="-2px"
                propFontWeight="unset"
                propMinWidth1="unset"
                propTextDecoration="unset"
                propFontSize="14px"
              />
              <div
                className={styles.buttonGroup}
                onClick={onArrowLeftIconClick}
              >
                <Button
                  title="Submit"
                  icon={false}
                  propWidth="unset"
                  propBorderRadius="2px"
                  propBackgroundColor="#1890ff"
                  propPadding="3px 15px"
                  propAlignSelf="unset"
                  propBoxShadow="0px 2px 0px rgba(0, 0, 0, 0.04)"
                  propBorder="1px solid #1890ff"
                  propOverflow="hidden"
                  propFlex="1"
                  wrapper="/wrapper-5@2x.png"
                  propFontFamily="Roboto"
                  propColor="#fff"
                  propMinWidth="45px"
                  propFlex1="unset"
                  propFontWeight="unset"
                  propDisplay="inline-block"
                />
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default DashboardPatientsAddPatients;
