function path(root: string, sublink: string) {
    return `${root}${sublink}`;
  }

  const ROOTS_DASHBOARD = '/dashboard';
  const ROOTS_PATIENTS = '/patients';
  const ROOTS_LOGIN = 'login-page';
export const PATH_LOGIN = {
  root: ROOTS_LOGIN,
}
export const PATH_DASHBOARD = {
    root: ROOTS_DASHBOARD,
    overview: path(ROOTS_DASHBOARD, '/overview'),
    pateints: path(ROOTS_DASHBOARD, '/patients'),
    support: path(ROOTS_DASHBOARD, '/help-support'),
    settings: path(ROOTS_DASHBOARD, '/settings')
  };

export const PATH_PATIENTS = {
    root: PATH_DASHBOARD.pateints,
    id: path(ROOTS_DASHBOARD,'/patient') ,
  };
export const PATH_OVERVIEW = {
    root: PATH_DASHBOARD.overview ,
  };


