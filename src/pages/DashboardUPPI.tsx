import { FunctionComponent } from "react";
import SiderantFinance from "../components/SiderantFinance";
import Content from "../components/Content";
import TabsTop from "../components/TabsTop";
import TextText from "../components/TextText";
import Cell1 from "../components/Cell1";
import Cell from "../components/Cell";
import Stepslegacy from "../components/Stepslegacy";
import Form from "../components/Form";
import styles from "./Styles/DashboardUPPI.module.css";

const DashboardUPPI: FunctionComponent = () => {
  return (
    <div className={styles.dashboarduppi1}>
      <SiderantFinance lOGO="/logo@2x.png" />
      <main className={styles.contentPanel}>
        <section className={styles.dashboard}>
          <div className={styles.cardhead}>
            <div className={styles.head}>
              <div className={styles.titleWrapper}>
                <div className={styles.title}>
                  <a className={styles.dashboardTitle}>User Profile</a>
                  <img
                    className={styles.accountCircleIcon}
                    loading="lazy"
                    alt=""
                    src="/account-circle.svg"
                  />
                </div>
                <Content />
              </div>
              <TabsTop />
            </div>
            <div className={styles.bodypi}>
              <TextText
                text="User Info"
                propWidth="unset"
                propFlexDirection="row"
                propAlignSelf="stretch"
                propHeight="unset"
                propPadding="unset"
                propFlex="unset"
                propMinWidth="unset"
                propOverflow="hidden"
                propHeight1="unset"
                propColor="rgba(0, 0, 0, 0.85)"
                propDisplay="inline-block"
                propMarginTop="unset"
                propFontWeight="600"
                propMinWidth1="66px"
                propTextDecoration="unset"
                propFontSize="16px"
              />
              <div className={styles.bodySeparator} />
              <div className={styles.view}>
                <div className={styles.row}>
                  <Cell1
                    propWidth="107px"
                    label="UserName"
                    propMinWidth="unset"
                    propDisplay="unset"
                    propFlex="1"
                    propWidth1="unset"
                    propFlexDirection="column"
                  />
                  <Cell
                    propFlex="unset"
                    propMinWidth="unset"
                    propWidth="161px"
                    description="b_oliver"
                    propDisplay="unset"
                    propFontFamily="Roboto"
                  />
                  <Cell1
                    propWidth="unset"
                    label="Phone Number "
                    propMinWidth="94px"
                    propDisplay="inline-block"
                    propFlex="unset"
                    propWidth1="unset"
                    propFlexDirection="column"
                  />
                  <Cell
                    propFlex="1"
                    propMinWidth="139px"
                    propWidth="unset"
                    description="09123456789"
                    propDisplay="unset"
                    propFontFamily="Roboto"
                  />
                  <Cell1
                    propWidth="unset"
                    label="Address"
                    propMinWidth="52px"
                    propDisplay="inline-block"
                    propFlex="unset"
                    propWidth1="unset"
                    propFlexDirection="column"
                  />
                  <Cell
                    propFlex="0.8738"
                    propMinWidth="139px"
                    propWidth="unset"
                    description="Hangzhou, Zhejiang"
                    propDisplay="unset"
                    propFontFamily="Roboto"
                  />
                </div>
                <div className={styles.dataLabels}>
                  <Cell1
                    propWidth="107px"
                    label="Email"
                    propMinWidth="unset"
                    propDisplay="unset"
                    propFlex="1"
                    propWidth1="14px"
                    propFlexDirection="row"
                  />
                  <Cell
                    propFlex="unset"
                    propMinWidth="unset"
                    propWidth="161px"
                    description="alex@email.com"
                    propDisplay="unset"
                    propFontFamily="Poppins"
                  />
                  <Cell1 label="Clinic Address " />
                  <Cell description="No. 18, Wantang Road, Xihu District, Hangzhou, Zhejiang, China" />
                </div>
              </div>
            </div>
          </div>
          <div className={styles.cardpassword}>
            <div className={styles.wrapper}>
              <div className={styles.stepsContainer}>
                <Stepslegacy />
              </div>
              <div className={styles.formContainer}>
                <div className={styles.formWrapper}>
                  <Form />
                </div>
                <div className={styles.divider}>
                  <img
                    className={styles.lineIcon}
                    loading="lazy"
                    alt=""
                    src="/line-2.svg"
                  />
                </div>
                <div className={styles.footer}>
                  <div className={styles.texttext}>
                    <div className={styles.text}>Instructions</div>
                  </div>
                  <div className={styles.subFooter}>
                    <div className={styles.texttext1}>
                      <div className={styles.text1}>
                        <ul className={styles.anEnglishUppercaseCharacter}>
                          <li className={styles.anEnglishUppercase}>
                            An English uppercase character (A-Z)
                          </li>
                          <li className={styles.anEnglishUppercase}>
                            An English lowercase character (a-z)
                          </li>
                          <li className={styles.anEnglishUppercase}>
                            A number (0-9) and/or symbol (such as !, #, or %)
                          </li>
                          <li>Ten or more characters total.</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default DashboardUPPI;
