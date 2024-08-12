import { FunctionComponent } from "react";
import styles from "../Styles/MainDashboard.module.css";
import React, { useState } from 'react';
import {
    DesktopOutlined,
    FileOutlined,
    PieChartOutlined,
    TeamOutlined,
    UserOutlined,
} from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Breadcrumb, ConfigProvider, Layout, Menu, theme } from 'antd';


const { Header, Content, Footer, Sider } = Layout;

type MenuItem = Required<MenuProps>['items'][number];

function getItem(
    label: React.ReactNode,
    key: React.Key,
    icon?: React.ReactNode,
    children?: MenuItem[],
): MenuItem {
    return {
        key,
        icon,
        children,
        label,
    } as MenuItem;
}

const items: MenuItem[] = [
    getItem('Option 1', '1', <PieChartOutlined />),
    getItem('Option 2', '2', <DesktopOutlined />),
    getItem('User', '3', <UserOutlined />),
    getItem('Team', 'sub2', <TeamOutlined />, [getItem('Team 1', '6'), getItem('Team 2', '8')]),
    getItem('Files', '9', <FileOutlined />),
];
const siderStyle: React.CSSProperties = {
    textAlign: 'center',
    backgroundColor: '#F2FCFC',
    color: '#F2FCFC',
    height: '100%',

};
const MainDashboard: FunctionComponent = () => {

    const [collapsed, setCollapsed] = useState(false);
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();

    return (
        <Layout style={{ minHeight: '100vh' }}>
            <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)} >
                <div className="demo-logo-vertical" >
                    <img
                        className={styles.logo}
                        loading="lazy"
                        alt="Logo"
                        src="/headerlogowithoutback-2@2x.png"
                        style={{ maxWidth: '100%', height: 'auto' }}
                    />
                </div>
                <ConfigProvider
                    theme={{
                        components: {
                            Menu: {
                                /* here is your component tokens */

                            },
                        },
                    }}
                >

                    <Menu theme="light" defaultSelectedKeys={['1']} mode="inline" items={items} />
                </ConfigProvider>
            </Sider>
            <Layout style={{ background: "#3F72AF" }} >
                {/* <Header style={{ padding: 0, background: "#3F72AF" }} /> */}
                <Content style={{ margin: '0 16px', background: "#F2FCFC" }}>
                    {/* <Breadcrumb style={{ margin: '16px 0' }}>
                        <Breadcrumb.Item>User</Breadcrumb.Item>
                        <Breadcrumb.Item>Bill</Breadcrumb.Item>
                    </Breadcrumb>
                    <div
                        style={{
                            padding: 24,
                            minHeight: 360,
                            background: colorBgContainer,
                            borderRadius: borderRadiusLG,
                        }}
                    >
                        Bill is a cat.
                    </div> */}


                </Content>
                {/* <Footer style={{ textAlign: 'center' }}>
                    Ant Design ©{new Date().getFullYear()} Created by Ant UED
                </Footer> */}
            </Layout>
        </Layout>
    );
};

export default MainDashboard;
