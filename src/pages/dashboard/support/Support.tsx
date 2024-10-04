import { PageHeader } from "../../../components/PageHeader/PageHeader";
import {
  UserOutlined,
  HomeOutlined,
  SolutionOutlined,
  PhoneOutlined,
  UserAddOutlined,
  FieldTimeOutlined,
  UnorderedListOutlined,
  SendOutlined,
} from "@ant-design/icons";
import {
  Button,
  Col,
  ConfigProvider,
  Layout,
  Row,
  theme,
  Typography,
  Flex,
  Input,
  Form,
  Rate,
  Modal,
} from "antd";
import { Card } from "../../../components/Card/Card";
import { createElement, useState } from "react";
import { TitleProps } from "antd/es/typography/Title";
const { Link } = Typography;

const { Text, Title } = Typography;

const RATING_DESC = ["خیلی بد", "بد", "خوب", "خیلی خوب", "عالی"];
const features = [
  {
    title: "مشاهده گزارش‌های جامع از وضعیت بیمار",
    description: "دریافت گزارش‌های دقیق از سوابق و وضعیت فعلی بیماران.",
  },
  {
    title: "ارسال معرفی‌نامه و تایید عضویت در انجمن",
    description: "امکان ارسال معرفی‌نامه بیمار به انجمن‌ صرع ایران .",
  },
];
const TOPICS = [
  {
    id: 0,
    title: "امکانات پاینو",
    image: UnorderedListOutlined,
    content: (
      <Card title={"امکانات مختلف برنامه پاینِو "}>
        <ul>
          {features.map((feature, index) => (
            <li key={index}>
              <h4>{feature.title}</h4>
              <p style={{ fontSize: "14px" }}>{feature.description}</p>
            </li>
          ))}
        </ul>
      </Card>
    ),
  },
  {
    id: 1,
    title: "راهنما ثبت بیمار جدید",
    image: UserAddOutlined,
    content: (
      <Card title={"چگونه یک بیمار جدید ثبت کنیم؟"}>
        <ul>
          <li>
            وارد بخش <strong>"مدیریت بیماران"</strong> شوید و روی{" "}
            <strong>"اضافه کردن بیمار جدید"</strong> کلیک کنید.
          </li>
          <li>
            اطلاعات اولیه بیمار شامل نام، شماره تماس و کدملی را وارد کنید.
          </li>
          <li>
            پس از ثبت، یک پیامک حاوی لینک ثبت‌نام و کد یکبارمصرف برای بیمار
            ارسال خواهد شد.
          </li>
          <li>
            کد ارسال‌شده را وارد کنید تا بیمار به لیست بیماران در حال ثبت‌نام
            اضافه شود.
          </li>
          <li>
            پس از تکمیل ثبت‌نام توسط بیمار، او به لیست بیماران فعال شما منتقل
            می‌شود.
          </li>
        </ul>
      </Card>
    ),
  },
  {
    id: 2,
    title: "راهنما مشاهده گزارش بیماران",
    image: SolutionOutlined,
    content: (
      <Card title={"چگونه گزارش‌های بیماران را مشاهده کنیم؟"}>
        <ul>
          <li>
            برای مشاهده گزارش‌های پزشکی بیماران، کافی است به بخش "مدیریت
            بیماران" بروید و بیمار مورد نظر را انتخاب کنید.
          </li>
          <li>
            در این بخش، می‌توانید تمامی گزارشات روزمرگی بیمار را به تفکیک مشاهده
            کنید.
          </li>
          <li>
            همچنین امکان دانلود گزارش‌ها و اشتراک‌گذاری آن‌ها با سایر متخصصین
            نیز وجود دارد.
          </li>
        </ul>
      </Card>
    ),
  },
  {
    id: 3,
    title: "راهنما بیماران درحال ثبت نام",
    image: FieldTimeOutlined,
    content: (
      <Card title={"چگونه بیماران در حال ثبت‌نام را مدیریت کنیم؟"}>
        <ul>
          <li>
            بیمارانی که توسط پزشک اضافه شده‌اند اما هنوز ثبت‌نام خود را تکمیل
            نکرده‌اند، در بخش "بیماران در حال ثبت‌نام" قرار می‌گیرند.
          </li>
          <li>
            تاریخ ارسال لینک ثبت نام به بیمار و ویزیت آنها را میتواند در جدول
            مشاهده کنید.
          </li>
        </ul>
      </Card>
    ),
  },
  {
    id: 4,
    title: "تماس با ما",
    image: PhoneOutlined,
    content: (
      <Card title={"چگونه با تیم پشتیبانی تماس بگیریم؟"}>
        <p>
          برای تماس با تیم پشتیبانی، می‌توانید از طریق شماره تماس‌های زیر و یا
          ارسال ایمیل به آدرس‌های ذکر شده اقدام کنید:
        </p>
        <ul>
          <li>
            <strong>شماره تماس:</strong> ۰۵۱۳۷۶۸۴۲۱۳
          </li>
          <li>
            <strong>ایمیل پشتیبانی:</strong> info@neurosina.com
          </li>
          <li>
            <strong>ساعات کاری:</strong> همه روزه از ساعت 8 صبح تا 5 عص ر
          </li>
          <li>
            <strong>آدرس دفتر مرکزی:</strong>ایران، مشهد، بزرگمهر جنوبی ۱۲/۱،
            خیابان جامی، پلاک ۱۷
          </li>
        </ul>
      </Card>
    ),
  },
];
const TITLE_PROPS: TitleProps = {
  style: {
    marginBottom: 0,
    textAlign: "center",
  },
  level: 3,
};
type FieldType = {
  rating?: number;
  comment?: string;
};

const Support = () => {
  const { token } = theme.useToken();
  const modalStyles = {
    body: {
      boxShadow: "inset 0 0 5px #999",
      borderRadius: 5,
      padding: "15px",
    },
    content: {
      boxShadow: "0 0 30px #999",
    },
  };
  const layoutStyle: React.CSSProperties = {
    background: "#F2FCFC",
    borderRadius: "6px",
    boxShadow: "0 2px 5px rgba(0, 0, 0, 0.25)",
    display: "flex",
    padding: "15px",
    height: "inherit",
    position: "relative",
    overflow: "hidden",
    border: `1px solid ${token.colorBorderSecondary}`,
  };
  const [value, setValue] = useState(3);
  const [current, setCurrent] = useState(0);
  const onFinish = (values: any) => {
    console.log("Success:", values);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = (t: number) => {
    setIsModalOpen(true);
    setCurrent(t);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  return (
    <ConfigProvider
      theme={{
        components: {},
      }}
    >
      <Layout style={layoutStyle}>
        <PageHeader
          title=" پشتیبانی "
          icon={<UserOutlined size={30} />}
          backbtn={true}
          breadcrumbs={[
            {
              title: (
                <>
                  <HomeOutlined />
                  <span>داشبورد</span>
                </>
              ),
            },
            {
              title: (
                <>
                  <UserOutlined />
                  <span>پشتیبانی</span>
                </>
              ),
            },
          ]}
        />
        <Row gutter={[16, 16]}>
          <Col span={24}>
            <Flex vertical gap="large">
              <Flex vertical gap="middle">
                <Title {...TITLE_PROPS}>چگونه میتوانیم کمکتان کنیم؟</Title>
              </Flex>
              <Flex gap="middle" wrap={"nowrap"}>
                {TOPICS.map((t) => (
                  <Card
                    key={t.id}
                    hoverable
                    onClick={() => showModal(t.id)}
                    style={{
                      width: "25%",
                      textAlign: "center",
                    }}
                  >
                    <Flex vertical gap="middle">
                      {createElement(t.image, {
                        style: { fontSize: "1.5rem", margin: "auto" },
                      })}
                      <Text style={{ textTransform: "capitalize" }}>
                        {t.title}
                      </Text>
                    </Flex>
                  </Card>
                ))}
                <ConfigProvider
                  modal={{
                    styles: modalStyles,
                  }}
                >
                  <Modal
                    title={TOPICS[current].title}
                    open={isModalOpen}
                    centered
                    onCancel={handleCancel}
                    footer={
                      <Button type="primary" onClick={handleOk}>
                        تایید
                      </Button>
                    }
                  >
                    <div>{TOPICS[current].content}</div>
                  </Modal>
                </ConfigProvider>
              </Flex>
            </Flex>
          </Col>
          <Col span={24}>
            <Card title="فرم پیشنهادات و انتقادات">
              <Flex vertical gap="middle">
                <Text>
                  نظرات شما برای کمک به ما در درک بهتر نیازهای شما و ارائه خدمات
                  مطابق با آن ارزشمند است.
                </Text>
                <Form
                  name="user-profile-address-form"
                  layout="vertical"
                  initialValues={{
                    rating: 0,
                    comment: "",
                  }}
                  onFinish={onFinish}
                  onFinishFailed={onFinishFailed}
                  autoComplete="on"
                  requiredMark={false}
                >
                  <Row gutter={[16, 0]}>
                    <Col span={24}>
                      <Form.Item<FieldType>
                        label=""
                        name="rating"
                        rules={[
                          {
                            required: true,
                            message: "لطفا امتیازات خود را وارد کنید!",
                          },
                        ]}
                      >
                        <Flex>
                          <Rate
                            tooltips={RATING_DESC}
                            onChange={setValue}
                            value={value}
                            allowClear
                            allowHalf
                          />
                          {value ? (
                            <span className="ant-rate-text">
                              {RATING_DESC[Math.round(value) - 1]}
                            </span>
                          ) : (
                            ""
                          )}
                        </Flex>
                      </Form.Item>
                    </Col>
                    <Col span={24}>
                      <Form.Item<FieldType>
                        label="نظر خود را بنویسید"
                        name="comment"
                        rules={[
                          {
                            required: true,
                            message: "لطفا نظر خود را وارد کنید!",
                          },
                        ]}
                      >
                        <Input.TextArea style={{ width: "50%" }} />
                      </Form.Item>
                    </Col>
                  </Row>

                  <Form.Item>
                    <Button
                      type="primary"
                      htmlType="submit"
                      icon={<SendOutlined rotate={10} />}
                      iconPosition={"end"}
                    >
                      ارسال نظر
                    </Button>
                  </Form.Item>
                </Form>
              </Flex>
            </Card>
          </Col>
        </Row>
      </Layout>
    </ConfigProvider>
  );
};
export default Support;
