import React, { useEffect, useState } from "react";
import { FunctionComponent, useCallback } from "react";

import {
  Button,
  Form,
  Input,
  Flex,
  Tooltip,
  ConfigProvider,
  Divider,
  Space,
  Grid,
  GetProps,
  Row,
  Col,
} from "antd";
import styles2 from "../../../pages/Styles/ForgotPassPage.module.css";
import Countdown, { CountdownProps } from "antd/es/statistic/Countdown";
import { OTPProps } from "antd/es/input/OTP";

export type RespassComponentType = {
  className?: string;
};
interface OTPFormComponentProps {
  current: number;
  setCurrent: React.Dispatch<React.SetStateAction<number>>;
}
const ResetPassOTPForm: FunctionComponent<OTPFormComponentProps> = ({
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
  const onFinish = (values: any) => {
    console.log("Received values of form: ", values);
    next();
  };
  const onChange: OTPProps["onChange"] = (text) => {
    console.log("onChange:", text);
  };

  const sharedProps: OTPProps = {
    onChange,
  };
  const deadline = Date.now() + 1000 * 10 + 1000;
  const [sendButton, setSendButton] = useState(false);

  const onFinishCount: CountdownProps["onFinish"] = () => {
    console.log("finished!");
    setSendButton(true);
  };
  const resend = () => {
    setSendButton(false);
  };

  const toosmallWidth = windowWidth < 1300;
  return (
    <div>
      <Flex vertical={true} gap={"middle"}>
        <b className={styles2.forgotPassword1} style={titleFont}>
          لطفارمز یکبار مصرف ارسال شده را وارد کنید
        </b>
      </Flex>
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
            <Button onClick={prev} type="default">
              مرحله قبلی
            </Button>
            <Button htmlType="submit" type="primary">
              مرحله بعد
            </Button>
          </Space>
        </Form.Item>
      </Form>
    </div>
  );
};
export default ResetPassOTPForm;
