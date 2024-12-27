import { delay, http, HttpResponse } from "msw";
import {
  DashDataApi,
  PatientsApi,
  PendingPatientsApi,
  REGISTER_URL,
  LOGIN_URL,
  REFRESH_URL,
} from "../api";
import { message } from "antd";
import { MdPhishing } from "react-icons/md";
// Mock data to simulate a successful login
let mockAccessToken = "initialAccessToken";
let mockRefreshToken = "initialAccessToken";

let accessTokenExpiry = Date.now() + 20 * 60* 1000;
let refreshTokenExpiry = Date.now() + 15 * 1000;
//let id = "09915748684";
let isValid = false;
const checkAccessToken = (request: any) => {
  let mockAccessToken = "initialAccessToken";
  const accessToken = request.headers.get("authorization");
  //console.log('1',accessToken, '2',`Bearer ${mockAccessToken}`)
  
 // console.log('a', accessToken !== `Bearer ${mockAccessToken}`,'2',!accessToken);
  if (!accessToken || accessToken !== `Bearer ${mockAccessToken}`) {
    return HttpResponse.json(
      { message: "Unauthorized access" },
      { status: 403 }
    );
  }

  const currentTime = Date.now();
  if (currentTime > accessTokenExpiry) {
    return HttpResponse.json(
      { message: "Access token expired" },
      { status: 403 }
    );
  }

  return null; // Token is valid
};
export const handlers = [
  // And here's a request handler with MSW
  // for the same "GET /user" request that
  // responds with a mock JSON response.
  // Login handler
  http.post(LOGIN_URL.login, async ({ request }) => {
    const { username, password } = (await request.json()) as {
      username: string;
      password: string;
    };

    let success = false;
    let mockAccessToken = "initialAccessToken";

    if (username === "f" && password === "f") {
      success = true;
      return HttpResponse.json(
        { success: success,token: mockAccessToken},
        {
          status: 200,
          headers: {
            
          },
          //msw cannot set actual cokies so the refresh token cant be handle by this
        }
      );
    } else {
      return HttpResponse.json(
        { success, message: "invalid" },
        { status: 401 }
      );
    }
  }),

  // Refresh token handler
  // Refresh token handler
  http.get(REFRESH_URL.token, async ({ request }) => {
    const refreshToken = request.headers.get("Authorization");

    // Log the refresh token for debugging (consider removing this in production)
    //console.log("Refresh Token Received:", refreshToken);

    // if (refreshToken !== `Bearer ${mockRefreshToken}`) {
    // return HttpResponse.json({ message: "Invalid refresh token" }, { status: 401 });
    //}

    // Generate a new access token and set its expiry
    mockAccessToken = "newAccessToken";
    accessTokenExpiry = Date.now() + 10 * 60 * 1000; // 10 minutes from now

    return HttpResponse.json(
      { accessToken: mockAccessToken },
      {
        status: 200,
        headers: { accessToken: mockAccessToken },
      }
    );
  }),

  // Logout handler (optional)
  http.get(LOGIN_URL.logout, async (request) => {
    mockAccessToken = "";
    mockRefreshToken = "";

    return HttpResponse.json(
      { success: true, message: "Logged out successfully" },
      { status: 200 }
    );
  }),

  //register
  http.post(REGISTER_URL.postNO, async ({ request }) => {
    // Read the intercepted request body as JSON.
    
    const {  medicalSystemCode, nationalCode,phoneNumber } = (await request.json()) as {
      nationalCode: string;
      medicalSystemCode: string;
      phoneNumber: string;
    };

    
    const  medical_SystemCode= medicalSystemCode ;
    const  national_Code=  nationalCode ;
    const  phone_Number = phoneNumber;
    const  message="با موفقیت ارسال شد"
    
    // Don't forget to declare a semantic "201 Created"
    return HttpResponse.json({medical_SystemCode, national_Code, phone_Number, message}, { status: 202 });

  }),
  http.post(REGISTER_URL.otp, async ({ request }) => {
    // Manually infer the expected structure of the request body
    const body = (await request.json()) as { code: string  };

    // Extract OTP value
    const otp = body.code;

    // Validate the OTP
    isValid = otp === "123456"; // Replace with your validation logic
    // Don't forget to declare a semantic "201 Created"
    if (isValid) {
      return HttpResponse.json(
        { message:"با موفقیت شماره موبایل شما تایید شد" },
        {
          status: 200,
          headers: {
          },
        }
      );
    } else {
      return HttpResponse.json({ message: "پیام خطا" }, { status: 400 });
    }
  }),
  http.post(REGISTER_URL.setpass, async ({ request }) => {
    // Manually infer the expected structure of the request body
    const {  medicalSystemCode, nationalCode,phoneNumber, password } = (await request.json()) as {
      nationalCode: string;
      medicalSystemCode: string;
      phoneNumber: string;
      password: string;
    };
    // Example: Validate the access token (replace with your real logic)
    // This would be your valid token for testing
    

    
    if (phoneNumber === '09370630120') {
      return HttpResponse.json(
        { message:  "دکتر با موفقیت ذخیره شد" },
        {
          status: 200,
          headers: {
          },
        }
      );
    } else {
      return HttpResponse.json(
        { message: "خطایی رخ داده است" },
        { status: 400 }
      );
    }
  }),

  //patients APIs

  http.get(PatientsApi.get, ({ request }) => {
    const authResponse = checkAccessToken(request);
    //console.log('auth response: ',authResponse);
    if (authResponse) return authResponse;

    return HttpResponse.json(
      {
        "message": "Success",
        "data": {
          "list": [
            {
              "patientid": "08dce6ae-4bef-4486-805b-8554f54f31f1",
              "phoneNumber": "09915748684",
              "birthdate": "2024-10-10T15:16:11.886337",
              "create": "2024-10-07T08:59:05.249417",
              "fullName": "امیر دیلمی",
              "age": 31,
              "address": "مشهد، خیابان شهید بهشتی، کوچه ۱، پلاک ۱۸",
              "description": "توضیحات تکمیلی",
              "type": "فوکال",
             // "member": "true"
            },
            {
              "patientid": "08dce6ae-4bef-4486-805b-8554f54f31f1",
              "phoneNumber": "09915748994",
              "birthdate": "2024-10-10T15:16:11.886337",
              "create": "2024-10-07T08:59:05.249417",
              "fullName": "امیر دیلمی",
              "age": 31,
              "address": "مشهد، خیابان شهید بهشتی، کوچه ۱، پلاک ۱۸",
              "description": "توضیحات تکمیلی",
              "type": "فوکال",
             // "member": "true"
            }
          ],
          "count": 2
        }
      }
      // [
    //   {
    //     key: "1",
    //     name: "امیر دیلمی",
    //     age: 31,
    //     address: "مشهد، خیابان شهید بهشتی، کوچه ۱، پلاک ۱۸",
    //     description: "توضیحات تکمیلی",
    //     type: "فوکال",
    //     phoneNO: "09123456789",
    //     n_id: "۰۱۳۲۲۹۰۱۲۹",
    //     member: "true"
    //   },
    //   {
    //     key: "2",
    //     name: "زینب صابری ",
    //     age: 29,
    //     address: "مشهد، خیابان شهید بهشتی، کوچه ۱، پلاک ۱۸",
    //     description: "توضیحات تکمیلی",
    //     type: "فوکال",
    //     phoneNO: "09123456799",
    //     n_id: "۰۱۳۲۲۹۰۱۲۹",
    //     member: "false"

    //   },
    //   {
    //     key: "3",
    //     name: "حنانه امیری ",
    //     age: 47,
    //     address: "مشهد، خیابان شهید بهشتی، کوچه ۱، پلاک ۱۸",
    //     description: "توضیحات تکمیلی",
    //     type: "فوکال و ژنرالیزه",
    //     phoneNO: "09123456799",
    //     n_id: "۰۱۳۲۲۹۰۱۲۹",
    //     member: "true"

    //   },
    //   {
    //     key: "4",
    //     name: "محمد صادقی",
    //     age: 32,
    //     address: "مشهد، خیابان شهید بهشتی، کوچه ۱، پلاک ۱۸",
    //     description: "توضیحات تکمیلی",
    //     type: "ناشناخته",
    //     phoneNO: "۰۹۱۲۳۴۵۶۷۸۹",
    //     n_id: "۰۱۳۲۲۹۰۱۲۹",
    //     member: "pending"

    //   },
    //   {
    //     key: "5",
    //     name: "معضومه موسوی ",
    //     age: 34,
    //     address: "مشهد، خیابان شهید بهشتی، کوچه ۱، پلاک ۱۸",
    //     description: "توضیحات تکمیلی",
    //     type: "ژنرالیزه",
    //     phoneNO: "۰۹۱۲۳۴۵۶۷۸۹",
    //     n_id: "۰۱۳۲۲۹۰۱۲۹",
    //     member: "true"

    //   },
    //   {
    //     key: "6",
    //     name: "جمال عزیزی",
    //     age: 51,
    //     address: "مشهد، خیابان شهید بهشتی، کوچه ۱، پلاک ۱۸",
    //     description: "توضیحات تکمیلی",
    //     type: "ژنرالیزه",
    //     phoneNO: "۰۹۱۲۳۴۵۶۷۸۹",
    //     n_id: "۰۱۳۲۲۹۰۱۲۹",
    //     member: "true"

    //   },
    //   {
    //     key: "7",
    //     name: "مهدی غلامی",
    //     age: 14,
    //     address: "مشهد، خیابان شهید بهشتی، کوچه ۱، پلاک ۱۸",
    //     description: "توضیحات تکمیلی",
    //     type: "ژنرالیزه",
    //     n_id: "۰۱۳۲۲۹۰۱۲۹",
    //     member: "true"

    //   },
    //   {
    //     key: "8",
    //     name: "رضا احمدی ",
    //     age: 28,
    //     address: "مشهد، خیابان شهید بهشتی، کوچه ۱، پلاک ۱۸",
    //     description: "توضیحات تکمیلی",
    //     type: "ژنرالیزه",
    //     phoneNO: "۰۹۱۲۳۴۵۶۷۸۹",
    //     n_id: "۰۱۳۲۲۹۰۱۲۹",
    //     member: "true"

    //   },
    //   {
    //     key: "9",
    //     name: "آرزو کریمی ",
    //     age: 24,
    //     address: "مشهد، خیابان شهید بهشتی، کوچه ۱، پلاک ۱۸",
    //     description: "توضیحات تکمیلی",
    //     type: "ناشناخته",
    //     phoneNO: "۰۹۱۲۳۴۵۶۷۸۹",
    //     n_id: "۰۱۳۲۲۹۰۱۲۹",
    //     member: "true"

    //   },
    //   {
    //     key: "10",
    //     name: "کامبیز افروز  ",
    //     age: 46,
    //     address: "مشهد، خیابان شهید بهشتی، کوچه ۱، پلاک ۱۸",
    //     description: "توضیحات تکمیلی",
    //     type: "ناشناخته",
    //     phoneNO: "۰۹۱۲۳۴۵۶۷۸۹",
    //     n_id: "۰۱۳۲۲۹۰۱۲۹",
    //     member: "true"

    //   },
    //   {
    //     key: "11",
    //     name: "محمد صادقی",
    //     age: 32,
    //     address: "مشهد، خیابان شهید بهشتی، کوچه ۱، پلاک ۱۸",
    //     description: "توضیحات تکمیلی",
    //     type: "ناشناخته",
    //     phoneNO: "۰۹۱۲۳۴۵۶۷۸۹",
    //     n_id: "۰۱۳۲۲۹۰۱۲۹",
    //   },
    //   {
    //     key: "12",
    //     name: "محمد صادقی",
    //     age: 32,
    //     address: "مشهد، خیابان شهید بهشتی، کوچه ۱، پلاک ۱۸",
    //     description: "توضیحات تکمیلی",
    //     type: "ناشناخته",
    //     phoneNO: "۰۹۱۲۳۴۵۶۷۸۹",
    //     n_id: "۰۱۳۲۲۹۰۱۲۹",
    //     member: "true"

    //   },
    //   {
    //     key: "13",
    //     name: "محمد صادقی",
    //     age: 32,
    //     address: "مشهد، خیابان شهید بهشتی، کوچه ۱، پلاک ۱۸",
    //     description: "توضیحات تکمیلی",
    //     type: "ناشناخته",
    //     phoneNO: "۰۹۱۲۳۴۵۶۷۸۹",
    //     n_id: "۰۱۳۲۲۹۰۱۲۹",
    //     member: "true"

    //   },
    //   {
    //     key: "14",
    //     name: "محمد صادقی",
    //     age: 32,
    //     address: "مشهد، خیابان شهید بهشتی، کوچه ۱، پلاک ۱۸",
    //     description: "توضیحات تکمیلی",
    //     type: "ناشناخته",
    //     phoneNO: "۰۹۱۲۳۴۵۶۷۸۹",
    //     n_id: "۰۱۳۲۲۹۰۱۲۹",
    //     member: "true"

    //   },
    //   {
    //     key: "15",
    //     name: "محمد صادقی",
    //     age: 32,
    //     address: "مشهد، خیابان شهید بهشتی، کوچه ۱، پلاک ۱۸",
    //     description: "توضیحات تکمیلی",
    //     type: "ژنرالیزه",
    //     phoneNO: "۰۹۱۲۳۴۵۶۷۸۹",
    //     n_id: "۰۱۳۲۲۹۰۱۲۹",
    //     member: "true"

    //   },
    //   {
    //     key: "16",
    //     name: "محمد صادقی",
    //     age: 32,
    //     address: "مشهد، خیابان شهید بهشتی، کوچه ۱، پلاک ۱۸",
    //     description: "توضیحات تکمیلی",
    //     type: "ژنرالیزه",
    //     phoneNO: "۰۹۱۲۳۴۵۶۷۸۹",
    //     n_id: "۰۱۳۲۲۹۰۱۲۹",
    //     member: "true"

    //   },
    //   {
    //     key: "17",
    //     name: "محمد صادقی",
    //     age: 32,
    //     address: "مشهد، خیابان شهید بهشتی، کوچه ۱، پلاک ۱۸",
    //     description: "توضیحات تکمیلی",
    //     type: "ژنرالیزه",
    //     phoneNO: "۰۹۲۱۹۸۸۸۹۹۹",
    //     n_id: "۰۱۳۲۲۹۰۱۲۹",
    //     member: "true"

    //   },
    //   {
    //     key: "18",
    //     name: "محمد صادقی",
    //     age: 32,
    //     address: "مشهد، خیابان شهید بهشتی، کوچه ۱، پلاک ۱۸",
    //     description: "توضیحات تکمیلی",
    //     type: "ژنرالیزه",
    //     phoneNO: "۰۹۱۲۲۳۳۸۸۷۷",
    //     n_id: "۰۱۳۲۲۹۰۱۲۹",
    //   },
    //   {
    //     key: "19",
    //     name: "محمد صادقی",
    //     age: 32,
    //     address: "مشهد، خیابان شهید بهشتی، کوچه ۱، پلاک ۱۸",
    //     description: "توضیحات تکمیلی",
    //     type: "ژنرالیزه",
    //     phoneNO: "۰۹۱۲۳۴۵۶۷۸۹",
    //     n_id: "۰۱۳۲۲۹۰۱۲۹",
    //     member: "true"

    //   },
    //   {
    //     key: "20",
    //     name: "محمد صادقی",
    //     age: 32,
    //     address: "مشهد، خیابان شهید بهشتی، کوچه ۱، پلاک ۱۸",
    //     description: "توضیحات تکمیلی",
    //     type: "ژنرالیزه",
    //     phoneNO: "۰۹۱۲۳۴۵۶۷۸۹",
    //     n_id: "۰۱۳۲۲۹۰۱۲۹",
    //     member: "true"

    //   },
    //   {
    //     key: "21",
    //     name: "محمد صادقی",
    //     age: 32,
    //     address: "مشهد، خیابان شهید بهشتی، کوچه ۱، پلاک ۱۸",
    //     description: "توضیحات تکمیلی",
    //     type: "ژنرالیزه",
    //     phoneNO: "۰۹۱۲۳۴۵۶۷۸۹",
    //     n_id: "۰۱۳۲۲۹۰۱۲۹",
    //     member: "true"

    //   },
    //   {
    //     key: "22",
    //     name: "محمد صادقی",
    //     age: 32,
    //     address: "مشهد، خیابان شهید بهشتی، کوچه ۱، پلاک ۱۸",
    //     description: "توضیحات تکمیلی",
    //     type: "ژنرالیزه",
    //     phoneNO: "۰۹۱۲۳۴۵۶۷۸۹",
    //     n_id: "۰۱۳۲۲۹۰۱۲۹",
    //     member: "true"

    //   },
    // ]
  );
  }),
  http.get("lkj;lkj", ({ request, params }) => {
    // Mock authentication check (ensure the request has a valid token)
    const authResponse = checkAccessToken(request);
    if (authResponse) return authResponse;

    // Extract the patient ID (e.g., phone number) from the request
    const { id } = params;

    // Check if the requested ID matches the mock data
    if (id === "09915748684") {
      return HttpResponse.json(
        // [
        // {
        //   key: "1",
        //   name: "مهسا حاتمی",
        //   age: 31,
        //   address: "مشهد، خیابان شهید بهشتی، کوچه ۱، پلاک ۱۸",
        //   description: "توضیحات تکمیلی",
        //   type: "فوکال",
        //   phoneNO: "09123456789",
        //   n_id: "۰۱۳۲۲۹۰۱۲۹",
        //    member: "true",
        //   medicines: {
        //     current: [
        //       {
        //         name: "دارو A",
        //         amount: "100mg",
        //         duration: "6 ماه",
        //         complications: "عوارضی ندارد",
        //       },
        //       { name: "دارو B", amount: "50mg", duration: "3 ماه" },
        //     ],
        //     past: [
        //       {
        //         name: "دارو C",
        //         amount: "200mg",
        //         duration: "1 سال",
        //         complications: "سرگیجه",
        //       },
        //     ],
        //     other: [{ name: "داروی دیگر", amount: "10mg", duration: "2 ماه" }],
        //   },
        //   results: [
        //     {
        //       title: "آزمایش A",
        //       date: "2024-9-10 ",
        //       details: "این شرح ازمایش است",
        //     },
        //     {
        //       title: "آزمایش B",
        //       date: "2024-9-10 ",
        //       details: "این شرح ازمایش است",
      //       },
      //       {
      //         title: "آزمایش C",
      //         date: "2024-9-10 ",
      //         details: "این شرح ازمایش است",
      //       },
            
      //     ],
      //   },
      // ]
      {
        "userId": "08dce60a-91e9-4caf-8e44-9de19661f4d7",
        "doctorId": "08dd0475-3aea-4491-8a1f-50ea144d7bcc",
        "fullName": "امیر دیلمی",
        "gender": "Male",
        "birthdate": "2024-10-17T00:00:00",
        "maritalStatus": "Single",
        "phoneNumber": "09123456789",
        "status": "Completed",
        "sleepStatuse": {
          "list": [],
          "count": 0
        },
        "nutritionStatus": {
          "list": [
            {
              "date": "2024-11-05",
              "defaultIngredients": [
                {
                  "id": "1",
                  "label": {
                    "fa": "نان سنگک",
                    "en": "Sangak Bread"
                  },
                  "type": "Grains"
                },
                {
                  "id": "2",
                  "label": {
                    "fa": "نان لواش",
                    "en": "Lavash Bread"
                  },
                  "type": "Grains"
                },
                {
                  "id": "3",
                  "label": {
                    "fa": "نان بربری",
                    "en": "Barbari Bread"
                  },
                  "type": "Grains"
                },
                {
                  "id": "4",
                  "label": {
                    "fa": "باگت",
                    "en": "Baguette"
                  },
                  "type": "Grains"
                },
                {
                  "id": "5",
                  "label": {
                    "fa": "نان تست",
                    "en": "Toast Bread"
                  },
                  "type": "Grains"
                },
                {
                  "id": "6",
                  "label": {
                    "fa": "نان جو",
                    "en": "Barley Bread"
                  },
                  "type": "Grains"
                },
                {
                  "id": "7",
                  "label": {
                    "fa": "کینوا",
                    "en": "Quinoa"
                  },
                  "type": "Grains"
                },
                {
                  "id": "8",
                  "label": {
                    "fa": "ارزن",
                    "en": "Millet"
                  },
                  "type": "Grains"
                },
                {
                  "id": "13",
                  "label": {
                    "fa": "بادام",
                    "en": "Almond"
                  },
                  "type": "Grains"
                },
                {
                  "id": "14",
                  "label": {
                    "fa": "بادام هندی",
                    "en": "Cashew"
                  },
                  "type": "Grains"
                }
              ],
              "userIngredients": []
            }
          ],
          "count": 1
        },
        "mentalStatus": {
          "list": [
            {
              "date": "2024-11-05",
              "value": [
                "Worry",
                "Angry",
                "Shame"
              ]
            }
          ],
          "count": 1
        },
        "seizures": {
          "list": [],
          "count": 0
        },
        "workoutStatus": {
          "list": [
            {
              "date": "2024-11-05",
              "value": "Medium"
            }
          ],
          "count": 1
        },
        "medicalInformations": {
          "id": "870e3b82-7d65-41b1-b526-971b0895d652",
          "diagnosisDate": "2022-01-04",
          "epilepsyTypeId": 1,
          "seizureSymptomList": [],
          "seizureSymptomFrequency": 5,
          "seizureInjuryList": [],
          "epilepsyConsciousnessTypeId": 1,
          "aetiologyList": [],
          "otherDiseaseList": [
            3,
            4,
            7
          ],
          "pastAntiepilepticMedicineList": [],
          "currentAntiepilepticMedicineList": [],
          "otherMedicineList": [
            {
              "id": "9395c00e-e78e-4e8f-b977-f84fdc6fbfb2",
              "medicine": {
                "id": "30",
                "name": "اسکازینا",
                "type": "Pill"
              }
            }
          ],
          "firstSeizure": "2022-01-01",
          "pastYearComplaintList": [],
          "familyDiseaseHistoryList": [],
          "drugConsumptionList": [],
          "faceFile": {},
          "idCardFile": {}
        }
      }
      
    );
    }
    else {
      // Return 404 if the patient is not found
      return HttpResponse.json({ error: "Patient not jkkjhfound" }, { status: 404 });
    }
  }),

  http.get(PatientsApi.getbyid, ({ request , params}) => {
    const authResponse = checkAccessToken(request);
    if (authResponse) return authResponse;
    const { phonenumber } = params
    console.log("phone: ",params)
    return HttpResponse.json(
      {
        "userId": "08dce60a-91e9-4caf-8e44-9de19661f4d7",
        "doctorId": "08dd0475-3aea-4491-8a1f-50ea144d7bcc",
        "fullName": "امیر دیلمی",
        "gender": "Male",
        "birthdate": "2024-10-17T00:00:00",
        "maritalStatus": "Single",
        "phoneNumber": "09123456789",
        "status": "Completed",
        "sleepStatuse": {
          "list": [],
          "count": 0
        },
        "nutritionStatus": {
          "list": [
            {
              "date": "2024-11-05",
              "defaultIngredients": [
                {
                  "id": "1",
                  "label": {
                    "fa": "نان سنگک",
                    "en": "Sangak Bread"
                  },
                  "type": "Grains"
                },
                {
                  "id": "2",
                  "label": {
                    "fa": "نان لواش",
                    "en": "Lavash Bread"
                  },
                  "type": "Grains"
                },
                {
                  "id": "3",
                  "label": {
                    "fa": "نان بربری",
                    "en": "Barbari Bread"
                  },
                  "type": "Grains"
                },
                {
                  "id": "4",
                  "label": {
                    "fa": "باگت",
                    "en": "Baguette"
                  },
                  "type": "Grains"
                },
                {
                  "id": "5",
                  "label": {
                    "fa": "نان تست",
                    "en": "Toast Bread"
                  },
                  "type": "Grains"
                },
                {
                  "id": "6",
                  "label": {
                    "fa": "نان جو",
                    "en": "Barley Bread"
                  },
                  "type": "Grains"
                },
                {
                  "id": "7",
                  "label": {
                    "fa": "کینوا",
                    "en": "Quinoa"
                  },
                  "type": "Grains"
                },
                {
                  "id": "8",
                  "label": {
                    "fa": "ارزن",
                    "en": "Millet"
                  },
                  "type": "Grains"
                },
                {
                  "id": "13",
                  "label": {
                    "fa": "بادام",
                    "en": "Almond"
                  },
                  "type": "Grains"
                },
                {
                  "id": "14",
                  "label": {
                    "fa": "بادام هندی",
                    "en": "Cashew"
                  },
                  "type": "Grains"
                }
              ],
              "userIngredients": []
            }
          ],
          "count": 1
        },
        "mentalStatus": {
          "list": [
            {
              "date": "2024-11-05",
              "value": [
                "Worry",
                "Angry",
                "Shame"
              ]
            }
          ],
          "count": 1
        },
        "seizures": {
          "list": [],
          "count": 0
        },
        "workoutStatus": {
          "list": [
            {
              "date": "2024-11-05",
              "value": "Medium"
            }
          ],
          "count": 1
        },
        "medicalInformations": {
          "id": "870e3b82-7d65-41b1-b526-971b0895d652",
          "diagnosisDate": "2022-01-04",
          "epilepsyTypeId": 1,
          "seizureSymptomList": [],
          "seizureSymptomFrequency": 5,
          "seizureInjuryList": [],
          "epilepsyConsciousnessTypeId": 1,
          "aetiologyList": [],
          "otherDiseaseList": [
            3,
            4,
            7
          ],
          "pastAntiepilepticMedicineList": [],
          "currentAntiepilepticMedicineList": [],
          "otherMedicineList": [
            {
              "id": "9395c00e-e78e-4e8f-b977-f84fdc6fbfb2",
              "medicine": {
                "id": "30",
                "name": "اسکازینا",
                "type": "Pill"
              }
            }
          ],
          "firstSeizure": "2022-01-01",
          "pastYearComplaintList": [],
          "familyDiseaseHistoryList": [],
          "drugConsumptionList": [],
          "faceFile": {},
          "idCardFile": {}
        }
      }
    //   [
    //   {
    //     key: "2",
    //     name: "زینب صابری ",
    //     age: 29,
    //     address: "مشهد، خیابان شهید بهشتی، کوچه ۱، پلاک ۱۸",
    //     description: "توضیحات تکمیلی",
    //     type: "فوکال",
    //     phoneNO: "09123456799",
    //     n_id: "۰۱۳۲۲۹۰۱۲۹",
    //   },
    // ]
  );
  }),
  http.get(PendingPatientsApi.get, ({ request }) => {
    const authResponse = checkAccessToken(request);
    if (authResponse) return authResponse;

    return HttpResponse.json(
    //   [
    //   {
    //     key: "1",
    //     phoneNO: "۰۹۱۲۳۴۵۶۷۸۹",
    //     n_id: "۰۱۳۲۲۹۰۱۲۹",
    //     status: "2024-9-10 16:40:00",
    //     name: "محمد صادقی",
    //   },
    //   {
    //     key: "2",
    //     phoneNO: "۰۹۱۲۳۴۵۶۷۸۹",
    //     n_id: "۰۱۳۲۲۹۰۱۲۹",
    //     status: "2024-9-10 16:40:00",
    //     name: "امیر رضایی",
    //   },
    //   {
    //     key: "3",
    //     phoneNO: "۰۹۱۲۳۴۵۶۷۸۹",
    //     n_id: "۰۱۳۲۲۹۰۱۲۹",
    //     status: "2024-9-10 16:40:00",
    //     name: "یاسین محمودی",
    //   },
    //   {
    //     key: "4",
    //     phoneNO: "۰۹۱۲۳۴۵۶۷۸۹",
    //     n_id: "۰۱۳۲۲۹۰۱۲۹",
    //     status: "2024-9-10 16:40:00",
    //     name: "یاسین محمودی",
    //   },
    //   {
    //     key: "5",
    //     phoneNO: "۰۹۱۲۳۴۵۶۷۸۹",
    //     n_id: "۰۱۳۲۲۹۰۱۲۹",
    //     status: "2024-9-10 16:40:00",
    //     name: "یاسین محمودی",
    //   },
    //   {
    //     key: "6",
    //     phoneNO: "۰۹۱۲۳۴۵۶۷۸۹",
    //     n_id: "۰۱۳۲۲۹۰۱۲۹",
    //     status: "2024-9-10 16:40:00",
    //     name: "یاسین محمودی",
    //   },
    //   {
    //     key: "7",

    //     phoneNO: "۰۹۱۲۳۴۵۶۷۸۹",
    //     n_id: "۰۱۳۲۲۹۰۱۲۹",
    //     status: "2024-9-10 16:40:00",
    //     name: "یاسین محمودی",
    //   },
    //   {
    //     key: "8",

    //     phoneNO: "۰۹۱۲۳۴۵۶۷۸۹",
    //     n_id: "۰۱۳۲۲۹۰۱۲۹",
    //     status: "2024-9-10 16:40:00",
    //     name: "یاسین محمودی",
    //   },
    //   {
    //     key: "9",

    //     phoneNO: "۰۹۱۲۳۴۵۶۷۸۹",
    //     n_id: "۰۱۳۲۲۹۰۱۲۹",
    //     status: "2024-9-10 16:40:00",
    //     name: "یاسین محمودی",
    //   },
    //   {
    //     key: "10",

    //     phoneNO: "۰۹۱۲۳۴۵۶۷۸۹",
    //     n_id: "۰۱۳۲۲۹۰۱۲۹",
    //     status: "2024-9-10 16:40:00",
    //     name: "یاسین محمودی",
    //   },
    //   {
    //     key: "11",

    //     phoneNO: "۰۹۱۲۳۴۵۶۷۸۹",
    //     n_id: "۰۱۳۲۲۹۰۱۲۹",
    //     status: "2024-9-10 16:40:00",
    //     name: "یاسین محمودی",
    //   },
    //   {
    //     key: "12",

    //     phoneNO: "۰۹۱۲۳۴۵۶۷۸۹",
    //     n_id: "۰۱۳۲۲۹۰۱۲۹",
    //     status: "2024-9-10 16:40:00",
    //     name: "یاسین محمودی",
    //   },
    //   {
    //     key: "13",

    //     phoneNO: "۰۹۱۲۳۴۵۶۷۸۹",
    //     n_id: "۰۱۳۲۲۹۰۱۲۹",
    //     status: "2024-9-10 16:40:00",
    //     name: "یاسین محمودی",
    //   },
    //   {
    //     key: "14",

    //     phoneNO: "۰۹۱۲۳۴۵۶۷۸۹",
    //     n_id: "۰۱۳۲۲۹۰۱۲۹",
    //     status: "2024-9-10 16:40:00",
    //     name: "یاسین محمودی",
    //   },
    // ]
    {
      "message": "Success",
      "data": {
        "list": [
          {
            "patientid": "08dce6ae-4bef-4486-805b-8554f54f31f1",
            "fullName": "amir",
            "phoneNumber": "09915748684",
            "birthdate": "2024-10-10T15:16:11.886337",
            "create": "2024-10-07T08:59:05.249417"
          },
          {
            "patientid": "08dce5cc-82f3-4dde-8c68-98cb436322b0",
            "fullName": "yasin",
            "phoneNumber": "09917386904",
            "birthdate": "2024-09-26T00:00:00",
            "create": "2024-10-06T06:02:51.309786"
          }
        ],
        "count": 2
      }
    }
  );
  }),
  //Dashbaord data APIs
  http.get(DashDataApi.get, ({ request }) => {
    const authResponse = checkAccessToken(request);
    if (authResponse) return authResponse;

    return HttpResponse.json({
      SumSeizureToday: 15,
      CountPatients: 25,
      CountPendings: 20,
    });
  }),
  http.get(DashDataApi.getTypes, ({ request }) => {
    const authResponse = checkAccessToken(request);
    if (authResponse) return authResponse;

    return HttpResponse.json([
      { type: "ژنرالیزه", count: 10 },
      { type: "فوکال", count: 5 },
      { type: "ژنرالیزه و فوکال", count: 7 },
      { type: "ناشناخته", count: 3 },
    ]);
  }),
  http.get(DashDataApi.getSeizureCount, ({ request }) => {
    const authResponse = checkAccessToken(request);
    if (authResponse) return authResponse;

    return HttpResponse.json([
      { date: "2023-02-08T13:00:00", value: 31 },
      { date: "2023-03-08T13:00:00", value: 10 },
      { date: "2023-04-08T13:00:00", value: 21 },
      { date: "2023-05-08T13:00:00", value: 31 },
      { date: "2023-06-08T13:00:00", value: 51 },
      { date: "2023-07-08T13:00:00", value: 1 },
      { date: "2023-08-08T13:00:00", value: 31 },
      { date: Date().toString(), value: 31 },
    ]);
  }),
];
