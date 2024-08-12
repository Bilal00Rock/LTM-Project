import  MainDashboardLayout  from './MainDashboard';
import { Outlet } from 'react-router-dom';

export const DashboardLayout = () => {
  return (
    <MainDashboardLayout>
      <Outlet />
    </MainDashboardLayout>
  );
};
