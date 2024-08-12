import { FunctionComponent, useMemo, type CSSProperties } from "react";
import styles from "./Styles/SizeChanger.module.css";

export type SizeChangerType = {
  className?: string;
  page?: string;
  showIcon?: boolean;

  /** Style props */
  propAlignSelf?: CSSProperties["alignSelf"];
  propAlignSelf1?: CSSProperties["alignSelf"];
  propWidth?: CSSProperties["width"];
  propAlignSelf2?: CSSProperties["alignSelf"];
  propFlex?: CSSProperties["flex"];
  propDisplay?: CSSProperties["display"];
  propMinWidth?: CSSProperties["minWidth"];
  sizeChangerOverflow?: CSSProperties["overflow"];
  sizeChangerMinWidth?: CSSProperties["minWidth"];
  selectionItemFlex?: CSSProperties["flex"];
  iconPadding?: CSSProperties["padding"];
  iconHeight?: CSSProperties["height"];
  iconWidth?: CSSProperties["width"];
};

const SizeChanger: FunctionComponent<SizeChangerType> = ({
  className = "",
  propAlignSelf,
  propAlignSelf1,
  propWidth,
  propAlignSelf2,
  propFlex,
  propDisplay,
  propMinWidth,
  sizeChangerOverflow,
  sizeChangerMinWidth,
  selectionItemFlex,
  page,
  showIcon,
  iconPadding,
  iconHeight,
  iconWidth,
}) => {
  const sizeChangerStyle: CSSProperties = useMemo(() => {
    return {
      alignSelf: propAlignSelf,
      overflow: sizeChangerOverflow,
      minWidth: sizeChangerMinWidth,
    };
  }, [propAlignSelf, sizeChangerOverflow, sizeChangerMinWidth]);

  const selectionItemStyle: CSSProperties = useMemo(() => {
    return {
      alignSelf: propAlignSelf1,
      width: propWidth,
      flex: selectionItemFlex,
    };
  }, [propAlignSelf1, propWidth, selectionItemFlex]);

  const pageStyle: CSSProperties = useMemo(() => {
    return {
      alignSelf: propAlignSelf2,
      flex: propFlex,
      display: propDisplay,
      minWidth: propMinWidth,
    };
  }, [propAlignSelf2, propFlex, propDisplay, propMinWidth]);

  const iconStyle: CSSProperties = useMemo(() => {
    return {
      padding: iconPadding,
      height: iconHeight,
      width: iconWidth,
    };
  }, [iconPadding, iconHeight, iconWidth]);

  return (
    <div
      className={[styles.sizeChanger, className].join(" ")}
      style={sizeChangerStyle}
    >
      <div className={styles.selectionItem} style={selectionItemStyle}>
        <div className={styles.page} style={pageStyle}>
          {page}
        </div>
      </div>
      {showIcon && (
        <div className={styles.icon} style={iconStyle}>
          <img className={styles.icon1} alt="" src="/icon.svg" />
        </div>
      )}
    </div>
  );
};

export default SizeChanger;
