import { FunctionComponent } from "react";
import styles from "../Styles/MainDashboard.module.css";
import React, { useState } from 'react';
import {
    DesktopOutlined,
    FileOutlined,
    PieChartOutlined,
    TeamOutlined,
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    UploadOutlined,
    UserOutlined,
    VideoCameraOutlined,
} from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Breadcrumb, Button, ConfigProvider, Layout, Menu, theme } from 'antd';


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
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',

};
const contentStyle: React.CSSProperties = {
    margin: '32px 24px',
    background: "#F2FCFC",
    borderRadius: '20px',
     boxShadow: '0 2px 5px rgba(0, 0, 0, 0.25)'
};
const collapseBstyle: React.CSSProperties = {

    fontSize: '16px',
    width: 64,
    height: 64,
    position: 'fixed',
    bottom: '0px',
    left: '5px'
};
const MainDashboard: FunctionComponent = () => {

    const [collapsed, setCollapsed] = useState(false);
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();

    return (
        <ConfigProvider
            theme={{
                components: {
                    Layout: {
                        /* here is your component tokens */
                        lightSiderBg: '#F2FCFC',
                        lightTriggerBg: '#E8E8E8',
                        bodyBg: "#3F72AF",
                    },
                    Menu: {
                        /* here is your component tokens */
                        itemBg: '#F2FCFC',

                    },
                },
            }}
        >

            <Layout hasSider={true} >
                <Sider trigger={null} theme="light" collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)} style={siderStyle} >
                    <div className="demo-logo-vertical"  >
                        <img
                            className={styles.logo}
                            loading="lazy"
                            alt="Logo"
                            src="/headerlogowithoutback-2@2x.png"
                            style={{ boxShadow: '0 2px 5px rgba(0, 0, 0, 0.25)',maxWidth: '100%', height: 'auto' }}
                        />
                    </div>


                    <Menu theme="light" defaultSelectedKeys={['1']} mode="inline" items={items} />
                    <Button
                        type="text"
                        icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                        onClick={() => setCollapsed(!collapsed)}
                        style={collapseBstyle}
                    />
                </Sider>
                <Layout style={{}} >
                    <Content style={contentStyle}>
                    </Content>
                </Layout>
            </Layout>
        </ConfigProvider>

    );
};

export default MainDashboard;
