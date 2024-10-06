function path(root: string, sublink: string) {
    return `${root}${sublink}`;
  }

  const ROOTS_DASHBOARD = '/dashboard';
  const ROOTS_PATIENTS = '/patients';
  
export const PATH_DASHBOARD = {
    root: ROOTS_DASHBOARD,
    overview: path(ROOTS_DASHBOARD, '/overview'),
    pateints: path(ROOTS_DASHBOARD, '/patients'),
    support: path(ROOTS_DASHBOARD, '/help-support'),
    settings: path(ROOTS_DASHBOARD, '/settings')
  };
export const PATH_PATIENTS = {
    root: PATH_DASHBOARD.pateints ,
  };
export const PATH_OVERVIEW = {
    root: PATH_DASHBOARD.overview ,
  };


