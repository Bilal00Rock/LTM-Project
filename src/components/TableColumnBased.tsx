import { FunctionComponent } from "react";
import Columns from "./Columns";
import Pagination from "./Pagination";
import styles from "./TableColumnBased.module.css";

export type TableColumnBasedType = {
  className?: string;
};

const TableColumnBased: FunctionComponent<TableColumnBasedType> = ({
  className = "",
}) => {
  return (
    <div className={[styles.tablecolumnBased, className].join(" ")}>
      <div className={styles.tableToolbar}>
        <div className={styles.title}>
          <div className={styles.headerTitle}>EEG List</div>
        </div>
        <div className={styles.buttonGroup}>
          <div className={styles.button}>
            <div className={styles.iconWrapper}>
              <img
                className={styles.wrapperIcon}
                alt=""
                src="/wrapper-51@2x.png"
              />
            </div>
            <div className={styles.text}>View Log</div>
          </div>
          <div className={styles.button1}>
            <img
              className={styles.plusIcon}
              loading="lazy"
              alt=""
              src="/plus.svg"
            />
            <div className={styles.text1}>Import EEG</div>
          </div>
        </div>
      </div>
      <Columns />
      <Pagination showIcon />
    </div>
  );
};

export default TableColumnBased;
