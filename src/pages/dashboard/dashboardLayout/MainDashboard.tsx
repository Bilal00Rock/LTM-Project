import { ReactNode, useEffect, useRef } from "react";
import styles from "../../Styles/DashboardMain.module.css";
import { NProgress } from "../../../components/Nprogress";
import React, { useState } from "react";
import "../../../global.css";
import {
  QuestionCircleOutlined,
  HomeOutlined,
  LogoutOutlined,
  CaretRightOutlined,
  CaretLeftOutlined,
  ContactsOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Button, ConfigProvider, Layout, Menu, theme } from "antd";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  CSSTransition,
  SwitchTransition,
  TransitionGroup,
} from "react-transition-group";
import {
  PATH_PATIENTS,
  PATH_OVERVIEW,
  PATH_DASHBOARD,
} from "../../../constants";
import fa_IR from "antd/locale/fa_IR";
import useLogout from "../../../hooks/useLogout";
import { SlEnvolope } from "react-icons/sl";
import { notification } from "antd";

const { Content, Sider } = Layout;

//#region CSS3 Styles
const siderStyle: React.CSSProperties = {
  textAlign: "center",
  backgroundColor: "#F2FCFC",
  color: "#F2FCFC",
  height: "100vh",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
};
const contentStyle: React.CSSProperties = {
  margin: "32px 15px 32px 24px",
  background: "#F2FCFC",
  borderRadius: "20px",
  boxShadow: "0 2px 5px rgba(0, 0, 0, 0.25)",
  maxHeight: "93vh",
  overflow: "overlay",
  padding: "32px 18px 32px 5px",
};
const collapseBstyle: React.CSSProperties = {
  fontSize: "16px",
  width: 18,
  height: 64,
  position: "relative",
  top: "45%",
  borderTopRightRadius: "0px",
  borderBottomRightRadius: "0px",
};
//#endregion

type DashboardLayoutProps = {
  children: ReactNode;
};
//#region MenuItem Props
type MenuItem = Required<MenuProps>["items"][number];

const getItem = (
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
  type?: "group"
): MenuItem => {
  return {
    key,
    icon,
    children,
    label,
    type,
  } as MenuItem;
};
const items: MenuProps["items"] = [
  getItem(
    <Link to={PATH_OVERVIEW.root}>داشبورد</Link>,
    "overview",
    <HomeOutlined />
  ),
  getItem(
    <Link to={PATH_PATIENTS.root}>مدیریت بیماران</Link>,
    "patients",
    <ContactsOutlined />
  ),
  getItem(
    <Link to={PATH_PATIENTS.root}>درخواست های انجمن صرع</Link>,
    "epi-association",
    <SlEnvolope />
  ),
  getItem(
    <Link to={PATH_DASHBOARD.support}> پشتیبانی</Link>,
    "help-support",
    <QuestionCircleOutlined />
  ),
  getItem(
    <Link to={PATH_DASHBOARD.settings}> تنظیمات</Link>,
    "settings",
    <SettingOutlined />
  ),
];
//#endregion
const rootSubmenuKeys = ["overview", "patients", "user-profile"];

const MainDashboardLayout = ({ children }: DashboardLayoutProps) => {
  const [falang, setLang] = useState(true);
  const nodeRef = useRef(null);
  const [collapsed, setCollapsed] = useState(false);
  const [Btcollapsed, setBtCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(false);
  //for menu
  const { pathname } = useLocation();
  const [openKeys, setOpenKeys] = useState([""]);
  const [current, setCurrent] = useState("");
  const onClick: MenuProps["onClick"] = (e) => {};
  const onOpenChange: MenuProps["onOpenChange"] = (keys) => {
    const latestOpenKey = keys.find((key) => openKeys.indexOf(key) === -1);
    if (latestOpenKey && rootSubmenuKeys.indexOf(latestOpenKey!) === -1) {
      setOpenKeys(keys);
    } else {
      setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
    }
  };

  useEffect(() => {
    const paths = pathname.split("/");
    setOpenKeys(paths);
    setCurrent(paths[paths.length - 1]);
  }, [pathname]);

  const TriggerClick = () => {
    setCollapsed(!collapsed);
    setBtCollapsed(!Btcollapsed);
  };
  const navigate = useNavigate();
  const logout = useLogout();
  const handleSignOut = async () => {
    // logic for sign out, e.g., clearing auth tokens, redirecting, etc.
    notification.info({
      message: "خروج از حساب",
      description: "شما با موفقیت خارج شدید و به صفحه ورود هدایت خواهید شد.",
      duration: 3,  // Customize duration as needed
      showProgress: true,
      pauseOnHover: false,
      style: { direction: 'rtl', textAlign: 'right' }, // Apply RTL styling
    placement: 'topLeft', // Place notification on the right
    });
    await logout();
    //navigate("/login-page");
    //console.log("Signing out...");
  };
  return (
    <ConfigProvider
      locale={fa_IR}
      direction={falang ? "rtl" : "ltr"}
      theme={{
        token: {
          fontFamily: "Vazirmatn RD",
        },
        components: {
          Layout: {
            /* here is your component tokens */
            lightSiderBg: "#F2FCFC",
            lightTriggerBg: "#E8E8E8",
            bodyBg: "#3F72AF",
          },
          Menu: {
            /* here is your component tokens */
            itemBg: "#F2FCFC",
          },
          Button: {
            defaultBg: "#F2FCFC",
            defaultHoverBorderColor: "#3F72AF",
          },
        },
      }}
    >
      <Layout style={{ maxHeight: "100vh" }} hasSider={true}>
        <Sider
          trigger={null}
          theme="light"
          collapsible
          collapsed={collapsed}
          onCollapse={(value) => setCollapsed(value)}
          style={siderStyle}
          onMouseEnter={(e) => {
            if (collapsed) {
              setCollapsed(false);
            }
          }}
          onMouseLeave={(e) => {
            if (!Btcollapsed && !collapsed) {
              setCollapsed(true);
            }
          }}
          onClick={() => {
            setCollapsed(false);
            setBtCollapsed(true);
          }}
        >
          <div>
            <img
              className={styles.logo}
              loading="lazy"
              alt="Logo"
              src={process.env.PUBLIC_URL + "/img/logo.svg"}
              style={{
                boxShadow: "0 2px 5px rgba(0, 0, 0, 0.25)",
                maxWidth: "100%",
                height: "auto",
              }}
            />
            <Menu
              theme="light"
              items={items}
              mode="inline"
              onClick={onClick}
              openKeys={openKeys}
              onOpenChange={onOpenChange}
              selectedKeys={[current]}
            />
          </div>
          {/* Sign Out button */}
          <Button
            type="primary"
            danger
            icon={<LogoutOutlined />} // Use logout icon
            onClick={handleSignOut}
            style={{
              marginBottom: "16px", // Positioning
              marginLeft: "auto",
              marginRight: "auto",
              width: collapsed ? "80%" : "90%", // Adjust size based on collapse state
            }}
          >
            {!collapsed && " خروج از حساب"}
          </Button>
        </Sider>
        <Layout style={{ display: "flex", flexDirection: "row" }}>
          <Button
            type="default"
            icon={
              Btcollapsed && !collapsed ? (
                <CaretRightOutlined />
              ) : (
                <CaretLeftOutlined />
              )
            }
            onClick={TriggerClick}
            style={collapseBstyle}
          />
          <NProgress isAnimating={isLoading} key={location.key} />

          <Content style={contentStyle}>
            <TransitionGroup>
              <SwitchTransition>
                <CSSTransition
                  key={`css-transition-${location.key}`}
                  nodeRef={nodeRef}
                  onEnter={() => {
                    setIsLoading(true);
                  }}
                  onEntered={() => {
                    setIsLoading(false);
                  }}
                  timeout={300}
                  classNames="bottom-to-top"
                  unmountOnExit
                >
                  {() => (
                    <div ref={nodeRef} style={{ background: "none" }}>
                      {children}
                    </div>
                  )}
                </CSSTransition>
              </SwitchTransition>
            </TransitionGroup>
          </Content>
        </Layout>
      </Layout>
    </ConfigProvider>
  );
};

export default MainDashboardLayout;
