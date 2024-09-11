import {PATH_DASHBOARD,PATH_PATIENTS, PATH_OVERVIEW} from './routes.ts';


const DASHBOARD_ITEMS = [
    { title: 'داشبورد', path: PATH_DASHBOARD.overview },
    { title: 'بیماران', path: PATH_DASHBOARD.pateints },
    { title: 'پروفایل', path: '' },
    { title: 'پشتیبانی', path: '' },
    { title: 'تنظیمات', path: '' },
];
const PATINETS_ITEMS = [
    { title: 'لیست انتظار بیماران', path: PATH_PATIENTS.pendings },
    { title: 'لیست بیماران', path: PATH_PATIENTS.patientslist },
];
export {
    PATH_OVERVIEW,
    PATH_DASHBOARD,
    PATH_PATIENTS,
    DASHBOARD_ITEMS,
    PATINETS_ITEMS,
};