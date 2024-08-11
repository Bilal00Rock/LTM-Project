import { FunctionComponent } from "react";
import BadgeAndTag from "./BadgeAndTag";
import styles from "./Badge.module.css";

export type BadgeType = {
  className?: string;
  avatar1?: string;
  placeholder1?: string;
  leadingIcon?: boolean;
  closeIcon?: boolean;
  placeholder?: boolean;
  status1?: boolean;
  trailingIcon?: boolean;
  avatar?: boolean;
};

const Badge: FunctionComponent<BadgeType> = ({
  className = "",
  avatar1,
  placeholder1,
  leadingIcon,
  closeIcon,
  placeholder,
  status1,
  trailingIcon,
  avatar,
}) => {
  return (
    <div className={[styles.badge, className].join(" ")}>
      <BadgeAndTag
        leadingIcon={leadingIcon}
        closeIcon={closeIcon}
        placeholder={placeholder}
        status1={status1}
        trailingIcon={trailingIcon}
        avatar={avatar}
        propAlignSelf="unset"
        propFlex="1"
        propOverflowX="unset"
        avatar1={avatar1}
        propAlignSelf1="unset"
        propWidth="33px"
        placeholder1={placeholder1}
        propAlignSelf2="unset"
        propMinWidth="26px"
        propPadding="3.5px 3px"
      />
    </div>
  );
};

export default Badge;
