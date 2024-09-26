import {
  Button,
  Col,
  CountdownProps,
  Form,
  GetProps,
  Input,
  Row,
  Space,
  Statistic,
} from "antd";
import { FunctionComponent, useState } from "react";

type OTPProps = GetProps<typeof Input.OTP>;
const { Countdown } = Statistic;

export type FrgpassComponentType = {};

interface ConfirmOTPComponentProps {
  current: number;
  setCurrent: React.Dispatch<React.SetStateAction<number>>;
}
const ConfirmOTP: FunctionComponent<ConfirmOTPComponentProps> = ({
  current,
  setCurrent,
}) => {
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
  return (
    <Form name="OTP" layout="vertical" onFinish={onFinish} hideRequiredMark>
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
              </Button>useCallback, 
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
