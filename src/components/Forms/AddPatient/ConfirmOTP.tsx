import {
  Button,
  Col,
  CountdownProps,
  Form,
  GetProps,
  Input,
  message,
  notification,
  Row,
  Space,
  Statistic,
} from "antd";
import { FunctionComponent, useState } from "react";
import { PatientsApi } from "../../../api";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import { AxiosError } from "axios";

type OTPProps = GetProps<typeof Input.OTP>;
const { Countdown } = Statistic;

export type FrgpassComponentType = {};

interface ConfirmOTPComponentProps {
  current: number;
  setCurrent: React.Dispatch<React.SetStateAction<number>>;
  data: any;
  setData: React.Dispatch<React.SetStateAction<any>>;
}
const ConfirmOTP: FunctionComponent<ConfirmOTPComponentProps> = ({
  data,
  setData,
  current,
  setCurrent,
}) => {
  const axoisPrivate = useAxiosPrivate();
  const [Error, setError] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const next = () => {
    setCurrent(current + 1);
  };

  const prev = () => {
    setCurrent(current - 1);
  };
   //message handeling
   const [messageApi, contextHolder] = message.useMessage();
   const errormsg = (content: string) => {
     messageApi.open({
       type: "error",
       content: content,
       duration: 5,
     });
   };
  const onFinish = async (values: any) => {
    //console.log("Received values of form: ", values);
    const code = values.otp;
    const phoneNumber = data.phoneNumber;
    //console.log(data);
    try {
      const response = await axoisPrivate.post(
        PatientsApi.otp,
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
   // console.log("onChange:", text);
  };

  const sharedProps: OTPProps = {
    onChange,
  };
  const deadline = Date.now() + 1000 * 60 + 1000;
  const [sendButton, setSendButton] = useState(false);

  const onFinishCount: CountdownProps["onFinish"] = () => {
    //console.log("finished!");
    setSendButton(true);
  };
  const resend =async () => {
    

    const fullName = data.fullName;
    const phoneNumber = data.phoneNumber;

    //console.log(data);
    try {
      const response = await axoisPrivate.post(
        PatientsApi.add,
        JSON.stringify({ phoneNumber, fullName }),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );

      // Check the response to determine if the OTP is valid
      const { message } = response.data;

      if (response.status == 202) {
        setData(response.data);
        // Show success message for correct OTP
        notification.success({
          message: message,
          duration: 3, // Customize duration as needed
          showProgress: true,
          pauseOnHover: false,
          style: { direction: "rtl", textAlign: "right" }, // Apply RTL styling
          placement: "topLeft", // Place notification on the right
        });
        setSendButton(false);
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
          if (Error) errormsg(`خطایی رخ داده است:${error.response.data?.message}`);
        }
      } else {
        errormsg("خظایی رخ داده است");
      }
    } finally {
      setLoading(false);
    }
  };
  return (
    <Form name="OTP" layout="vertical" onFinish={onFinish} hideRequiredMark>
      {contextHolder}
      <Row gutter={16} justify="space-around" align="middle">
        <Col span={24}>
          <Form.Item>
            <Space>
              <b style={{ padding: "10px", fontSize: "20px" }}>
                لطفارمز یکبار مصرف ارسال شده به بیمار را وارد کنید
              </b>
            </Space>
          </Form.Item>
        </Col>
        <Col span={12}>
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

        <Col span={16}>
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
        <Col span={8.5}>
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
      </Row>
    </Form>
  );
};
export default ConfirmOTP;
