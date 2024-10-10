import { Button, Col, Form, GetProp, Input, message, Radio, Row, Select, Typography, Upload, UploadProps } from "antd";
import { SaveOutlined ,LoadingOutlined,PlusOutlined} from "@ant-design/icons";
import { Card } from "../../Card/Card";
import { useState } from "react";

type FieldType = {
  name?: string;
  n_id?: string;
  D_id?: string;
  phoneNO?: string;
  work_adrs?: string;
  imageUrl?: string;
};
//image Upload
type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0];

const getBase64 = (img: FileType, callback: (url: string) => void) => {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result as string));
  reader.readAsDataURL(img);
};

const beforeUpload = (file: FileType) => {
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
  if (!isJpgOrPng) {
    message.error('You can only upload JPG/PNG file!');
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error('Image must smaller than 2MB!');
  }
  return isJpgOrPng && isLt2M;
};


export const InfoForm = () => {
  const onFinish = (values: any) => {
    console.log("موفقیت:", values);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("خطا:", errorInfo);
  };
//image Upload
const [loading, setLoading] = useState(false);
const [imageUrl, setImageUrl] = useState<string>();

const handleChange: UploadProps['onChange'] = (info) => {
  if (info.file.status === 'uploading') {
    setLoading(true);
    return;
  }
  if (info.file.status === 'done') {
    // Get this url from response in real world.
    getBase64(info.file.originFileObj as FileType, (url) => {
      setLoading(false);
      setImageUrl(url);
    });
  }
};

const uploadButton = (
  <button style={{ border: 0, background: 'none' }} type="button">
    {loading ? <LoadingOutlined /> : <PlusOutlined />}
    <div style={{ marginTop: 8 }}>Upload</div>
  </button>
);
  return (
    <Card title={"تغییر مشخصات کاربری"}>
      <Form
        name="فرم-اطلاعات-پروفایل-کاربر"
        layout="vertical"
        initialValues={{
          name: "امیر محمدی",
          work_adrs: " مشهد، خیابان شهید بهشتی، کوچه ۱، پلاک ۱۸",
          n_id: "۰۱۳۲۲۹۰۱۲۹",
          D_id: "۰۱۳۲۲۹۰۱۲۹",
          phoneNO: "۰۹۱۲۳۴۵۶۷۸۹",
          imageUrl: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png'
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="on"
        requiredMark={false}
      >
        <Row gutter={[16, 0]} justify={'space-between'}>
          <Col span={8}>
            <Form.Item<FieldType>
              label="نام"
              name="name"
              rules={[
                { required: true, message: "لطفا نام خود را وارد کنید!" },
              ]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={4}>
            <Form.Item<FieldType>
              label="کد ملی"
              name="n_id"
              rules={[
                { required: true, message: "لطفا ایمیل خود را وارد کنید!" },
              ]}
            >
              <Input disabled />
            </Form.Item>
          </Col>
          <Col span={4}>
            <Form.Item<FieldType>
              label="شماره نظام پزشکی "
              name="D_id"
              rules={[
                {
                  required: true,
                  message: "لطفا نام کاربری خود را وارد کنید!",
                },
              ]}
            >
              <Input disabled />
            </Form.Item>
          </Col>
          <Col span={4} >
            <Form.Item<FieldType>
              label= 'عکس پروفایل'
              labelAlign= 'right'
              name="imageUrl"
              rules={[
                { required: true, message: "لطفا عکس خود را بارگزاری کنید!" },
              ]}
            >
              <Upload
                name="imageUrl"
                listType="picture-card"
                showUploadList={false}
                action="https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload"
                beforeUpload={beforeUpload}
                onChange={handleChange}
              >
                {imageUrl ? (
                  <img src={imageUrl} alt="avatar" style={{ width: "100%" }} />
                ) : (
                  uploadButton
                )}
              </Upload>
            </Form.Item>
          </Col>
          <Col span={10}>
            <Form.Item<FieldType>
              label="آدرس مطب"
              name="work_adrs"
              rules={[
                {
                  required: true,
                  message: "لطفا نوع اشتراک خود را انتخاب کنید!",
                },
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
