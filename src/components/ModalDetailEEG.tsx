import { FunctionComponent, useMemo, type CSSProperties } from "react";
import TitleConfirm from "./TitleConfirm";
import Button from "./Button";
import styles from "./Styles/ModalDetailEEG.module.css";

export type ModalDetailEEGType = {
  className?: string;
  onClose?: () => void;
  image2?: string;
  detect110?: string;
  checkMark?: string;
  defaultButton?: string;
  wrapper?: string;
  wrapper1?: string;
  title?: string;
  title1?: string;
  icon?: boolean;
  icon1?: boolean;

  /** Style props */
  modalDetailEEGPosition?: CSSProperties["position"];
  modalDetailEEGOverflow?: CSSProperties["overflow"];
  modalDetailEEGMaxHeight?: CSSProperties["maxHeight"];
  headerBoxShadow?: CSSProperties["boxShadow"];
  headerBackgroundColor?: CSSProperties["backgroundColor"];
  headerFlexDirection?: CSSProperties["flexDirection"];
  headerPadding?: CSSProperties["padding"];
  headerGap?: CSSProperties["gap"];
};

const ModalDetailEEG: FunctionComponent<ModalDetailEEGType> = ({
  className = "",
  onClose,
  modalDetailEEGPosition,
  modalDetailEEGOverflow,
  modalDetailEEGMaxHeight,
  image2,
  detect110,
  checkMark,
  defaultButton,
  wrapper,
  wrapper1,
  title,
  title1,
  icon,
  icon1,
  headerBoxShadow,
  headerBackgroundColor,
  headerFlexDirection,
  headerPadding,
  headerGap,
}) => {
  const modalDetailEEGStyle: CSSProperties = useMemo(() => {
    return {
      position: modalDetailEEGPosition,
      overflow: modalDetailEEGOverflow,
      maxHeight: modalDetailEEGMaxHeight,
    };
  }, [modalDetailEEGPosition, modalDetailEEGOverflow, modalDetailEEGMaxHeight]);

  const headerStyle: CSSProperties = useMemo(() => {
    return {
      boxShadow: headerBoxShadow,
      backgroundColor: headerBackgroundColor,
      flexDirection: headerFlexDirection,
      padding: headerPadding,
      gap: headerGap,
    };
  }, [
    headerBoxShadow,
    headerBackgroundColor,
    headerFlexDirection,
    headerPadding,
    headerGap,
  ]);

  return (
    <div
      className={[styles.modaldetaileeg, className].join(" ")}
      style={modalDetailEEGStyle}
    >
      <section className={styles.header} style={headerStyle}>
        <TitleConfirm checkMark={checkMark} defaultButton={defaultButton} />
        <div className={styles.closeWrapper}>
          <img
            className={styles.closeIcon}
            loading="lazy"
            alt=""
            src="/close.svg"
          />
        </div>
      </section>
      <section className={styles.content}>
        <div className={styles.defaultButtonWrapper}>
          <a className={styles.defaultButton}>Eye Blink Artifact</a>
        </div>
        <img className={styles.image2Icon} loading="lazy" alt="" src={image2} />
        <div className={styles.scroll}>
          <div className={styles.scrollbar} />
        </div>
      </section>
      <div className={styles.footer}>
        <div className={styles.footerButtons}>
          <div className={styles.button}>
            <div className={styles.a}>A</div>
            <img
              className={styles.arrowLeftIcon}
              loading="lazy"
              alt=""
              src="/arrow-left.svg"
            />
          </div>
          <div className={styles.detect110}>{detect110}</div>
          <div className={styles.button}>
            <div className={styles.a}>A</div>
            <img
              className={styles.arrowLeftIcon}
              loading="lazy"
              alt=""
              src="/arrow-right.svg"
            />
          </div>
        </div>
        <div className={styles.actionButtons}>
          <div className={styles.button2}>
            <div className={styles.a}>A</div>
            <img
              className={styles.maximize2Icon}
              loading="lazy"
              alt=""
              src="/maximize-2.svg"
            />
          </div>
          <Button
            title={title}
            icon={icon}
            propWidth="unset"
            propBorderRadius="8px"
            propBackgroundColor="#ff4d4f"
            propPadding="5px 24px"
            propAlignSelf="unset"
            propBoxShadow="0px 2px 0px rgba(0, 0, 0, 0.04)"
            propBorder="unset"
            propOverflow="unset"
            propFlex="0.8384"
            wrapper={wrapper}
            propFontFamily="Poppins"
            propColor="#fff"
            propMinWidth="40px"
            propFlex1="unset"
            propFontWeight="unset"
            propDisplay="inline-block"
          />
          <Button
            title={title1}
            icon={icon1}
            propWidth="unset"
            propBorderRadius="8px"
            propBackgroundColor="#00ff0a"
            propPadding="3px 19px"
            propAlignSelf="unset"
            propBoxShadow="0px 2px 0px rgba(0, 0, 0, 0.04)"
            propBorder="1px solid #00ff0a"
            propOverflow="hidden"
            propFlex="1"
            wrapper={wrapper1}
            propFontFamily="Poppins"
            propColor="#1f2937"
            propMinWidth="50px"
            propFlex1="unset"
            propFontWeight="unset"
            propDisplay="inline-block"
          />
        </div>
      </div>
    </div>
  );
};

export default ModalDetailEEG;
