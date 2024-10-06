import React, { useEffect, useState } from "react";
import { FunctionComponent, useCallback } from "react";

import { Button, Form, Input, Flex, Space, Row, Col } from "antd";
import styles2 from "../../../pages/Styles/ForgotPassPage.module.css";
import Countdown, { CountdownProps } from "antd/es/statistic/Countdown";
import { OTPProps } from "antd/es/input/OTP";

export type RespassComponentType = {
  className?: string;
};
interface ChangeNumOTPProps {
  current: number;
  setCurrent: React.Dispatch<React.SetStateAction<number>>;
}
const ChangeNumOTPform: FunctionComponent<ChangeNumOTPProps> = ({
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
      <Flex vertical={true} gap={"middle"}>
        <b  style={titleFont}>
          لطفا رمز یکبار مصرف ارسال شده را وارد کنید
        </b>
      <Form
        name="OTP"
        initialValues={{ remember: true }}
        onFinish={onFinish}
      >
        <Row>
          
        <Col span={10}>
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
            </Col>
            <Col span={10}>
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
          </Col>
          <Col span={24}>
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
          </Col>
        </Row>
      </Form>
      </Flex>
  );
};
export default ChangeNumOTPform;
