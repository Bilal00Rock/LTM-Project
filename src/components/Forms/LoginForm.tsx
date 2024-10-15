import React, { useEffect, useState } from "react";
import { FunctionComponent, useCallback } from "react";
import {
  InfoCircleOutlined,
  LockOutlined,
  UserOutlined,
} from "@ant-design/icons";
import {
  Button,
  Form,
  Input,
  Flex,
  Tooltip,
  ConfigProvider,
  Divider,
  message,
} from "antd";
import styles from "../Styles/FrameComponent.module.css";
import { useNavigate } from "react-router-dom";
import fa_IR from "antd/locale/fa_IR";
import FormItem from "antd/es/form/FormItem";
import { axios } from "../../api";
import { LOGIN_URL } from "../../api/axios";
import { delay } from "msw";
import { AxiosError } from "axios";
import useAuth from "../../hooks/useAuth";

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
  //login APICALL
  //message handeling
  const [messageApi, contextHolder] = message.useMessage();
  //Auth
  const [Error, setError] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const authContext = useAuth();

  if (!authContext) {
    throw new Error("useContext must be used within an AuthProvider");
  }

  const { setAuth } = authContext;

  const msgSuccess = (content: string) => {
    loading
      ? messageApi.open({
          type: "loading",
          content: " در حال بررسی...",
          //duration: 2.5,
        })
      : messageApi.open({
          type: "success",
          content: content,
          duration: 5,
        });
  };

  const errormsg = (content: string) => {
    messageApi.open({
      type: "error",
      content: content,
      duration: 5,
    });
  };
  //API Post
  const onFinish = async (values: any) => {
    try {
      const response = await axios.post(
        LOGIN_URL.login,
        JSON.stringify(values),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );

     // console.log(response.data);

      if (response.data?.success) {
        const accessToken = response?.data?.accessToken;
        setAuth({
          user: values.D_id, // Assign the doctor ID or username to `user`
          pass: values.password,
          token: accessToken, // Assign the token to `token`
        });
        //go to dash
        navigate("/dashboard/overview");
        console.log('fff')
      
      }
      // code to access dashboard
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        // Now TypeScript knows that `error.response` exists
        if (!error?.response) {
          errormsg("پاسخی از سرور دریافت نشد");
        } else if (error.response?.status === 400) {
          errormsg("کد نظام پزشکی یا رمز عبور ناقص می باشد");
        } else if (error.response?.status === 401) {
          errormsg(" کد نظام پزشکی یا رمز عبور صحیح نمی باشد");
        } else {
          setError(error);
          if (Error) errormsg(`خطایی رخ داده است:${Error}`);
        }
      } else {
        errormsg("خظایی رخ داده است");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <ConfigProvider locale={fa_IR} direction={"rtl"}>
      {contextHolder}
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
              <b style={{ fontSize: "20px" }}>
                برای ورود، نام کاربری و رمز عبور خود را وارد کنید
              </b>
            </FormItem>
            <Form.Item
              name="D_id"
              rules={[
                {
                  required: true,
                  message: "!لطفا کد نظام پزشکی خود را وارد کنید",
                },
                //قانون کد نظام پزشکی
                // {
                //   pattern: /^[0-9]{6}$/,
                //   message: "کد نظام پزشکی باید ۶ رقمی باشد",
                // },
              ]}
            >
              <Input
                placeholder="کد نظام پزشکی"
                prefix={<UserOutlined style={{ color: "rgba(0,0,0,.55)" }} />}
                suffix={
                  <Tooltip title="مثال: ۰۱۲۳۴۵۶">
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
