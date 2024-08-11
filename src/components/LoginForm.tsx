import React from 'react';
import { FunctionComponent, useCallback } from "react";
import { InfoCircleOutlined, LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, Input, Flex, Tooltip, ConfigProvider, Space } from 'antd';
import styles from "./FrameComponent.module.css";
import { useNavigate } from 'react-router-dom';

export type LoginComponentType = {
    className?: string;
};

const LoginForm: FunctionComponent<LoginComponentType> = ({
    className = "",
}) => {
    const navigate = useNavigate();

    const onTextClick = useCallback(() => {
      navigate("/forgot-password");
    }, [navigate]);
    const onBRClick = useCallback(() => {
        navigate("/signup-page");
      }, [navigate]);
    
    const onFinish = (values: any) => {
        console.log('Received values of form: ', values);
    };

    return (
        <div className={[styles.subHeaderParent, className].join(" ")}>
            <div className={styles.subHeader}>
                <img
                    className={styles.headerLogoWithoutBack1Icon}
                    loading="lazy"
                    alt=""
                    src="../headerlogowithoutback-2@2x.png"
                />
            </div>
            <b className={styles.loginIntoYour}>Login into your account</b>
            <Form
                name="login"
                initialValues={{ remember: true }}
                style={{ minWidth: '-webkit-fill-available' , padding:'46px'}}
                onFinish={onFinish}
                size='large'
            >

                <ConfigProvider theme={{
                    components: {
                        Input: {
                            /* here is your component tokens */
                            inputFontSizeLG: 23,
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
                            prefix={<UserOutlined style={{ color: 'rgba(0,0,0,.55)' }} />}
                            suffix={
                                <Tooltip title="example: info@neurosina.com">
                                    <InfoCircleOutlined style={{ color: 'rgba(0,0,0,.45)' }} />
                                </Tooltip>
                            }


                        />

                    </Form.Item>
                    <Form.Item
                        name="password"
                        rules={[{ required: true, message: 'Please input your Password!' }]}
                    >
                        <Input prefix={<LockOutlined />} type="password" placeholder="Password" />
                    </Form.Item>
                </ConfigProvider>
                <Form.Item>
                    <Flex justify="space-between" align="center">
                        <Form.Item name="remember" valuePropName="checked" noStyle>
                            <Checkbox style={{ fontSize: '18px' }}>Remember me</Checkbox>
                        </Form.Item>
                        <Button type='link' onClick={onTextClick} style={{ fontSize: '18px' }}>Forgot password</Button>
                    </Flex>
                </Form.Item>

                <Form.Item>

                    <ConfigProvider
                        theme={{
                            components: {
                                Button: {
                                    /* here is your component tokens */
                                    contentFontSizeLG: 20,
                                    fontWeight: 750,
                                    controlHeightLG: 55,
                                },
                            },
                        }}
                    >
                        <Button block type="primary" htmlType="submit" style={{ fontWeight: 'bold', fontSize: 'large' }}>
                            Login Now
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
                        <Button block type="default" onClick={onBRClick}>
                            Register Now
                        </Button>
                    </ConfigProvider>
                </Form.Item>
            </Form>
        </div>
    );
};

export default LoginForm;