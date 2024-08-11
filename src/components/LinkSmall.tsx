import { FunctionComponent, useMemo, type CSSProperties } from "react";
import styles from "./LinkSmall.module.css";

export type LinkSmallType = {
  className?: string;
  borderBottom?: boolean;
  linkPlaceholder?: boolean;
  trailingIcon?: boolean;
  leadingIcon?: boolean;

  /** Style props */
  linkSmTextDecoration?: CSSProperties["textDecoration"];
};

const LinkSmall: FunctionComponent<LinkSmallType> = ({
  className = "",
  borderBottom = false,
  linkPlaceholder = true,
  trailingIcon = false,
  leadingIcon = false,
  linkSmTextDecoration,
}) => {
  const linkSmStyle: CSSProperties = useMemo(() => {
    return {
      textDecoration: linkSmTextDecoration,
    };
  }, [linkSmTextDecoration]);

  return (
    <div className={[styles.linkSmall, className].join(" ")}>
      {leadingIcon && (
        <img className={styles.chevronLeftIcon} alt="" src="/chevronleft.svg" />
      )}
      <div className={styles.placeholder}>
        {linkPlaceholder && (
          <div className={styles.linkSm} style={linkSmStyle}>
            Details
          </div>
        )}
        {borderBottom && <div className={styles.borderBottom} />}
      </div>
      {trailingIcon && (
        <img
          className={styles.chevronLeftIcon}
          alt=""
          src="/chevronright1.svg"
        />
      )}
    </div>
  );
};

export default LinkSmall;
