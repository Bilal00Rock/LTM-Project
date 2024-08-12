import { FunctionComponent, useState, useCallback } from "react";
import Modalprogress1Analyze from "./Modalprogress1Analyze";
import PortalPopup from "./PortalPopup";
import ComponentsTableColumnCheck from "./ComponentsTableColumnCheck";
import ComponentsTableColumnLink from "./ComponentsTableColumnLink";
import TableCellheader from "./TableCellheader";
import TableCelltext1 from "./TableCelltext1";
import ComponentsTableColumnText from "./ComponentsTableColumnText";
import ComponentsTableColumnStatus1 from "./ComponentsTableColumnStatus1";
import { useNavigate } from "react-router-dom";
import styles from "./Styles/Columns.module.css";

export type ColumnsType = {
  className?: string;
};

const Columns: FunctionComponent<ColumnsType> = ({ className = "" }) => {
  const [isModalprogress1AnalyzeOpen, setModalprogress1AnalyzeOpen] =
    useState(false);
  const navigate = useNavigate();

  const openModalprogress1Analyze = useCallback(() => {
    setModalprogress1AnalyzeOpen(true);
  }, []);

  const closeModalprogress1Analyze = useCallback(() => {
    setModalprogress1AnalyzeOpen(false);
  }, []);

  const onJimGreenTextClick = useCallback(() => {
    navigate("/dashboardpatientsprofileresults");
  }, [navigate]);

  return (
    <>
      <div className={[styles.columns, className].join(" ")}>
        <ComponentsTableColumnCheck />
        <ComponentsTableColumnLink
          propWidth="unset"
          propOverflow="unset"
          title="EEG ID"
          text="1"
          text1="2"
          text2="3"
          text3="4"
          text4="5"
          text5="6"
          text6="7"
          text7="8"
          text8="9"
          text9="10"
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
            propFlexWrap="wrap"
            propRowGap="20px"
            text="Vel cras auctor at tortor imperdiet amet id sed rhoncus."
            invite="more.."
          />
          <TableCelltext1
            propAlignSelf="stretch"
            propFlexWrap="wrap"
            propRowGap="20px"
            text="Vel cras auctor at tortor imperdiet amet id sed rhoncus."
            invite="more.."
          />
          <TableCelltext1
            propAlignSelf="stretch"
            propFlexWrap="wrap"
            propRowGap="20px"
            text="Vel cras auctor at tortor imperdiet amet id sed rhoncus."
            invite="more.."
          />
          <TableCelltext1
            propAlignSelf="stretch"
            propFlexWrap="wrap"
            propRowGap="20px"
            text="Vel cras auctor at tortor imperdiet amet id sed rhoncus."
            invite="more.."
          />
          <TableCelltext1
            propAlignSelf="stretch"
            propFlexWrap="wrap"
            propRowGap="20px"
            text="Vel cras auctor at tortor imperdiet amet id sed rhoncus."
            invite="more.."
          />
          <TableCelltext1
            propAlignSelf="stretch"
            propFlexWrap="wrap"
            propRowGap="20px"
            text="Vel cras auctor at tortor imperdiet amet id sed rhoncus."
            invite="more.."
          />
          <TableCelltext1
            propAlignSelf="stretch"
            propFlexWrap="wrap"
            propRowGap="20px"
            text="Vel cras auctor at tortor imperdiet amet id sed rhoncus."
            invite="more.."
          />
          <TableCelltext1
            propAlignSelf="stretch"
            propFlexWrap="wrap"
            propRowGap="20px"
            text="Vel cras auctor at tortor imperdiet amet id sed rhoncus."
            invite="more.."
          />
          <TableCelltext1
            propAlignSelf="stretch"
            propFlexWrap="wrap"
            propRowGap="20px"
            text="Vel cras auctor at tortor imperdiet amet id sed rhoncus."
            invite="more.."
          />
          <TableCelltext1
            propAlignSelf="stretch"
            propFlexWrap="wrap"
            propRowGap="20px"
            text="Vel cras auctor at tortor imperdiet amet id sed rhoncus."
            invite="more.."
          />
        </div>
        <ComponentsTableColumnText
          propFlex="unset"
          propWidth="129px"
          propAlignSelf="stretch"
          title="Date"
          propFlex1="1"
          sorter="/-sorter.svg"
          text="12/12/2023"
          text1="12/12/2023"
          text2="12/12/2023"
          text3="12/12/2023"
          text4="12/12/2023"
          text5="12/12/2023"
          text6="12/12/2023"
          text7="12/12/2023"
          text8="1,199,750"
          text9="5,841,026"
        />
        <ComponentsTableColumnStatus1 />
        <ComponentsTableColumnText
          propFlex="unset"
          propWidth="161px"
          propAlignSelf="stretch"
          title="Analyzed Time"
          propFlex1="1"
          sorter="/-sorter.svg"
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
            <div className={styles.invite} onClick={openModalprogress1Analyze}>
              Analyze
            </div>
            <div className={styles.divider}>
              <img
                className={styles.lineIcon}
                loading="lazy"
                alt=""
                src="/line.svg"
              />
            </div>
            <div className={styles.jimGreen} onClick={onJimGreenTextClick}>
              Results
            </div>
            <div className={styles.divider}>
              <img className={styles.lineIcon} alt="" src="/line.svg" />
            </div>
            <div className={styles.delete}>Delete</div>
          </div>
          <div className={styles.tableCellaction}>
            <div className={styles.invite1}>Analyze</div>
            <div className={styles.divider}>
              <img
                className={styles.lineIcon}
                loading="lazy"
                alt=""
                src="/line.svg"
              />
            </div>
            <div className={styles.jimGreen1}>Results</div>
            <div className={styles.divider}>
              <img className={styles.lineIcon} alt="" src="/line.svg" />
            </div>
            <div className={styles.delete}>Delete</div>
          </div>
          <div className={styles.tableCellaction}>
            <div className={styles.invite1}>Analyze</div>
            <div className={styles.divider}>
              <img
                className={styles.lineIcon}
                loading="lazy"
                alt=""
                src="/line.svg"
              />
            </div>
            <div className={styles.jimGreen1}>{`Results `}</div>
            <div className={styles.divider}>
              <img className={styles.lineIcon} alt="" src="/line.svg" />
            </div>
            <div className={styles.delete}>Delete</div>
          </div>
          <div className={styles.tableCellaction}>
            <div className={styles.invite1}>Analyze</div>
            <div className={styles.divider}>
              <img
                className={styles.lineIcon}
                loading="lazy"
                alt=""
                src="/line.svg"
              />
            </div>
            <div className={styles.jimGreen1}>Results</div>
            <div className={styles.divider}>
              <img className={styles.lineIcon} alt="" src="/line.svg" />
            </div>
            <div className={styles.delete}>Delete</div>
          </div>
          <div className={styles.tableCellaction}>
            <div className={styles.invite1}>Analyze</div>
            <div className={styles.divider}>
              <img
                className={styles.lineIcon}
                loading="lazy"
                alt=""
                src="/line.svg"
              />
            </div>
            <div className={styles.jimGreen1}>Results</div>
            <div className={styles.divider}>
              <img className={styles.lineIcon} alt="" src="/line.svg" />
            </div>
            <div className={styles.delete}>Delete</div>
          </div>
          <div className={styles.tableCellaction}>
            <div className={styles.invite1}>Analyze</div>
            <div className={styles.divider}>
              <img
                className={styles.lineIcon}
                loading="lazy"
                alt=""
                src="/line.svg"
              />
            </div>
            <div className={styles.jimGreen1}>Results</div>
            <div className={styles.divider}>
              <img className={styles.lineIcon} alt="" src="/line.svg" />
            </div>
            <div className={styles.delete}>Delete</div>
          </div>
          <div className={styles.tableCellaction}>
            <div className={styles.invite1}>Analyze</div>
            <div className={styles.divider}>
              <img
                className={styles.lineIcon}
                loading="lazy"
                alt=""
                src="/line.svg"
              />
            </div>
            <div className={styles.jimGreen1}>Results</div>
            <div className={styles.divider}>
              <img className={styles.lineIcon} alt="" src="/line.svg" />
            </div>
            <div className={styles.delete}>Delete</div>
          </div>
          <div className={styles.tableCellaction}>
            <div className={styles.invite1}>Analyze</div>
            <div className={styles.divider}>
              <img
                className={styles.lineIcon}
                loading="lazy"
                alt=""
                src="/line.svg"
              />
            </div>
            <div className={styles.jimGreen1}>{`Results `}</div>
            <div className={styles.divider}>
              <img className={styles.lineIcon} alt="" src="/line.svg" />
            </div>
            <div className={styles.delete}>Delete</div>
          </div>
          <div className={styles.tableCellaction8}>
            <div className={styles.invite8}>Config</div>
            <div className={styles.divider}>
              <img
                className={styles.lineIcon}
                loading="lazy"
                alt=""
                src="/line.svg"
              />
            </div>
            <div className={styles.jimGreen1}>Results</div>
            <div className={styles.divider}>
              <img className={styles.lineIcon} alt="" src="/line.svg" />
            </div>
            <div className={styles.delete8}>Delete</div>
          </div>
          <div className={styles.tableCellaction9}>
            <div className={styles.invite9}>Config</div>
            <div className={styles.divider18}>
              <img className={styles.lineIcon18} alt="" src="/line.svg" />
            </div>
            <div className={styles.jimGreen9}>Results</div>
            <div className={styles.divider18}>
              <img className={styles.lineIcon18} alt="" src="/line.svg" />
            </div>
            <div className={styles.delete9}>Delete</div>
          </div>
        </div>
      </div>
      {isModalprogress1AnalyzeOpen && (
        <PortalPopup
          overlayColor="rgba(113, 113, 113, 0.3)"
          placement="Centered"
          onOutsideClick={closeModalprogress1Analyze}
        >
          <Modalprogress1Analyze onClose={closeModalprogress1Analyze} />
        </PortalPopup>
      )}
    </>
  );
};

export default Columns;
