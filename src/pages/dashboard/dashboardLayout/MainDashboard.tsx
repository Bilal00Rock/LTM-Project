import { ReactNode, useEffect, useRef } from "react";
import styles from "../../Styles/MainDashboard.module.css";
import { NProgress } from '../../../components/Nprogress';
import React, { useState } from 'react';
import {
    QuestionCircleOutlined,
    HomeOutlined,
    CaretRightOutlined,
    CaretLeftOutlined,
    ContactsOutlined,
    UserOutlined,
    SettingOutlined,
} from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Button, ConfigProvider, Layout, Menu, theme } from 'antd';
import { Link, useLocation } from "react-router-dom";
import {
    CSSTransition,
    SwitchTransition,
    TransitionGroup,
} from 'react-transition-group';
import { PATH_DASHBOARD, PATH_PATIENTS, PATH_OVERVIEW } from "../../../constants";
const { Content, Sider } = Layout;


//#region CSS3 Styles
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
    margin: '32px 24px 32px 15px',
    background: "#F2FCFC",
    borderRadius: '20px',
    boxShadow: '0 2px 5px rgba(0, 0, 0, 0.25)'
};
const collapseBstyle: React.CSSProperties = {

    fontSize: '16px',
    width: 18,
    height: 64,
    position: 'relative',
    top: '45%',
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0,
};
//#endregion

type DashboardLayoutProps = {
    children: ReactNode;
};
//#region MenuItem Props
type MenuItem = Required<MenuProps>['items'][number];

const getItem = (
    label: React.ReactNode,
    key: React.Key,
    icon?: React.ReactNode,
    children?: MenuItem[],
    type?: 'group'
): MenuItem => {
    return {
        key,
        icon,
        children,
        label,
        type,
    } as MenuItem;
}

const items: MenuProps['items'] = [
    getItem('Overview', 'overview', <HomeOutlined />, [
        getItem(<Link to={PATH_OVERVIEW.test}>Test</Link>, 'test', null),
        getItem(<Link to={PATH_OVERVIEW.test2}>Test2</Link>, 'test2', null),
    ]),
    getItem('Patients', 'patients', <ContactsOutlined />, [
        getItem(<Link to={PATH_PATIENTS.addpatient}>Add Patient</Link>, 'add-patient', null),
        getItem(<Link to={PATH_PATIENTS.patientslist}>Patients List</Link>, 'patients-list', null),

    ]),
    getItem('User', 'user', <UserOutlined />),
    getItem('Help & Support', 'help', <QuestionCircleOutlined />),
    getItem('Settings', 'setting', <SettingOutlined />),
];
//#endregion
const rootSubmenuKeys = ['overview', 'patients', 'user-user'];

const MainDashboardLayout = ({ children }: DashboardLayoutProps) => {
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
    const [openKeys, setOpenKeys] = useState(['']);
    const [current, setCurrent] = useState('');
    const onClick: MenuProps['onClick'] = (e) => {
        // console.log('click ', e);
        // console.log(current);
        console.log(openKeys);
    };
    const onOpenChange: MenuProps['onOpenChange'] = (keys) => {
        const latestOpenKey = keys.find((key) => openKeys.indexOf(key) === -1);
        if (latestOpenKey && rootSubmenuKeys.indexOf(latestOpenKey!) === -1) {
            setOpenKeys(keys);
        } else {
            setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
        }
        
    };
    useEffect(() => {
        const paths = pathname.split('/');
        setOpenKeys(paths);
        setCurrent(paths[paths.length - 1]);
    }, [pathname]);


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
                    Button: {
                        defaultBg: "#F2FCFC",
                        defaultHoverBorderColor: "#3F72AF"
                    }
                },
            }}
        >
            <Layout hasSider={true} >

                <Sider trigger={null} theme="light" collapsible
                    collapsed={collapsed}
                    onCollapse={(value) => setCollapsed(value)}
                    style={siderStyle}
                    onMouseEnter={e => {
                        if (collapsed) {
                            setCollapsed(false);

                        }
                    }}
                    onMouseLeave={e => {
                        if (!Btcollapsed && !collapsed) {
                            setCollapsed(true);
                        }
                    }}
                    onClick={() => { setCollapsed(false); setBtCollapsed(true) }}
                >
                    <div className="demo-logo-vertical"  >
                        <img
                            className={styles.logo}
                            loading="lazy"
                            alt="Logo"
                            src="/headerlogowithoutback-2@2x.png"
                            style={{ boxShadow: '0 2px 5px rgba(0, 0, 0, 0.25)', maxWidth: '100%', height: 'auto' }}
                        />
                    </div>


                    <Menu theme="light"
                        items={items}
                        mode="inline"
                        onClick={onClick}
                        openKeys={openKeys}
                        onOpenChange={onOpenChange}
                        selectedKeys={[current]}
                        
                    />
                    
                </Sider>
                <Layout style={{ display: 'flex', flexDirection: 'row' }} >
                    <Button
                        type="default"
                        icon={Btcollapsed && !collapsed ? <CaretLeftOutlined /> : <CaretRightOutlined />}
                        onClick={() => { setCollapsed(!collapsed); setBtCollapsed(!Btcollapsed) }}
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
