import { Button, Col, Form, Input, message, notification, Row, Space } from "antd";
import { AxiosError } from "axios";
import { FunctionComponent, useState } from "react";
import { PatientsApi } from "../../../api";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";

export type FrgpassComponentType = {};

interface AddPatientFormComponentProps {
  current: number;
  setCurrent: React.Dispatch<React.SetStateAction<number>>;

  data: any;
  setData: React.Dispatch<React.SetStateAction<any>>;
}
const AddPatientForm: FunctionComponent<AddPatientFormComponentProps> = ({
  data,
  setData,
  current,
  setCurrent,
}) => {
  const next = () => {
    setCurrent(current + 1);
  };
  const axoisPrivate = useAxiosPrivate();
  const [Error, setError] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  //message handeling
  const [messageApi, contextHolder] = message.useMessage();
  const errormsg = (content: string) => {
    messageApi.open({
      type: "error",
      content: content,
      duration: 5,
    });
  };
  const  onFinish = async (values: any) => {
    
    const fullName = values.fullName;
    const phoneNumber = values.phoneNumber;

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
          if (Error) errormsg(`خطایی رخ داده است:${error.response.data?.message}`);
        }
      } else {
        errormsg("خظایی رخ داده است");
      }
    } finally {
      setLoading(false);
    }
    //next();
  };
  return (
    <Form
      name="AddPatient"
      layout="vertical"
      onFinish={onFinish}
      hideRequiredMark
    >
      {contextHolder}
      <Row gutter={16}>
        <Col span={24}>
          <Form.Item>
            <Space>
              <b style={{ padding: "10px", fontSize: "20px" }}>
                لطفا اطلاعات بیمار را وارد کنید
              </b>
            </Space>
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            name="fullName"
            label="نام و نام خانوادگی"
            rules={[
              {
                required: true,
                message: "لطفاً نام و نام خانوادگی بیمار را وارد کنید!",
              },
            ]}
          >
            <Input placeholder="نام بیمار را وارد کنید" />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            name="phoneNumber"
            label="تلفن همراه بیمار"
            rules={[
              {
                required: true,
                message: "لطفا تلفن همراه بیمار را وارد کنید!",
              },
            ]}
          >
            <Input placeholder="شماره تماس بیمار را وارد کنید" />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={8}>
          <Button htmlType="submit" type="primary">
            مرحله بعد
          </Button>
        </Col>
      </Row>
    </Form>
  );
};
export default AddPatientForm;
