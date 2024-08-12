import { FunctionComponent } from "react";
import BLogin from "./BLogin";
import styles from "./Styles/Bplan.module.css";

export type BplanType = {
  className?: string;
};

const Bplan: FunctionComponent<BplanType> = ({ className = "" }) => {
  return (
    <div className={[styles.bplan, className].join(" ")}>
      <BLogin />
    </div>
  );
};

export default Bplan;
