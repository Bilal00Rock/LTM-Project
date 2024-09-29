import { Button, Col, Form, Input, Row, Space } from "antd";
import { FunctionComponent } from "react";

export type FrgpassComponentType = {};

interface AddPatientFormComponentProps {
  current: number;
  setCurrent: React.Dispatch<React.SetStateAction<number>>;
}
const AddPatientForm: FunctionComponent<AddPatientFormComponentProps> = ({
  current,
  setCurrent,
}) => {
  const next = () => {
    setCurrent(current + 1);
  };

  const onFinish = (values: any) => {
    console.log("Received values of form: ", values);
    next();
  };
  return (
    <Form
      name="AddPatient"
      layout="vertical"
      onFinish={onFinish}
      hideRequiredMark
    >
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
            name="name"
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
            name="n_id"
            label="کد ملی"
            rules={[
              { required: true, message: "لطفا کد ملی بیمار را وارد کنید" },
            ]}
          >
            <Input
              style={{ width: "100%" }}
              placeholder=" کد ملی بیمار را وارد کنید"
            />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            name="Ph_no"
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
