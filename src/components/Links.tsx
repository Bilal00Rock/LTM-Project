import { FunctionComponent } from "react";
import LinkSmall from "./LinkSmall";
import styles from "./Links.module.css";

export type LinksType = {
  className?: string;
  borderBottom?: boolean;
  linkPlaceholder?: boolean;
  trailingIcon?: boolean;
  leadingIcon?: boolean;
};

const Links: FunctionComponent<LinksType> = ({
  className = "",
  borderBottom,
  linkPlaceholder,
  trailingIcon,
  leadingIcon,
}) => {
  return (
    <div className={[styles.links, className].join(" ")}>
      <LinkSmall
        borderBottom={borderBottom}
        linkPlaceholder={linkPlaceholder}
        trailingIcon={trailingIcon}
        leadingIcon={leadingIcon}
      />
    </div>
  );
};

export default Links;
