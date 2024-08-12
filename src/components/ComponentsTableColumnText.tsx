import { FunctionComponent, useMemo, type CSSProperties } from "react";
import TableCelltext from "./TableCelltext";
import styles from "./Styles/ComponentsTableColumnText.module.css";

export type ComponentsTableColumnTextType = {
  className?: string;
  title?: string;
  sorter?: string;
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
  propFlex?: CSSProperties["flex"];
  propWidth?: CSSProperties["width"];
  propAlignSelf?: CSSProperties["alignSelf"];
  propFlex1?: CSSProperties["flex"];
};

const ComponentsTableColumnText: FunctionComponent<
  ComponentsTableColumnTextType
> = ({
  className = "",
  propFlex,
  propWidth,
  propAlignSelf,
  title,
  propFlex1,
  sorter,
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
  const componentsTableColumnTextStyle: CSSProperties = useMemo(() => {
    return {
      flex: propFlex,
      width: propWidth,
    };
  }, [propFlex, propWidth]);

  const tableHeaderdefaultStyle: CSSProperties = useMemo(() => {
    return {
      alignSelf: propAlignSelf,
    };
  }, [propAlignSelf]);

  const title2Style: CSSProperties = useMemo(() => {
    return {
      flex: propFlex1,
    };
  }, [propFlex1]);

  return (
    <div
      className={[styles.componentstableColumntext, className].join(" ")}
      style={componentsTableColumnTextStyle}
    >
      <div
        className={styles.tableHeaderdefault}
        style={tableHeaderdefaultStyle}
      >
        <div className={styles.divider} />
        <div className={styles.title} style={title2Style}>
          {title}
        </div>
        <img className={styles.sorterIcon} loading="lazy" alt="" src={sorter} />
      </div>
      <TableCelltext
        propAlignSelf="stretch"
        propWidth="unset"
        text={text}
        propWidth1="unset"
        propHeight="unset"
        propColor="rgba(0, 0, 0, 0.85)"
        propMinWidth="129px"
        propAlignSelf1="unset"
      />
      <TableCelltext
        propAlignSelf="stretch"
        propWidth="unset"
        text={text1}
        propWidth1="unset"
        propHeight="unset"
        propColor="rgba(0, 0, 0, 0.85)"
        propMinWidth="129px"
        propAlignSelf1="unset"
      />
      <TableCelltext
        propAlignSelf="stretch"
        propWidth="unset"
        text={text2}
        propWidth1="unset"
        propHeight="unset"
        propColor="rgba(0, 0, 0, 0.85)"
        propMinWidth="129px"
        propAlignSelf1="unset"
      />
      <TableCelltext
        propAlignSelf="stretch"
        propWidth="unset"
        text={text3}
        propWidth1="unset"
        propHeight="unset"
        propColor="rgba(0, 0, 0, 0.85)"
        propMinWidth="129px"
        propAlignSelf1="unset"
      />
      <TableCelltext
        propAlignSelf="stretch"
        propWidth="unset"
        text={text4}
        propWidth1="129px"
        propHeight="22px"
        propColor="rgba(0, 0, 0, 0.85)"
        propMinWidth="unset"
        propAlignSelf1="unset"
      />
      <TableCelltext
        propAlignSelf="stretch"
        propWidth="unset"
        text={text5}
        propWidth1="129px"
        propHeight="22px"
        propColor="rgba(0, 0, 0, 0.85)"
        propMinWidth="unset"
        propAlignSelf1="unset"
      />
      <TableCelltext
        propAlignSelf="stretch"
        propWidth="unset"
        text={text6}
        propWidth1="129px"
        propHeight="22px"
        propColor="rgba(0, 0, 0, 0.85)"
        propMinWidth="unset"
        propAlignSelf1="unset"
      />
      <TableCelltext
        propAlignSelf="stretch"
        propWidth="unset"
        text={text7}
        propWidth1="129px"
        propHeight="22px"
        propColor="rgba(0, 0, 0, 0.85)"
        propMinWidth="unset"
        propAlignSelf1="unset"
      />
      <TableCelltext
        propAlignSelf="stretch"
        propWidth="unset"
        text={text8}
        propWidth1="129px"
        propHeight="22px"
        propColor="rgba(0, 0, 0, 0.85)"
        propMinWidth="unset"
        propAlignSelf1="unset"
      />
      <TableCelltext text={text9} />
    </div>
  );
};

export default ComponentsTableColumnText;
