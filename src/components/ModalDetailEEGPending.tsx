import { FunctionComponent } from "react";
import ModalDetailEEGReject from "./ModalDetailEEGReject";
import styles from "./Styles/ModalDetailEEGPending.module.css";

export type ModalDetailEEGPendingType = {
  className?: string;
  onClose?: () => void;
};

const ModalDetailEEGPending: FunctionComponent<ModalDetailEEGPendingType> = ({
  className = "",
  onClose,
}) => {
  return (
    <div className={[styles.modaldetaileegpending, className].join(" ")}>
      <ModalDetailEEGReject
        modalDetailEEGRejectPosition="unset"
        modalDetailEEGRejectMaxHeight="unset"
        modalDetailEEGRejectOverflow="unset"
      />
    </div>
  );
};

export default ModalDetailEEGPending;
