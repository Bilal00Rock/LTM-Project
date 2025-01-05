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

    if (username === "admin" && password === "admin") {
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

    return HttpResponse.json({
        "message": "Success",
        "data": [
            {
                "patientid": "08dce6ae-4bef-4486-805b-8554f54f31f4",
                "fullName": "Sara Ahmadi",
                "phoneNumber": "09914448684",
                "age": 24,
                "create": "2024-10-07T08:59:05.249417"
            },
            {
                "patientid": "08dce6ae-4bef-4486-805b-8554f54f31f5",
                "fullName": "Ali Rezaei",
                "phoneNumber": "09915748554",
                "age": 24,
                "create": "2024-10-07T08:59:05.249417"
            },
            {
                "patientid": "08dce6ae-4bef-4486-805b-8554f54f31f6",
                "fullName": "Armin Jafari",
                "phoneNumber": "09315748684",
                "age": 24,
                "create": "2024-10-07T08:59:05.249417"
            },
            {
                "patientid": "08dce6ae-4bef-4486-805b-8554f54f31f7",
                "fullName": "Behnaz Karimi",
                "phoneNumber": "09215748684",
                "age": 24,
                "create": "2024-10-07T08:59:05.249417"
            },
            {
                "patientid": "08dce6ae-4bef-4486-805b-8554f54f31f8",
                "fullName": "Mona Rahimi",
                "phoneNumber": "09914748684",
                "age": 24,
                "create": "2024-10-07T08:59:05.249417"
            },
            {
                "patientid": "08dce6ae-4bef-4486-805b-8554f54f31fa",
                "fullName": "Amir Hosseini",
                "phoneNumber": "09915748384",
                "age": 24,
                "create": "2024-10-07T08:59:05.249417"
            },
            {
                "patientid": "08dce6ae-4bef-4486-805b-8554f54f31f9",
                "fullName": "Reza Najafi",
                "phoneNumber": "09915748654",
                "age": 24,
                "create": "2024-10-07T08:59:05.249417"
            },
            {
                "patientid": "08dce6ae-4bef-4486-805b-8554f54f31f1",
                "fullName": "Arash Farhadi",
                "phoneNumber": "09915748684",
                "age": 24,
                "create": "2024-10-07T08:59:05.249417"
            },
            {
                "patientid": "08dce6ae-4bef-4486-805b-8554f54f31f2",
                "fullName": "Sina Maleki",
                "phoneNumber": "09915748184",
                "age": 24,
                "create": "2024-10-07T08:59:05.249417"
            },
            {
                "patientid": "08dce6ae-4bef-4486-805b-8554f54f31f3",
                "fullName": "Leila Ghasemi",
                "phoneNumber": "09915748384",
                "age": 24,
                "create": "2024-10-07T08:59:05.249417"
            }
        ]
    }
    
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
        "userId": "08dce6ae-4bef-4486-805b-8554f54f31f1",
        "doctorId": "08dd265b-b130-433a-8096-0b2167bbb493",
        "fullName": "amir",
        "gender": "Male",
        "birthdate": "2024-10-10T15:16:11.886337",
        "maritalStatus": "Single",
        "phoneNumber": "09915748684",
        "status": "Completed",
        "sleepStatuse": {
            "list": [
                {
                    "date": "2024-11-06",
                    "value": "Good"
                },
                {
                    "date": "2024-11-05",
                    "value": "Bad"
                },
                {
                    "date": "2024-11-04",
                    "value": "Good"
                },
                {
                    "date": "2024-11-03",
                    "value": "Good"
                },
                {
                    "date": "2024-11-02",
                    "value": "Normal"
                },
                {
                    "date": "2024-11-01",
                    "value": "Good"
                },
                {
                    "date": "2024-10-31",
                    "value": "Good"
                },
                {
                    "date": "2024-10-30",
                    "value": "Good"
                },
                {
                    "date": "2024-10-30",
                    "value": "VeryBad"
                },
                {
                    "date": "2024-10-29",
                    "value": "Good"
                },
                {
                    "date": "2024-10-29",
                    "value": "Good"
                },
                {
                    "date": "2024-10-28",
                    "value": "Normal"
                },
                {
                    "date": "2024-10-28",
                    "value": "Bad"
                },
                {
                    "date": "2024-10-27",
                    "value": "Good"
                },
                {
                    "date": "2024-10-26",
                    "value": "Bad"
                },
                {
                    "date": "2024-10-24",
                    "value": "Good"
                },
                {
                    "date": "2024-10-23",
                    "value": "Good"
                },
                {
                    "date": "2024-10-23",
                    "value": "Good"
                },
                {
                    "date": "2024-10-22",
                    "value": "Good"
                },
                {
                    "date": "2024-10-21",
                    "value": "Normal"
                },
                {
                    "date": "2024-10-19",
                    "value": "Good"
                },
                {
                    "date": "2024-10-18",
                    "value": "Good"
                },
                {
                    "date": "2024-10-16",
                    "value": "Good"
                },
                {
                    "date": "2024-10-15",
                    "value": "Good"
                },
                {
                    "date": "2024-10-14",
                    "value": "Bad"
                },
                {
                    "date": "2024-10-14",
                    "value": "Normal"
                },
                {
                    "date": "2024-10-13",
                    "value": "Bad"
                },
                {
                    "date": "2024-10-13",
                    "value": "Good"
                },
                {
                    "date": "2024-10-13",
                    "value": "Normal"
                },
                {
                    "date": "2024-10-12",
                    "value": "Good"
                },
                {
                    "date": "2024-10-12",
                    "value": "Bad"
                },
                {
                    "date": "2024-10-12",
                    "value": "Good"
                },
                {
                    "date": "2024-10-11",
                    "value": "Good"
                },
                {
                    "date": "2024-10-11",
                    "value": "Good"
                },
                {
                    "date": "2024-10-11",
                    "value": "Normal"
                },
                {
                    "date": "2024-10-11",
                    "value": "Normal"
                },
                {
                    "date": "2024-10-11",
                    "value": "Normal"
                },
                {
                    "date": "2024-10-10",
                    "value": "Good"
                },
                {
                    "date": "2024-10-09",
                    "value": "Good"
                },
                {
                    "date": "2024-10-09",
                    "value": "Good"
                },
                {
                    "date": "2024-10-08",
                    "value": "Good"
                },
                {
                    "date": "2024-10-07",
                    "value": "VeryBad"
                },
                {
                    "date": "2024-10-07",
                    "value": "Bad"
                },
                {
                    "date": "2024-10-06",
                    "value": "VeryBad"
                },
                {
                    "date": "2024-10-06",
                    "value": "Good"
                },
                {
                    "date": "2024-10-06",
                    "value": "Bad"
                },
                {
                    "date": "2024-10-05",
                    "value": "Good"
                },
                {
                    "date": "2024-10-05",
                    "value": "Good"
                },
                {
                    "date": "2024-10-03",
                    "value": "VeryGood"
                }
            ],
            "count": 49
        },
        "nutritionStatus": {
            "list": [
                {
                    "date": "2024-10-30",
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
                            "id": "13",
                            "label": {
                                "fa": "بادام",
                                "en": "Almond"
                            },
                            "type": "Grains"
                        },
                        {
                            "id": "15",
                            "label": {
                                "fa": "فندق",
                                "en": "Hazelnut"
                            },
                            "type": "Grains"
                        },
                        {
                            "id": "30",
                            "label": {
                                "fa": "مربا",
                                "en": "Jam"
                            },
                            "type": "SugarAndFat"
                        },
                        {
                            "id": "34",
                            "label": {
                                "fa": "بوقلمون",
                                "en": "Turkey"
                            },
                            "type": "Protein"
                        },
                        {
                            "id": "35",
                            "label": {
                                "fa": "شترمرغ",
                                "en": "Ostrich"
                            },
                            "type": "Protein"
                        },
                        {
                            "id": "36",
                            "label": {
                                "fa": "شتر",
                                "en": "Camel"
                            },
                            "type": "Protein"
                        }
                    ],
                    "userIngredients": []
                },
                {
                    "date": "2024-10-28",
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
                            "id": "13",
                            "label": {
                                "fa": "بادام",
                                "en": "Almond"
                            },
                            "type": "Grains"
                        },
                        {
                            "id": "15",
                            "label": {
                                "fa": "فندق",
                                "en": "Hazelnut"
                            },
                            "type": "Grains"
                        },
                        {
                            "id": "30",
                            "label": {
                                "fa": "مربا",
                                "en": "Jam"
                            },
                            "type": "SugarAndFat"
                        },
                        {
                            "id": "34",
                            "label": {
                                "fa": "بوقلمون",
                                "en": "Turkey"
                            },
                            "type": "Protein"
                        },
                        {
                            "id": "35",
                            "label": {
                                "fa": "شترمرغ",
                                "en": "Ostrich"
                            },
                            "type": "Protein"
                        }
                    ],
                    "userIngredients": []
                },
                {
                    "date": "2024-10-10",
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
                        }
                    ],
                    "userIngredients": []
                },
                {
                    "date": "2024-10-09",
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
                            "id": "6",
                            "label": {
                                "fa": "نان جو",
                                "en": "Barley Bread"
                            },
                            "type": "Grains"
                        }
                    ],
                    "userIngredients": []
                },
                {
                    "date": "2024-10-08",
                    "defaultIngredients": [
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
                            "id": "6",
                            "label": {
                                "fa": "نان جو",
                                "en": "Barley Bread"
                            },
                            "type": "Grains"
                        }
                    ],
                    "userIngredients": []
                }
            ],
            "count": 5
        },
        "mentalStatus": {
            "list": [
                {
                    "date": "2024-11-06",
                    "value": [
                        "Normal"
                    ]
                },
                {
                    "date": "2024-11-05",
                    "value": [
                        "Worry",
                        "Angry",
                        "Shame"
                    ]
                },
                {
                    "date": "2024-11-04",
                    "value": [
                        "Happy"
                    ]
                },
                {
                    "date": "2024-11-03",
                    "value": [
                        "Happy"
                    ]
                },
                {
                    "date": "2024-11-02",
                    "value": [
                        "Happy"
                    ]
                },
                {
                    "date": "2024-11-01",
                    "value": [
                        "Happy"
                    ]
                },
                {
                    "date": "2024-10-31",
                    "value": [
                        "Normal"
                    ]
                },
                {
                    "date": "2024-10-30",
                    "value": [
                        "Happy"
                    ]
                },
                {
                    "date": "2024-10-30",
                    "value": [
                        "Sad",
                        "Thrill"
                    ]
                },
                {
                    "date": "2024-10-29",
                    "value": [
                        "Happy"
                    ]
                },
                {
                    "date": "2024-10-28",
                    "value": [
                        "Angry"
                    ]
                },
                {
                    "date": "2024-10-28",
                    "value": [
                        "Normal"
                    ]
                },
                {
                    "date": "2024-10-27",
                    "value": [
                        "Happy"
                    ]
                },
                {
                    "date": "2024-10-26",
                    "value": [
                        "Normal"
                    ]
                },
                {
                    "date": "2024-10-23",
                    "value": [
                        "Worry"
                    ]
                },
                {
                    "date": "2024-10-22",
                    "value": [
                        "Sad",
                        "Angry"
                    ]
                },
                {
                    "date": "2024-10-21",
                    "value": [
                        "Sad"
                    ]
                },
                {
                    "date": "2024-10-18",
                    "value": [
                        "Normal"
                    ]
                },
                {
                    "date": "2024-10-16",
                    "value": [
                        "Happy"
                    ]
                },
                {
                    "date": "2024-10-15",
                    "value": [
                        "Happy"
                    ]
                },
                {
                    "date": "2024-10-14",
                    "value": [
                        "Worry",
                        "Fear",
                        "Happy"
                    ]
                },
                {
                    "date": "2024-10-13",
                    "value": [
                        "Happy",
                        "Worry"
                    ]
                },
                {
                    "date": "2024-10-13",
                    "value": [
                        "Sad",
                        "Thrill"
                    ]
                },
                {
                    "date": "2024-10-12",
                    "value": [
                        "Sad"
                    ]
                },
                {
                    "date": "2024-10-12",
                    "value": [
                        "Happy",
                        "Fear"
                    ]
                },
                {
                    "date": "2024-10-11",
                    "value": [
                        "Normal"
                    ]
                },
                {
                    "date": "2024-10-11",
                    "value": [
                        "Happy"
                    ]
                },
                {
                    "date": "2024-10-09",
                    "value": [
                        "Happy",
                        "Normal"
                    ]
                },
                {
                    "date": "2024-10-08",
                    "value": [
                        "Thrill",
                        "Normal",
                        "Happy"
                    ]
                },
                {
                    "date": "2024-10-08",
                    "value": [
                        "Happy"
                    ]
                },
                {
                    "date": "2024-10-07",
                    "value": [
                        "Normal",
                        "Happy",
                        "Thrill"
                    ]
                },
                {
                    "date": "2024-10-07",
                    "value": [
                        "Normal",
                        "Sad"
                    ]
                },
                {
                    "date": "2024-10-06",
                    "value": [
                        "Happy"
                    ]
                },
                {
                    "date": "2024-10-06",
                    "value": [
                        "Sad",
                        "Normal"
                    ]
                },
                {
                    "date": "2024-10-05",
                    "value": [
                        "Thrill",
                        "Normal"
                    ]
                },
                {
                    "date": "2024-10-03",
                    "value": [
                        "Sad",
                        "Thrill",
                        "Angry"
                    ]
                }
            ],
            "count": 36
        },
        "seizures": {
            "list": [
                {
                    "seizureDateTime": "2024-10-11T19:26:03.112117"
                },
                {
                    "seizureDateTime": "2024-10-11T19:25:36.163294",
                    "seizureDuration": 2
                },
                {
                    "seizureDateTime": "2024-10-10T14:35:00",
                    "seizureDuration": 2
                },
                {
                    "seizureDateTime": "2024-10-09T17:38:32.185153",
                    "seizureDuration": 3
                },
                {
                    "seizureDateTime": "2024-10-07T18:11:07.964987",
                    "seizureDuration": 2
                },
                {
                    "seizureDateTime": "2024-10-07T17:52:12.751302",
                    "seizureDuration": 4
                },
                {
                    "seizureDateTime": "2024-10-07T12:28:38.822623",
                    "seizureDuration": 2
                },
                {
                    "seizureDateTime": "2024-10-07T07:17:45.64526",
                    "seizureDuration": 4
                },
                {
                    "seizureDateTime": "2024-10-06T16:58:58.987834",
                    "seizureDuration": 9
                },
                {
                    "seizureDateTime": "2024-10-06T09:38:25.508846"
                },
                {
                    "seizureDateTime": "2024-10-06T09:32:56.764738"
                },
                {
                    "seizureDateTime": "2024-10-06T09:32:56.764738"
                },
                {
                    "seizureDateTime": "2024-10-05T14:25:00",
                    "seizureDuration": 3
                },
                {
                    "seizureDateTime": "2024-10-05T12:33:00",
                    "seizureDuration": 1
                },
                {
                    "seizureDateTime": "2024-10-03T14:50:14.320221"
                }
            ],
            "count": 15
        },
        "workoutStatus": {
            "list": [
                {
                    "date": "2024-11-06",
                    "value": "Low"
                },
                {
                    "date": "2024-11-05",
                    "value": "Medium"
                },
                {
                    "date": "2024-11-04",
                    "value": "High"
                },
                {
                    "date": "2024-11-03",
                    "value": "Medium"
                },
                {
                    "date": "2024-11-02",
                    "value": "High"
                },
                {
                    "date": "2024-11-01",
                    "value": "Medium"
                },
                {
                    "date": "2024-10-31",
                    "value": "Medium"
                },
                {
                    "date": "2024-10-30",
                    "value": "High"
                },
                {
                    "date": "2024-10-30",
                    "value": "High"
                },
                {
                    "date": "2024-10-29",
                    "value": "Medium"
                },
                {
                    "date": "2024-10-28",
                    "value": "High"
                },
                {
                    "date": "2024-10-28",
                    "value": "High"
                },
                {
                    "date": "2024-10-27",
                    "value": "Medium"
                },
                {
                    "date": "2024-10-26",
                    "value": "High"
                },
                {
                    "date": "2024-10-23",
                    "value": "Medium"
                },
                {
                    "date": "2024-10-22",
                    "value": "Medium"
                },
                {
                    "date": "2024-10-21",
                    "value": "High"
                },
                {
                    "date": "2024-10-19",
                    "value": "Medium"
                },
                {
                    "date": "2024-10-16",
                    "value": "High"
                },
                {
                    "date": "2024-10-15",
                    "value": "Low"
                },
                {
                    "date": "2024-10-14",
                    "value": "High"
                },
                {
                    "date": "2024-10-13",
                    "value": "Medium"
                },
                {
                    "date": "2024-10-13",
                    "value": "Medium"
                },
                {
                    "date": "2024-10-12",
                    "value": "Low"
                },
                {
                    "date": "2024-10-12",
                    "value": "Medium"
                },
                {
                    "date": "2024-10-11",
                    "value": "High"
                },
                {
                    "date": "2024-10-11",
                    "value": "High"
                },
                {
                    "date": "2024-10-09",
                    "value": "Medium"
                },
                {
                    "date": "2024-10-08",
                    "value": "Medium"
                },
                {
                    "date": "2024-10-07",
                    "value": "High"
                },
                {
                    "date": "2024-10-07",
                    "value": "Medium"
                },
                {
                    "date": "2024-10-06",
                    "value": "Low"
                },
                {
                    "date": "2024-10-06",
                    "value": "High"
                },
                {
                    "date": "2024-10-06",
                    "value": "Low"
                },
                {
                    "date": "2024-10-05",
                    "value": "High"
                },
                {
                    "date": "2024-10-05",
                    "value": "High"
                },
                {
                    "date": "2024-10-03",
                    "value": "Low"
                }
            ],
            "count": 37
        },
        "medicalInformations": {
            "id": "d67266e2-ae3b-40e5-b01d-6015ea9e8662",
            "diagnosisDate": "2022-01-11",
            "epilepsyTypeId": 3,
            "seizureSymptomList": [],
            "seizureInjuryList": [],
            "epilepsyConsciousnessTypeId": 1,
            "epilepsySecondType": "1",
            "aetiologyList": [],
            "otherDiseaseList": [],
            "pastAntiepilepticMedicineList": [
                {
                    "id": "beab14f9-e0ed-4941-89ca-7630e46f9126",
                    "medicine": {
                        "id": "1",
                        "name": "رهاکین",
                        "type": "Pill"
                    },
                    "amount": 2,
                    "durationOfUseTypeId": 2,
                    "stopDate": "2024-09-25T00:00:00"
                }
            ],
            "currentAntiepilepticMedicineList": [],
            "otherMedicineList": [],
            "eegDate": "2024-09-30",
            "hospitalizationDuration": 3,
            "systemicDisease": "نبن",
            "pastYearComplaintList": [
                5,
                6,
                7,
                8
            ],
            "familyDiseaseHistoryList": [
                {
                    "id": "7164a245-b7e7-459b-a24c-750e18fc7a91",
                    "familyDiseaseHistoryTypeId": 2,
                    "name": "آلزایمر ",
                    "relationship": "پدربزرگ"
                }
            ],
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
            "userId": "08dce6ae-4bef-4486-805b-8554f54f31f1",
            "doctorId": "08dd265b-b130-433a-8096-0b2167bbb493",
            "fullName": "amir",
            "gender": "Male",
            "birthdate": "2024-10-10T15:16:11.886337",
            "maritalStatus": "Single",
            "phoneNumber": "09915748684",
            "status": "Completed",
            "sleepStatuse": {
                "list": [
                    {
                        "date": "2024-11-06",
                        "value": "Good"
                    },
                    {
                        "date": "2024-11-05",
                        "value": "Bad"
                    },
                    {
                        "date": "2024-11-04",
                        "value": "Good"
                    },
                    {
                        "date": "2024-11-03",
                        "value": "Good"
                    },
                    {
                        "date": "2024-11-02",
                        "value": "Normal"
                    },
                    {
                        "date": "2024-11-01",
                        "value": "Good"
                    },
                    {
                        "date": "2024-10-31",
                        "value": "Good"
                    },
                    {
                        "date": "2024-10-30",
                        "value": "Good"
                    },
                    {
                        "date": "2024-10-30",
                        "value": "VeryBad"
                    },
                    {
                        "date": "2024-10-29",
                        "value": "Good"
                    },
                    {
                        "date": "2024-10-29",
                        "value": "Good"
                    },
                    {
                        "date": "2024-10-28",
                        "value": "Normal"
                    },
                    {
                        "date": "2024-10-28",
                        "value": "Bad"
                    },
                    {
                        "date": "2024-10-27",
                        "value": "Good"
                    },
                    {
                        "date": "2024-10-26",
                        "value": "Bad"
                    },
                    {
                        "date": "2024-10-24",
                        "value": "Good"
                    },
                    {
                        "date": "2024-10-23",
                        "value": "Good"
                    },
                    {
                        "date": "2024-10-23",
                        "value": "Good"
                    },
                    {
                        "date": "2024-10-22",
                        "value": "Good"
                    },
                    {
                        "date": "2024-10-21",
                        "value": "Normal"
                    },
                    {
                        "date": "2024-10-19",
                        "value": "Good"
                    },
                    {
                        "date": "2024-10-18",
                        "value": "Good"
                    },
                    {
                        "date": "2024-10-16",
                        "value": "Good"
                    },
                    {
                        "date": "2024-10-15",
                        "value": "Good"
                    },
                    {
                        "date": "2024-10-14",
                        "value": "Bad"
                    },
                    {
                        "date": "2024-10-14",
                        "value": "Normal"
                    },
                    {
                        "date": "2024-10-13",
                        "value": "Bad"
                    },
                    {
                        "date": "2024-10-13",
                        "value": "Good"
                    },
                    {
                        "date": "2024-10-13",
                        "value": "Normal"
                    },
                    {
                        "date": "2024-10-12",
                        "value": "Good"
                    },
                    {
                        "date": "2024-10-12",
                        "value": "Bad"
                    },
                    {
                        "date": "2024-10-12",
                        "value": "Good"
                    },
                    {
                        "date": "2024-10-11",
                        "value": "Good"
                    },
                    {
                        "date": "2024-10-11",
                        "value": "Good"
                    },
                    {
                        "date": "2024-10-11",
                        "value": "Normal"
                    },
                    {
                        "date": "2024-10-11",
                        "value": "Normal"
                    },
                    {
                        "date": "2024-10-11",
                        "value": "Normal"
                    },
                    {
                        "date": "2024-10-10",
                        "value": "Good"
                    },
                    {
                        "date": "2024-10-09",
                        "value": "Good"
                    },
                    {
                        "date": "2024-10-09",
                        "value": "Good"
                    },
                    {
                        "date": "2024-10-08",
                        "value": "Good"
                    },
                    {
                        "date": "2024-10-07",
                        "value": "VeryBad"
                    },
                    {
                        "date": "2024-10-07",
                        "value": "Bad"
                    },
                    {
                        "date": "2024-10-06",
                        "value": "VeryBad"
                    },
                    {
                        "date": "2024-10-06",
                        "value": "Good"
                    },
                    {
                        "date": "2024-10-06",
                        "value": "Bad"
                    },
                    {
                        "date": "2024-10-05",
                        "value": "Good"
                    },
                    {
                        "date": "2024-10-05",
                        "value": "Good"
                    },
                    {
                        "date": "2024-10-03",
                        "value": "VeryGood"
                    }
                ],
                "count": 49
            },
            "nutritionStatus": {
                "list": [
                    {
                        "date": "2024-10-30",
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
                                "id": "13",
                                "label": {
                                    "fa": "بادام",
                                    "en": "Almond"
                                },
                                "type": "Grains"
                            },
                            {
                                "id": "15",
                                "label": {
                                    "fa": "فندق",
                                    "en": "Hazelnut"
                                },
                                "type": "Grains"
                            },
                            {
                                "id": "30",
                                "label": {
                                    "fa": "مربا",
                                    "en": "Jam"
                                },
                                "type": "SugarAndFat"
                            },
                            {
                                "id": "34",
                                "label": {
                                    "fa": "بوقلمون",
                                    "en": "Turkey"
                                },
                                "type": "Protein"
                            },
                            {
                                "id": "35",
                                "label": {
                                    "fa": "شترمرغ",
                                    "en": "Ostrich"
                                },
                                "type": "Protein"
                            },
                            {
                                "id": "36",
                                "label": {
                                    "fa": "شتر",
                                    "en": "Camel"
                                },
                                "type": "Protein"
                            }
                        ],
                        "userIngredients": []
                    },
                    {
                        "date": "2024-10-28",
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
                                "id": "13",
                                "label": {
                                    "fa": "بادام",
                                    "en": "Almond"
                                },
                                "type": "Grains"
                            },
                            {
                                "id": "15",
                                "label": {
                                    "fa": "فندق",
                                    "en": "Hazelnut"
                                },
                                "type": "Grains"
                            },
                            {
                                "id": "30",
                                "label": {
                                    "fa": "مربا",
                                    "en": "Jam"
                                },
                                "type": "SugarAndFat"
                            },
                            {
                                "id": "34",
                                "label": {
                                    "fa": "بوقلمون",
                                    "en": "Turkey"
                                },
                                "type": "Protein"
                            },
                            {
                                "id": "35",
                                "label": {
                                    "fa": "شترمرغ",
                                    "en": "Ostrich"
                                },
                                "type": "Protein"
                            },
                            {
                                "id": "30",
                                "label": {
                                    "fa": "مربا",
                                    "en": "Jam"
                                },
                                "type": "SugarAndFat"
                            },
                            {
                                "id": "34",
                                "label": {
                                    "fa": "بوقلمون",
                                    "en": "Turkey"
                                },
                                "type": "Protein"
                            },
                            {
                                "id": "35",
                                "label": {
                                    "fa": "شترمرغ",
                                    "en": "Ostrich"
                                },
                                "type": "Protein"
                            },
                            {
                                "id": "30",
                                "label": {
                                    "fa": "مربا",
                                    "en": "Jam"
                                },
                                "type": "SugarAndFat"
                            },
                            {
                                "id": "34",
                                "label": {
                                    "fa": "بوقلمون",
                                    "en": "Turkey"
                                },
                                "type": "Protein"
                            },
                            {
                                "id": "35",
                                "label": {
                                    "fa": "شترمرغ",
                                    "en": "Ostrich"
                                },
                                "type": "Protein"
                            },
                            {
                                "id": "30",
                                "label": {
                                    "fa": "مربا",
                                    "en": "Jam"
                                },
                                "type": "SugarAndFat"
                            },
                            {
                                "id": "34",
                                "label": {
                                    "fa": "بوقلمون",
                                    "en": "Turkey"
                                },
                                "type": "Protein"
                            },
                            {
                                "id": "35",
                                "label": {
                                    "fa": "شترمرغ",
                                    "en": "Ostrich"
                                },
                                "type": "Protein"
                            },
                            {
                                "id": "30",
                                "label": {
                                    "fa": "مربا",
                                    "en": "Jam"
                                },
                                "type": "SugarAndFat"
                            },
                            {
                                "id": "34",
                                "label": {
                                    "fa": "بوقلمون",
                                    "en": "Turkey"
                                },
                                "type": "Protein"
                            },
                            {
                                "id": "35",
                                "label": {
                                    "fa": "شترمرغ",
                                    "en": "Ostrich"
                                },
                                "type": "Protein"
                            }
                        ],
                        "userIngredients": []
                    },
                    {
                        "date": "2024-10-10",
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
                                "id": "30",
                                "label": {
                                    "fa": "مربا",
                                    "en": "Jam"
                                },
                                "type": "SugarAndFat"
                            },
                            {
                                "id": "34",
                                "label": {
                                    "fa": "بوقلمون",
                                    "en": "Turkey"
                                },
                                "type": "Protein"
                            },
                            {
                                "id": "35",
                                "label": {
                                    "fa": "شترمرغ",
                                    "en": "Ostrich"
                                },
                                "type": "Protein"
                            }
                            ,
                            {
                                "id": "30",
                                "label": {
                                    "fa": "مربا",
                                    "en": "Jam"
                                },
                                "type": "SugarAndFat"
                            },
                            {
                                "id": "34",
                                "label": {
                                    "fa": "بوقلمون",
                                    "en": "Turkey"
                                },
                                "type": "Protein"
                            },
                            {
                                "id": "35",
                                "label": {
                                    "fa": "شترمرغ",
                                    "en": "Ostrich"
                                },
                                "type": "Protein"
                            }
                            ,
                            {
                                "id": "30",
                                "label": {
                                    "fa": "مربا",
                                    "en": "Jam"
                                },
                                "type": "SugarAndFat"
                            },
                            {
                                "id": "34",
                                "label": {
                                    "fa": "بوقلمون",
                                    "en": "Turkey"
                                },
                                "type": "Protein"
                            },
                            {
                                "id": "35",
                                "label": {
                                    "fa": "شترمرغ",
                                    "en": "Ostrich"
                                },
                                "type": "Protein"
                            }
                            ,
                            {
                                "id": "30",
                                "label": {
                                    "fa": "مربا",
                                    "en": "Jam"
                                },
                                "type": "SugarAndFat"
                            },
                            {
                                "id": "34",
                                "label": {
                                    "fa": "بوقلمون",
                                    "en": "Turkey"
                                },
                                "type": "Protein"
                            },
                            {
                                "id": "35",
                                "label": {
                                    "fa": "شترمرغ",
                                    "en": "Ostrich"
                                },
                                "type": "Protein"
                            }
                            ,
                            {
                                "id": "30",
                                "label": {
                                    "fa": "مربا",
                                    "en": "Jam"
                                },
                                "type": "SugarAndFat"
                            },
                            {
                                "id": "34",
                                "label": {
                                    "fa": "بوقلمون",
                                    "en": "Turkey"
                                },
                                "type": "Protein"
                            },
                            {
                                "id": "35",
                                "label": {
                                    "fa": "شترمرغ",
                                    "en": "Ostrich"
                                },
                                "type": "Protein"
                            }
                        ],
                        "userIngredients": []
                    },
                    {
                        "date": "2024-10-09",
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
                                "id": "6",
                                "label": {
                                    "fa": "نان جو",
                                    "en": "Barley Bread"
                                },
                                "type": "Grains"
                            }
                        ],
                        "userIngredients": []
                    },
                    {
                        "date": "2024-10-08",
                        "defaultIngredients": [
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
                                "id": "6",
                                "label": {
                                    "fa": "نان جو",
                                    "en": "Barley Bread"
                                },
                                "type": "Grains"
                            }
                        ],
                        "userIngredients": []
                    }
                ],
                "count": 5
            },
            "mentalStatus": {
                "list": [
                    {
                        "date": "2024-11-06",
                        "value": [
                            "Normal"
                        ]
                    },
                    {
                        "date": "2024-11-05",
                        "value": [
                            "Worry",
                            "Angry",
                            "Shame"
                        ]
                    },
                    {
                        "date": "2024-11-04",
                        "value": [
                            "Happy"
                        ]
                    },
                    {
                        "date": "2024-11-03",
                        "value": [
                            "Happy"
                        ]
                    },
                    {
                        "date": "2024-11-02",
                        "value": [
                            "Happy"
                        ]
                    },
                    {
                        "date": "2024-11-01",
                        "value": [
                            "Happy"
                        ]
                    },
                    {
                        "date": "2024-10-31",
                        "value": [
                            "Normal"
                        ]
                    },
                    {
                        "date": "2024-10-30",
                        "value": [
                            "Happy"
                        ]
                    },
                    {
                        "date": "2024-10-30",
                        "value": [
                            "Sad",
                            "Thrill"
                        ]
                    },
                    {
                        "date": "2024-10-29",
                        "value": [
                            "Happy"
                        ]
                    },
                    {
                        "date": "2024-10-28",
                        "value": [
                            "Angry"
                        ]
                    },
                    {
                        "date": "2024-10-28",
                        "value": [
                            "Normal"
                        ]
                    },
                    {
                        "date": "2024-10-27",
                        "value": [
                            "Happy"
                        ]
                    },
                    {
                        "date": "2024-10-26",
                        "value": [
                            "Normal"
                        ]
                    },
                    {
                        "date": "2024-10-23",
                        "value": [
                            "Worry"
                        ]
                    },
                    {
                        "date": "2024-10-22",
                        "value": [
                            "Sad",
                            "Angry"
                        ]
                    },
                    {
                        "date": "2024-10-21",
                        "value": [
                            "Sad"
                        ]
                    },
                    {
                        "date": "2024-10-18",
                        "value": [
                            "Normal"
                        ]
                    },
                    {
                        "date": "2024-10-16",
                        "value": [
                            "Happy"
                        ]
                    },
                    {
                        "date": "2024-10-15",
                        "value": [
                            "Happy"
                        ]
                    },
                    {
                        "date": "2024-10-14",
                        "value": [
                            "Worry",
                            "Fear",
                            "Happy"
                        ]
                    },
                    {
                        "date": "2024-10-13",
                        "value": [
                            "Happy",
                            "Worry"
                        ]
                    },
                    {
                        "date": "2024-10-13",
                        "value": [
                            "Sad",
                            "Thrill"
                        ]
                    },
                    {
                        "date": "2024-10-12",
                        "value": [
                            "Sad"
                        ]
                    },
                    {
                        "date": "2024-10-12",
                        "value": [
                            "Happy",
                            "Fear"
                        ]
                    },
                    {
                        "date": "2024-10-11",
                        "value": [
                            "Normal"
                        ]
                    },
                    {
                        "date": "2024-10-11",
                        "value": [
                            "Happy"
                        ]
                    },
                    {
                        "date": "2024-10-09",
                        "value": [
                            "Happy",
                            "Normal"
                        ]
                    },
                    {
                        "date": "2024-10-08",
                        "value": [
                            "Thrill",
                            "Normal",
                            "Happy"
                        ]
                    },
                    {
                        "date": "2024-10-08",
                        "value": [
                            "Happy"
                        ]
                    },
                    {
                        "date": "2024-10-07",
                        "value": [
                            "Normal",
                            "Happy",
                            "Thrill"
                        ]
                    },
                    {
                        "date": "2024-10-07",
                        "value": [
                            "Normal",
                            "Sad"
                        ]
                    },
                    {
                        "date": "2024-10-06",
                        "value": [
                            "Happy"
                        ]
                    },
                    {
                        "date": "2024-10-06",
                        "value": [
                            "Sad",
                            "Normal"
                        ]
                    },
                    {
                        "date": "2024-10-05",
                        "value": [
                            "Thrill",
                            "Normal"
                        ]
                    },
                    {
                        "date": "2024-10-03",
                        "value": [
                            "Sad",
                            "Thrill",
                            "Angry"
                        ]
                    }
                ],
                "count": 36
            },
            "seizures": {
                "list": [
                    {
                        "seizureDateTime": "2024-10-11T19:26:03.112117"
                    },
                    {
                        "seizureDateTime": "2024-10-11T19:25:36.163294",
                        "seizureDuration": 2
                    },
                    {
                        "seizureDateTime": "2024-10-10T14:35:00",
                        "seizureDuration": 2
                    },
                    {
                        "seizureDateTime": "2024-10-09T17:38:32.185153",
                        "seizureDuration": 3
                    },
                    {
                        "seizureDateTime": "2024-10-07T18:11:07.964987",
                        "seizureDuration": 2
                    },
                    {
                        "seizureDateTime": "2024-10-07T17:52:12.751302",
                        "seizureDuration": 4
                    },
                    {
                        "seizureDateTime": "2024-10-07T12:28:38.822623",
                        "seizureDuration": 2
                    },
                    {
                        "seizureDateTime": "2024-10-07T07:17:45.64526",
                        "seizureDuration": 4
                    },
                    {
                        "seizureDateTime": "2024-10-06T16:58:58.987834",
                        "seizureDuration": 9
                    },
                    {
                        "seizureDateTime": "2024-10-06T09:38:25.508846"
                    },
                    {
                        "seizureDateTime": "2024-10-06T09:32:56.764738"
                    },
                    {
                        "seizureDateTime": "2024-10-06T09:32:56.764738"
                    },
                    {
                        "seizureDateTime": "2024-10-05T14:25:00",
                        "seizureDuration": 3
                    },
                    {
                        "seizureDateTime": "2024-10-05T12:33:00",
                        "seizureDuration": 1
                    },
                    {
                        "seizureDateTime": "2024-10-03T14:50:14.320221"
                    }
                ],
                "count": 15
            },
            "workoutStatus": {
                "list": [
                    {
                        "date": "2024-11-06",
                        "value": "Low"
                    },
                    {
                        "date": "2024-11-05",
                        "value": "Medium"
                    },
                    {
                        "date": "2024-11-04",
                        "value": "High"
                    },
                    {
                        "date": "2024-11-03",
                        "value": "Medium"
                    },
                    {
                        "date": "2024-11-02",
                        "value": "High"
                    },
                    {
                        "date": "2024-11-01",
                        "value": "Medium"
                    },
                    {
                        "date": "2024-10-31",
                        "value": "Medium"
                    },
                    {
                        "date": "2024-10-30",
                        "value": "High"
                    },
                    {
                        "date": "2024-10-30",
                        "value": "High"
                    },
                    {
                        "date": "2024-10-29",
                        "value": "Medium"
                    },
                    {
                        "date": "2024-10-28",
                        "value": "High"
                    },
                    {
                        "date": "2024-10-28",
                        "value": "High"
                    },
                    {
                        "date": "2024-10-27",
                        "value": "Medium"
                    },
                    {
                        "date": "2024-10-26",
                        "value": "High"
                    },
                    {
                        "date": "2024-10-23",
                        "value": "Medium"
                    },
                    {
                        "date": "2024-10-22",
                        "value": "Medium"
                    },
                    {
                        "date": "2024-10-21",
                        "value": "High"
                    },
                    {
                        "date": "2024-10-19",
                        "value": "Medium"
                    },
                    {
                        "date": "2024-10-16",
                        "value": "High"
                    },
                    {
                        "date": "2024-10-15",
                        "value": "Low"
                    },
                    {
                        "date": "2024-10-14",
                        "value": "High"
                    },
                    {
                        "date": "2024-10-13",
                        "value": "Medium"
                    },
                    {
                        "date": "2024-10-13",
                        "value": "Medium"
                    },
                    {
                        "date": "2024-10-12",
                        "value": "Low"
                    },
                    {
                        "date": "2024-10-12",
                        "value": "Medium"
                    },
                    {
                        "date": "2024-10-11",
                        "value": "High"
                    },
                    {
                        "date": "2024-10-11",
                        "value": "High"
                    },
                    {
                        "date": "2024-10-09",
                        "value": "Medium"
                    },
                    {
                        "date": "2024-10-08",
                        "value": "Medium"
                    },
                    {
                        "date": "2024-10-07",
                        "value": "High"
                    },
                    {
                        "date": "2024-10-07",
                        "value": "Medium"
                    },
                    {
                        "date": "2024-10-06",
                        "value": "Low"
                    },
                    {
                        "date": "2024-10-06",
                        "value": "High"
                    },
                    {
                        "date": "2024-10-06",
                        "value": "Low"
                    },
                    {
                        "date": "2024-10-05",
                        "value": "High"
                    },
                    {
                        "date": "2024-10-05",
                        "value": "High"
                    },
                    {
                        "date": "2024-10-03",
                        "value": "Low"
                    }
                ],
                "count": 37
            },
            "medicalInformations": {
                "id": "d67266e2-ae3b-40e5-b01d-6015ea9e8662",
                "diagnosisDate": "2022-01-11",
                "epilepsyTypeId": 3,
                "seizureSymptomList": [],
                "seizureInjuryList": [],
                "epilepsyConsciousnessTypeId": 1,
                "epilepsySecondType": "1",
                "aetiologyList": [],
                "otherDiseaseList": [],
                "pastAntiepilepticMedicineList": [
                    {
                        "id": "beab14f9-e0ed-4941-89ca-7630e46f9126",
                        "medicine": {
                            "id": "1",
                            "name": "رهاکین",
                            "type": "Pill"
                        },
                        "amount": 2,
                        "durationOfUseTypeId": 2,
                        "stopDate": "2024-09-25T00:00:00"
                    }
                ],
                "currentAntiepilepticMedicineList": [],
                "otherMedicineList": [],
                "eegDate": "2024-09-30",
                "hospitalizationDuration": 3,
                "systemicDisease": "نبن",
                "pastYearComplaintList": [
                    5,
                    6,
                    7,
                    8
                ],
                "familyDiseaseHistoryList": [
                    {
                        "id": "7164a245-b7e7-459b-a24c-750e18fc7a91",
                        "familyDiseaseHistoryTypeId": 2,
                        "name": "آلزایمر ",
                        "relationship": "پدربزرگ"
                    }
                ],
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

    return HttpResponse.json({
        "message": "Success",
        "data": {
          "list": [
            {
              "patientid": "08dce5cc-82f3-4dde-8c68-98cb436322b1",
              "fullName": "حسین احمدی",
              "phoneNumber": "09123456780",
              "birthdate": "2024-09-26T00:00:00",
              "create": "2024-10-06T06:02:51.309786"
            },
            {
              "patientid": "08dce5cc-82f3-4dde-8c68-98cb436322b2",
              "fullName": "سارا سلطانی",
              "phoneNumber": "09123456781",
              "birthdate": "2024-09-26T00:00:00",
              "create": "2024-10-06T06:02:51.309786"
            },
            {
              "patientid": "08dce5cc-82f3-4dde-8c68-98cb436322b3",
              "fullName": "علی محمدی",
              "phoneNumber": "09123456782",
              "birthdate": "2024-09-26T00:00:00",
              "create": "2024-10-06T06:02:51.309786"
            },
            {
              "patientid": "08dce5cc-82f3-4dde-8c68-98cb436322b4",
              "fullName": "زهرا کریمی",
              "phoneNumber": "09123456783",
              "birthdate": "2024-09-26T00:00:00",
              "create": "2024-10-06T06:02:51.309786"
            },
            {
              "patientid": "08dce5cc-82f3-4dde-8c68-98cb436322b5",
              "fullName": "میلاد شریفی",
              "phoneNumber": "09123456784",
              "birthdate": "2024-09-26T00:00:00",
              "create": "2024-10-06T06:02:51.309786"
            },
            {
              "patientid": "08dce5cc-82f3-4dde-8c68-98cb436322b6",
              "fullName": "ریحانه محمدی",
              "phoneNumber": "09123456785",
              "birthdate": "2024-09-26T00:00:00",
              "create": "2024-10-06T06:02:51.309786"
            },
            {
              "patientid": "08dce5cc-82f3-4dde-8c68-98cb436322b7",
              "fullName": "یاسین نادری",
              "phoneNumber": "09123456786",
              "birthdate": "2024-09-26T00:00:00",
              "create": "2024-10-06T06:02:51.309786"
            }
          ],
          "count": 7
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
