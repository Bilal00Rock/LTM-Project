import { FunctionComponent } from "react";
import React from "react";
import { Layout, Row, Col, Flex } from "antd";
import styles from "../Styles/Login.module.css";
import AdminLoginForm from "../../components/Forms/Login/AdminLoginForm";

const { Content } = Layout;

const AdminLogin: FunctionComponent = () => {
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
                  src={process.env.PUBLIC_URL + "/img/logo.svg"}
                  style={{ maxWidth: "100vw", height: "auto" }}
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
          <AdminLoginForm />
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
export default AdminLogin;
