import { FunctionComponent, useMemo, type CSSProperties } from "react";
import TableCellheader from "./TableCellheader";
import TableCelltext from "./TableCelltext";
import styles from "./ComponentsTableColumnLink.module.css";

export type ComponentsTableColumnLinkType = {
  className?: string;
  title?: string;
  text?: string;
  text1?: string;
  text2?: string;
  text3?: string;
  text4?: string;
  text5?: string;
  text6?: string;
  text7?: string;
  text8?: string;
  text9?: string;

  /** Style props */
  propWidth?: CSSProperties["width"];
  propOverflow?: CSSProperties["overflow"];
};

const ComponentsTableColumnLink: FunctionComponent<
  ComponentsTableColumnLinkType
> = ({
  className = "",
  propWidth,
  propOverflow,
  title,
  text,
  text1,
  text2,
  text3,
  text4,
  text5,
  text6,
  text7,
  text8,
  text9,
}) => {
  const componentsTableColumnLinkStyle: CSSProperties = useMemo(() => {
    return {
      width: propWidth,
      overflow: propOverflow,
    };
  }, [propWidth, propOverflow]);

  return (
    <div
      className={[styles.componentstableColumnlink, className].join(" ")}
      style={componentsTableColumnLinkStyle}
    >
      <TableCellheader
        propAlignSelf="unset"
        title={title}
        propFlex="unset"
        propDisplay="inline-block"
        propMinWidth="87px"
      />
      <TableCelltext
        propAlignSelf="unset"
        propWidth="unset"
        text={text}
        propWidth1="unset"
        propHeight="unset"
        propColor="#1890ff"
        propMinWidth="87px"
        propAlignSelf1="unset"
      />
      <TableCelltext
        propAlignSelf="unset"
        propWidth="unset"
        text={text1}
        propWidth1="unset"
        propHeight="unset"
        propColor="#1890ff"
        propMinWidth="87px"
        propAlignSelf1="unset"
      />
      <TableCelltext
        propAlignSelf="unset"
        propWidth="unset"
        text={text2}
        propWidth1="unset"
        propHeight="unset"
        propColor="#1890ff"
        propMinWidth="87px"
        propAlignSelf1="unset"
      />
      <TableCelltext
        propAlignSelf="unset"
        propWidth="unset"
        text={text3}
        propWidth1="unset"
        propHeight="unset"
        propColor="#1890ff"
        propMinWidth="87px"
        propAlignSelf1="unset"
      />
      <TableCelltext
        propAlignSelf="stretch"
        propWidth="unset"
        text={text4}
        propWidth1="unset"
        propHeight="22px"
        propColor="#1890ff"
        propMinWidth="unset"
        propAlignSelf1="stretch"
      />
      <TableCelltext
        propAlignSelf="stretch"
        propWidth="unset"
        text={text5}
        propWidth1="unset"
        propHeight="22px"
        propColor="#1890ff"
        propMinWidth="unset"
        propAlignSelf1="stretch"
      />
      <TableCelltext
        propAlignSelf="stretch"
        propWidth="unset"
        text={text6}
        propWidth1="unset"
        propHeight="22px"
        propColor="#1890ff"
        propMinWidth="unset"
        propAlignSelf1="stretch"
      />
      <TableCelltext
        propAlignSelf="stretch"
        propWidth="unset"
        text={text7}
        propWidth1="unset"
        propHeight="22px"
        propColor="#1890ff"
        propMinWidth="unset"
        propAlignSelf1="stretch"
      />
      <TableCelltext
        propAlignSelf="stretch"
        propWidth="unset"
        text={text8}
        propWidth1="unset"
        propHeight="22px"
        propColor="#1890ff"
        propMinWidth="unset"
        propAlignSelf1="stretch"
      />
      <TableCelltext
        propAlignSelf="stretch"
        propWidth="unset"
        text={text9}
        propWidth1="unset"
        propHeight="22px"
        propColor="#1890ff"
        propMinWidth="unset"
        propAlignSelf1="stretch"
      />
    </div>
  );
};

export default ComponentsTableColumnLink;
