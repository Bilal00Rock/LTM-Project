import { FunctionComponent, useMemo, type CSSProperties } from "react";
import styles from "./Button.module.css";

export type ButtonType = {
  className?: string;
  title?: string;
  icon?: boolean;
  wrapper?: string;

  /** Style props */
  propWidth?: CSSProperties["width"];
  propBorderRadius?: CSSProperties["borderRadius"];
  propBackgroundColor?: CSSProperties["backgroundColor"];
  propPadding?: CSSProperties["padding"];
  propAlignSelf?: CSSProperties["alignSelf"];
  propBoxShadow?: CSSProperties["boxShadow"];
  propBorder?: CSSProperties["border"];
  propOverflow?: CSSProperties["overflow"];
  propFlex?: CSSProperties["flex"];
  propFontFamily?: CSSProperties["fontFamily"];
  propColor?: CSSProperties["color"];
  propMinWidth?: CSSProperties["minWidth"];
  propFlex1?: CSSProperties["flex"];
  propFontWeight?: CSSProperties["fontWeight"];
  propDisplay?: CSSProperties["display"];
};

const Button: FunctionComponent<ButtonType> = ({
  className = "",
  title = "OK",
  icon = false,
  propWidth,
  propBorderRadius,
  propBackgroundColor,
  propPadding,
  propAlignSelf,
  propBoxShadow,
  propBorder,
  propOverflow,
  propFlex,
  wrapper,
  propFontFamily,
  propColor,
  propMinWidth,
  propFlex1,
  propFontWeight,
  propDisplay,
}) => {
  const buttonStyle: CSSProperties = useMemo(() => {
    return {
      width: propWidth,
      borderRadius: propBorderRadius,
      backgroundColor: propBackgroundColor,
      padding: propPadding,
      alignSelf: propAlignSelf,
      boxShadow: propBoxShadow,
      border: propBorder,
      overflow: propOverflow,
      flex: propFlex,
    };
  }, [
    propWidth,
    propBorderRadius,
    propBackgroundColor,
    propPadding,
    propAlignSelf,
    propBoxShadow,
    propBorder,
    propOverflow,
    propFlex,
  ]);

  const text5Style: CSSProperties = useMemo(() => {
    return {
      fontFamily: propFontFamily,
      color: propColor,
      minWidth: propMinWidth,
      flex: propFlex1,
      fontWeight: propFontWeight,
      display: propDisplay,
    };
  }, [
    propFontFamily,
    propColor,
    propMinWidth,
    propFlex1,
    propFontWeight,
    propDisplay,
  ]);

  return (
    <div className={[styles.button, className].join(" ")} style={buttonStyle}>
      {icon && (
        <div className={styles.iconWrapper}>
          <img className={styles.wrapperIcon} alt="" src={wrapper} />
        </div>
      )}
      <div className={styles.text} style={text5Style}>
        {title}
      </div>
    </div>
  );
};

export default Button;
