import axois from 'axios';

export default axois.create({
  //baseURL: 'http://localhost:3000'
})

function url(url: string) {
  return `${url}`;
}
//Register url
export const REGISTER_URL = {
  postNO: url( "api/register"),
  otp: url('api/otp-register'),
  otpResend: url('api/resendotp-register'),
  setpass: url('api/setpass')
};

//Patient Urls
export const PatientsApi = {
  get: url( "api/patients"),
  
};
// for patient profiles use => api/patient?id:{phoneNo}

export const PendingPatientsApi = {
    get: url( "api/pendingpatients"),
  };

export const DashDataApi = {
  get: url("api/dashdata"), 
  getTypes: url("api/typeChart"),
  getSeizureCount: url('api/sezureCountChart')
}