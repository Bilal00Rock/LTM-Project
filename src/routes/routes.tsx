import {
  createBrowserRouter,
  Navigate,
  useLocation,
  useNavigationType,
} from "react-router-dom";
import Login from "../pages/auth/Login";
import Signup from "../pages/auth/SignupPage";
import { ForgotPassPage } from "../pages/auth/ForgotPassPage";
import React, { ReactNode, useEffect } from "react";
import ErrorPage from "../pages/errors/Error";
import { DashboardLayout } from "../pages/dashboard/dashboardLayout";
import PatientsList from "../pages/dashboard/patient/PatientsList";
import { WelcomePage } from "../pages/auth/Welcome";
import Overview from "../pages/dashboard/Overview";
import PatientProfile from "../pages/dashboard/patient/PatientProfile";
import Support from "../pages/dashboard/support/Support";
import Settings from "../pages/dashboard/settings/Settings";
import { useDocumentTitle } from "../hooks";
import RequireAuth from "../components/RequireAuth";
// Custom scroll restoration function
// Custom hook to handle document title

// ScrollToTop component
export const ScrollToTop: React.FC = () => {
  const { pathname } = useLocation();
  const action = useNavigationType();

  useEffect(() => {
    if (action !== "POP") {
      window.scrollTo(0, 0);
    }
  }, [action, pathname]);

  // Use custom hook for document title
  useDocumentTitle(pathname);

  return null;
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
        element: <PageWrapper children={<Signup />} />,
      },
    ],
  },
  {
    element: <RequireAuth />,
    children: [
      {
        path: "/dashboard",
        element: <PageWrapper children={<DashboardLayout />} />,
        errorElement: <ErrorPage />,
        children: [
          {
            index: true, // This means when "/dashboard" is accessed directly
            element: <Navigate to="overview" replace />, // Redirect to "/dashboard/overview"
          },
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
            path: "patient/:id",
            errorElement: <ErrorPage />,
            element: <PageWrapper children={<PatientProfile />} />,
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
    ],
  },
]);
export default router;
