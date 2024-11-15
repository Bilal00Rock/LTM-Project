import axois from 'axios';

const BASE_URL = '';

export default axois.create({
  //baseURL: BASE_URL,
})

export const axiosPrivate = axois.create ({
  //baseURL: BASE_URL,
  headers : { 'Content-Type': 'application/json'},
  withCredentials: true
});

function url(url: string) {
  return `${url}`;
}
export const REFRESH_URL ={
  token: url ('refesh')
}
//Register url
export const REGISTER_URL = {
  postNO: url( "/api/v1/DoctorAuth/Register"),
  otp: url('/api/v1/DoctorAuth/ValidateCode'),
  otpResend: url('/api/resendotp-register'),
  setpass: url('/api/v1/DoctorAuth/ConfirmPassword')
};
export const LOGIN_URL = {
  login: url('/api/v1/DoctorAuth/loigin'),
  logout: url('/api/v1/DoctorAuth/logout')
};
//Patient Urls
export const PatientsApi = {
  get: url( "/api/patients"),
  getbyid: url('/api/patient')
};
// for patient profiles use => api/patient?id:{phoneNo}

export const PendingPatientsApi = {
    get: url( "/api/pendingpatients"),
  };

export const DashDataApi = {
  get: url("/api/dashdata"), 
  getTypes: url("/api/typeChart"),
  getSeizureCount: url('/api/sezureCountChart')
}