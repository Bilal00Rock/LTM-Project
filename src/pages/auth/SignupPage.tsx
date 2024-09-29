import { FunctionComponent, useCallback, useState } from "react";
import React from "react";
import { Layout, Row, Col, Flex, Result, Button } from "antd";
import styles from "../Styles/Login.module.css";
import SignupForm from "../../components/Forms/Signup/SignupForm";
import SignupOTPForm from "../../components/Forms/Signup/SignupOTPForm";
import NewPassForm from "../../components/Forms/Signup/NewPassForm";
import { useNavigate } from "react-router-dom";

const { Content } = Layout;

const Signup: FunctionComponent = () => {
  const [current, setCurrent] = useState(0);
  const navigate = useNavigate();
  const onBackClick = useCallback(() => {
    navigate("/login-page");
  }, [navigate]);

  const next = () => {
    setCurrent(current + 1);
  };

  const prev = () => {
    setCurrent(current - 1);
  };
  const steps = [
    {
      title: "ورود اطلاعات",
      content: <SignupForm current={current} setCurrent={setCurrent} />,
    },
    {
      title: "رمز یکبارمصرف",
      content: <SignupOTPForm current={current} setCurrent={setCurrent} />,
    },
    {
      title: "رمز جدید",
      content: <NewPassForm current={current} setCurrent={setCurrent} />,
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
    },
  ];

  const items = steps.map((item) => ({
    key: item.title,
    title: item.title,
  }));

  return (
    <Layout style={layoutStyle}>
      <Row style={{ height: "100%" }}>
        {/* Right Side - Image */}
        <Col xs={24} md={14} lg={14} style={{ padding: 0 }}>
          <Content style={contentStyle}>
            <Row>
              <Col span={24} className={styles.contextcol}>
                <img
                  className={styles.logo}
                  loading="lazy"
                  alt="Logo"
                  src={process.env.PUBLIC_URL + "/img/logo.png"}
                  style={{ maxWidth: "100vw   ", height: "auto" }}
                />
              </Col>
            </Row>
          </Content>
        </Col>
        {/* Left Side - Form */}
        <Col
          xs={24}
          md={10}
          lg={10}
          style={siderStyle}
          className={styles.sider}
        >
          {/* Component */}
          <div>{steps[current].content}</div>
        </Col>
      </Row>
    </Layout>
  );
};

//#region Css3 Styles
const contentStyle: React.CSSProperties = {
  textAlign: "center",
  display: "flex",
  justifyContent: "center",
  padding: 24,
  minHeight: "100%",
  height: "100%",
};

const siderStyle: React.CSSProperties = {
  textAlign: "center",
  backgroundColor: "#F2FCFC",
  height: "100%",
};

const layoutStyle: React.CSSProperties = {
  borderRadius: 8,
  overflow: "hidden",
  height: "100vh",
  width: "100%",
  maxWidth: "100%",
  color: "#CEE4F9",
  backgroundColor: "#CEE4F9",
};
//#endregion
export default Signup;
