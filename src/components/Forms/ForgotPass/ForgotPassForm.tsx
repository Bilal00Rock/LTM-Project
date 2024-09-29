import React, { useEffect, useState } from "react";
import { FunctionComponent, useCallback } from "react";
import {
  InfoCircleOutlined,
  UserOutlined,
  PhoneOutlined,
} from "@ant-design/icons";
import { Button, Form, Input, Tooltip, ConfigProvider, Divider } from "antd";
import { useNavigate } from "react-router-dom";

export type FrgpassComponentType = {
  className?: string;
};
interface FrogotpassComponentProps {
  current: number;
  setCurrent: React.Dispatch<React.SetStateAction<number>>;
}
const ForgotPassForm: FunctionComponent<FrogotpassComponentProps> = ({
  current,
  setCurrent,
}) => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  const navigate = useNavigate();
  const onBackClick = useCallback(() => {
    navigate("/login-page");
  }, [navigate]);

  const onFinish = (values: any) => {
    console.log("Received values of form: ", values);
    setCurrent(current + 1);
    console.log(current);
  };
  const smallWidth = windowWidth < 1700;
  const toosmallWidth = windowWidth < 1300;
  const titleFont: React.CSSProperties = {
    fontSize: smallWidth ? "22px" : "24px",
    fontFamily: "poppins",
  };

  const next = () => {
    setCurrent(current + 1);
  };

  return (
    <div>
      <Form
        name="forpass"
        initialValues={{ remember: true }}
        style={{
          minWidth: "-webkit-fill-available",
          ...{ padding: toosmallWidth ? "0px" : "46px" },
        }}
        onFinish={onFinish}
        size={toosmallWidth ? "middle" : "large"}
      >
        <ConfigProvider
          theme={{
            components: {
              Input: {
                /* here is your component tokens */
                inputFontSizeLG: 20,
              },
            },
          }}
        >
          <Form.Item
            name="D_id"
            rules={[
              {
                required: true,
                message: "لطفا کد نظام پزشکی خود را وارد کنید!",
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
            name="Ph_no"
            rules={[
              {
                required: true,
                message: "لطفا تلفن همراه خود را وارد کنید!",
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
                  contentFontSizeLG: 21,
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
              style={{ fontWeight: "bold" }}
            >
              ارسال کد
            </Button>

            <Divider>یا</Divider>
            <Button block type="default" onClick={onBackClick}>
              برگشت به صفحه ورود
            </Button>
          </ConfigProvider>
        </Form.Item>
      </Form>
    </div>
  );
};
export default ForgotPassForm;
