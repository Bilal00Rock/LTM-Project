import { delay, http, HttpResponse } from "msw";
import {
  DashDataApi,
  PatientsApi,
  PendingPatientsApi,
  REGISTER_URL,
  LOGIN_URL,
  REFRESH_URL
} from "../api";
// Mock data to simulate a successful login
let mockAccessToken = 'initialAccessToken';
let mockRefreshToken = 'initialAccessToken';

let accessTokenExpiry = Date.now() + 10 * 1000; // Valid for 1 minute
let refreshTokenExpiry = Date.now() +   15 * 1000; // Valid for 5 minutes

let isValid = false;
const checkAccessToken = (request : any) => {
  const accessToken = request.headers.get('Authorization');
  
  if (!accessToken || accessToken !== `Bearer ${mockAccessToken}`) {
    return HttpResponse.json({ message: "Unauthorized access" }, { status: 403 });
  }
  
  const currentTime = Date.now();
  if (currentTime > accessTokenExpiry) {
    return HttpResponse.json({ message: "Access token expired" }, { status: 403 });
  }
  
  return null; // Token is valid
};
export const handlers = [
  // And here's a request handler with MSW
  // for the same "GET /user" request that
  // responds with a mock JSON response.
 // Login handler
 http.post(LOGIN_URL.login, async ({ request }) => {
  const { D_id, password } = (await request.json()) as { D_id: string; password: string };
  
  let success = false;
  
  if (D_id === "f" && password === "f") {
    success = true;
    return HttpResponse.json({ success: success }, {
      status: 201,
      headers: {
        accessToken: mockAccessToken,
      },
      //msw cannot set actual cokies so the refresh token cant be handle by this
    });
  } else {
    return HttpResponse.json({ success, message: "invalid" }, { status: 401 });
  }
}),

// Refresh token handler
// Refresh token handler
http.get(REFRESH_URL.token, async ({ request }) => {
  const refreshToken = request.headers.get('Authorization');
  
  // Log the refresh token for debugging (consider removing this in production)
  //console.log("Refresh Token Received:", refreshToken);
  
 // if (refreshToken !== `Bearer ${mockRefreshToken}`) {
   // return HttpResponse.json({ message: "Invalid refresh token" }, { status: 401 });
  //}

  // Generate a new access token and set its expiry
  mockAccessToken = 'newAccessToken';
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
http.post(LOGIN_URL.logout, async () => {
  mockAccessToken = '';
  mockRefreshToken = '';
  
  return HttpResponse.json({ success: true, message: "Logged out successfully" }, { status: 200 });
}),
  
  //register
  http.post(REGISTER_URL.postNO, async ({ request }) => {
    // Read the intercepted request body as JSON.
    const details = await request.json();

    // Don't forget to declare a semantic "201 Created"
    return HttpResponse.json(details, { status: 201 });
  }),
  http.post(REGISTER_URL.otp, async ({ request }) => {
    // Manually infer the expected structure of the request body
    const body = (await request.json()) as { values: { otp: string } };

    // Extract OTP value
    const otp = body.values.otp;

    // Validate the OTP
    isValid = otp === "123456"; // Replace with your validation logic
    // Don't forget to declare a semantic "201 Created"
    if (isValid) {
      return HttpResponse.json(
        { isValid: isValid },
        {
          status: 201,
          headers: {
            accessToken: mockAccessToken,
          },
        }
      );
    } else {
      return HttpResponse.json({ isValid: isValid }, { status:  400 });
    }
  }),
  http.post(REGISTER_URL.setpass, async ({ request }) => {
    // Manually infer the expected structure of the request body
    const headers = request.headers;
    const accessToken = headers.get("accesstoken");

    // Example: Validate the access token (replace with your real logic)
     // This would be your valid token for testing
    if (accessToken !== mockAccessToken) {
      return HttpResponse.json(
        { isDone: false, message: "Access token is invalid" },
        { status: 403 }
      );
    }

    // If the token is valid, proceed with password update
    const { values } = (await request.json()) as {
      values: { password: string; confirm: string };
    };
    const { password, confirm } = values;
    if (password === confirm) {
      // Return success and a new access token if needed
      const newAccessToken = "new-access-token"; // Generate a new token if needed
      return HttpResponse.json(
        { isDone: true, message: "Password successfully updated" },
        {
          status: 200,
          headers: {
            accessToken: newAccessToken,
          },
        }
      );
    } else {
      return HttpResponse.json(
        { isDone: false, message: "Passwords do not match" },
        { status: 400 }
      );
    }
  }),
  //patients APIs

  http.get(PatientsApi.get, ({ request }) => {
    const authResponse = checkAccessToken(request);
    console.log('auth response: ',authResponse);
    if (authResponse) return authResponse;
  
    return HttpResponse.json([
      {
        key: "1",
        name: "مهسا حاتمی",
        age: 31,
        address: "مشهد، خیابان شهید بهشتی، کوچه ۱، پلاک ۱۸",
        description: "توضیحات تکمیلی",
        type: "فوکال",
        lastEeg: new Date(Date()),
        phoneNO: "09123456789",
        n_id: "۰۱۳۲۲۹۰۱۲۹",
      },
      {
        key: "2",
        name: "زینب صابری ",
        age: 29,
        address: "مشهد، خیابان شهید بهشتی، کوچه ۱، پلاک ۱۸",
        description: "توضیحات تکمیلی",
        type: "فوکال",
        lastEeg: new Date(Date()),
        phoneNO: "۰۹۱۲۳۴۵۶۷۸۹",
        n_id: "۰۱۳۲۲۹۰۱۲۹",
      },
      {
        key: "3",
        name: "حنانه امیری ",
        age: 47,
        address: "مشهد، خیابان شهید بهشتی، کوچه ۱، پلاک ۱۸",
        description: "توضیحات تکمیلی",
        type: "فوکال و ژنرالیزه",
        lastEeg: new Date(Date()),
        phoneNO: "۰۹۱۲۳۴۵۶۷۸۹",
        n_id: "۰۱۳۲۲۹۰۱۲۹",
      },
      {
        key: "4",
        name: "محمد صادقی",
        age: 32,
        address: "مشهد، خیابان شهید بهشتی، کوچه ۱، پلاک ۱۸",
        description: "توضیحات تکمیلی",
        type: "ناشناخته",
        lastEeg: new Date(Date()),
        phoneNO: "۰۹۱۲۳۴۵۶۷۸۹",
        n_id: "۰۱۳۲۲۹۰۱۲۹",
      },
      {
        key: "5",
        name: "معضومه موسوی ",
        age: 34,
        address: "مشهد، خیابان شهید بهشتی، کوچه ۱، پلاک ۱۸",
        description: "توضیحات تکمیلی",
        type: "ژنرالیزه",
        lastEeg: new Date(Date()),
        phoneNO: "۰۹۱۲۳۴۵۶۷۸۹",
        n_id: "۰۱۳۲۲۹۰۱۲۹",
      },
      {
        key: "6",
        name: "جمال عزیزی",
        age: 51,
        address: "مشهد، خیابان شهید بهشتی، کوچه ۱، پلاک ۱۸",
        description: "توضیحات تکمیلی",
        type: "ژنرالیزه",
        lastEeg: new Date(Date()),
        phoneNO: "۰۹۱۲۳۴۵۶۷۸۹",
        n_id: "۰۱۳۲۲۹۰۱۲۹",
      },
      {
        key: "7",
        name: "مهدی غلامی",
        age: 14,
        address: "مشهد، خیابان شهید بهشتی، کوچه ۱، پلاک ۱۸",
        description: "توضیحات تکمیلی",
        type: "ژنرالیزه",
        lastEeg: new Date(Date()),
        phoneNO: "۰۹۱۲۳۴۵۶۷۸۹",
        n_id: "۰۱۳۲۲۹۰۱۲۹",
      },
      {
        key: "8",
        name: "رضا احمدی ",
        age: 28,
        address: "مشهد، خیابان شهید بهشتی، کوچه ۱، پلاک ۱۸",
        description: "توضیحات تکمیلی",
        type: "ژنرالیزه",
        lastEeg: new Date(Date()),
        phoneNO: "۰۹۱۲۳۴۵۶۷۸۹",
        n_id: "۰۱۳۲۲۹۰۱۲۹",
      },
      {
        key: "9",
        name: "آرزو کریمی ",
        age: 24,
        address: "مشهد، خیابان شهید بهشتی، کوچه ۱، پلاک ۱۸",
        description: "توضیحات تکمیلی",
        type: "ناشناخته",
        lastEeg: new Date(Date()),
        phoneNO: "۰۹۱۲۳۴۵۶۷۸۹",
        n_id: "۰۱۳۲۲۹۰۱۲۹",
      },
      {
        key: "10",
        name: "کامبیز افروز  ",
        age: 46,
        address: "مشهد، خیابان شهید بهشتی، کوچه ۱، پلاک ۱۸",
        description: "توضیحات تکمیلی",
        type: "ناشناخته",
        lastEeg: new Date(Date()),
        phoneNO: "۰۹۱۲۳۴۵۶۷۸۹",
        n_id: "۰۱۳۲۲۹۰۱۲۹",
      },
      {
        key: "11",
        name: "محمد صادقی",
        age: 32,
        address: "مشهد، خیابان شهید بهشتی، کوچه ۱، پلاک ۱۸",
        description: "توضیحات تکمیلی",
        type: "ناشناخته",
        lastEeg: new Date(Date()),
        phoneNO: "۰۹۱۲۳۴۵۶۷۸۹",
        n_id: "۰۱۳۲۲۹۰۱۲۹",
      },
      {
        key: "12",
        name: "محمد صادقی",
        age: 32,
        address: "مشهد، خیابان شهید بهشتی، کوچه ۱، پلاک ۱۸",
        description: "توضیحات تکمیلی",
        type: "ناشناخته",
        lastEeg: new Date(Date()),
        phoneNO: "۰۹۱۲۳۴۵۶۷۸۹",
        n_id: "۰۱۳۲۲۹۰۱۲۹",
      },
      {
        key: "13",
        name: "محمد صادقی",
        age: 32,
        address: "مشهد، خیابان شهید بهشتی، کوچه ۱، پلاک ۱۸",
        description: "توضیحات تکمیلی",
        type: "ناشناخته",
        lastEeg: new Date(Date()),
        phoneNO: "۰۹۱۲۳۴۵۶۷۸۹",
        n_id: "۰۱۳۲۲۹۰۱۲۹",
      },
      {
        key: "14",
        name: "محمد صادقی",
        age: 32,
        address: "مشهد، خیابان شهید بهشتی، کوچه ۱، پلاک ۱۸",
        description: "توضیحات تکمیلی",
        type: "ناشناخته",
        lastEeg: new Date(Date()),
        phoneNO: "۰۹۱۲۳۴۵۶۷۸۹",
        n_id: "۰۱۳۲۲۹۰۱۲۹",
      },
      {
        key: "15",
        name: "محمد صادقی",
        age: 32,
        address: "مشهد، خیابان شهید بهشتی، کوچه ۱، پلاک ۱۸",
        description: "توضیحات تکمیلی",
        type: "ژنرالیزه",
        lastEeg: new Date(Date()),
        phoneNO: "۰۹۱۲۳۴۵۶۷۸۹",
        n_id: "۰۱۳۲۲۹۰۱۲۹",
      },
      {
        key: "16",
        name: "محمد صادقی",
        age: 32,
        address: "مشهد، خیابان شهید بهشتی، کوچه ۱، پلاک ۱۸",
        description: "توضیحات تکمیلی",
        type: "ژنرالیزه",
        lastEeg: new Date(Date()),
        phoneNO: "۰۹۱۲۳۴۵۶۷۸۹",
        n_id: "۰۱۳۲۲۹۰۱۲۹",
      },
      {
        key: "17",
        name: "محمد صادقی",
        age: 32,
        address: "مشهد، خیابان شهید بهشتی، کوچه ۱، پلاک ۱۸",
        description: "توضیحات تکمیلی",
        type: "ژنرالیزه",
        lastEeg: new Date(Date()),
        phoneNO: "۰۹۲۱۹۸۸۸۹۹۹",
        n_id: "۰۱۳۲۲۹۰۱۲۹",
      },
      {
        key: "18",
        name: "محمد صادقی",
        age: 32,
        address: "مشهد، خیابان شهید بهشتی، کوچه ۱، پلاک ۱۸",
        description: "توضیحات تکمیلی",
        type: "ژنرالیزه",
        lastEeg: new Date(Date()),
        phoneNO: "۰۹۱۲۲۳۳۸۸۷۷",
        n_id: "۰۱۳۲۲۹۰۱۲۹",
      },
      {
        key: "19",
        name: "محمد صادقی",
        age: 32,
        address: "مشهد، خیابان شهید بهشتی، کوچه ۱، پلاک ۱۸",
        description: "توضیحات تکمیلی",
        type: "ژنرالیزه",
        lastEeg: new Date(Date()),
        phoneNO: "۰۹۱۲۳۴۵۶۷۸۹",
        n_id: "۰۱۳۲۲۹۰۱۲۹",
      },
      {
        key: "20",
        name: "محمد صادقی",
        age: 32,
        address: "مشهد، خیابان شهید بهشتی، کوچه ۱، پلاک ۱۸",
        description: "توضیحات تکمیلی",
        type: "ژنرالیزه",
        lastEeg: new Date(Date()),
        phoneNO: "۰۹۱۲۳۴۵۶۷۸۹",
        n_id: "۰۱۳۲۲۹۰۱۲۹",
      },
      {
        key: "21",
        name: "محمد صادقی",
        age: 32,
        address: "مشهد، خیابان شهید بهشتی، کوچه ۱، پلاک ۱۸",
        description: "توضیحات تکمیلی",
        type: "ژنرالیزه",
        lastEeg: new Date(Date()),
        phoneNO: "۰۹۱۲۳۴۵۶۷۸۹",
        n_id: "۰۱۳۲۲۹۰۱۲۹",
      },
      {
        key: "22",
        name: "محمد صادقی",
        age: 32,
        address: "مشهد، خیابان شهید بهشتی، کوچه ۱، پلاک ۱۸",
        description: "توضیحات تکمیلی",
        type: "ژنرالیزه",
        lastEeg: new Date(Date()),
        phoneNO: "۰۹۱۲۳۴۵۶۷۸۹",
        n_id: "۰۱۳۲۲۹۰۱۲۹",
      },
    ]);
  }),
  http.get("api/patient?id=09123456789", ({ request }) => {
    return HttpResponse.json([
      {
        key: "1",
        name: "مهسا حاتمی",
        age: 31,
        address: "مشهد، خیابان شهید بهشتی، کوچه ۱، پلاک ۱۸",
        description: "توضیحات تکمیلی",
        type: "فوکال",
        lastEeg: new Date(Date()),
        phoneNO: "09123456789",
        n_id: "۰۱۳۲۲۹۰۱۲۹",
      },
    ]);
  }),
  http.get(PendingPatientsApi.get, ({ request }) => {
    const authResponse = checkAccessToken(request);
    if (authResponse) return authResponse;
  
    return HttpResponse.json([
      {
        key: "1",
        phoneNO: "۰۹۱۲۳۴۵۶۷۸۹",
        n_id: "۰۱۳۲۲۹۰۱۲۹",
        status: "2024-9-10 16:40:00",
        name: "محمد صادقی",
      },
      {
        key: "2",
        phoneNO: "۰۹۱۲۳۴۵۶۷۸۹",
        n_id: "۰۱۳۲۲۹۰۱۲۹",
        status: "2024-9-10 16:40:00",
        name: "امیر رضایی",
      },
      {
        key: "3",
        phoneNO: "۰۹۱۲۳۴۵۶۷۸۹",
        n_id: "۰۱۳۲۲۹۰۱۲۹",
        status: "2024-9-10 16:40:00",
        name: "یاسین محمودی",
      },
      {
        key: "4",
        phoneNO: "۰۹۱۲۳۴۵۶۷۸۹",
        n_id: "۰۱۳۲۲۹۰۱۲۹",
        status: "2024-9-10 16:40:00",
        name: "یاسین محمودی",
      },
      {
        key: "5",
        phoneNO: "۰۹۱۲۳۴۵۶۷۸۹",
        n_id: "۰۱۳۲۲۹۰۱۲۹",
        status: "2024-9-10 16:40:00",
        name: "یاسین محمودی",
      },
      {
        key: "6",
        phoneNO: "۰۹۱۲۳۴۵۶۷۸۹",
        n_id: "۰۱۳۲۲۹۰۱۲۹",
        status: "2024-9-10 16:40:00",
        name: "یاسین محمودی",
      },
      {
        key: "7",

        phoneNO: "۰۹۱۲۳۴۵۶۷۸۹",
        n_id: "۰۱۳۲۲۹۰۱۲۹",
        status: "2024-9-10 16:40:00",
        name: "یاسین محمودی",
      },
      {
        key: "8",

        phoneNO: "۰۹۱۲۳۴۵۶۷۸۹",
        n_id: "۰۱۳۲۲۹۰۱۲۹",
        status: "2024-9-10 16:40:00",
        name: "یاسین محمودی",
      },
      {
        key: "9",

        phoneNO: "۰۹۱۲۳۴۵۶۷۸۹",
        n_id: "۰۱۳۲۲۹۰۱۲۹",
        status: "2024-9-10 16:40:00",
        name: "یاسین محمودی",
      },
      {
        key: "10",

        phoneNO: "۰۹۱۲۳۴۵۶۷۸۹",
        n_id: "۰۱۳۲۲۹۰۱۲۹",
        status: "2024-9-10 16:40:00",
        name: "یاسین محمودی",
      },
      {
        key: "11",

        phoneNO: "۰۹۱۲۳۴۵۶۷۸۹",
        n_id: "۰۱۳۲۲۹۰۱۲۹",
        status: "2024-9-10 16:40:00",
        name: "یاسین محمودی",
      },
      {
        key: "12",

        phoneNO: "۰۹۱۲۳۴۵۶۷۸۹",
        n_id: "۰۱۳۲۲۹۰۱۲۹",
        status: "2024-9-10 16:40:00",
        name: "یاسین محمودی",
      },
      {
        key: "13",

        phoneNO: "۰۹۱۲۳۴۵۶۷۸۹",
        n_id: "۰۱۳۲۲۹۰۱۲۹",
        status: "2024-9-10 16:40:00",
        name: "یاسین محمودی",
      },
      {
        key: "14",

        phoneNO: "۰۹۱۲۳۴۵۶۷۸۹",
        n_id: "۰۱۳۲۲۹۰۱۲۹",
        status: "2024-9-10 16:40:00",
        name: "یاسین محمودی",
      },
    ]);
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
