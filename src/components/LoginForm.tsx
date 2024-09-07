import React, { useEffect, useState } from "react";
import { FunctionComponent, useCallback } from "react";
import {
  InfoCircleOutlined,
  LockOutlined,
  UserOutlined,
} from "@ant-design/icons";
import {
  Button,
  Checkbox,
  Form,
  Input,
  Flex,
  Tooltip,
  ConfigProvider,
  Space,
  Divider,
} from "antd";
import styles from "./Styles/FrameComponent.module.css";
import { useNavigate } from "react-router-dom";
import fa_IR from "antd/locale/fa_IR";
import FormItem from "antd/es/form/FormItem";

export type LoginComponentType = {
  className?: string;
};

const LoginForm: FunctionComponent<LoginComponentType> = ({
  className = "",
}) => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const smallWidth = windowWidth < 1050;
  //#region Functions
  const navigate = useNavigate();

  const onTextClick = useCallback(() => {
    navigate("/forgot-password");
  }, [navigate]);
  const onBRClick = useCallback(() => {
    navigate("/signup-page");
  }, [navigate]);

  const onFinish = (values: any) => {
    console.log("Received values of form: ", values);
  };
  //#endregion
  return (
    <ConfigProvider locale={fa_IR} direction={"rtl"}>
      <div className={[styles.subHeaderParent, className].join(" ")}>
        <div className={styles.subHeader}>
          <img
            className={styles.headerLogoWithoutBack1Icon}
            loading="lazy"
            alt=""
            src={process.env.PUBLIC_URL + "/img/logo.png"}
          />
        </div>
        <b className={styles.loginIntoYour}>به پاینو خوش آمدید</b>

        <Form
          name="login"
          initialValues={{ remember: true }}
          className={[styles.formsize, className].join(" ")}
          onFinish={onFinish}
          size={smallWidth ? "middle" : "large"}
        >
          <ConfigProvider
            theme={{
              components: {
                Input: {
                  /* here is your component tokens */
                  inputFontSizeLG: 23,
                },
              },
            }}
          >
            <FormItem>
              برای ورود، نام کاربری و رمز عبور خود را وارد کنید
            </FormItem>
            <Form.Item
              name="D_id"
              rules={[
                {
                  required: true,
                  message: "!لطفا کد نظام پزشکی خود را وارد کنید",
                },
              ]}
            >
              <Input
                placeholder="کد نظام پزشکی"
                prefix={<UserOutlined style={{ color: "rgba(0,0,0,.55)" }} />}
                suffix={
                  <Tooltip title="مثال: 0123456">
                    <InfoCircleOutlined style={{ color: "rgba(0,0,0,.45)" }} />
                  </Tooltip>
                }
              />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[
                { required: true, message: "!لطفا رمز عبود را وارد کنید" },
              ]}
            >
              <Input
                prefix={<LockOutlined />}
                type="password"
                placeholder="رمز عبور"
              />
            </Form.Item>
          </ConfigProvider>
          <Form.Item>
            <Flex justify="space-between" align="center">
              <Button
                type="link"
                onClick={onTextClick}
                style={{ fontSize: "18px" }}
              >
                رمز عبور را فراموش کرده اید؟
              </Button>
            </Flex>
          </Form.Item>

          <Form.Item>
            <ConfigProvider
              theme={{
                components: {
                  Button: {
                    /* here is your component tokens */
                    contentFontSizeLG: 20,
                    fontWeight: 800,
                    controlHeightLG: 55,
                  },
                },
              }}
            >
              <Button
                block
                type="primary"
                htmlType="submit"
                style={{ fontWeight: "bold", fontSize: "large" }}
              >
                ورود
              </Button>
              <Divider plain>یا</Divider>
              <Button block type="default" onClick={onBRClick}>
                !ثبت نام کنید
              </Button>
            </ConfigProvider>
          </Form.Item>
        </Form>
      </div>
    </ConfigProvider>
  );
};

export default LoginForm;
