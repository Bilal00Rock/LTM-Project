import { Button, Col, Form, Input, Radio, Row, Select, Typography } from "antd";
import { SaveOutlined } from "@ant-design/icons";
import { Card } from "../../Card/Card";

type FieldType = {
  name?: string;
  n_id?: string;
  D_id?: string;
  phoneNO?: string;
  work_adrs?: string;
};

export const InfoForm = () => {
  const onFinish = (values: any) => {
    console.log("موفقیت:", values);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("خطا:", errorInfo);
  };

  return (
    <Card title={'تغییر مشخصات کاربری'}>
      <Form
        name="فرم-اطلاعات-پروفایل-کاربر"
        layout='vertical'
        initialValues={{
          name: "امیر محمدی",
          work_adrs: " مشهد، خیابان شهید بهشتی، کوچه ۱، پلاک ۱۸",
          n_id: '۰۱۳۲۲۹۰۱۲۹',
          D_id: '۰۱۳۲۲۹۰۱۲۹',
          phoneNO: '۰۹۱۲۳۴۵۶۷۸۹'
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="on"
        requiredMark={false}
      >
        <Row gutter={[16, 0]}>
          <Col sm={24} lg={8}>
            <Form.Item<FieldType>
              label="نام"
              name="name"
              rules={[
                { required: true, message: "لطفا نام خود را وارد کنید!" },
              ]}
            >
              <Input  />
            </Form.Item>
          </Col>
          <Col sm={24} lg={12}>
            <Form.Item<FieldType>
              label="کد ملی"
              name="n_id"
              rules={[{ required: true, message: "لطفا ایمیل خود را وارد کنید!" }]}
            >
              <Input disabled/>
            </Form.Item>
          </Col>
          <Col sm={24} lg={12}>
            <Form.Item<FieldType>
              label="شماره نظام پزشکی "
              name="D_id"
              rules={[
                { required: true, message: "لطفا نام کاربری خود را وارد کنید!" },
              ]}
            >
              <Input disabled/>
            </Form.Item>
          </Col>
          {/* <Col sm={24} lg={12}>
            <Form.Item<FieldType>
              label="شماره تماس"
              name="phoneNO"
              rules={[
                { required: true, message: "لطفا نام شرکت خود را وارد کنید!" },
              ]}
            >
              <Input />
            </Form.Item>
          </Col> */}
          <Col sm={24} lg={12}>
            <Form.Item<FieldType>
              label="آدرس مطب"
              name="work_adrs"
              rules={[
                { required: true, message: "لطفا نوع اشتراک خود را انتخاب کنید!" },
              ]}
            >
              <Input />
            </Form.Item>
          </Col>
        </Row>

        <Form.Item>
          <Button type="primary" htmlType="submit" icon={<SaveOutlined />}>
            ذخیره تغییرات
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
};
