import { useEffect, useState } from "react";
import { Form, Input, Button, Radio, Steps, message } from "antd";
import DatePicker from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import { DateObject } from "react-multi-date-picker";
import {
  UserOutlined,
  SolutionOutlined,
  FileDoneOutlined,
} from "@ant-design/icons";

type Props = {
  patient: any;
  onClose: () => void;
  open: boolean; // 👈 باید boolean باشه، نه تابع
};

const EditPatientForm = ({ patient, onClose, open }: Props) => {
  const [form] = Form.useForm();
  const [current, setCurrent] = useState(0);
  const [formData, setFormData] = useState<any>({});

  // ✅ وقتی patient تغییر می‌کند (مثلاً drawer برای بیمار جدید باز می‌شود)
  useEffect(() => {
    if (patient) {
      form.setFieldsValue({
        fullName: patient.fullName,
        mobile: patient.mobile,
        gender: patient.gender?.toLowerCase(),
        maritalStatus: patient.maritalStatus?.toLowerCase(),
        birthdate: patient.birthdate,
        doctorId: patient.doctorId,
        doctorFullName: patient.doctorFullName,
      });
      setFormData(patient);
    }
  }, [patient]);

  // ✅ وقتی drawer باز می‌شود (حتی با همان patient قبلی)
  useEffect(() => {
    if (open) {
      setCurrent(0);
    }
  }, [open]);

  const next = async () => {
    try {
      const values = await form.validateFields();
      setFormData({ ...formData, ...values });
      setCurrent(current + 1);
    } catch {}
  };

  const prev = () => setCurrent(current - 1);

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      const finalData = { ...formData, ...values };
      console.log("✅ Updated data:", finalData);
      message.success("اطلاعات با موفقیت ویرایش شد ✅");
      onClose();
    } catch {
      message.error("لطفاً تمام فیلدها را کامل کنید");
    }
  };

  const steps = [
    {
      title: "اطلاعات بیمار",
      icon: <UserOutlined />,
      content: (
        <>
          <Form.Item
            label="نام و نام خانوادگی"
            name="fullName"
            rules={[{ required: true, message: "نام بیمار الزامی است" }]}
            style={{ width: 300 }}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="شماره تماس"
            name="mobile"
            rules={[{ required: true, message: "شماره تماس الزامی است" }]}
            style={{ width: 300 }}
          >
            <Input />
          </Form.Item>
          <Form.Item label="جنسیت" name="gender">
            <Radio.Group>
              <Radio.Button style={{ width: 70 , textAlign:"center"}} value="male">مرد</Radio.Button>
              <Radio.Button style={{ width: 70 , textAlign:"center"}} value="female">زن</Radio.Button>
            </Radio.Group>
          </Form.Item>
          <Form.Item label="وضعیت تاهل" name="maritalStatus">
            <Radio.Group>
              <Radio.Button style={{ width: 70 , textAlign:"center"}} value="single">مجرد</Radio.Button>
              <Radio.Button style={{ width: 70 , textAlign:"center"}} value="married">متأهل</Radio.Button>
            </Radio.Group>
          </Form.Item>

          <Form.Item label="تاریخ تولد" name="birthdate" style={{ width: 250 }}>
            <DatePicker
              calendar={persian}
              locale={persian_fa}
              placeholder="تاریخ تولد را انتخاب کنید"
              format="YYYY/MM/DD"
              value={
                patient?.birthdate
                  ? new DateObject({
                      date: patient.birthdate,
                      calendar: persian,
                      locale: persian_fa,
                    })
                  : ""
              }
              onChange={(val) =>
                form.setFieldsValue({
                  birthdate: val ? val.format("YYYY/MM/DD") : null,
                })
              }
              style={{
                height: "35px",
                width: "100%",
                direction: "rtl",
                textAlign: "center",
                borderRadius: "8px",
                padding: "6px 10px",
                fontSize: "14px",
                backgroundColor: "#F5F5F5",
                border: "0px",
              }}
            />
          </Form.Item>
        </>
      ),
    },
    {
      title: "اطلاعات پزشک معالج",
      icon: <SolutionOutlined />,
      content: (
        <>
          <Form.Item
            label="آیدی دکتر"
            name="doctorId"
            rules={[{ required: true, message: "آیدی دکتر الزامی است" }]}
            style={{ width: 300 }}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="نام و نام خانوادگی دکتر"
            name="doctorFullName"
            rules={[{ required: true, message: "نام دکتر الزامی است" }]}
            style={{ width: 300 }}
          >
            <Input />
          </Form.Item>
        </>
      ),
    },
    {
      title: "تأیید نهایی",
      icon: <FileDoneOutlined />,
      content: (
        <div style={{ textAlign: "center", padding: "20px" }}>
          <h3>آیا از ذخیره تغییرات اطمینان دارید؟</h3>
          <p>اطلاعات واردشده در سیستم ثبت خواهد شد.</p>
          <Button type="primary" onClick={handleSubmit}>
            بله، ذخیره کن
          </Button>
        </div>
      ),
    },
  ];

  return (
    <>
      <Steps
        current={current}
        items={steps.map((step) => ({
          title: step.title,
          icon: step.icon,
        }))}
      />
      <Form
        form={form}
        layout="vertical"
        variant="filled"
        style={{marginTop: 30 , maxWidth: 600, margin: "0 auto" }}
      >
        {steps[current].content}
        <div style={{ marginTop: 24 }}>
          {current > 0 && current < steps.length - 1 && (
            <Button style={{ marginLeft: 15 }} onClick={prev}>
              قبلی
            </Button>
          )}
          {current < steps.length - 1 && (
            <Button type="primary" onClick={next}>
              ادامه
            </Button>
          )}
        </div>
      </Form>
    </>
  );
};

export default EditPatientForm;
