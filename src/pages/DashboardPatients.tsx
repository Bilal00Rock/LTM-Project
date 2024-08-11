import { FunctionComponent, useCallback } from "react";
import SiderantFinance from "../components/SiderantFinance";
import PageHeaderLegacy from "../components/PageHeaderLegacy";
import TableToolbar from "../components/TableToolbar";
import ComponentsTableColumnCheck from "../components/ComponentsTableColumnCheck";
import ComponentsTableColumnLink from "../components/ComponentsTableColumnLink";
import TableCellheader from "../components/TableCellheader";
import TableCelltext1 from "../components/TableCelltext1";
import ComponentsTableColumnText from "../components/ComponentsTableColumnText";
import ComponentsTableColumnStatus from "../components/ComponentsTableColumnStatus";
import { useNavigate } from "react-router-dom";
import Pagination from "../components/Pagination";
import styles from "./DashboardPatients.module.css";

const DashboardPatients: FunctionComponent = () => {
  const navigate = useNavigate();

  const onInviteTextClick = useCallback(() => {
    navigate("/dashboardpatientsprofile");
  }, [navigate]);

  return (
    <div className={styles.dashboardpatients}>
      <SiderantFinance lOGO="/logo@2x.png" />
      <main className={styles.dashboardWrapper}>
        <section className={styles.dashboard}>
          <div className={styles.pageContainer}>
            <PageHeaderLegacy />
            <div className={styles.content}>
              <div className={styles.tableToolbarParent}>
                <TableToolbar
                  propTop="unset"
                  propPosition="unset"
                  text="Patients List"
                  propDisplay="inline-block"
                  propMinWidth="90px"
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
                <div className={styles.columns}>
                  <ComponentsTableColumnCheck />
                  <ComponentsTableColumnLink
                    propWidth="unset"
                    propOverflow="hidden"
                    title="Patient Name"
                    text="Davood Rezaei"
                    text1="TradeCode 98"
                    text2="TradeCode 97"
                    text3="TradeCode 96"
                    text4="TradeCode 95"
                    text5="TradeCode 94"
                    text6="TradeCode 93"
                    text7="TradeCode 92"
                    text8="TradeCode 91"
                    text9="TradeCode 90"
                  />
                  <div className={styles.componentstableColumntext}>
                    <TableCellheader
                      propAlignSelf="stretch"
                      title="Description"
                      propFlex="1"
                      propDisplay="unset"
                      propMinWidth="unset"
                    />
                    <TableCelltext1
                      propAlignSelf="stretch"
                      propFlexWrap="unset"
                      propRowGap="unset"
                      text="Vel cras auctor at tortor imperdiet amet id sed rhoncus."
                      invite="more.."
                    />
                    <TableCelltext1
                      propAlignSelf="stretch"
                      propFlexWrap="unset"
                      propRowGap="unset"
                      text="Vel cras auctor at tortor imperdiet amet id sed rhoncus."
                      invite="more.."
                    />
                    <TableCelltext1
                      propAlignSelf="stretch"
                      propFlexWrap="unset"
                      propRowGap="unset"
                      text="Vel cras auctor at tortor imperdiet amet id sed rhoncus."
                      invite="more.."
                    />
                    <TableCelltext1
                      propAlignSelf="stretch"
                      propFlexWrap="unset"
                      propRowGap="unset"
                      text="Vel cras auctor at tortor imperdiet amet id sed rhoncus."
                      invite="more.."
                    />
                    <TableCelltext1
                      propAlignSelf="stretch"
                      propFlexWrap="unset"
                      propRowGap="unset"
                      text="Vel cras auctor at tortor imperdiet amet id sed rhoncus."
                      invite="more.."
                    />
                    <TableCelltext1
                      propAlignSelf="stretch"
                      propFlexWrap="unset"
                      propRowGap="unset"
                      text="Vel cras auctor at tortor imperdiet amet id sed rhoncus."
                      invite="more.."
                    />
                    <TableCelltext1
                      propAlignSelf="stretch"
                      propFlexWrap="unset"
                      propRowGap="unset"
                      text="Vel cras auctor at tortor imperdiet amet id sed rhoncus."
                      invite="more.."
                    />
                    <TableCelltext1
                      propAlignSelf="stretch"
                      propFlexWrap="unset"
                      propRowGap="unset"
                      text="Vel cras auctor at tortor imperdiet amet id sed rhoncus."
                      invite="more.."
                    />
                    <TableCelltext1
                      propAlignSelf="stretch"
                      propFlexWrap="unset"
                      propRowGap="unset"
                      text="Vel cras auctor at tortor imperdiet amet id sed rhoncus."
                      invite="more.."
                    />
                    <TableCelltext1
                      propAlignSelf="stretch"
                      propFlexWrap="unset"
                      propRowGap="unset"
                      text="Vel cras auctor at tortor imperdiet amet id sed rhoncus."
                      invite="more.."
                    />
                  </div>
                  <ComponentsTableColumnText
                    propFlex="unset"
                    propWidth="115px"
                    propAlignSelf="stretch"
                    title="Age"
                    propFlex1="1"
                    sorter="/-sorter.svg"
                    text="15"
                    text1="6,462,020"
                    text2="8,664,948"
                    text3="2,592,335"
                    text4="6,337,875"
                    text5="4,927,239"
                    text6="6,241,243"
                    text7="1,556,493"
                    text8="1,199,750"
                    text9="5,841,026"
                  />
                  <ComponentsTableColumnStatus
                    propHeight="unset"
                    title="Type"
                  />
                  <ComponentsTableColumnText
                    propFlex="unset"
                    propWidth="197px"
                    propAlignSelf="unset"
                    title="Last EEG Analyze Time"
                    propFlex1="unset"
                    sorter="/-sorter-1.svg"
                    text="2021-02-05 08:28:36"
                    text1="2021-02-03 19:49:33"
                    text2="2021-02-02 19:17:15"
                    text3="2021-02-02 09:46:33"
                    text4="2021-02-02 07:57:01"
                    text5="2021-02-02 05:01:54"
                    text6="2021-02-02 00:18:11"
                    text7="2021-02-01 11:03:33"
                    text8="2021-01-31 03:42:50"
                    text9="2021-01-31 00:44:25"
                  />
                  <div className={styles.componentstableColumnaction}>
                    <TableCellheader
                      propAlignSelf="stretch"
                      title="Action"
                      propFlex="1"
                      propDisplay="unset"
                      propMinWidth="unset"
                    />
                    <div className={styles.tableCellaction}>
                      <div
                        className={styles.invite}
                        onClick={onInviteTextClick}
                      >
                        Profile
                      </div>
                      <div className={styles.divider}>
                        <img
                          className={styles.lineIcon}
                          loading="lazy"
                          alt=""
                          src="/line.svg"
                        />
                      </div>
                      <div className={styles.jimGreen}>Delete</div>
                    </div>
                    <div className={styles.tableCellaction1}>
                      <div className={styles.invite1}>Profile</div>
                      <div className={styles.divider}>
                        <img
                          className={styles.lineIcon}
                          alt=""
                          src="/line.svg"
                        />
                      </div>
                      <div className={styles.jimGreen1}>Delete</div>
                    </div>
                    <div className={styles.tableCellaction1}>
                      <div className={styles.invite1}>Profile</div>
                      <div className={styles.divider}>
                        <img
                          className={styles.lineIcon}
                          alt=""
                          src="/line.svg"
                        />
                      </div>
                      <div className={styles.jimGreen1}>Delete</div>
                    </div>
                    <div className={styles.tableCellaction1}>
                      <div className={styles.invite1}>Profile</div>
                      <div className={styles.divider}>
                        <img
                          className={styles.lineIcon}
                          alt=""
                          src="/line.svg"
                        />
                      </div>
                      <div className={styles.jimGreen1}>Delete</div>
                    </div>
                    <div className={styles.tableCellaction}>
                      <div className={styles.invite4}>Profile</div>
                      <div className={styles.divider}>
                        <img
                          className={styles.lineIcon}
                          loading="lazy"
                          alt=""
                          src="/line.svg"
                        />
                      </div>
                      <div className={styles.jimGreen}>Delete</div>
                    </div>
                    <div className={styles.tableCellaction}>
                      <div className={styles.invite4}>Profile</div>
                      <div className={styles.divider}>
                        <img
                          className={styles.lineIcon}
                          loading="lazy"
                          alt=""
                          src="/line.svg"
                        />
                      </div>
                      <div className={styles.jimGreen}>Delete</div>
                    </div>
                    <div className={styles.tableCellaction}>
                      <div className={styles.invite4}>Profile</div>
                      <div className={styles.divider}>
                        <img
                          className={styles.lineIcon}
                          loading="lazy"
                          alt=""
                          src="/line.svg"
                        />
                      </div>
                      <div className={styles.jimGreen}>Delete</div>
                    </div>
                    <div className={styles.tableCellaction}>
                      <div className={styles.invite4}>Profile</div>
                      <div className={styles.divider}>
                        <img
                          className={styles.lineIcon}
                          loading="lazy"
                          alt=""
                          src="/line.svg"
                        />
                      </div>
                      <div className={styles.jimGreen}>Delete</div>
                    </div>
                    <div className={styles.tableCellaction}>
                      <div className={styles.invite4}>Profile</div>
                      <div className={styles.divider}>
                        <img
                          className={styles.lineIcon}
                          loading="lazy"
                          alt=""
                          src="/line.svg"
                        />
                      </div>
                      <div className={styles.jimGreen}>Delete</div>
                    </div>
                    <div className={styles.tableCellaction}>
                      <div className={styles.invite4}>Profile</div>
                      <div className={styles.divider}>
                        <img
                          className={styles.lineIcon}
                          loading="lazy"
                          alt=""
                          src="/line.svg"
                        />
                      </div>
                      <div className={styles.jimGreen}>Delete</div>
                    </div>
                  </div>
                </div>
                <Pagination showIcon />
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default DashboardPatients;
