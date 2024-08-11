import { FunctionComponent, useMemo, type CSSProperties } from "react";
import Badge from "./Badge";
import BadgeAndTag from "./BadgeAndTag";
import styles from "./InputSmall1.module.css";

export type InputSmall1Type = {
  className?: string;
  secondaryLabel?: boolean;
  tag3?: boolean;
  leadingText?: boolean;
  feedbackMessage?: boolean;
  leadingContent?: boolean;
  leadingDivider?: boolean;
  trailingText?: boolean;
  placeholder?: boolean;
  trailingIconEnd?: boolean;
  trailingContent?: boolean;
  leadingIconStart?: boolean;
  trailingDivider?: boolean;
  trailingAvatar?: boolean;
  trailingIconStart?: boolean;
  leadingIconEnd?: boolean;
  tags?: boolean;
  leadingAvatar?: boolean;
  label?: boolean;
  placeholder1?: string;
  avatar1?: string;
  placeholder11?: string;
  leadingIcon?: boolean;
  closeIcon?: boolean;
  placeholder2?: boolean;
  status1?: boolean;
  trailingIcon?: boolean;
  avatar2?: boolean;

  /** Style props */
  propRowGap?: CSSProperties["rowGap"];
  propMinWidth?: CSSProperties["minWidth"];
  propRowGap1?: CSSProperties["rowGap"];
  propMinWidth1?: CSSProperties["minWidth"];
  propMinWidth2?: CSSProperties["minWidth"];
};

const InputSmall1: FunctionComponent<InputSmall1Type> = ({
  className = "",
  secondaryLabel = false,
  tag3 = false,
  leadingText = false,
  feedbackMessage = false,
  leadingContent = false,
  leadingDivider = false,
  trailingText = false,
  placeholder = true,
  trailingIconEnd = false,
  trailingContent = true,
  leadingIconStart = false,
  trailingDivider = true,
  trailingAvatar = false,
  trailingIconStart = true,
  leadingIconEnd = false,
  tags = true,
  leadingAvatar = false,
  label = false,
  propRowGap,
  propMinWidth,
  propRowGap1,
  propMinWidth1,
  propMinWidth2,
  placeholder1,
  avatar1,
  placeholder11,
  leadingIcon,
  closeIcon,
  placeholder2,
  status1,
  trailingIcon,
  avatar2,
}) => {
  const inputStyle: CSSProperties = useMemo(() => {
    return {
      rowGap: propRowGap,
    };
  }, [propRowGap]);

  const contentStyle: CSSProperties = useMemo(() => {
    return {
      minWidth: propMinWidth,
      rowGap: propRowGap1,
    };
  }, [propMinWidth, propRowGap1]);

  const tagsStyle: CSSProperties = useMemo(() => {
    return {
      minWidth: propMinWidth1,
    };
  }, [propMinWidth1]);

  const placeholder2Style: CSSProperties = useMemo(() => {
    return {
      minWidth: propMinWidth2,
    };
  }, [propMinWidth2]);

  return (
    <div className={[styles.inputSmall, className].join(" ")}>
      {label && (
        <div className={styles.label}>
          <div className={styles.label1}>Label</div>
          {secondaryLabel && <div className={styles.secondary}>Secondary</div>}
        </div>
      )}
      <div className={styles.input} style={inputStyle}>
        {leadingContent && (
          <div className={styles.leading}>
            {leadingIconStart && (
              <img className={styles.mailIcon} alt="" src="/mail.svg" />
            )}
            {leadingAvatar && (
              <img className={styles.avatarIcon} alt="" src="/avatar.svg" />
            )}
            {leadingText && <div className={styles.email}>Email</div>}
            {leadingIconEnd && (
              <img className={styles.mailIcon} alt="" src="/chevrondown.svg" />
            )}
          </div>
        )}
        {leadingDivider && <div className={styles.divider} />}
        <div className={styles.content} style={contentStyle}>
          {tags && (
            <div className={styles.tags} style={tagsStyle}>
              <Badge
                avatar1="/avatar6@2x.png"
                placeholder1="Tag"
                leadingIcon={false}
                closeIcon
                placeholder
                status1={false}
                trailingIcon={false}
                avatar={false}
              />
              <Badge
                avatar1="/avatar7@2x.png"
                placeholder1="Tag"
                leadingIcon={false}
                closeIcon
                placeholder
                status1={false}
                trailingIcon={false}
                avatar={false}
              />
              {tag3 && (
                <div className={styles.badge}>
                  <BadgeAndTag
                    leadingIcon={leadingIcon}
                    closeIcon={closeIcon}
                    placeholder={placeholder2}
                    status1={status1}
                    trailingIcon={trailingIcon}
                    avatar={avatar2}
                    avatar1={avatar1}
                    placeholder1={placeholder11}
                  />
                </div>
              )}
            </div>
          )}
          {placeholder && (
            <div className={styles.placeholder} style={placeholder2Style}>
              <div className={styles.placeholder1}>{placeholder1}</div>
            </div>
          )}
        </div>
        {trailingDivider && <div className={styles.divider1} />}
        <div className={styles.trailingWrapper}>
          {trailingContent && (
            <div className={styles.trailing}>
              {trailingAvatar && (
                <img className={styles.avatarIcon} alt="" src="/avatar.svg" />
              )}
              {trailingIconStart && (
                <img
                  className={styles.searchIcon}
                  loading="lazy"
                  alt=""
                  src="/search.svg"
                />
              )}
              {trailingText && <div className={styles.copy}>Copy</div>}
              {trailingIconEnd && (
                <img
                  className={styles.helpCircleIcon}
                  alt=""
                  src="/helpcircle.svg"
                />
              )}
            </div>
          )}
        </div>
      </div>
      {feedbackMessage && (
        <div className={styles.thisIsA}>This is a feedback message</div>
      )}
    </div>
  );
};

export default InputSmall1;
