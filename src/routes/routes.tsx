import { createBrowserRouter, useLocation, useNavigationType } from "react-router-dom";
import Login from "../pages/auth/Login";
import LogINPage from "../pages/LogINPage";
import DashboardPatients from "../pages/DashboardPatients";
import DashboardPatientsAddPatients from "../pages/DashboardPatientsAddPatients";
import DashboardPatientsProfile from "../pages/DashboardPatientsProfile";
import DashboardPatientsProfileRes from "../pages/DashboardPatientsProfileRes";
import DashboardMain from "../pages/DashboardMain";
import ForgotPassword from "../pages/ForgotPassword";
import SignUPPage from "../pages/SignUPPage";
import DashboardUPPI from "../pages/DashboardUPPI";
import { ForgotPassPage } from "../pages/auth/ForgotPassPage";
import MainDashboard from "../pages/dashboard/dashboardLayout/MainDashboard";
import React, { ReactNode, useEffect } from 'react';
import ErrorPage from '../pages/errors/Error';
import MainDashboardLayout from "../pages/dashboard/dashboardLayout/MainDashboard";
import { DashboardLayout } from "../pages/dashboard/dashboardLayout";
import Testpage from "../pages/dashboard/patient/Testpage";
import Testpage2 from "../pages/dashboard/patient/Testpage2";
import PatientsList from "../pages/dashboard/patient/PatientsList";

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
        path: '/',
        errorElement: <ErrorPage />,
        children: [
            {
                index: true,
                path: 'login-page',
                element: <Login />,
            },
            {
                path: 'forgot-password',
                element: <ForgotPassPage />,
            },
        ],
    },
    {
        path: '/dashboard',
        element: <PageWrapper children={<DashboardLayout />} />,
        errorElement: <ErrorPage />,
        children: [
            {
                path: 'overview',
                errorElement: <ErrorPage />,
                children: [
                    {
                        path: 'test',
                        element: <Testpage />
                    },
                    {
                        path: 'test2',
                        element: <Testpage2 />
                    },
                ]
            },
            {
                path: 'patients',
                errorElement: <ErrorPage />,
                children: [
                    {
                        
                        path: 'add-patient',
                        element: <Testpage />
                    },
                    {
                        
                        path: 'patients-list',
                        element: <PatientsList />
                    }
                ]
            }
        ]
    },
    {
        path: '/olddashboard',
        element: <PageWrapper children={<DashboardMain />} />,
        errorElement: <ErrorPage />
    }


]);
export default router;
