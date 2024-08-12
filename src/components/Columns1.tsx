import { FunctionComponent } from "react";
import Links from "./Links";
import styles from "./Styles/Columns1.module.css";

export type Columns1Type = {
  className?: string;
};

const Columns1: FunctionComponent<Columns1Type> = ({ className = "" }) => {
  return (
    <div className={[styles.columns, className].join(" ")}>
      <div className={styles.body}>
        <div className={styles.column}>
          <div className={styles.tableHeaderCell}>
            <div className={styles.no}>No.</div>
          </div>
          <div className={styles.tableCell}>
            <div className={styles.cellData}>1</div>
          </div>
          <div className={styles.tableCell1}>
            <div className={styles.actionLinks}>2</div>
          </div>
          <div className={styles.tableCell2}>
            <div className={styles.tableCellAwake}>3</div>
          </div>
          <div className={styles.tableCell2}>
            <div className={styles.tableCellAwake}>4</div>
          </div>
          <div className={styles.tableCell1}>
            <div className={styles.actionLinks}>5</div>
          </div>
          <div className={styles.tableCell1}>
            <div className={styles.actionLinks}>6</div>
          </div>
          <div className={styles.tableCell6}>
            <div className={styles.actionLinks}>7</div>
          </div>
          <div className={styles.tableCell6}>
            <div className={styles.actionLinks}>8</div>
          </div>
          <div className={styles.tableCell6}>
            <div className={styles.actionLinks}>9</div>
          </div>
          <div className={styles.tableCell9}>
            <div className={styles.linksSmall5}>10</div>
          </div>
        </div>
        <div className={styles.column1}>
          <div className={styles.tableHeaderCell1}>
            <div className={styles.class}>Class</div>
          </div>
          <div className={styles.tableCell10}>
            <div className={styles.artifact}>Artifact</div>
          </div>
          <div className={styles.tableCell10}>
            <div className={styles.artifact}>Artifact</div>
          </div>
          <div className={styles.tableCell12}>
            <div className={styles.ed}>Preictal</div>
          </div>
          <div className={styles.tableCell12}>
            <div className={styles.ed}>Preictal</div>
          </div>
          <div className={styles.tableCell10}>
            <div className={styles.artifact}>Artifact</div>
          </div>
          <div className={styles.tableCell10}>
            <div className={styles.artifact}>Artifact</div>
          </div>
          <div className={styles.tableCell12}>
            <div className={styles.ed}>Seizure</div>
          </div>
          <div className={styles.tableCell12}>
            <div className={styles.ed}>Seizure</div>
          </div>
          <div className={styles.tableCell12}>
            <div className={styles.ed}>Seizure</div>
          </div>
          <div className={styles.tableCell12}>
            <div className={styles.ed}>Seizure</div>
          </div>
        </div>
        <div className={styles.column2}>
          <div className={styles.tableHeaderCell2}>
            <div className={styles.type}>Type</div>
            <img
              className={styles.sorterIcon}
              loading="lazy"
              alt=""
              src="/-sorter.svg"
            />
          </div>
          <div className={styles.tableCell1}>
            <div className={styles.eyeBlink}>Eye Blink</div>
          </div>
          <div className={styles.tableCell1}>
            <div className={styles.eyeBlink}>Eye Blink</div>
          </div>
          <div className={styles.tableCell22}>
            <div className={styles.cellData}>-</div>
          </div>
          <div className={styles.tableCell22}>
            <div className={styles.cellData}>-</div>
          </div>
          <div className={styles.tableCell24}>
            <div className={styles.muscle}>Muscle</div>
          </div>
          <div className={styles.tableCell24}>
            <div className={styles.muscle}>Muscle</div>
          </div>
          <div className={styles.tableCell22}>
            <div className={styles.cellData}>-</div>
          </div>
          <div className={styles.tableCell22}>
            <div className={styles.cellData}>-</div>
          </div>
          <div className={styles.tableCell22}>
            <div className={styles.cellData}>-</div>
          </div>
          <div className={styles.tableCell22}>
            <div className={styles.cellData}>-</div>
          </div>
        </div>
        <div className={styles.column3}>
          <div className={styles.tableHeaderCell3}>
            <div className={styles.channel}>Channel</div>
            <img
              className={styles.sorterIcon}
              loading="lazy"
              alt=""
              src="/-sorter.svg"
            />
          </div>
          <div className={styles.tableCell}>
            <div className={styles.fp1}>FP1</div>
          </div>
          <div className={styles.tableCell}>
            <div className={styles.fp1}>FP1</div>
          </div>
          <div className={styles.tableCell32}>
            <div className={styles.t3}>T3</div>
          </div>
          <div className={styles.tableCell32}>
            <div className={styles.t3}>T3</div>
          </div>
          <div className={styles.tableCell34}>
            <div className={styles.t3}>T3</div>
          </div>
          <div className={styles.tableCell34}>
            <div className={styles.t3}>T3</div>
          </div>
          <div className={styles.tableCell32}>
            <div className={styles.t3}>T3</div>
          </div>
          <div className={styles.tableCell32}>
            <div className={styles.t3}>T3</div>
          </div>
          <div className={styles.tableCell32}>
            <div className={styles.t3}>T3</div>
          </div>
          <div className={styles.tableCell32}>
            <div className={styles.t3}>T3</div>
          </div>
        </div>
        <div className={styles.column2}>
          <div className={styles.tableHeaderCell4}>
            <div className={styles.startTime}>Start Time</div>
            <img
              className={styles.sorterIcon}
              loading="lazy"
              alt=""
              src="/-sorter.svg"
            />
          </div>
          <div className={styles.tableCell34}>
            <div className={styles.div6}>10:21</div>
          </div>
          <div className={styles.tableCell34}>
            <div className={styles.div6}>10:21</div>
          </div>
          <div className={styles.tableCell32}>
            <div className={styles.div6}>10:21</div>
          </div>
          <div className={styles.tableCell32}>
            <div className={styles.div6}>10:21</div>
          </div>
          <div className={styles.tableCell34}>
            <div className={styles.div6}>10:21</div>
          </div>
          <div className={styles.tableCell34}>
            <div className={styles.div6}>10:21</div>
          </div>
          <div className={styles.tableCell32}>
            <div className={styles.div6}>10:21</div>
          </div>
          <div className={styles.tableCell32}>
            <div className={styles.div6}>10:21</div>
          </div>
          <div className={styles.tableCell32}>
            <div className={styles.div6}>10:21</div>
          </div>
          <div className={styles.tableCell32}>
            <div className={styles.div6}>10:21</div>
          </div>
        </div>
        <div className={styles.column5}>
          <div className={styles.tableHeaderCell5}>
            <div className={styles.endTime}>End Time</div>
          </div>
          <div className={styles.tableCell50}>
            <div className={styles.div16}>10:25</div>
          </div>
          <div className={styles.tableCell50}>
            <div className={styles.div16}>10:25</div>
          </div>
          <div className={styles.tableCell52}>
            <div className={styles.div16}>10:26</div>
          </div>
          <div className={styles.tableCell52}>
            <div className={styles.div16}>10:26</div>
          </div>
          <div className={styles.tableCell50}>
            <div className={styles.div16}>10:25</div>
          </div>
          <div className={styles.tableCell50}>
            <div className={styles.div16}>10:25</div>
          </div>
          <div className={styles.tableCell52}>
            <div className={styles.div16}>10:25</div>
          </div>
          <div className={styles.tableCell52}>
            <div className={styles.div16}>10:25</div>
          </div>
          <div className={styles.tableCell52}>
            <div className={styles.div16}>10:25</div>
          </div>
          <div className={styles.tableCell52}>
            <div className={styles.div16}>10:25</div>
          </div>
        </div>
        <div className={styles.column5}>
          <div className={styles.tableHeaderCell6}>
            <div className={styles.duration}>Duration</div>
          </div>
          <div className={styles.tableCell10}>
            <div className={styles.m}>04 m</div>
          </div>
          <div className={styles.tableCell10}>
            <div className={styles.m}>04 m</div>
          </div>
          <div className={styles.tableCell62}>
            <div className={styles.m}>04 m</div>
          </div>
          <div className={styles.tableCell62}>
            <div className={styles.m}>04 m</div>
          </div>
          <div className={styles.tableCell10}>
            <div className={styles.m}>04 m</div>
          </div>
          <div className={styles.tableCell10}>
            <div className={styles.m}>04 m</div>
          </div>
          <div className={styles.tableCell62}>
            <div className={styles.m}>04 m</div>
          </div>
          <div className={styles.tableCell62}>
            <div className={styles.m}>04 m</div>
          </div>
          <div className={styles.tableCell62}>
            <div className={styles.m}>04 m</div>
          </div>
          <div className={styles.tableCell62}>
            <div className={styles.m}>04 m</div>
          </div>
        </div>
        <div className={styles.column5}>
          <div className={styles.tableHeaderCell7}>
            <div className={styles.timeS}>Time S</div>
          </div>
          <div className={styles.tableCell70}>
            <div className={styles.div6}>10:21</div>
          </div>
          <div className={styles.tableCell70}>
            <div className={styles.div6}>10:21</div>
          </div>
          <div className={styles.tableCell12}>
            <div className={styles.div6}>10:21</div>
          </div>
          <div className={styles.tableCell12}>
            <div className={styles.div6}>10:21</div>
          </div>
          <div className={styles.tableCell70}>
            <div className={styles.div6}>10:21</div>
          </div>
          <div className={styles.tableCell70}>
            <div className={styles.div6}>10:21</div>
          </div>
          <div className={styles.tableCell52}>
            <div className={styles.div16}>13:50</div>
          </div>
          <div className={styles.tableCell52}>
            <div className={styles.div16}>13:50</div>
          </div>
          <div className={styles.tableCell52}>
            <div className={styles.div16}>13:50</div>
          </div>
          <div className={styles.tableCell52}>
            <div className={styles.div16}>13:50</div>
          </div>
        </div>
        <div className={styles.column5}>
          <div className={styles.tableHeaderCell8}>
            <div className={styles.timeE}>Time E</div>
          </div>
          <div className={styles.tableCell70}>
            <div className={styles.div6}>10:21</div>
          </div>
          <div className={styles.tableCell70}>
            <div className={styles.div6}>10:21</div>
          </div>
          <div className={styles.tableCell12}>
            <div className={styles.div6}>10:21</div>
          </div>
          <div className={styles.tableCell12}>
            <div className={styles.div6}>10:21</div>
          </div>
          <div className={styles.tableCell70}>
            <div className={styles.div6}>10:21</div>
          </div>
          <div className={styles.tableCell70}>
            <div className={styles.div6}>10:21</div>
          </div>
          <div className={styles.tableCell52}>
            <div className={styles.div16}>13:50</div>
          </div>
          <div className={styles.tableCell52}>
            <div className={styles.div16}>13:50</div>
          </div>
          <div className={styles.tableCell52}>
            <div className={styles.div16}>13:50</div>
          </div>
          <div className={styles.tableCell52}>
            <div className={styles.div16}>13:50</div>
          </div>
        </div>
        <div className={styles.column5}>
          <div className={styles.tableHeaderCell9}>
            <div className={styles.status}>Status</div>
            <img
              className={styles.sorterIcon}
              loading="lazy"
              alt=""
              src="/-sorter-3.svg"
            />
          </div>
          <div className={styles.tableCell90}>
            <div className={styles.awake}>Awake</div>
          </div>
          <div className={styles.tableCell90}>
            <div className={styles.awake}>Awake</div>
          </div>
          <div className={styles.tableCell92}>
            <div className={styles.awake}>Awake</div>
          </div>
          <div className={styles.tableCell92}>
            <div className={styles.awake}>Awake</div>
          </div>
          <div className={styles.tableCell90}>
            <div className={styles.awake}>Awake</div>
          </div>
          <div className={styles.tableCell90}>
            <div className={styles.awake}>Awake</div>
          </div>
          <div className={styles.tableCell96}>
            <div className={styles.sleep}>Sleep</div>
          </div>
          <div className={styles.tableCell96}>
            <div className={styles.sleep}>Sleep</div>
          </div>
          <div className={styles.tableCell96}>
            <div className={styles.sleep}>Sleep</div>
          </div>
          <div className={styles.tableCell96}>
            <div className={styles.sleep}>Sleep</div>
          </div>
        </div>
        <div className={styles.column2}>
          <div className={styles.tableHeaderCell10}>
            <div className={styles.date}>Date</div>
            <img className={styles.sorterIcon} alt="" src="/-sorter.svg" />
          </div>
          <div className={styles.tableCell100}>
            <div className={styles.div46}>1402/08/21</div>
          </div>
          <div className={styles.tableCell100}>
            <div className={styles.div46}>1402/08/21</div>
          </div>
          <div className={styles.tableCell102}>
            <div className={styles.div46}>1402/08/21</div>
          </div>
          <div className={styles.tableCell102}>
            <div className={styles.div46}>1402/08/21</div>
          </div>
          <div className={styles.tableCell100}>
            <div className={styles.div46}>1402/08/21</div>
          </div>
          <div className={styles.tableCell100}>
            <div className={styles.div46}>1402/08/21</div>
          </div>
          <div className={styles.tableCell102}>
            <div className={styles.div46}>1402/08/21</div>
          </div>
          <div className={styles.tableCell102}>
            <div className={styles.div46}>1402/08/21</div>
          </div>
          <div className={styles.tableCell102}>
            <div className={styles.div46}>1402/08/21</div>
          </div>
          <div className={styles.tableCell102}>
            <div className={styles.div46}>1402/08/21</div>
          </div>
        </div>
        <div className={styles.column11}>
          <div className={styles.tableHeaderCell11}>
            <div className={styles.comfirmation}>Comfirmation</div>
            <img
              className={styles.sorterIcon}
              loading="lazy"
              alt=""
              src="/-sorter.svg"
            />
          </div>
          <div className={styles.tableCell110}>
            <div className={styles.button}>
              <img className={styles.searchIcon} alt="" src="/search1.svg" />
              <div className={styles.defaultButton}>Confirmed</div>
            </div>
          </div>
          <div className={styles.tableCell111}>
            <div className={styles.button1}>
              <img className={styles.searchIcon} alt="" src="/search1.svg" />
              <div className={styles.defaultButton1}>Rejected</div>
            </div>
          </div>
          <div className={styles.tableCell112}>
            <div className={styles.button2}>
              <img className={styles.searchIcon} alt="" src="/search1.svg" />
              <div className={styles.text}>Pending</div>
            </div>
          </div>
          <div className={styles.tableCell113}>
            <div className={styles.button3}>
              <img className={styles.searchIcon} alt="" src="/search1.svg" />
              <div className={styles.defaultButton1}>Rejected</div>
            </div>
          </div>
          <div className={styles.tableCell114}>
            <div className={styles.button2}>
              <img className={styles.searchIcon} alt="" src="/search1.svg" />
              <div className={styles.text}>Pending</div>
            </div>
          </div>
          <div className={styles.tableCell110}>
            <div className={styles.button}>
              <img className={styles.searchIcon} alt="" src="/search1.svg" />
              <div className={styles.defaultButton}>Confirmed</div>
            </div>
          </div>
          <div className={styles.tableCell116}>
            <div className={styles.button}>
              <img className={styles.searchIcon} alt="" src="/search1.svg" />
              <div className={styles.defaultButton}>Confirmed</div>
            </div>
          </div>
          <div className={styles.tableCell116}>
            <div className={styles.button}>
              <img className={styles.searchIcon} alt="" src="/search1.svg" />
              <div className={styles.defaultButton}>Confirmed</div>
            </div>
          </div>
          <div className={styles.tableCell116}>
            <div className={styles.button}>
              <img className={styles.searchIcon} alt="" src="/search1.svg" />
              <div className={styles.defaultButton}>Confirmed</div>
            </div>
          </div>
          <div className={styles.tableCell116}>
            <div className={styles.button}>
              <img className={styles.searchIcon} alt="" src="/search1.svg" />
              <div className={styles.defaultButton}>Confirmed</div>
            </div>
          </div>
        </div>
        <div className={styles.column12}>
          <div className={styles.tableHeaderCell12}>
            <div className={styles.action}>ACTION</div>
          </div>
          <div className={styles.tableCell120}>
            <Links
              borderBottom={false}
              linkPlaceholder
              trailingIcon={false}
              leadingIcon={false}
            />
          </div>
          <div className={styles.tableCell120}>
            <Links
              borderBottom={false}
              linkPlaceholder
              trailingIcon={false}
              leadingIcon={false}
            />
          </div>
          <div className={styles.tableCell122}>
            <Links
              borderBottom={false}
              linkPlaceholder
              trailingIcon={false}
              leadingIcon={false}
            />
          </div>
          <div className={styles.tableCell122}>
            <Links
              borderBottom={false}
              linkPlaceholder
              trailingIcon={false}
              leadingIcon={false}
            />
          </div>
          <div className={styles.tableCell120}>
            <Links
              borderBottom={false}
              linkPlaceholder
              trailingIcon={false}
              leadingIcon={false}
            />
          </div>
          <div className={styles.tableCell120}>
            <Links
              borderBottom={false}
              linkPlaceholder
              trailingIcon={false}
              leadingIcon={false}
            />
          </div>
          <div className={styles.tableCell122}>
            <Links
              borderBottom={false}
              linkPlaceholder
              trailingIcon={false}
              leadingIcon={false}
            />
          </div>
          <div className={styles.tableCell122}>
            <Links
              borderBottom={false}
              linkPlaceholder
              trailingIcon={false}
              leadingIcon={false}
            />
          </div>
          <div className={styles.tableCell122}>
            <Links
              borderBottom={false}
              linkPlaceholder
              trailingIcon={false}
              leadingIcon={false}
            />
          </div>
          <div className={styles.tableCell129}>
            <Links borderBottom linkPlaceholder trailingIcon leadingIcon />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Columns1;
