import { FunctionComponent, useCallback } from "react";
import SiderantFinance from "../components/SiderantFinance";
import { useNavigate } from "react-router-dom";
import TextText from "../components/TextText";
import TableColumnBased from "../components/TableColumnBased";
import styles from "./Styles/DashboardPatientsProfile.module.css";

const DashboardPatientsProfile: FunctionComponent = () => {
  const navigate = useNavigate();

  const onArrowLeftIconClick = useCallback(() => {
    navigate("/");
  }, [navigate]);

  return (
    <div className={styles.dashboardpatientsprofile}>
      <SiderantFinance lOGO="/logo@2x.png" />
      <main className={styles.dashboardContainer}>
        <section className={styles.dashboard}>
          <div className={styles.cardhead}>
            <div className={styles.head}>
              <div className={styles.titleWrapper}>
                <div className={styles.title}>
                  <img
                    className={styles.arrowleftIcon}
                    loading="lazy"
                    alt=""
                    src="/arrowleft1.svg"
                    onClick={onArrowLeftIconClick}
                  />
                  <a className={styles.patientNameTitle}>Patient Profile</a>
                  <img
                    className={styles.personIcon}
                    loading="lazy"
                    alt=""
                    src="/person.svg"
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
                  propTextDecoration="unset"
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
                    <div className={styles.value}>09123456789</div>
                  </div>
                  <div className={styles.body4}>
                    <div className={styles.status}>Status</div>
                  </div>
                  <div className={styles.body5}>
                    <a className={styles.general}>General</a>
                  </div>
                  <div className={styles.body6}>
                    <b className={styles.valueEmpty}>:</b>
                  </div>
                  <div className={styles.body7}>
                    <b className={styles.valueEmpty}>:</b>
                  </div>
                  <div className={styles.body8}>
                    <b className={styles.valueEmpty}>:</b>
                  </div>
                </div>
                <div className={styles.container}>
                  <div className={styles.body9}>
                    <div className={styles.patientId}>Patient ID</div>
                  </div>
                  <div className={styles.body10}>
                    <div className={styles.div}>123456789</div>
                  </div>
                  <div className={styles.body9}>
                    <div className={styles.gender}>Gender</div>
                  </div>
                  <div className={styles.body12}>
                    <div className={styles.male}>Male</div>
                  </div>
                  <div className={styles.body13}>
                    <div className={styles.dateOfBirthage}>
                      Date of birth(age)
                    </div>
                  </div>
                  <div className={styles.body14}>
                    <div className={styles.div1}>12/12/1995 (29)</div>
                  </div>
                  <div className={styles.body6}>
                    <b className={styles.valueEmpty}>:</b>
                  </div>
                  <div className={styles.body7}>
                    <b className={styles.valueEmpty}>:</b>
                  </div>
                  <div className={styles.body8}>
                    <b className={styles.valueEmpty}>:</b>
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
                    <div className={styles.description}>Description</div>
                  </div>
                  <div className={styles.body20}>
                    <div className={styles.description}>Description</div>
                  </div>
                  <div className={styles.body22} />
                  <div className={styles.body22} />
                  <div className={styles.body24}>
                    <b className={styles.valueEmpty}>:</b>
                  </div>
                  <div className={styles.body25}>
                    <b className={styles.valueEmpty}>:</b>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className={styles.tableContainer}>
            <TableColumnBased />
          </div>
        </section>
      </main>
    </div>
  );
};

export default DashboardPatientsProfile;
