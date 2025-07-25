import axois from 'axios';

const BASE_URL = 'http://185.252.29.66:8061/api/v1';//192.168.100.180

export default axois.create({
 baseURL: BASE_URL,
  withCredentials: true
})

export const axiosPrivate = axois.create ({
  baseURL: BASE_URL,
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
  postNO: url( "/DoctorAuth/Register"),
  otp: url('/DoctorAuth/ValidateCode'),
  otpResend: url('/api/resendotp-register'),
  setpass: url('/DoctorAuth/ConfirmPassword')
};
export const LOGIN_URL = {
  login: url('/DoctorAuth/login'),
  logout: url('/DoctorAuth/logout'),
  admin: url('/AdminPanel/Login')

};
//Patient Urls
export const PatientsApi = {
  get: url( "/Patient/PatientsRegistered"),
  getbyid: url('/Patient/GetPatientsData'),
  add: url("/Patient/PatientRegistration"),
  otp: url("/Patient/PatientRegistrationValidateCode")
};
// for patient profiles use => api/patient?id:{phoneNo}

export const PendingPatientsApi = {
    get: url( "/Patient/PatientsNotRegistered"),

  };

export const DashDataApi = {
  
  get: url("/Patient/Dashboard"), 
  getTypes: url("/api/typeChart"),
  getSeizureCount: url('/api/sezureCountChart')
}

export const AdminPanelAPI = {
  getPatientsCount: url("/AdminPanel/GetUserCount"),
  getDoctorCount: url("/AdminPanel/GetDoctorCount"),
  getPatients: url("/AdminPanel/GetUserData"),
  getDoctors: url("/AdminPanel/GetDoctorData"), 
  getUnregP: url("/AdminPanel/GetUserNotRegisteredCount"), 
  getpendings: url("/AdminPanel/GetUserNotRegisteredData"),
  

}