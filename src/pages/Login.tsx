import { FunctionComponent } from "react";
import React from 'react';
import { Layout, Row, Col, Flex } from 'antd';
import styles from "./Login.module.css";
import LoginForm from "../components/LoginForm";

const { Content } = Layout;

const contentStyle: React.CSSProperties = {
    textAlign: 'center',
    display: "flex",
    justifyContent: "center",
    padding: 24,
    minHeight: '100%',
    height: '100%',
};

const siderStyle: React.CSSProperties = {
    textAlign: 'center',
    backgroundColor: '#F2FCFC',
    height: '100%',

};

const layoutStyle: React.CSSProperties = {
    borderRadius: 8,
    overflow: 'hidden',
    height: '100vh',
    width: '100%',
    maxWidth: '100%',
    color: '#CEE4F9',
    backgroundColor: '#CEE4F9',
};

const LogINPage: FunctionComponent = () => {
    return (
        <Layout style={layoutStyle}>
            <Row style={{ height: '100%' }}>
                {/* Left Side - Form */}
                <Col xs={24} md={10} lg={8} style={siderStyle} className={styles.sider}>
                    <LoginForm />
                </Col>

                {/* Right Side - Image */}
                <Col xs={24} md={14} lg={16} style={{ padding: 0 }}>
                    <Content style={contentStyle}>
                        <Row>
                            <Col span={24} className={styles.contextcol}>
                                <img
                                    className={styles.logo}
                                    loading="lazy"
                                    alt="Logo"
                                    src="/headerlogowithoutback-2@2x.png"
                                    style={{ maxWidth: '100%', height: 'auto' }}
                                />
                            </Col>
                        </Row>
                    </Content>
                </Col>
            </Row>
        </Layout>
    );
};

export default LogINPage;
