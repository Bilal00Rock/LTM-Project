import { FunctionComponent, useMemo, type CSSProperties } from "react";
import InputSmall1 from "./InputSmall1";
import styles from "./InputSmall.module.css";

export type InputSmallType = {
  className?: string;
  label?: boolean;
  secondaryLabel?: boolean;
  leadingContent?: boolean;
  leadingIconStart?: boolean;
  leadingAvatar?: boolean;
  leadingText?: boolean;
  leadingIconEnd?: boolean;
  leadingDivider?: boolean;
  tags?: boolean;

  /** Style props */
  propBorder?: CSSProperties["border"];
};

const InputSmall: FunctionComponent<InputSmallType> = ({
  className = "",
  propBorder,
  label,
  secondaryLabel,
  leadingContent,
  leadingIconStart,
  leadingAvatar,
  leadingText,
  leadingIconEnd,
  leadingDivider,
  tags,
}) => {
  const inputSmallStyle: CSSProperties = useMemo(() => {
    return {
      border: propBorder,
    };
  }, [propBorder]);

  return (
    <div
      className={[styles.inputSmall, className].join(" ")}
      style={inputSmallStyle}
    >
      <InputSmall1
        secondaryLabel={secondaryLabel}
        tag3
        leadingText={leadingText}
        feedbackMessage
        leadingContent={leadingContent}
        leadingDivider={leadingDivider}
        trailingText
        placeholder
        trailingIconEnd
        trailingContent
        leadingIconStart={leadingIconStart}
        trailingDivider
        trailingAvatar
        trailingIconStart
        leadingIconEnd={leadingIconEnd}
        tags={tags}
        leadingAvatar={leadingAvatar}
        label={label}
        placeholder1="Search"
        avatar1="/avatar8@2x.png"
        placeholder11="Badge"
        leadingIcon
        closeIcon
        placeholder2
        status1
        trailingIcon
        avatar2
      />
    </div>
  );
};

export default InputSmall;
