import {PATH_DASHBOARD,PATH_PATIENTS, PATH_OVERVIEW, PATH_LOGIN} from './routes.ts';


const DASHBOARD_ITEMS = [
    { title: 'داشبورد', path: PATH_DASHBOARD.overview },
    { title: 'بیماران', path: PATH_DASHBOARD.pateints },
    { title: 'پشتیبانی', path:PATH_DASHBOARD.support  },
    { title: 'تنظیمات', path: PATH_DASHBOARD.settings },
];
export {
    PATH_OVERVIEW,
    PATH_DASHBOARD,
    PATH_PATIENTS,
    DASHBOARD_ITEMS,
    PATH_LOGIN
};