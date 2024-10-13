import React, { useEffect, useState } from "react";
import { FunctionComponent, useCallback } from "react";
import {
  Button,
  Form,
  Input,
  Flex,
  ConfigProvider,
  Divider,
  message,
} from "antd";
import styles2 from "../../../pages/Styles/ForgotPassPage.module.css";
import { useNavigate } from "react-router-dom";
import { axios, REGISTER_URL } from "../../../api";

export type RespassComponentType = {
  className?: string;
};
interface NewPassFormComponentProps {
  current: number;
  setCurrent: React.Dispatch<React.SetStateAction<number>>;
}
const NewPassForm: FunctionComponent<NewPassFormComponentProps> = ({
  current,
  setCurrent,
}) => {
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
  //styles
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  const smallWidth = windowWidth < 1700;
  const toosmallWidth = windowWidth < 1300;
  const titleFont: React.CSSProperties = {
    fontSize: smallWidth ? "22px" : "24px",
    fontFamily: "poppins",
  };

  //functions
  const next = () => {
    setCurrent(current + 1);
  };
  const prev = () => {
    setCurrent(current - 1);
  };
  //api 
  let accesstoken = 'aaaaaaaaaa'
  const [Error, setError] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const onFinish = async (values: any) => {
    //console.log("Received values of form: ", values);
    try {
      const response = await axios.post(
        REGISTER_URL.setpass,
        JSON.stringify({ values }),
        {
          headers: { "Content-Type": "application/json" , "accesstoken": accesstoken},
          withCredentials: true,
        }
      );

      const { isDone } = response.data;

      if (isDone) {
        msgSuccess("ثبت نام با موفقیت انجام شد");
        next();
      } else {
        message.error("در فرایند ثبت نام مشکلی پیش آمده است");
      }
    } catch (error) {
      setError(error);
      if (Error) errormsg(`خطایی رخ داده است:${Error}`);
    } finally {
      setLoading(false);
    }
  };

  //password validation
  const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

  return (
    <div>
      {contextHolder}
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
                message: "!لطفا گذرواژه جدید را وارد کنید",
              },
              //check the password regex
              () => ({
                validator(_, value) {
                  const result = PWD_REGEX.test(value);
                  if (result) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error("!checking"));
                },
              }),
            ]}
            hasFeedback
          >
            <Input.Password placeholder="گذرواژه جدید" />
          </Form.Item>

          <Form.Item
            name="confirm"
            dependencies={["password"]}
            hasFeedback
            rules={[
              {
                required: true,
                message: "!لطفا گذرواژه را تکرار کنید",
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error("!گذرواژه ها یکسان نیستند"));
                },
              }),
            ]}
          >
            <Input.Password placeholder="تکرار گذرواژه جدید" />
          </Form.Item>

          <Form.Item>
            <div style={{textAlign: 'right'}}>
              <ul dir="rtl" >
                <li>رمز باید ۸ الی ۲۴ کاراکتر باشد</li>
                <li>حتما باید دارای حروف بزرگ و کوچک باشد</li>
                <li>حداقل باید دارای یک کاراکتر عددی باشد</li>
                <li>حداقل باید دارای یک کاراکتر خاص(!,@,#,$,%) باشد</li>
              </ul>
            </div>
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
              ثبت نام
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
export default NewPassForm;
