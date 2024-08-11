import { FunctionComponent, useMemo, type CSSProperties } from "react";
import styles from "./Input.module.css";

export type InputType = {
  className?: string;
  suffix?: boolean;
  addonBefore?: boolean;
  addonAfter?: boolean;
  prefix?: boolean;
  placeholder?: string;
  inputPrefix?: string;
  placeholder1?: boolean;
  inputSuffix?: string;
  iconWrapper?: string;

  /** Style props */
  propAlignSelf?: CSSProperties["alignSelf"];
  propWidth?: CSSProperties["width"];
  propFlex?: CSSProperties["flex"];
  propOverflow?: CSSProperties["overflow"];
  propMinWidth?: CSSProperties["minWidth"];
  propAlignSelf1?: CSSProperties["alignSelf"];
  propAlignSelf2?: CSSProperties["alignSelf"];
  propPadding?: CSSProperties["padding"];
  propAlignSelf3?: CSSProperties["alignSelf"];
  propWidth1?: CSSProperties["width"];
  propMinWidth1?: CSSProperties["minWidth"];
};

const Input: FunctionComponent<InputType> = ({
  className = "",
  suffix = false,
  addonBefore = false,
  addonAfter = false,
  prefix = false,
  placeholder = "example",
  propAlignSelf,
  propWidth,
  propFlex,
  propOverflow,
  propMinWidth,
  propAlignSelf1,
  inputPrefix,
  propAlignSelf2,
  propPadding,
  placeholder1,
  propAlignSelf3,
  propWidth1,
  propMinWidth1,
  inputSuffix,
  iconWrapper,
}) => {
  const input1Style: CSSProperties = useMemo(() => {
    return {
      alignSelf: propAlignSelf,
      width: propWidth,
      flex: propFlex,
      overflow: propOverflow,
      minWidth: propMinWidth,
    };
  }, [propAlignSelf, propWidth, propFlex, propOverflow, propMinWidth]);

  const input2Style: CSSProperties = useMemo(() => {
    return {
      alignSelf: propAlignSelf1,
    };
  }, [propAlignSelf1]);

  const placeholder3Style: CSSProperties = useMemo(() => {
    return {
      alignSelf: propAlignSelf2,
      padding: propPadding,
    };
  }, [propAlignSelf2, propPadding]);

  const placeholder4Style: CSSProperties = useMemo(() => {
    return {
      alignSelf: propAlignSelf3,
      width: propWidth1,
      minWidth: propMinWidth1,
    };
  }, [propAlignSelf3, propWidth1, propMinWidth1]);

  return (
    <div className={[styles.input, className].join(" ")} style={input1Style}>
      {addonBefore && (
        <div className={styles.inputAddonlabel}>
          <div className={styles.wrapper}>
            <div className={styles.text}>http://</div>
          </div>
        </div>
      )}
      <div className={styles.input1} style={input2Style}>
        {prefix && (
          <img className={styles.inputPrefixIcon} alt="" src={inputPrefix} />
        )}
        <div className={styles.placeholder} style={placeholder3Style}>
          {!placeholder1 && (
            <div className={styles.placeholder1} style={placeholder4Style}>
              {placeholder}
            </div>
          )}
        </div>
        {suffix && (
          <img className={styles.inputPrefixIcon} alt="" src={inputSuffix} />
        )}
      </div>
      {addonAfter && (
        <div className={styles.inputAddonicon}>
          <img className={styles.iconWrapper} alt="" src={iconWrapper} />
        </div>
      )}
    </div>
  );
};

export default Input;
