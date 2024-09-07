import {
  createBrowserRouter,
  useLocation,
  useNavigationType,
} from "react-router-dom";
import Login from "../pages/auth/Login";
import Singup from "../pages/auth/SignupPage";

import { ForgotPassPage } from "../pages/auth/ForgotPassPage";
import React, { ReactNode, useEffect } from "react";
import ErrorPage from "../pages/errors/Error";
import { DashboardLayout } from "../pages/dashboard/dashboardLayout";
import Testpage from "../pages/dashboard/patient/Testpage";
import Testpage2 from "../pages/dashboard/patient/Testpage2";
import PatientsList from "../pages/dashboard/patient/PatientsList";
import { WelcomePage } from "../pages/auth/Welcome";
import SignUPPage from "../pages/SignUPPage";
import { ResetPassword } from "../pages/auth/ResetPassword";
import { NewPassword } from "../pages/auth/NewPassword";

// Custom scroll restoration function
export const ScrollToTop: React.FC = () => {
  const { pathname } = useLocation();
  const action = useNavigationType();
  useEffect(() => {
    if (action !== "POP") {
      window.scrollTo(0, 0);
    }
  }, [action, pathname]);

  useEffect(() => {
    let title = "";
    let metaDescription = "";

    switch (pathname) {
      case "/":
        title = "Log Into Your Account";
        metaDescription = "User Account Login";
        break;
      case "/login-page":
        title = "Log Into Your Account";
        metaDescription = "User Account Login";
        break;
      case "/login-page/forgot-password":
        title = "Forgot PassWord!?";
        metaDescription = "did you";
        break;
      default:
        break;
    }

    if (title) {
      document.title = title;
    }

    if (metaDescription) {
      const metaDescriptionTag: HTMLMetaElement | null = document.querySelector(
        'head > meta[name="description"]'
      );
      if (metaDescriptionTag) {
        metaDescriptionTag.content = metaDescription;
      }
    }
  }, [pathname]);
  return null; // This component doesn't render anything
};

type PageProps = {
  children: ReactNode;
};

// Create an HOC to wrap your route components with ScrollToTop
const PageWrapper = ({ children }: PageProps) => {
  return (
    <>
      <ScrollToTop />
      {children}
    </>
  );
};

const router = createBrowserRouter([
  {
    path: "/",
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        path: "/",
        element: <WelcomePage />,
      },
      {
        index: true,
        path: "login-page",
        element: <Login />,
      },
      {
        path: "forgot-password",
        element: <ForgotPassPage />,
      },
      {
        path: "reset-password",
        element: <ResetPassword />,
      },
      {
        path: "new-password",
        element: <NewPassword/>
      },
      {
        path: "signup-page",
        element: <Singup />,
      },
    ],
  },
  {
    path: "/dashboard",
    element: <PageWrapper children={<DashboardLayout />} />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "overview",
        errorElement: <ErrorPage />,
        children: [
          {
            path: "test",
            element: <Testpage />,
          },
          {
            path: "test2",
            element: <Testpage2 />,
          },
        ],
      },
      {
        path: "patients",
        errorElement: <ErrorPage />,
        children: [
          {
            path: "add-patient",
            element: <Testpage />,
          },
          {
            path: "patients-list",
            element: <PatientsList />,
          },
        ],
      },
    ],
  },
]);
export default router;
