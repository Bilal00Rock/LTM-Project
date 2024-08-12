import { FunctionComponent } from "react";
import TableCellheader from "./TableCellheader";
import TableCellaction from "./TableCellaction";
import styles from "./Styles/ComponentsTableColumnAction.module.css";

export type ComponentsTableColumnActionType = {
  className?: string;
};

const ComponentsTableColumnAction: FunctionComponent<
  ComponentsTableColumnActionType
> = ({ className = "" }) => {
  return (
    <div className={[styles.componentstableColumnaction, className].join(" ")}>
      <TableCellheader title="Action" />
      <TableCellaction
        propAlignSelf="stretch"
        propFlex="unset"
        propHeight="unset"
        propMinWidth="unset"
        invite="Profile"
        propAlignSelf1="unset"
        propWidth="unset"
        propMinWidth1="41px"
        propDisplay="inline-block"
        propFlex1="unset"
        propHeight1="unset"
        inviteTextDecoration="unset"
      />
      <TableCellaction
        propAlignSelf="stretch"
        propFlex="unset"
        propHeight="unset"
        propMinWidth="unset"
        invite="Profile"
        propAlignSelf1="unset"
        propWidth="unset"
        propMinWidth1="41px"
        propDisplay="inline-block"
        propFlex1="unset"
        propHeight1="unset"
        inviteTextDecoration="unset"
      />
      <TableCellaction
        propAlignSelf="stretch"
        propFlex="unset"
        propHeight="unset"
        propMinWidth="unset"
        invite="Profile"
        propAlignSelf1="unset"
        propWidth="unset"
        propMinWidth1="41px"
        propDisplay="inline-block"
        propFlex1="unset"
        propHeight1="unset"
        inviteTextDecoration="unset"
      />
      <TableCellaction
        propAlignSelf="stretch"
        propFlex="unset"
        propHeight="unset"
        propMinWidth="unset"
        invite="Profile"
        propAlignSelf1="unset"
        propWidth="unset"
        propMinWidth1="41px"
        propDisplay="inline-block"
        propFlex1="unset"
        propHeight1="unset"
        inviteTextDecoration="unset"
      />
      <TableCellaction
        propAlignSelf="stretch"
        propFlex="1"
        propHeight="unset"
        propMinWidth="unset"
        invite="Profile"
        propAlignSelf1="stretch"
        propWidth="41px"
        propMinWidth1="unset"
        propDisplay="inline-block"
        propFlex1="unset"
        propHeight1="unset"
        inviteTextDecoration="unset"
      />
      <TableCellaction
        propAlignSelf="stretch"
        propFlex="1"
        propHeight="unset"
        propMinWidth="unset"
        invite="Profile"
        propAlignSelf1="stretch"
        propWidth="41px"
        propMinWidth1="unset"
        propDisplay="inline-block"
        propFlex1="unset"
        propHeight1="unset"
        inviteTextDecoration="unset"
      />
      <TableCellaction
        propAlignSelf="stretch"
        propFlex="1"
        propHeight="unset"
        propMinWidth="unset"
        invite="Profile"
        propAlignSelf1="stretch"
        propWidth="41px"
        propMinWidth1="unset"
        propDisplay="inline-block"
        propFlex1="unset"
        propHeight1="unset"
        inviteTextDecoration="unset"
      />
      <TableCellaction
        propAlignSelf="stretch"
        propFlex="1"
        propHeight="unset"
        propMinWidth="unset"
        invite="Profile"
        propAlignSelf1="stretch"
        propWidth="41px"
        propMinWidth1="unset"
        propDisplay="inline-block"
        propFlex1="unset"
        propHeight1="unset"
        inviteTextDecoration="unset"
      />
      <TableCellaction
        propAlignSelf="stretch"
        propFlex="1"
        propHeight="unset"
        propMinWidth="unset"
        invite="Profile"
        propAlignSelf1="stretch"
        propWidth="41px"
        propMinWidth1="unset"
        propDisplay="inline-block"
        propFlex1="unset"
        propHeight1="unset"
        inviteTextDecoration="unset"
      />
      <TableCellaction invite="Profile" />
    </div>
  );
};

export default ComponentsTableColumnAction;
