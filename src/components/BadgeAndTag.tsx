import { FunctionComponent, useMemo, type CSSProperties } from "react";
import styles from "./Styles/BadgeAndTag.module.css";

export type BadgeAndTagType = {
  className?: string;
  leadingIcon?: boolean;
  closeIcon?: boolean;
  placeholder?: boolean;
  status1?: boolean;
  trailingIcon?: boolean;
  avatar?: boolean;
  avatar1?: string;
  placeholder1?: string;

  /** Style props */
  propAlignSelf?: CSSProperties["alignSelf"];
  propFlex?: CSSProperties["flex"];
  propOverflowX?: CSSProperties["overflowX"];
  propAlignSelf1?: CSSProperties["alignSelf"];
  propWidth?: CSSProperties["width"];
  propAlignSelf2?: CSSProperties["alignSelf"];
  propMinWidth?: CSSProperties["minWidth"];
  propPadding?: CSSProperties["padding"];
};

const BadgeAndTag: FunctionComponent<BadgeAndTagType> = ({
  className = "",
  leadingIcon = false,
  closeIcon = true,
  placeholder = true,
  status1 = false,
  trailingIcon = false,
  avatar = true,
  propAlignSelf,
  propFlex,
  propOverflowX,
  avatar1,
  propAlignSelf1,
  propWidth,
  placeholder1,
  propAlignSelf2,
  propMinWidth,
  propPadding,
}) => {
  const badgeAndTagStyle: CSSProperties = useMemo(() => {
    return {
      alignSelf: propAlignSelf,
      flex: propFlex,
      overflowX: propOverflowX,
    };
  }, [propAlignSelf, propFlex, propOverflowX]);

  const placeholderStyle: CSSProperties = useMemo(() => {
    return {
      alignSelf: propAlignSelf1,
      width: propWidth,
    };
  }, [propAlignSelf1, propWidth]);

  const placeholder1Style: CSSProperties = useMemo(() => {
    return {
      alignSelf: propAlignSelf2,
      minWidth: propMinWidth,
    };
  }, [propAlignSelf2, propMinWidth]);

  const closeIconStyle: CSSProperties = useMemo(() => {
    return {
      padding: propPadding,
    };
  }, [propPadding]);

  return (
    <div
      className={[styles.badgeAndTag, className].join(" ")}
      style={badgeAndTagStyle}
    >
      {avatar && <img className={styles.avatarIcon} alt="" src={avatar1} />}
      {leadingIcon && (
        <img className={styles.homeIcon} alt="" src="/home.svg" />
      )}
      <div className={styles.placeholder} style={placeholderStyle}>
        {status1 && <div className={styles.status} />}
        {placeholder && (
          <div className={styles.placeholder1} style={placeholder1Style}>
            {placeholder1}
          </div>
        )}
      </div>
      {trailingIcon && (
        <img className={styles.homeIcon} alt="" src="/chevronright.svg" />
      )}
      {closeIcon && (
        <div className={styles.closeIcon} style={closeIconStyle}>
          <img className={styles.xIcon} alt="" src="/x.svg" />
        </div>
      )}
    </div>
  );
};

export default BadgeAndTag;
