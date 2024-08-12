import { FunctionComponent, useMemo, type CSSProperties } from "react";
import ModalDetailEEG from "./ModalDetailEEG";
import styles from "./Styles/ModalDetailEEGReject.module.css";

export type ModalDetailEEGRejectType = {
  className?: string;
  onClose?: () => void;

  /** Style props */
  modalDetailEEGRejectPosition?: CSSProperties["position"];
  modalDetailEEGRejectMaxHeight?: CSSProperties["maxHeight"];
  modalDetailEEGRejectOverflow?: CSSProperties["overflow"];
};

const ModalDetailEEGReject: FunctionComponent<ModalDetailEEGRejectType> = ({
  className = "",
  onClose,
  modalDetailEEGRejectPosition,
  modalDetailEEGRejectMaxHeight,
  modalDetailEEGRejectOverflow,
}) => {
  const modalDetailEEGRejectStyle: CSSProperties = useMemo(() => {
    return {
      position: modalDetailEEGRejectPosition,
      maxHeight: modalDetailEEGRejectMaxHeight,
      overflow: modalDetailEEGRejectOverflow,
    };
  }, [
    modalDetailEEGRejectPosition,
    modalDetailEEGRejectMaxHeight,
    modalDetailEEGRejectOverflow,
  ]);

  return (
    <div
      className={[styles.modaldetaileegreject, className].join(" ")}
      style={modalDetailEEGRejectStyle}
    >
      <ModalDetailEEG
        modalDetailEEGPosition="unset"
        modalDetailEEGOverflow="hidden"
        modalDetailEEGMaxHeight="unset"
        image2="/image-2@2x.png"
        detect110="Detect 2/10"
        checkMark="/cancel@2x.png"
        defaultButton="Rejected"
        wrapper="/wrapper5@2x.png"
        wrapper1="/wrapper-13@2x.png"
        title="Reject"
        title1="Confirm"
        icon={false}
        icon1={false}
        headerBoxShadow="0px -1px 0px #f0f0f0 inset"
        headerBackgroundColor="#fff"
        headerFlexDirection="row"
        headerPadding="16px"
        headerGap="20px"
      />
    </div>
  );
};

export default ModalDetailEEGReject;
