import React, { useEffect, useState } from "react";
import { FunctionComponent, useCallback } from "react";
import {
  InfoCircleOutlined,
  UserOutlined,
  PhoneOutlined,
} from "@ant-design/icons";
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
} from "antd";
import styles2 from "../../../pages/Styles/ForgotPassPage.module.css";
import { useNavigate } from "react-router-dom";

export type RespassComponentType = {
  className?: string;
};
interface RespassComponentProps {
  current: number;
  setCurrent: React.Dispatch<React.SetStateAction<number>>;
}
const ResetPassForm: FunctionComponent<RespassComponentProps> = ({ current,
  setCurrent,}) => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  const navigate = useNavigate();
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
  const smallWidth = windowWidth < 1700;
  const toosmallWidth = windowWidth < 1300;
  const titleFont: React.CSSProperties = {
    fontSize: smallWidth ? "22px" : "24px",
    fontFamily: "poppins",
  };

  return (
    <div>
      <Flex vertical={true} gap={"middle"}>
      <b className={styles2.forgotPassword1} style={titleFont}>
        !گذرواژه جدید را انتخاب کنید
      </b>

      </Flex>
      <Form
        name="respass"
        initialValues={{ remember: true }}
        style={{
          minWidth: "-webkit-fill-available",
          ...{ padding: toosmallWidth ? "0px" : "46px" },
        }}
        onFinish={onFinish}
        size={toosmallWidth ? "middle" : "large"}
      >
        <ConfigProvider
        direction="rtl"
          theme={{
            components: {
              Input: {
                /* here is your component tokens */
                inputFontSizeLG: 25,
              },
            },
          }}
        >
          <Form.Item
        name="password"
        rules={[
          {
            required: true,
            message: '!لطفا گذرواژه جدید را وارد کنید',
          },
        ]}
        hasFeedback
      >
        <Input.Password placeholder="گذرواژه جدید"/>
      </Form.Item>

      <Form.Item
        name="confirm"
        dependencies={['password']}
        hasFeedback
        rules={[
          {
            required: true,
            message: '!لطفا گذرواژه را تکرار کنید',
          },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue('password') === value) {
                return Promise.resolve();
              }
              return Promise.reject(new Error('!گذرواژه ها یکسان نیستند'));
            },
          }),
        ]}
      >
        <Input.Password placeholder="تکرار گذرواژه جدید"/>
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
              تغییر گذرواژه
            </Button>

            <Divider>یا</Divider>
            <Button block type="default" onClick={prev}>
              برگشت به مرحله قبلی
            </Button>
          </ConfigProvider>
        </Form.Item>
      </Form>
    </div>
  );
};
export default ResetPassForm;
