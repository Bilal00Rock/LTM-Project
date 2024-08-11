import { FunctionComponent } from "react";
import ComponentsStepsItemIcon from "./ComponentsStepsItemIcon";
import Item from "./Item";
import styles from "./Stepslegacy.module.css";

export type StepslegacyType = {
  className?: string;
};

const Stepslegacy: FunctionComponent<StepslegacyType> = ({
  className = "",
}) => {
  return (
    <div className={[styles.stepslegacy, className].join(" ")}>
      <div className={styles.item01}>
        <ComponentsStepsItemIcon
          propBorderRadius="32px"
          propDisplay="flex"
          propFlexDirection="row"
          propPadding="4px 11px 4px 12px"
          propHeight="unset"
          propWidth="unset"
          propBorder="1px solid #1890ff"
          propBackgroundColor="#1890ff"
          propMargin="0 !important"
          propTop="0px"
          propRight="0px"
          propBottom="0px"
          propLeft="0px"
          number="1"
          propColor="#fff"
          propPosition="relative"
          propDisplay1="inline-block"
          propMinWidth="9px"
          propTop1="unset"
          propLeft1="unset"
        />
        <div className={styles.stepTitleContainers}>
          <div className={styles.title}>Change Your Password</div>
        </div>
        <div className={styles.stepTailContainers}>
          <div className={styles.tail}>
            <img
              className={styles.tailChild}
              loading="lazy"
              alt=""
              src="/vector-11.svg"
            />
          </div>
        </div>
      </div>
      <div className={styles.item02}>
        <ComponentsStepsItemIcon
          propBorderRadius="unset"
          propDisplay="flex"
          propFlexDirection="row"
          propPadding="4px 11px 4px 12px"
          propHeight="unset"
          propWidth="unset"
          propBorder="1px solid rgba(0, 0, 0, 0.25)"
          propBackgroundColor="unset"
          propMargin="0 !important"
          propTop="0px"
          propRight="0px"
          propBottom="0px"
          propLeft="0px"
          number="2"
          propColor="rgba(0, 0, 0, 0.25)"
          propPosition="relative"
          propDisplay1="inline-block"
          propMinWidth="9px"
          propTop1="unset"
          propLeft1="unset"
        />
        <div className={styles.titleWrapper}>
          <div className={styles.title1}>{`Confirmation Code  `}</div>
        </div>
        <div className={styles.tailWrapper}>
          <div className={styles.tail}>
            <img
              className={styles.tailChild}
              loading="lazy"
              alt=""
              src="/vector-1-1.svg"
            />
          </div>
        </div>
      </div>
      <div className={styles.item03}>
        <ComponentsStepsItemIcon
          propBorderRadius="32px"
          propDisplay="unset"
          propFlexDirection="unset"
          propPadding="unset"
          propHeight="32px"
          propWidth="32px"
          propBorder="1px solid #1890ff"
          propBackgroundColor="#1890ff"
          propMargin="unset"
          propTop="0%"
          propRight="0%"
          propBottom="0%"
          propLeft="0%"
          number="3"
          propColor="#fff"
          propPosition="absolute"
          propDisplay1="unset"
          propMinWidth="unset"
          propTop1="calc(50% - 12px)"
          propLeft1="calc(50% - 4px)"
        />
        <div className={styles.title}>In Progress</div>
        <div className={styles.tail2}>
          <img className={styles.tailInner} alt="" src="/vector-1-2.svg" />
        </div>
      </div>
      <div className={styles.item03}>
        <ComponentsStepsItemIcon
          propBorderRadius="32px"
          propDisplay="unset"
          propFlexDirection="unset"
          propPadding="unset"
          propHeight="32px"
          propWidth="32px"
          propBorder="1px solid #1890ff"
          propBackgroundColor="#1890ff"
          propMargin="unset"
          propTop="0%"
          propRight="0%"
          propBottom="0%"
          propLeft="0%"
          number="4"
          propColor="#fff"
          propPosition="absolute"
          propDisplay1="unset"
          propMinWidth="unset"
          propTop1="calc(50% - 12px)"
          propLeft1="calc(50% - 4px)"
        />
        <div className={styles.title}>In Progress</div>
        <div className={styles.tail2}>
          <img className={styles.tailInner} alt="" src="/vector-1-2.svg" />
        </div>
      </div>
      <div className={styles.item03}>
        <ComponentsStepsItemIcon
          propBorderRadius="32px"
          propDisplay="unset"
          propFlexDirection="unset"
          propPadding="unset"
          propHeight="32px"
          propWidth="32px"
          propBorder="1px solid #1890ff"
          propBackgroundColor="#1890ff"
          propMargin="unset"
          propTop="0%"
          propRight="0%"
          propBottom="0%"
          propLeft="0%"
          number="5"
          propColor="#fff"
          propPosition="absolute"
          propDisplay1="unset"
          propMinWidth="unset"
          propTop1="calc(50% - 12px)"
          propLeft1="calc(50% - 4px)"
        />
        <div className={styles.title}>In Progress</div>
        <div className={styles.tail2}>
          <img className={styles.tailInner} alt="" src="/vector-1-2.svg" />
        </div>
      </div>
      <Item />
    </div>
  );
};

export default Stepslegacy;
