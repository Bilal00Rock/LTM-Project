import { FunctionComponent } from "react";
import Breadcrumb from "./Breadcrumb";
import HeadingLeft from "./HeadingLeft";
import HeadingExtra from "./HeadingExtra";
import styles from "./PageHeaderLegacy.module.css";

export type PageHeaderLegacyType = {
  className?: string;
};

const PageHeaderLegacy: FunctionComponent<PageHeaderLegacyType> = ({
  className = "",
}) => {
  return (
    <div className={[styles.pageHeaderlegacy, className].join(" ")}>
      <Breadcrumb lastItemLabel="Patients list" />
      <div className={styles.heading}>
        <HeadingLeft />
        <HeadingExtra />
      </div>
    </div>
  );
};

export default PageHeaderLegacy;
