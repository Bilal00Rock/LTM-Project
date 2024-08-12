import { FunctionComponent, useMemo, type CSSProperties } from "react";
import ComponentsPaginationItem from "./ComponentsPaginationItem";
import ComponentsPaginationItemEll from "./ComponentsPaginationItemEll";
import SizeChanger from "./SizeChanger";
import Input from "./Input";
import styles from "./Styles/AdvancedLegacy.module.css";

export type AdvancedLegacyType = {
  className?: string;
  prop?: string;
  prop1?: string;
  prop2?: string;
  prop3?: string;
  prop4?: string;
  prop5?: string;
  prop6?: string;
  inputPrefix?: string;
  placeholder?: string;
  inputSuffix?: string;
  iconWrapper?: string;
  suffix?: boolean;
  addonBefore?: boolean;
  addonAfter?: boolean;
  prefix?: boolean;
  placeholder1?: boolean;
  showIcon?: boolean;
  page?: string;

  /** Style props */
  propWidth?: CSSProperties["width"];
  propAlignSelf?: CSSProperties["alignSelf"];
  propHeight?: CSSProperties["height"];
  propMinWidth?: CSSProperties["minWidth"];
  propHeight3?: CSSProperties["height"];
};

const AdvancedLegacy: FunctionComponent<AdvancedLegacyType> = ({
  className = "",
  propWidth,
  propAlignSelf,
  propHeight,
  propMinWidth,
  propHeight3,
  prop,
  prop1,
  prop2,
  prop3,
  prop4,
  prop5,
  prop6,
  inputPrefix,
  placeholder,
  inputSuffix,
  iconWrapper,
  suffix,
  addonBefore,
  addonAfter,
  prefix,
  placeholder1,
  showIcon,
  page,
}) => {
  const totalItemsStyle: CSSProperties = useMemo(() => {
    return {
      width: propWidth,
    };
  }, [propWidth]);

  const total85ItemsStyle: CSSProperties = useMemo(() => {
    return {
      alignSelf: propAlignSelf,
      height: propHeight,
      minWidth: propMinWidth,
    };
  }, [propAlignSelf, propHeight, propMinWidth]);

  const paginationOptionsStyle: CSSProperties = useMemo(() => {
    return {
      height: propHeight3,
    };
  }, [propHeight3]);

  return (
    <div className={[styles.advancedlegacy, className].join(" ")}>
      <div className={styles.totalItems} style={totalItemsStyle}>
        <div className={styles.total85Items} style={total85ItemsStyle}>
          1-10 of 100 items
        </div>
      </div>
      <div className={styles.content}>
        <div className={styles.componentspaginationPrev}>
          <img className={styles.leftIcon} alt="" src="/left.svg" />
        </div>
        <ComponentsPaginationItem
          propBorder="1px solid #d9d9d9"
          prop={prop}
          propColor="rgba(0, 0, 0, 0.85)"
          propFontWeight="unset"
          propMinWidth="unset"
        />
        <ComponentsPaginationItemEll
          propHeight="32px"
          propFlex="1"
          propAlignSelf="stretch"
          propFlex1="1"
          propDisplay="unset"
          propMinWidth="unset"
        />
        <ComponentsPaginationItem
          propBorder="1px solid #d9d9d9"
          prop={prop1}
          propColor="rgba(0, 0, 0, 0.85)"
          propFontWeight="unset"
          propMinWidth="unset"
        />
        <ComponentsPaginationItem
          propBorder="1px solid #d9d9d9"
          prop={prop2}
          propColor="rgba(0, 0, 0, 0.85)"
          propFontWeight="unset"
          propMinWidth="unset"
        />
        <ComponentsPaginationItem
          propBorder="1px solid #1890ff"
          prop={prop3}
          propColor="#1890ff"
          propFontWeight="500"
          propMinWidth="unset"
        />
        <ComponentsPaginationItem
          propBorder="1px solid #d9d9d9"
          prop={prop4}
          propColor="rgba(0, 0, 0, 0.85)"
          propFontWeight="unset"
          propMinWidth="unset"
        />
        <ComponentsPaginationItem
          propBorder="1px solid #d9d9d9"
          prop={prop5}
          propColor="rgba(0, 0, 0, 0.85)"
          propFontWeight="unset"
          propMinWidth="unset"
        />
        <ComponentsPaginationItemEll />
        <ComponentsPaginationItem prop={prop6} />
        <div className={styles.componentspaginationNext}>
          <img className={styles.leftIcon} alt="" src="/right.svg" />
        </div>
      </div>
      <div className={styles.paginationOptions} style={paginationOptionsStyle}>
        <SizeChanger page={page} showIcon={showIcon} />
        <div className={styles.quickJumper}>
          <div className={styles.goTo}>Go to</div>
          <Input
            suffix={suffix}
            addonBefore={addonBefore}
            addonAfter={addonAfter}
            prefix={prefix}
            placeholder={placeholder}
            inputPrefix={inputPrefix}
            placeholder1={placeholder1}
            inputSuffix={inputSuffix}
            iconWrapper={iconWrapper}
          />
        </div>
        <div className={styles.suffix}>页</div>
      </div>
    </div>
  );
};

export default AdvancedLegacy;
