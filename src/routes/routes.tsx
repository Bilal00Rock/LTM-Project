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
import PatientsList from "../pages/dashboard/patient/PatientsList";
import { WelcomePage } from "../pages/auth/Welcome";
import Overview from "../pages/dashboard/Overview";
import PatitntProfile from "../pages/dashboard/patient/PatitntProfile";
import Support from "../pages/dashboard/support/Support";
import Settings from "../pages/dashboard/settings/Settings";

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
        title = "Pineu";
        metaDescription = "User Account Login";
        break;
      case "/login-page":
        title = "Log Into Your Account";
        metaDescription = "User Account Login";
        break;
      case "/forgot-password":
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
        element: <PageWrapper children={<WelcomePage />} />,
      },
      {
        index: true,
        path: "login-page",
        element: <PageWrapper children={<Login />} />,
      },
      {
        path: "forgot-password",
        element: <PageWrapper children={<ForgotPassPage />} />,
      },
      {
        path: "signup-page",
        element: <PageWrapper children={<Singup />} />,
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
        element: <PageWrapper children={<Overview />} />,
      },
      {
        path: "patients",
        errorElement: <ErrorPage />,
        element: <PageWrapper children={<PatientsList />} />,
      },
      {
        path: "patient-profile",
        errorElement: <ErrorPage />,
        element: <PageWrapper children={<PatitntProfile />} />,
      },
      {
        path: "help-support",
        errorElement: <ErrorPage />,
        element: <PageWrapper children={<Support />} />,
      },
      {
        path: "settings",
        errorElement: <ErrorPage />,
        element: <PageWrapper children={<Settings />} />,
      },
      

    ],
  },
]);
export default router;
