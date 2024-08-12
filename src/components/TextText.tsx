import { FunctionComponent, useMemo, type CSSProperties } from "react";
import styles from "./Styles/TextText.module.css";

export type TextTextType = {
  className?: string;
  text?: string;

  /** Style props */
  propWidth?: CSSProperties["width"];
  propFlexDirection?: CSSProperties["flexDirection"];
  propAlignSelf?: CSSProperties["alignSelf"];
  propHeight?: CSSProperties["height"];
  propPadding?: CSSProperties["padding"];
  propFlex?: CSSProperties["flex"];
  propMinWidth?: CSSProperties["minWidth"];
  propOverflow?: CSSProperties["overflow"];
  propHeight1?: CSSProperties["height"];
  propColor?: CSSProperties["color"];
  propDisplay?: CSSProperties["display"];
  propMarginTop?: CSSProperties["marginTop"];
  propFontWeight?: CSSProperties["fontWeight"];
  propMinWidth1?: CSSProperties["minWidth"];
  propTextDecoration?: CSSProperties["textDecoration"];
  propFontSize?: CSSProperties["fontSize"];
};

const TextText: FunctionComponent<TextTextType> = ({
  className = "",
  text = "Sales Ranking",
  propWidth,
  propFlexDirection,
  propAlignSelf,
  propHeight,
  propPadding,
  propFlex,
  propMinWidth,
  propOverflow,
  propHeight1,
  propColor,
  propDisplay,
  propMarginTop,
  propFontWeight,
  propMinWidth1,
  propTextDecoration,
  propFontSize,
}) => {
  const textTextStyle: CSSProperties = useMemo(() => {
    return {
      width: propWidth,
      flexDirection: propFlexDirection,
      alignSelf: propAlignSelf,
      height: propHeight,
      padding: propPadding,
      flex: propFlex,
      minWidth: propMinWidth,
      overflow: propOverflow,
    };
  }, [
    propWidth,
    propFlexDirection,
    propAlignSelf,
    propHeight,
    propPadding,
    propFlex,
    propMinWidth,
    propOverflow,
  ]);

  const textStyle: CSSProperties = useMemo(() => {
    return {
      height: propHeight1,
      color: propColor,
      display: propDisplay,
      marginTop: propMarginTop,
      fontWeight: propFontWeight,
      minWidth: propMinWidth1,
      textDecoration: propTextDecoration,
      fontSize: propFontSize,
    };
  }, [
    propHeight1,
    propColor,
    propDisplay,
    propMarginTop,
    propFontWeight,
    propMinWidth1,
    propTextDecoration,
    propFontSize,
  ]);

  return (
    <div
      className={[styles.texttext, className].join(" ")}
      style={textTextStyle}
    >
      <div className={styles.text} style={textStyle}>
        {text}
      </div>
    </div>
  );
};

export default TextText;
