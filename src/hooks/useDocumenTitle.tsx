import { useEffect } from "react";

const useDocumentTitle = (pathname: any) => {
  useEffect(() => {
    let title = "";
    switch (pathname) {
      case "/":
        title = "پاینو";
        break;
      case "/login-page":
        title = "پاینو | ورود به حساب کاربری";
        break;
      case "/forgot-password":
        title = "پاینو | فراموشی رمز عبور";
        break;
      case "/signup-page":
        title = "پاینو | ایجاد حساب کاربری";
        break;
      case "/dashboard/overview":
        title = "پاینو | داشبورد";
        break;
      case "/dashboard/patients":
        title = "پاینو | لیست بیماران";
        break;
      case "/dashboard/patient-profile":
        title = "پاینو | پروفایل بیمار";
        break;
      case "/dashboard/help-support":
        title = "پاینو | پشتیبانی";
        break;
      case "/dashboard/settings":
        title = "پاینو | تنظیمات";
        break;
      default:
        break;
    }
    if (title) {
      document.title = title;
    }
  }, [pathname]);
};

export default useDocumentTitle;