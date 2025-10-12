import { useEffect, useState } from "react";
import { Button, Form, Input, message, Radio, Space, Tabs } from "antd";
import { AdminPanelAPI } from "../../../api/axios";
import dayjs from "dayjs";
import DatePicker from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import { DateObject } from "react-multi-date-picker";

interface DoctorData {
  id?: string;
  personnelCode: string;
  nationalCode: string;
  fullName: string;
  mobile: string;
  gender: string;
  address: string;
  birthdate: string | null;
  newPassword?: string;
  confirmPassword?: string;
}

type Props = {
  doctor: DoctorData;
  onClose: () => void;
  onUpdateSuccess?: (updatedDoctor: DoctorData) => void;
};

const EditDoctorForm = ({ doctor, onClose, onUpdateSuccess }: Props) => {
  const [form] = Form.useForm<DoctorData>();
  const [passForm] = Form.useForm<DoctorData>();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (doctor) {
      form.setFieldsValue({
        ...doctor,
        birthdate: doctor.birthdate,
      });
    }
  }, [doctor]);

  const handleSubmit = async (values: DoctorData) => {
    try {
      setLoading(true);

      const payload = {
        ...values,
        id: doctor.id,
        birthdate: values.birthdate
          ? dayjs(values.birthdate).format("YYYY-MM-DD")
          : null,
      };

      console.log("Updated Doctor Data:", payload);

      message.success("تغییرات پزشک با موفقیت ذخیره شد ✅");
      onClose();
    } catch (err) {
      console.error(err);
      message.error("خطا در ذخیره تغییرات پزشک ❌");
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordChange = async (values: DoctorData) => {
    try {
      setLoading(true);

      if (!values.newPassword || !values.confirmPassword) {
        message.error("برای تغییر رمز، هر دو فیلد باید پر شوند ❌");
        return;
      }

      if (values.newPassword !== values.confirmPassword) {
        message.error("رمز عبور و تکرار آن مطابقت ندارند ❌");
        return;
      }

      // const res = await AdminPanelAPI.resetDoctorPassword({
      //   id: doctor.id,
      //   password: values.newPassword,
      // });

      message.success("رمز عبور با موفقیت تغییر کرد 🔐");
      onClose();
    } catch (err) {
      console.error(err);
      message.error("خطا در تغییر رمز عبور ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Tabs
      defaultActiveKey="1"
      centered
      items={[
        {
          key: "1",
          label: "ویرایش اطلاعات پزشک",
          children: (
            <Form
              variant="filled"
              layout="vertical"
              form={form}
              onFinish={handleSubmit}
              style={{ maxWidth: 600, margin: "0 auto" }}
            >
              <Form.Item
                name="personnelCode"
                label="کد نظام پزشکی"
                rules={[
                  { required: true, message: "کد نظام پزشکی الزامی است" },
                ]}
              >
                <Input placeholder="مثلاً 12345" />
              </Form.Item>

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
                    border : "0px",
                    fontSize: "14px",
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
                <Button onClick={onClose} disabled={loading}>
                  انصراف
                </Button>
                <Button type="primary" htmlType="submit" loading={loading}>
                  ذخیره تغییرات
                </Button>
              </Space>
            </Form>
          ),
        },
        {
          key: "2",
          label: "تغییر رمز عبور",
          children: (
            <Form
              form={passForm}
              variant="filled"
              layout="vertical"
              onFinish={handlePasswordChange}
              style={{ maxWidth: 400, margin: "0 auto" }}
            >
              <Form.Item
                name="newPassword"
                label="رمز عبور جدید"
                rules={[
                  { required: true, message: "رمز عبور جدید را وارد کنید" },
                ]}
              >
                <Input.Password placeholder="رمز عبور جدید را وارد کنید" />
              </Form.Item>

              <Form.Item
                name="confirmPassword"
                label="تکرار رمز عبور"
                dependencies={["newPassword"]}
                rules={[
                  { required: true, message: "تکرار رمز عبور را وارد کنید" },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value || getFieldValue("newPassword") === value) {
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
                <Button onClick={onClose} disabled={loading}>
                  انصراف
                </Button>
                <Button type="primary" htmlType="submit" loading={loading}>
                  ثبت رمز جدید
                </Button>
              </Space>
            </Form>
          ),
        },
      ]}
    />
  );
};

export default EditDoctorForm;
