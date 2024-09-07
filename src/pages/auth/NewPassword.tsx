import { FunctionComponent, useCallback, useEffect, useState } from "react";
import { ConfigProvider, Layout } from "antd";
import styles from "../Styles/ForgotPassPage.module.css";
import fa_IR from "antd/locale/fa_IR";
import ResetPassForm from "../../components/ResetPassForm";

export const NewPassword: FunctionComponent = () => {
  const { Content } = Layout;

  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  //#region CSS3 Styles
  const smallWidth = windowWidth < 1700;
  const toosmallWidth = windowWidth < 1300;
  const titleFont: React.CSSProperties = {
    fontSize: smallWidth ? "22px" : "24px",
    fontFamily: "poppins",
  };
  const layoutStyle: React.CSSProperties = {
    borderRadius: 8,
    overflow: "hidden",
    height: "100vh",
    width: "100%",
    color: "#CEE4F9",
    backgroundColor: "#CEE4F9",
  };
  const contentStyle: React.CSSProperties = {
    textAlign: "center",
    display: toosmallWidth ? "grid" : "flex",
    justifyContent: "center",
    margin: smallWidth ? "6% 15%" : "10% 25%",
    height: "100%",
    minHeight: toosmallWidth ? "500px" : "650px",
    borderRadius: "50px",
    boxShadow:
      "0 4px 4px rgba(0, 0, 0, 0.25), 0-4px 50.1px 19px rgba(0, 0, 0, 0.1)",
    color: "#F2FCFC",
    backgroundColor: "#F2FCFC",
    maxWidth: "1000px",
    flexDirection: "column",
  };

  const content2: React.CSSProperties = {
    margin: smallWidth ? "0% 15% 6% 15%" : "0% 20% 10% 20%",
    flex: "none",
  };
  //#endregion

  return (
    <ConfigProvider locale={fa_IR} >
      <Layout style={layoutStyle}>
        <Content style={contentStyle}>
          <div className={styles.headerLogoWithoutBack1Wrapper}>
            <img
              className={styles.headerLogoWithoutBack1Icon}
              loading="lazy"
              alt=""
              src={process.env.PUBLIC_URL + "/img/logo.png"}
            />
          </div>
          <Content style={content2}>
            
            <ResetPassForm />
          </Content>
        </Content>
      </Layout>
    </ConfigProvider>
  );
};
