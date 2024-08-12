import React, { useEffect, useState } from 'react';
import { FunctionComponent, useCallback } from "react";
import { InfoCircleOutlined , MailOutlined} from '@ant-design/icons';
import { Button, Form, Input, Flex, Tooltip, ConfigProvider } from 'antd';
import styles from "./Styles/FrameComponent.module.css";

import styles2 from "../pages/Styles/ForgotPassPage.module.css";
import { useNavigate } from 'react-router-dom';

export type FrgpassComponentType = {
    className?: string;
};
const ForgotPassForm: FunctionComponent<FrgpassComponentType> = ({
    className = "",
}) => {
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    useEffect(() => {
        const handleResize = () => setWindowWidth(window.innerWidth);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);
    const navigate = useNavigate();

    const onBackClick = useCallback(() => {
        navigate("/login-page");
    }, [navigate]);
    const onFinish = (values: any) => {
        console.log('Received values of form: ', values);
    };
    const smallWidth = windowWidth < 1700;
    const titleFont: React.CSSProperties = {
        fontSize: smallWidth ? '22px' : '24px',
        fontFamily: 'poppins'
    };
    return (
        <div>
            <b className={styles2.forgotPassword1} style={titleFont}>Forgot Password?!</b>
            <div className={styles2.pleaseEnterYourEmailToResWrapper}>
                <div className={styles2.pleaseEnterYour}>
                    Please enter your email to reset the password
                </div>
            </div>
            <Form
                name="login"
                initialValues={{ remember: true }}
                style={{ minWidth: '-webkit-fill-available', padding: '46px' }}
                onFinish={onFinish}
                size='large'
            >
                <ConfigProvider theme={{
                    components: {
                        Input: {
                            /* here is your component tokens */
                            inputFontSizeLG: 25,
                        },
                    },
                }}
                >
                    <Form.Item
                        name="Email"
                        rules={[{ required: true, message: 'Please input your Email!' }]}
                    >
                        <Input
                            placeholder="Enter your Email Address"
                            prefix={<MailOutlined  style={{ color: 'rgba(0,0,0,.55)' }} />}
                            suffix={
                                <Tooltip title="example: info@neurosina.com">
                                    <InfoCircleOutlined style={{ color: 'rgba(0,0,0,.45)' }} />
                                </Tooltip>
                            }
                        />
                    </Form.Item>

                </ConfigProvider>
                <Form.Item>

                    <ConfigProvider
                        theme={{
                            components: {
                                Button: {
                                    /* here is your component tokens */
                                    contentFontSizeLG: 21,
                                    fontWeight: 800,
                                    controlHeightLG: 55,
                                },
                            },
                        }}
                    >
                        <Button block type="primary"
                            htmlType="submit"
                            style={{ fontWeight: 'bold'}}
                        >
                            Reset Password
                        </Button>

                        <div className={styles.frameParent} style={{ margin: 10 }}>
                            <div className={styles.lineWrapper}>
                                <div className={styles.frameChild} />
                            </div>
                            <div className={styles.or} style={{ fontWeight: 'bold', fontSize: 'large' }}>OR</div>
                            <div className={styles.lineWrapper}>
                                <div className={styles.frameChild} />
                            </div>
                        </div>
                        <Button block
                            type="default"
                            onClick={onBackClick}
                        >
                            Back to Login
                        </Button>
                    </ConfigProvider>
                </Form.Item>
            </Form>
        </div>
    );
};
export default ForgotPassForm;