import { FunctionComponent, ReactNode, useRef } from "react";
import styles from "../../Styles/MainDashboard.module.css";
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
import { Link, Outlet, useLocation } from "react-router-dom";
import {
    CSSTransition,
    SwitchTransition,
    TransitionGroup,
  } from 'react-transition-group';


const { Header, Content, Footer, Sider } = Layout;

type MenuItem = Required<MenuProps>['items'][number];

function getItem(
    label: React.ReactNode,
    key: React.Key,
    icon?: React.ReactNode,
    children?: MenuItem[],
    type?: 'group'
): MenuItem {
    return {
        key,
        icon,
        children,
        label,
        type,
    } as MenuItem;
}

const items: MenuProps['items'] = [
    getItem('Dashboards', 'dashboard', <PieChartOutlined />,[
        getItem(<Link to={'/dashboard/test'}>Test</Link>, 'test',null),
        getItem(<Link to={'/dashboard/test2'}>Test2</Link>, 'test2',null),
    ]),
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
type DashboardLayoutProps = {
    children: ReactNode;
};
const MainDashboardLayout = ({ children }: DashboardLayoutProps) => {
    const nodeRef = useRef(null);
    const [collapsed, setCollapsed] = useState(false);
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();
    const location = useLocation();
    const [isLoading, setIsLoading] = useState(false);

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
                            style={{ boxShadow: '0 2px 5px rgba(0, 0, 0, 0.25)', maxWidth: '100%', height: 'auto' }}
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
                                        <div ref={nodeRef} style={{ background: 'none' }}>
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
