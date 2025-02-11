import PanelLayout from "./‌PanelLayout";
import { Outlet } from "react-router-dom";

export const AdminPanelLayout = () => {
  return (
    <PanelLayout>
      <Outlet />
    </PanelLayout>
  );
};
