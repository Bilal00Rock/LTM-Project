import { FunctionComponent, useMemo, type CSSProperties } from "react";
import MenuItem from "./MenuItem";
import styles from "./Menu.module.css";

export type MenuType = {
  className?: string;
  wrapper4?: string;
  title4?: string;

  /** Style props */
  titleBackgroundColor?: CSSProperties["backgroundColor"];
};

const Menu: FunctionComponent<MenuType> = ({
  className = "",
  titleBackgroundColor,
  wrapper4,
  title4,
}) => {
  const menuStyle: CSSProperties = useMemo(() => {
    return {
      backgroundColor: titleBackgroundColor,
    };
  }, [titleBackgroundColor]);

  return (
    <div className={[styles.menu, className].join(" ")} style={menuStyle}>
      <MenuItem
        propBackgroundColor="#e6f7ff"
        wrapper={wrapper4}
        title={title4}
        propColor="#1890ff"
        propMinWidth="57px"
        titleTextDecoration="none"
      />
      <MenuItem
        propBackgroundColor="rgba(255, 255, 255, 0)"
        wrapper={wrapper4}
        title={title4}
        propColor="rgba(0, 0, 0, 0.85)"
        propMinWidth="52px"
        titleTextDecoration="none"
      />
      <MenuItem
        propBackgroundColor="rgba(255, 255, 255, 0)"
        wrapper={wrapper4}
        title={title4}
        propColor="rgba(0, 0, 0, 0.85)"
        propMinWidth="72px"
        titleTextDecoration="unset"
      />
      <MenuItem
        propBackgroundColor="rgba(255, 255, 255, 0)"
        wrapper={wrapper4}
        title={title4}
        propColor="rgba(0, 0, 0, 0.85)"
        propMinWidth="94px"
        titleTextDecoration="unset"
      />
      <MenuItem wrapper={wrapper4} title={title4} />
    </div>
  );
};

export default Menu;
