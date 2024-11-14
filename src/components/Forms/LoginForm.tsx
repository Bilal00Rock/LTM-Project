import { useEffect, useState } from "react";
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
  notification,
  Checkbox,
} from "antd";
import styles from "../Styles/FrameComponent.module.css";
import { useNavigate } from "react-router-dom";
import fa_IR from "antd/locale/fa_IR";
import FormItem from "antd/es/form/FormItem";
import { axios } from "../../api";
import { LOGIN_URL } from "../../api/axios";
import { AxiosError } from "axios";
import useAuth from "../../hooks/useAuth";
import { PATH_DASHBOARD } from "../../constants";
import Cookies from "js-cookie";
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

  const { auth, setAuth ,persist, setPersist} = authContext;

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
    const username = values.D_id;
    const password = values.password;
    try {
      const response = await axios.post(
        LOGIN_URL.login,
        JSON.stringify({ username, password }),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );

      //console.log(response.data);

      if (response.data?.token) {
        //if not working with refreshtokens uncommint this
        // const accessToken = response?.body?.accesstoken;
        //commit the below
        //dont set the token in cookie when refresh token is implemented 
        //setting cookie for Presist login
        const accessToken = response?.data?.token;
        Cookies.set('accessToken', accessToken, { expires: 1, secure: true, sameSite: 'Strict' });
        setAuth({
          user: values.D_id, // Assign the doctor ID or username to `user`
          pass: values.password,
          accessToken: accessToken, // Assign the token to `token`
        });
        //console.log(auth);
        //console.log(auth.accessToken,auth .pass, auth.user);
        //go to dash
        notification.info({
          message: "ورود به حساب",
          description: "شما با موفقیت وارد حساب شدید.",
          duration: 3, // Customize duration as needed
          showProgress: true,
          pauseOnHover: false,
          style: { direction: "rtl", textAlign: "right" }, // Apply RTL styling
          placement: "topLeft", // Place notification on the right
        });
        navigate(PATH_DASHBOARD.root);
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
  const togglePersist = () => {
    setPersist((prev) => !prev);
  };

  useEffect(() => {
    localStorage.setItem("persist", JSON.stringify(persist));
  }, [persist]);

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
              <Checkbox
                type="checkbox"
                id="persist"
                onChange={togglePersist}
                checked={persist}
              >مرا به خاطر بسپار</Checkbox>
          </Form.Item>
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
