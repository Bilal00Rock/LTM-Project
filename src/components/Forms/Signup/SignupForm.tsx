import React, { useEffect, useState } from "react";
import { FunctionComponent, useCallback } from "react";
import {
  InfoCircleOutlined,
  PhoneOutlined,
  UserOutlined,
  ContactsOutlined,
} from "@ant-design/icons";
import {
  Button,
  Form,
  Input,
  Tooltip,
  ConfigProvider,
  Divider,
  message,
  notification,
} from "antd";
import styles from "../../Styles/FrameComponent.module.css";
import { useNavigate } from "react-router-dom";
import fa_IR from "antd/locale/fa_IR";
import { axios, REGISTER_URL } from "../../../api";
import { delay } from "msw";
import { AxiosError } from "axios";

export type SignupComponentType = {
  className?: string;
};
interface SignupComponentProps {
  className?: string;
  current: number;
  setCurrent: React.Dispatch<React.SetStateAction<number>>;
  data: any;
  setData: React.Dispatch<React.SetStateAction<any>>;
}
const SignupForm: FunctionComponent<SignupComponentProps> = ({
  data,
  setData,
  current,
  setCurrent,
  className,
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

  const onBRClick = useCallback(() => {
    navigate("/login-page");
  }, [navigate]);
  const next = () => {
    setCurrent(current + 1);
  };

  const prev = () => {
    setCurrent(current - 1);
  };
  //message handeling
  const [messageApi, contextHolder] = message.useMessage();

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
  const [Error, setError] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const onFinish = async (values: any) => {
    //console.log("Received values of form: ", values);
    const medicalSystemCode = values.D_id;
    const nationalCode = values.N_id;
    const phoneNumber = values.phone;
    try {
      const response = await axios.post(
        REGISTER_URL.postNO,
        JSON.stringify({ medicalSystemCode, nationalCode, phoneNumber }),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );

      //console.log(response.data?.message == "با موفقیت ارسال شد");
      if (response.status == 202) {
        setData(response.data);
        //console.log('hsdfsd')
        //console.log(response.data);
        //console.log(JSON.stringify(response));
        notification.success({
          message: `رمز یکبار مصرف برای شماره ${response.data.phone_Number} ارسال شد`,
          duration: 3, // Customize duration as needed
          showProgress: true,
          pauseOnHover: false,
          style: { direction: "rtl", textAlign: "right" }, // Apply RTL styling
          placement: "topLeft", // Place notification on the right
        });
        //msgSuccess("رمز یکبار مصرف ارسال شد");
        
        next();
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        // Now TypeScript knows that `error.response` exists
        if (!error?.response) {
          errormsg("پاسخی از سرور دریافت نشد");
        } else if (error.response?.status === 404) {
          errormsg(error.response.data?.message);
        }
        else {
          setError(error);
          if (Error) errormsg(`خطایی رخ داده است:${error.response.data?.message}`);
        }
      } else {
        errormsg("خظایی رخ داده است");
      }
    } finally {
      setLoading(false);
    }
  };
  //#endregion
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
            <Form.Item>
              <b style={{ fontSize: "20px" }}>
                لطفا اطلاعات زیر را برای ثبت نام وارد نمایید
              </b>
            </Form.Item>
            <Form.Item
              name="N_id"
              rules={[
                {
                  required: true,
                  message: "!لطفا کد ملی خود را وارد کنید",
                },
                {
                  pattern: /^[0-9]{10}$/,
                  message: "کد ملی را درست وارد کنید",
                },
              ]}
            >
              <Input
                placeholder="کد ملی"
                prefix={
                  <ContactsOutlined style={{ color: "rgba(0,0,0,.55)" }} />
                }
                suffix={
                  <Tooltip title="مثال: ۰۱۲۳۴۵۶۷۸۹">
                    <InfoCircleOutlined style={{ color: "rgba(0,0,0,.45)" }} />
                  </Tooltip>
                }
              />
            </Form.Item>
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
                  <Tooltip title="مثال: ۰۱۲۳۴۵۶">
                    <InfoCircleOutlined style={{ color: "rgba(0,0,0,.45)" }} />
                  </Tooltip>
                }
              />
            </Form.Item>
            <Form.Item
              name="phone"
              rules={[
                {
                  required: true,
                  message: "لطفا تلفن همراه خود را وارد کنید!",
                },
                {
                  pattern: /^[0-9]{11}$/,
                  message: "لطفا شماره همراه را درست وارد کنید",
                },
              ]}
            >
              <Input
                placeholder="تلفن همراه"
                prefix={<PhoneOutlined style={{ color: "rgba(0,0,0,.55)" }} />}
                suffix={
                  <Tooltip title="مثال: ۰۹۱۲۳۴۵۶۷۸۹">
                    <InfoCircleOutlined style={{ color: "rgba(0,0,0,.45)" }} />
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
                ثبت نام پزشک
              </Button>
              <Divider plain>یا</Divider>
              <Button block type="default" onClick={onBRClick}>
                بازگشت به صفحه ورود
              </Button>
            </ConfigProvider>
          </Form.Item>
        </Form>
      </div>
    </ConfigProvider>
  );
};

export default SignupForm;
