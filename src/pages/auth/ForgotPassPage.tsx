import { FunctionComponent, useCallback, useEffect, useState } from "react";
import { Button, ConfigProvider, Flex, Layout, Result, Steps } from "antd";
import styles from "../Styles/ForgotPassPage.module.css";
import {
  SolutionOutlined,
  MessageOutlined,
  FileDoneOutlined,
} from "@ant-design/icons";
import ForgotPassForm from "../../components/Forms/ForgotPass/ForgotPassForm";
import fa_IR from "antd/locale/fa_IR";

import styles2 from "../../pages/Styles/ForgotPassPage.module.css";
import ResetPassForm from "../../components/Forms/ForgotPass/ResetPassForm";
import ResetPassOTPForm from "../../components/Forms/ForgotPass/ResetPassOTPForm";
import { useNavigate } from "react-router-dom";

export const ForgotPassPage: FunctionComponent = () => {
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
  const navigate = useNavigate();
  const onBackClick = useCallback(() => {
    navigate("/login-page");
  }, [navigate]);

  const [current, setCurrent] = useState(0);

  const next = () => {
    setCurrent(current + 1);
  };

  const prev = () => {
    setCurrent(current - 1);
  };
  const steps = [
    {
      title: "ورود اطلاعات",
      content: <ForgotPassForm current={current} setCurrent={setCurrent} />,
      icon: <SolutionOutlined />,
    },
    {
      title: "رمز یکبارمصرف",
      content: <ResetPassOTPForm current={current} setCurrent={setCurrent} />,
      icon: <MessageOutlined />,
    },
    {
      title: "رمز جدید",
      content: <ResetPassForm current={current} setCurrent={setCurrent} />,
      icon: <FileDoneOutlined />,
    },
    {
      title: "انجام شد",
      content: (
        <>
          <Result
            status="success"
            title="عملیات با موفقیت انجام شد!"
            subTitle="رمز شما با موفقیت تغییر یافت!"
          />
          <Button block type="default" onClick={onBackClick}>
            برگشت به صفحه ورود
          </Button>
        </>
      ),
      icon: <FileDoneOutlined />,
    },
  ];

  const items = steps.map((item) => ({
    key: item.title,
    title: item.title,
  }));
  return (
    <ConfigProvider locale={fa_IR} direction={"rtl"}>
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
            <Flex vertical gap={10}>
              <b className={styles2.forgotPassword1} style={titleFont}>
                فراموشی رمز عبور!
              </b>
              <Steps current={current} items={items} />
              <div>{steps[current].content}</div>
            </Flex>
          </Content>
        </Content>
      </Layout>
    </ConfigProvider>
  );
};
