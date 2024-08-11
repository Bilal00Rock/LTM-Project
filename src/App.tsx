import { useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigationType,
  useLocation,
} from "react-router-dom";
import Login from "./pages/Login";
import LogINPage from "./pages/LogINPage";
import DashboardPatients from "./pages/DashboardPatients";
import DashboardPatientsAddPatients from "./pages/DashboardPatientsAddPatients";
import DashboardPatientsProfile from "./pages/DashboardPatientsProfile";
import DashboardPatientsProfileRes from "./pages/DashboardPatientsProfileRes";
import DashboardMain from "./pages/DashboardMain";
import ForgotPassword from "./pages/ForgotPassword";
import SignUPPage from "./pages/SignUPPage";
import DashboardUPPI from "./pages/DashboardUPPI";
import { ForgotPassPage } from "./pages/ForgotPassPage";

function App() {
  const action = useNavigationType();
  const location = useLocation();
  const pathname = location.pathname;

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

      case "/dashboardpatientsaddpatients":
        title = "";
        metaDescription = "";
        break;
      case "/dashboardpatientsprofile":
        title = "";
        metaDescription = "";
        break;
      case "/dashboardpatientsprofileresults":
        title = "";
        metaDescription = "";
        break;
      case "/dashboardmain":
        title = "";
        metaDescription = "";
        break;
      case "/forgot-password":
        title = "Forgot PassWord!?";
        metaDescription = "did you";
        break;
      case "/forgot-password-new":
        title = "new Forgot PassWord!?";
        metaDescription = "did you";
        break;
      case "/signup-page":
        title = "";
        metaDescription = "";
        break;
      case "/dashboarduppi1":
        title = "";
        metaDescription = "";
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

  return (
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login-page" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassPage />} />
        <Route
          path="/dashboardpatientsaddpatients"
          element={<DashboardPatientsAddPatients />}
        />
        <Route
          path="/dashboardpatientsprofile"
          element={<DashboardPatientsProfile />}
        />
        <Route
          path="/dashboardpatientsprofileresults"
          element={<DashboardPatientsProfileRes />}
        />
        <Route path="/dashboardmain" element={<DashboardMain />} />
        <Route path="/forgot-password-old" element={<ForgotPassword />} />

        <Route path="/signup-page" element={<SignUPPage />} />
        <Route path="/dashboarduppi1" element={<DashboardUPPI />} />
      </Routes>
  );
}
export default App;
