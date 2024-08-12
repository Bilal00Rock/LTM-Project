import { FunctionComponent, useMemo, type CSSProperties } from "react";
import styles from "./Styles/MenuItem.module.css";

export type MenuItemType = {
  className?: string;
  wrapper?: string;
  title?: string;

  /** Style props */
  propBackgroundColor?: CSSProperties["backgroundColor"];
  propColor?: CSSProperties["color"];
  propMinWidth?: CSSProperties["minWidth"];
  titleTextDecoration?: CSSProperties["textDecoration"];
};

const MenuItem: FunctionComponent<MenuItemType> = ({
  className = "",
  propBackgroundColor,
  wrapper,
  title,
  propColor,
  propMinWidth,
  titleTextDecoration,
}) => {
  const menuItemStyle: CSSProperties = useMemo(() => {
    return {
      backgroundColor: propBackgroundColor,
    };
  }, [propBackgroundColor]);

  const title1Style: CSSProperties = useMemo(() => {
    return {
      color: propColor,
      minWidth: propMinWidth,
      textDecoration: titleTextDecoration,
    };
  }, [propColor, propMinWidth, titleTextDecoration]);

  return (
    <div
      className={[styles.menuItem, className].join(" ")}
      style={menuItemStyle}
    >
      <div className={styles.iconChangeSizeHere}>
        <img className={styles.wrapperIcon} alt="" src={wrapper} />
      </div>
      <div className={styles.content}>
        <div className={styles.title} style={title1Style}>
          {title}
        </div>
      </div>
    </div>
  );
};

export default MenuItem;
