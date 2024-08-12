import { FunctionComponent } from "react";
import styles from "./Styles/DatePicker.module.css";

export type DatePickerType = {
  className?: string;
};

const DatePicker: FunctionComponent<DatePickerType> = ({ className = "" }) => {
  return (
    <div className={[styles.datePicker, className].join(" ")}>
      <div className={styles.input}>
        <div className={styles.placeholderLeft}>Start date</div>
      </div>
      <div className={styles.inputSeperatorpickerSeparat}>
        <img className={styles.swaprightIcon} alt="" src="/swapright.svg" />
      </div>
      <div className={styles.input1}>
        <div className={styles.placeholderRight}>End date</div>
      </div>
      <div className={styles.suffix}>
        <img className={styles.calendarIcon} alt="" src="/calendar.svg" />
      </div>
    </div>
  );
};

export default DatePicker;
