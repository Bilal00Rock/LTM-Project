import { FunctionComponent } from "react";
import Head1 from "./Head1";
import Body from "./Body";
import styles from "./Cardlegacy.module.css";

export type CardlegacyType = {
  className?: string;
};

const Cardlegacy: FunctionComponent<CardlegacyType> = ({ className = "" }) => {
  return (
    <div className={[styles.cardlegacy, className].join(" ")}>
      <Head1 />
      <Body />
    </div>
  );
};

export default Cardlegacy;
