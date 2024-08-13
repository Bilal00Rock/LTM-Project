import {PATH_DASHBOARD,PATH_PATIENTS, PATH_OVERVIEW} from './routes.ts';


const DASHBOARD_ITEMS = [
    { title: 'Overview', path: PATH_DASHBOARD.overview },
    { title: 'Patients', path: PATH_DASHBOARD.pateints },
    { title: 'User', path: '' },
    { title: 'Help & Support', path: '' },
    { title: 'Settings', path: '' },
];
const PATINETS_ITEMS = [
    { title: 'Add Patient', path: PATH_PATIENTS.addpatient },
    { title: 'Patients List', path: PATH_PATIENTS.patientslist },
];
const OVERVIEW_ITEMS = [
    { title: 'Test', path: PATH_OVERVIEW.test },
    { title: 'Test2', path: PATH_OVERVIEW.test2 },
];
export {
    PATH_OVERVIEW,
    PATH_DASHBOARD,
    PATH_PATIENTS,
    OVERVIEW_ITEMS,
    DASHBOARD_ITEMS,
    PATINETS_ITEMS,
};