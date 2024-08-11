import { FunctionComponent, useMemo, type CSSProperties } from "react";
import styles from "./ComponentsStepsItemIcon.module.css";

export type ComponentsStepsItemIconType = {
  className?: string;
  number?: string;

  /** Style props */
  propBorderRadius?: CSSProperties["borderRadius"];
  propDisplay?: CSSProperties["display"];
  propFlexDirection?: CSSProperties["flexDirection"];
  propPadding?: CSSProperties["padding"];
  propHeight?: CSSProperties["height"];
  propWidth?: CSSProperties["width"];
  propBorder?: CSSProperties["border"];
  propBackgroundColor?: CSSProperties["backgroundColor"];
  propMargin?: CSSProperties["margin"];
  propTop?: CSSProperties["top"];
  propRight?: CSSProperties["right"];
  propBottom?: CSSProperties["bottom"];
  propLeft?: CSSProperties["left"];
  propColor?: CSSProperties["color"];
  propPosition?: CSSProperties["position"];
  propDisplay1?: CSSProperties["display"];
  propMinWidth?: CSSProperties["minWidth"];
  propTop1?: CSSProperties["top"];
  propLeft1?: CSSProperties["left"];
};

const ComponentsStepsItemIcon: FunctionComponent<
  ComponentsStepsItemIconType
> = ({
  className = "",
  propBorderRadius,
  propDisplay,
  propFlexDirection,
  propPadding,
  propHeight,
  propWidth,
  propBorder,
  propBackgroundColor,
  propMargin,
  propTop,
  propRight,
  propBottom,
  propLeft,
  number,
  propColor,
  propPosition,
  propDisplay1,
  propMinWidth,
  propTop1,
  propLeft1,
}) => {
  const componentsStepsItemIconStyle: CSSProperties = useMemo(() => {
    return {
      borderRadius: propBorderRadius,
      display: propDisplay,
      flexDirection: propFlexDirection,
      padding: propPadding,
      height: propHeight,
      width: propWidth,
    };
  }, [
    propBorderRadius,
    propDisplay,
    propFlexDirection,
    propPadding,
    propHeight,
    propWidth,
  ]);

  const rectangleStyle: CSSProperties = useMemo(() => {
    return {
      border: propBorder,
      backgroundColor: propBackgroundColor,
      margin: propMargin,
      top: propTop,
      right: propRight,
      bottom: propBottom,
      left: propLeft,
    };
  }, [
    propBorder,
    propBackgroundColor,
    propMargin,
    propTop,
    propRight,
    propBottom,
    propLeft,
  ]);

  const numberStyle: CSSProperties = useMemo(() => {
    return {
      color: propColor,
      position: propPosition,
      display: propDisplay1,
      minWidth: propMinWidth,
      top: propTop1,
      left: propLeft1,
    };
  }, [
    propColor,
    propPosition,
    propDisplay1,
    propMinWidth,
    propTop1,
    propLeft1,
  ]);

  return (
    <div
      className={[styles.componentsstepsItemIcon, className].join(" ")}
      style={componentsStepsItemIconStyle}
    >
      <div className={styles.rectangle} style={rectangleStyle} />
      <div className={styles.number} style={numberStyle}>
        {number}
      </div>
    </div>
  );
};

export default ComponentsStepsItemIcon;
