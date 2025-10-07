import { Form, Input, Button, Radio, ConfigProvider } from "antd";
import { useEffect } from "react";


type Props = {
  patient: any;
  onClose: () => void;
};

const EditPatientForm = ({ patient, onClose }: Props) => {
  const [form] = Form.useForm();

  useEffect(() => {
    form.setFieldsValue({
      fullName: patient.fullName,
      mobile: patient.mobile,
      gender: patient.gender,
      maritalStatus: patient.maritalStatus,
      birthdate: patient.birthdate,
      doctorId: patient.doctorId,
      doctorFullName: patient.doctorFullName,
    });
  }, [patient]);
  const onFinish = (values: any) => {
    console.log("Updated values:", values);
    // TODO: درخواست API برای آپدیت
    onClose(); // بعد از آپدیت بسته بشه
  };

  return (
    <>
      <h2>ویرایش اطلاعات بیمار</h2>
      <Form form={form} layout="vertical" onFinish={onFinish} variant="filled">
        <Form.Item
          label="نام و نام خانوادگی"
          name="fullName"
          style={{ width: 300, paddingRight: "20px" }}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="شماره تماس"
          name="mobile"
          style={{ width: 300, paddingRight: "20px" }}
        >
          <Input />
        </Form.Item>
        <Form.Item label="جنسیت" name="gender" style={{paddingRight: "20px" }}>
          <Radio.Group >
            <Radio.Button value="male">مرد</Radio.Button>
            <Radio.Button value="female">زن</Radio.Button>
          </Radio.Group>
        </Form.Item>
        <Form.Item label="وضیعت تاهل" name="maritalStatus" style={{paddingRight: "20px" }}> 
          <Radio.Group>
            <Radio.Button value="single">مجرد</Radio.Button>
            <Radio.Button value="married">متاهل</Radio.Button>
          </Radio.Group>
        </Form.Item>
        <Form.Item label="تاریخ تولد" name="birthdate" style={{ width: 300, paddingRight: "20px" }}>

        </Form.Item>

        <h2>ویرایش اطلاعات پزشک معالج</h2>
        <Form.Item
          label="آیدی دکتر"
          name="doctorId"
          style={{ width: 300, paddingRight: "20px" }}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="نام و نام خانوادگی دکتر"
          name="doctorFullName"
          style={{ width: 300, paddingRight: "20px" }}
        >
          <Input />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            ذخیره تغییرات
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default EditPatientForm;
