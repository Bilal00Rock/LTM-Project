import React, { useContext, useEffect, useState } from "react";
import { FunctionComponent } from "react";

import { Button, Form, Input, Flex, Space, message, notification } from "antd";
import styles2 from "../../../pages/Styles/ForgotPassPage.module.css";
import Countdown, { CountdownProps } from "antd/es/statistic/Countdown";
import { OTPProps } from "antd/es/input/OTP";
import { axios, REGISTER_URL } from "../../../api";
import { delay } from "msw";
import { AuthContext } from "../../../context";
import useAuth from "../../../hooks/useAuth";
import { AxiosError } from "axios";

export type RespassComponentType = {
  className?: string;
};
interface SignupOTPFormProps {
  current: number;
  setCurrent: React.Dispatch<React.SetStateAction<number>>;
  data: any;
  setData: React.Dispatch<React.SetStateAction<any>>;
}
const SignupOTPForm: FunctionComponent<SignupOTPFormProps> = ({
  data,
  setData,
  current,
  setCurrent,
}) => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  const smallWidth = windowWidth < 1700;
  const titleFont: React.CSSProperties = {
    fontSize: smallWidth ? "22px" : "24px",
    fontFamily: "poppins",
  };
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
    const code = values.otp;
    const phoneNumber = data.phone_Number;
    //console.log(data);
    try {
      const response = await axios.post(
        REGISTER_URL.otp,
        JSON.stringify({ phoneNumber, code }),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );

      // Check the response to determine if the OTP is valid
      const { message } = response.data;

      if (response.status == 200) {
        // Show success message for correct OTP
        notification.success({
          message: message,
          duration: 3, // Customize duration as needed
          showProgress: true,
          pauseOnHover: false,
          style: { direction: "rtl", textAlign: "right" }, // Apply RTL styling
          placement: "topLeft", // Place notification on the right
        });
        next();
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        // Now TypeScript knows that `error.response` exists
        if (!error?.response) {
          errormsg("پاسخی از سرور دریافت نشد");
        } else if (error.response?.status === 400) {
          errormsg(error.response.data?.message);
        } else if (error.response?.status === 401) {
          errormsg(" رمز یکبار مصرف شما صحیح نمی باشد");
        } else {
          setError(error);
          if (error) errormsg(`خطایی رخ داده است:${error.response.data?.message}`);
        }
      } else {
        errormsg("خظایی رخ داده است");
      }
    } finally {
      setLoading(false);
    }
  };
  const onChange: OTPProps["onChange"] = (text) => {
    //console.log("onChange:", text);
  };

  const sharedProps: OTPProps = {
    onChange,
  };
  //deadline
  const deadline = Date.now() + 1000 * 60 + 1000;
  const [sendButton, setSendButton] = useState(false);

  const onFinishCount: CountdownProps["onFinish"] = () => {
    //console.log("finished!");
    setSendButton(true);
  };
  const resend = async () => {
    //send token and get token

    try {
      const response = await axios.post(
        REGISTER_URL.otpResend,
        {},
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );

      msgSuccess("کد تایید جدید ارسال شد.");
    } catch (error) {
      setError(error);
      message.error(`خطایی رخ داده است:${Error}`);
    } finally {
      setLoading(false);
      setSendButton(false);
    }
  };

  const toosmallWidth = windowWidth < 1300;
  return (
    <div>
      {contextHolder}
      <Flex vertical={true} gap={"middle"}>
        <b className={styles2.forgotPassword1} style={titleFont}>
          لطفارمز یکبار مصرف ارسال شده را وارد کنید
        </b>
        <Form
          name="OTP"
          initialValues={{ remember: true }}
          style={{
            minWidth: "-webkit-fill-available",
            ...{ padding: toosmallWidth ? "0px" : "46px" },
          }}
          onFinish={onFinish}
          size={toosmallWidth ? "middle" : "large"}
          layout="vertical"
          hideRequiredMark
        >
          <Form.Item
            name="otp"
            rules={[
              {
                required: true,
                message: "لظفا رمز ارسال شده را وارد کنید",
              },
            ]}
          >
            <Input.OTP
              style={{ direction: "ltr" }}
              formatter={(str) => str.toUpperCase()}
              {...sharedProps}
            />
          </Form.Item>
          <Form.Item>
            {sendButton ? (
              <Button onClick={resend} type="default">
                ارسال مجدد
              </Button>
            ) : (
              <Countdown
                value={deadline}
                onFinish={onFinishCount}
                format="mm:ss"
              />
            )}
          </Form.Item>
          <Form.Item>
            <Space>
              <Button htmlType="submit" type="primary">
                مرحله بعد
              </Button>
              <Button onClick={prev} type="default">
                مرحله قبلی
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Flex>
    </div>
  );
};
export default SignupOTPForm;
