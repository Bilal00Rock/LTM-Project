import { useState } from "react";
import {
  Button,
  Form,
  Input,
  Space,
  message,
  Radio,
  Steps,
  Result,
} from "antd";
import {
  SolutionOutlined,
  UserOutlined,
  LockOutlined,
  CheckCircleOutlined,
} from "@ant-design/icons";
import { AdminPanelAPI } from "../../../api/axios";
import dayjs from "dayjs";
import DatePicker from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import { DateObject } from "react-multi-date-picker";

interface DoctorData {
  personnelCode: string;
  nationalCode: string;
  fullName: string;
  mobile: string;
  gender: string;
  address: string;
  birthdate: string | null;
  password?: string;
  confirmPassword?: string;
}

const AddDoctorSteps = () => {
  const [form] = Form.useForm<DoctorData>();
  const [current, setCurrent] = useState(0);
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(false);
  const [doctorData, setDoctorData] = useState<DoctorData | null>(null);

  const handleInquiry = async () => {
    const personnelCode = form.getFieldValue("personnelCode");
    if (!personnelCode) {
      message.warning("کد نظام پزشکی را وارد کنید");
      return;
    }

    try {
      setFetching(true);
      await new Promise((r) => setTimeout(r, 1200)); // شبیه‌سازی API
      const mockData = {
        fullName: "دکتر سارا محمدی",
        nationalCode: "1234567890",
        mobile: "09125555555",
        gender: "female",
        address: "تهران، خیابان ولیعصر، پلاک ۱۲۳",
        birthdate: "1988-05-14",
      };

      form.setFieldsValue({
        ...mockData,
        birthdate: mockData.birthdate,
      });
      setDoctorData({ personnelCode, ...mockData });
      message.success("اطلاعات پزشک با موفقیت دریافت شد ✅");
      setCurrent(1);
    } catch (err) {
      console.error(err);
      message.error("خطا در استعلام اطلاعات پزشک ❌");
    } finally {
      setFetching(false);
    }
  };

  const handleSubmitInfo = async (values: DoctorData) => {
    setDoctorData(values);
    setCurrent(2);
  };

  const handleFinalSubmit = async (values: DoctorData) => {
    try {
      setLoading(true);
      if (values.password !== values.confirmPassword) {
        message.error("رمز عبور و تکرار آن مطابقت ندارند ❌");
        return;
      }

      const payload = {
        ...doctorData,
        password: values.password,
        birthdate: doctorData?.birthdate
          ? dayjs(doctorData.birthdate).format("YYYY-MM-DD")
          : null,
      };

      console.log("Final Doctor Data Submitted:", payload);
      // await AdminPanelAPI.addDoctor(payload);

      message.success("پزشک جدید با موفقیت افزوده شد ✅");
      setCurrent(3);
    } catch (err) {
      console.error(err);
      message.error("ثبت پزشک با خطا مواجه شد ❌");
    } finally {
      setLoading(false);
    }
  };

  const steps = [
    {
      title: "استعلام کد نظام پزشکی",
      icon: <SolutionOutlined />,
      content: (
        <Form
          form={form}
          variant="filled"
          layout="vertical"
          style={{ margin: "0 auto", maxWidth: 400 }}
        >
          <Form.Item
            name="personnelCode"
            label="کد نظام پزشکی"
            rules={[{ required: true, message: "کد نظام پزشکی الزامی است" }]}
          >
            <Input placeholder="مثلاً 12345" />
          </Form.Item>

          <Space
            style={{
              display: "flex",
              justifyContent: "center",
              width: "100%",
              marginTop: 10,
            }}
          >
            <Button
              type="primary"
              onClick={handleInquiry}
              loading={fetching}
              style={{ minWidth: 120 }}
            >
              استعلام
            </Button>

            <Button
              onClick={() => {
                const code = form.getFieldValue("personnelCode");
                setDoctorData({ personnelCode: code || "" } as DoctorData);
                setCurrent(1);
              }}
              style={{ minWidth: 120 }}
            >
              رد شدن
            </Button>
          </Space>
        </Form>
      ),
    },
    {
      title: "اطلاعات تکمیلی پزشک",
      icon: <UserOutlined />,
      content: (
        <Form
          form={form}
          variant="filled"
          layout="vertical"
          initialValues={doctorData || {}}
          onFinish={handleSubmitInfo}
          style={{ maxWidth: 600, margin: "0 auto" }}
        >
          <Form.Item
            name="fullName"
            label="نام و نام خانوادگی"
            rules={[
              { required: true, message: "نام و نام خانوادگی الزامی است" },
            ]}
          >
            <Input placeholder="مثلاً دکتر علی رضایی" />
          </Form.Item>

          <Form.Item
            name="nationalCode"
            label="کد ملی"
            rules={[{ required: true, message: "کد ملی الزامی است" }]}
          >
            <Input placeholder="مثلاً 0012345678" />
          </Form.Item>

          <Form.Item
            name="mobile"
            label="شماره تماس"
            rules={[{ required: true, message: "شماره تماس الزامی است" }]}
          >
            <Input placeholder="مثلاً 09120000000" />
          </Form.Item>

          <Form.Item
            name="gender"
            label="جنسیت"
            rules={[{ required: true, message: "جنسیت الزامی است" }]}
          >
            <Radio.Group>
              <Radio.Button style={{ width: 70 , textAlign:"center"}} value="male">مرد</Radio.Button>
              <Radio.Button style={{ width: 70 , textAlign:"center"}} value="female">زن</Radio.Button>
            </Radio.Group>
          </Form.Item>

          <Form.Item
            name="birthdate"
            label="تاریخ تولد"
            rules={[{ required: true, message: "تاریخ تولد الزامی است" }]}
          >
            <DatePicker
              calendar={persian}
              locale={persian_fa}
              format="YYYY/MM/DD"
              placeholder="تاریخ تولد را انتخاب کنید"
              value={
                form.getFieldValue("birthdate")
                  ? new DateObject({
                      date: form.getFieldValue("birthdate"),
                      calendar: persian,
                      locale: persian_fa,
                    })
                  : ""
              }
              onChange={(value) => {
                form.setFieldsValue({
                  birthdate: value ? value.format("YYYY/MM/DD") : null,
                });
              }}
              style={{
                height: "35px",
                width: "100%",
                direction: "rtl",
                textAlign: "center",
                borderRadius: "8px",
                padding: "6px 10px",
                fontSize: "14px",
                border: "0px",
                backgroundColor: "#F5F5F5",
              }}
            />
          </Form.Item>

          <Form.Item
            name="address"
            label="آدرس مطب"
            rules={[{ required: true, message: "آدرس مطب الزامی است" }]}
          >
            <Input.TextArea
              rows={3}
              placeholder="مثلاً تهران، خیابان شریعتی، پلاک ۴۲"
            />
          </Form.Item>

          <Space style={{ width: "100%", justifyContent: "space-between" }}>
            <Button onClick={() => setCurrent(0)}>بازگشت</Button>
            <Button type="primary" htmlType="submit">
              ادامه
            </Button>
          </Space>
        </Form>
      ),
    },
    {
      title: "ایجاد رمز عبور",
      icon: <LockOutlined />,
      content: (
        <Form
          layout="vertical"
          variant="filled"
          onFinish={handleFinalSubmit}
          style={{ maxWidth: 400, margin: "0 auto" }}
        >
          <Form.Item
            name="password"
            label="رمز عبور"
            rules={[{ required: true, message: "رمز عبور را وارد کنید" }]}
          >
            <Input.Password placeholder="رمز عبور را وارد کنید" />
          </Form.Item>

          <Form.Item
            name="confirmPassword"
            label="تکرار رمز عبور"
            dependencies={["password"]}
            rules={[
              { required: true, message: "تکرار رمز عبور را وارد کنید" },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    new Error("رمز عبور و تکرار آن مطابقت ندارند ❌")
                  );
                },
              }),
            ]}
          >
            <Input.Password placeholder="تکرار رمز عبور جدید" />
          </Form.Item>

          <Space style={{ width: "100%", justifyContent: "space-between" }}>
            <Button onClick={() => setCurrent(1)}>بازگشت</Button>
            <Button type="primary" htmlType="submit" loading={loading}>
              ثبت نهایی
            </Button>
          </Space>
        </Form>
      ),
    },
    {
      title: "انجام شد",
      icon: <CheckCircleOutlined />,
      content: (
        <Result
          status="success"
          title="پزشک با موفقیت ثبت شد ✅"
          subTitle="پزشک جدید با اطلاعات واردشده به سیستم افزوده شد."
        />
      ),
    },
  ];

  return (
    <div style={{ padding: 20 }}>
      <Steps
        current={current}
        items={steps.map((s) => ({
          key: s.title,
          title: s.title,
          icon: s.icon,
        }))}
        style={{ marginBottom: 40 }}
      />
      <div>{steps[current].content}</div>
    </div>
  );
};

export default AddDoctorSteps;
