import { FunctionComponent, useMemo, type CSSProperties } from "react";
import InputSmall from "./InputSmall";
import styles from "./TableToolbar.module.css";

export type TableToolbarType = {
  className?: string;
  text?: string;
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
  propTop?: CSSProperties["top"];
  propPosition?: CSSProperties["position"];
  propDisplay?: CSSProperties["display"];
  propMinWidth?: CSSProperties["minWidth"];
};

const TableToolbar: FunctionComponent<TableToolbarType> = ({
  className = "",
  propTop,
  propPosition,
  text,
  propDisplay,
  propMinWidth,
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
  const tableToolbarStyle: CSSProperties = useMemo(() => {
    return {
      top: propTop,
      position: propPosition,
    };
  }, [propTop, propPosition]);

  const text1Style: CSSProperties = useMemo(() => {
    return {
      display: propDisplay,
      minWidth: propMinWidth,
    };
  }, [propDisplay, propMinWidth]);

  return (
    <div
      className={[styles.tableToolbar, className].join(" ")}
      style={tableToolbarStyle}
    >
      <div className={styles.titleWrapper}>
        <div className={styles.title}>
          <div className={styles.text} style={text1Style}>
            {text}
          </div>
        </div>
      </div>
      <InputSmall
        label={label}
        secondaryLabel={secondaryLabel}
        leadingContent={leadingContent}
        leadingIconStart={leadingIconStart}
        leadingAvatar={leadingAvatar}
        leadingText={leadingText}
        leadingIconEnd={leadingIconEnd}
        leadingDivider={leadingDivider}
        tags={tags}
      />
    </div>
  );
};

export default TableToolbar;
