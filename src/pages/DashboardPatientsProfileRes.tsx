import { FunctionComponent, useCallback } from "react";
import SiderantFinance from "../components/SiderantFinance";
import { useNavigate } from "react-router-dom";
import TextText from "../components/TextText";
import TableToolbar from "../components/TableToolbar";
import Columns1 from "../components/Columns1";
import Pagination from "../components/Pagination";
import styles from "./Styles/DashboardPatientsProfileRes.module.css";

const DashboardPatientsProfileRes: FunctionComponent = () => {
  const navigate = useNavigate();

  const onArrowLeftIconClick = useCallback(() => {
    navigate("/dashboardpatientsprofile");
  }, [navigate]);

  return (
    <div className={styles.dashboardpatientsprofileres}>
      <SiderantFinance lOGO="/logo@2x.png" />
      <main className={styles.dashboardWrapper}>
        <section className={styles.dashboard}>
          <div className={styles.cardhead}>
            <div className={styles.head}>
              <div className={styles.titleWrapper}>
                <div className={styles.title}>
                  <img
                    className={styles.arrowleftIcon}
                    loading="lazy"
                    alt=""
                    src="/arrowleft2.svg"
                    onClick={onArrowLeftIconClick}
                  />
                  <h2 className={styles.patientNameTitle}>
                    EEG Analysis Report
                  </h2>
                  <img
                    className={styles.outboxIcon}
                    loading="lazy"
                    alt=""
                    src="/outbox.svg"
                  />
                </div>
              </div>
              <div className={styles.bodypi}>
                <TextText
                  text="Information"
                  propWidth="unset"
                  propFlexDirection="column"
                  propAlignSelf="stretch"
                  propHeight="unset"
                  propPadding="0px 20px 0px 0px"
                  propFlex="unset"
                  propMinWidth="unset"
                  propOverflow="hidden"
                  propHeight1="unset"
                  propColor="rgba(0, 0, 0, 0.85)"
                  propDisplay="inline-block"
                  propMarginTop="unset"
                  propFontWeight="600"
                  propMinWidth1="85px"
                  propTextDecoration="none"
                  propFontSize="16px"
                />
                <div className={styles.bodypiChild} />
                <div className={styles.container}>
                  <div className={styles.body}>
                    <div className={styles.patientName}>Patient Name</div>
                  </div>
                  <div className={styles.body1}>
                    <div className={styles.davoodRezaei}>Davood Rezaei</div>
                  </div>
                  <div className={styles.body2}>
                    <div className={styles.davoodRezaei}>{`Phone Number `}</div>
                  </div>
                  <div className={styles.body3}>
                    <div className={styles.phoneNumberValue}>09123456789</div>
                  </div>
                  <div className={styles.body4}>
                    <div className={styles.eegStatus}>EEG Status</div>
                  </div>
                  <div className={styles.body5}>
                    <div className={styles.analyzed}>Analyzed</div>
                  </div>
                  <div className={styles.body6}>
                    <b className={styles.emptyValue}>:</b>
                  </div>
                  <div className={styles.body7}>
                    <b className={styles.emptyValue}>:</b>
                  </div>
                  <div className={styles.body8}>
                    <b className={styles.emptyValue}>:</b>
                  </div>
                </div>
                <div className={styles.container1}>
                  <div className={styles.body9}>
                    <div className={styles.eegId}>EEG ID</div>
                  </div>
                  <div className={styles.body10}>
                    <div className={styles.div}>123456789</div>
                  </div>
                  <div className={styles.body11}>
                    <div className={styles.gender}>Gender</div>
                  </div>
                  <div className={styles.body12}>
                    <div className={styles.male}>Male</div>
                  </div>
                  <div className={styles.body13}>
                    <div className={styles.eegDate}>{`EEG Date `}</div>
                  </div>
                  <div className={styles.body14}>
                    <div className={styles.div1}>12/12/2023</div>
                  </div>
                  <div className={styles.body6}>
                    <b className={styles.emptyValue}>:</b>
                  </div>
                  <div className={styles.body7}>
                    <b className={styles.emptyValue}>:</b>
                  </div>
                  <div className={styles.body8}>
                    <b className={styles.emptyValue}>:</b>
                  </div>
                </div>
                <div className={styles.container2}>
                  <div className={styles.body18}>
                    <div className={styles.noOfEegs}>No. of EEG’s</div>
                  </div>
                  <div className={styles.body19}>
                    <div className={styles.div2}>3</div>
                  </div>
                  <div className={styles.body20}>
                    <div className={styles.eegDescription}>EEG Description</div>
                  </div>
                  <div className={styles.body21}>
                    <div className={styles.description}>Description</div>
                  </div>
                  <div className={styles.body22} />
                  <div className={styles.body22} />
                  <div className={styles.body24}>
                    <b className={styles.emptyValue}>:</b>
                  </div>
                  <div className={styles.body25}>
                    <b className={styles.emptyValue}>:</b>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <footer className={styles.tablecolumnBasedWrapper}>
            <div className={styles.tablecolumnBased}>
              <TableToolbar
                propTop="0"
                propPosition="sticky"
                text="EEG Analyzed Table"
                propDisplay="unset"
                propMinWidth="unset"
                label={false}
                secondaryLabel={false}
                leadingContent={false}
                leadingIconStart={false}
                leadingAvatar={false}
                leadingText={false}
                leadingIconEnd={false}
                leadingDivider={false}
                tags
              />
              <Columns1 />
              <Pagination showIcon />
            </div>
          </footer>
        </section>
      </main>
    </div>
  );
};

export default DashboardPatientsProfileRes;
