import { FunctionComponent, useMemo, type CSSProperties } from "react";
import Input from "./Input";
import styles from "./Styles/FormItemInput.module.css";

export type FormItemInputType = {
  className?: string;
  title?: string;
  inputPrefix?: string;
  placeholder?: string;
  inputSuffix?: string;
  iconWrapper?: string;
  suffix?: boolean;
  addonBefore?: boolean;
  addonAfter?: boolean;
  prefix?: boolean;
  placeholder1?: boolean;

  /** Style props */
  propHeight?: CSSProperties["height"];
  propFlexWrap?: CSSProperties["flexWrap"];
  propRowGap?: CSSProperties["rowGap"];
  propWidth?: CSSProperties["width"];
  propMinWidth?: CSSProperties["minWidth"];
  formItemInputPadding?: CSSProperties["padding"];
  labelMarginLeft?: CSSProperties["marginLeft"];
};

const FormItemInput: FunctionComponent<FormItemInputType> = ({
  className = "",
  propHeight,
  propFlexWrap,
  propRowGap,
  propWidth,
  title,
  propMinWidth,
  inputPrefix,
  placeholder,
  inputSuffix,
  iconWrapper,
  suffix,
  addonBefore,
  addonAfter,
  prefix,
  placeholder1,
  formItemInputPadding,
  labelMarginLeft,
}) => {
  const formItemInputStyle: CSSProperties = useMemo(() => {
    return {
      height: propHeight,
      flexWrap: propFlexWrap,
      rowGap: propRowGap,
      padding: formItemInputPadding,
    };
  }, [propHeight, propFlexWrap, propRowGap, formItemInputPadding]);

  const labelStyle: CSSProperties = useMemo(() => {
    return {
      width: propWidth,
      marginLeft: labelMarginLeft,
    };
  }, [propWidth, labelMarginLeft]);

  const titleStyle: CSSProperties = useMemo(() => {
    return {
      minWidth: propMinWidth,
    };
  }, [propMinWidth]);

  return (
    <div
      className={[styles.formIteminput, className].join(" ")}
      style={formItemInputStyle}
    >
      <div className={styles.labelWrapper}>
        <div className={styles.label} style={labelStyle}>
          <div className={styles.title} style={titleStyle}>
            {title}
          </div>
          <div className={styles.div}>:</div>
        </div>
      </div>
      <Input
        suffix={suffix}
        addonBefore={addonBefore}
        addonAfter={addonAfter}
        prefix={prefix}
        placeholder={placeholder}
        propAlignSelf="unset"
        propWidth="unset"
        propFlex="1"
        propOverflow="hidden"
        propMinWidth="359px"
        propAlignSelf1="unset"
        inputPrefix={inputPrefix}
        propAlignSelf2="unset"
        propPadding="unset"
        placeholder1={placeholder1}
        propAlignSelf3="unset"
        propWidth1="unset"
        propMinWidth1="31px"
        inputSuffix={inputSuffix}
        iconWrapper={iconWrapper}
      />
    </div>
  );
};

export default FormItemInput;
