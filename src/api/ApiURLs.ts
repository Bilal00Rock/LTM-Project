function url(url: string) {
  return `${url}`;
}


//Patient Urls
export const PatientsApi = {
  Create: url(''),
  get: url( "api/patients"),
  getall: url( "/patients"),
  delete: url("/help-support"),
};

export const PendingPatientsApi = {
    Create: url(''),
    get: url( "api/pendingpatients"),
  };