import { FunctionComponent } from "react";
import AdvancedLegacy from "./AdvancedLegacy";
import styles from "./Styles/Pagination.module.css";

export type PaginationType = {
  className?: string;
  showIcon?: boolean;
};

const Pagination: FunctionComponent<PaginationType> = ({
  className = "",
  showIcon,
}) => {
  return (
    <div className={[styles.pagination, className].join(" ")}>
      <AdvancedLegacy
        prop="1"
        prop1="4"
        prop2="5"
        prop3="6"
        prop4="7"
        prop5="8"
        prop6="50"
        inputPrefix="/inputprefix5@2x.png"
        placeholder="example"
        inputSuffix="/inputsuffix4@2x.png"
        iconWrapper="/iconwrapper-14@2x.png"
        suffix
        addonBefore
        addonAfter
        prefix
        placeholder1
        showIcon={showIcon}
        page="10/page"
      />
    </div>
  );
};

export default Pagination;
