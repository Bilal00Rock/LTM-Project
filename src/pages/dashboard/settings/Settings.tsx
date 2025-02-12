import { PageHeader } from "../../../components/PageHeader/PageHeader";
import {
  HomeOutlined,
  SolutionOutlined,
  FileDoneOutlined,
  MessageOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import {
  Button,
  Col,
  ConfigProvider,
  Descriptions,
  Layout,
  Row,
  theme,
  Image,
  Typography,
  Tabs,
  TabsProps,
  DescriptionsProps,
  Space,
  Result,
  Steps,
  Flex,
} from "antd";
import { Card } from "../../../components/Card/Card";
import { useState } from "react";
import ChangePassForm from "../../../components/Forms/ChangePass/ChangePassForm";
import ChangePassOTPform from "../../../components/Forms/ChangePass/ChangePassOTPform";
import { InfoForm } from "../../../components/Forms/Information/InfoForm";
import ChangeNumForm from "../../../components/Forms/ChangeNum/ChangeNumForm";
import ChangeNumOTPform from "../../../components/Forms/ChangeNum/ChangeNumOTPform";
import useAuth from "../../../hooks/useAuth";
const { Link } = Typography;

const { Text, Title } = Typography;

const Settings = () => {
  const { token } = theme.useToken();
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
  const [current, setCurrent] = useState(0);
  const [current2, setCurrent2] = useState(0);
  const authContext = useAuth();

  if (!authContext) {
    throw new Error("useContext must be used within an AuthProvider");
  }

  const { auth, setAuth ,persist, setPersist} = authContext;
  const onClick = () => {
    console.log("Done");
    setCurrent(0);
  };
  const onClick2 = () => {
    console.log("Done");
    setCurrent2(0);
  };
  //Change Password
  const steps = [
    {
      title: "ورود اطلاعات",
      content: <ChangePassForm current={current} setCurrent={setCurrent} />,
      icon: <SolutionOutlined />,
    },
    {
      title: "رمز یکبارمصرف",
      content: <ChangePassOTPform current={current} setCurrent={setCurrent} />,
      icon: <MessageOutlined />,
    },
    {
      title: "انجام شد",
      content: (
        <>
          <Result
            status="success"
            title="عملیات با موفقیت انجام شد!"
            subTitle="رمز شما با موفقیت تغییر یافت!"
          />

          <Button block type="default" onClick={onClick}>
            انجام شد!
          </Button>
        </>
      ),
      icon: <FileDoneOutlined />,
    },
  ];
  const stepItems = steps.map((item) => ({
    key: item.title,
    title: item.title,
    icon: item.icon,
  }));
  //Change Phone Number
  const steps2 = [
    {
      title: "ورود اطلاعات",
      content: <ChangeNumForm current={current2} setCurrent={setCurrent2} />,
      icon: <SolutionOutlined />,
    },
    {
      title: "رمز یکبارمصرف",
      content: <ChangeNumOTPform current={current2} setCurrent={setCurrent2} />,
      icon: <MessageOutlined />,
    },
    {
      title: "انجام شد",
      content: (
        <>
          <Result
            status="success"
            title="عملیات با موفقیت انجام شد!"
            subTitle="شماره تلفن شما با موفقیت تغییر یافت!"
          />

          <Button block type="default" onClick={onClick2}>
            انجام شد!
          </Button>
        </>
      ),
      icon: <FileDoneOutlined />,
    },
  ];
  const stepItems2 = steps.map((item) => ({
    key: item.title,
    title: item.title,
    icon: item.icon,
  }));
  console.log(auth)
  const DESCRIPTION_ITEMS: DescriptionsProps["items"] = [
    {
      key: "name",
      label: "نام و نام خانوادگی",
      children: (
        <Space>
          <b>دکتر</b> {auth.firstName} {auth.lastName} 

        </Space>
      ),
    },
    // {
    //   key: "n_id",
    //   label: "کد ملی",
    //   children: <span></span>,
    // },
    {
      key: "D_id",
      label: "شماره نظام پزشکی",
      children: <span>{auth.Pid}</span>,
    },
    {
      key: "phoneNO",
      label: "شماره تماس",
      children: <Link>{auth.PhoneNumber}</Link>,
    },
    // {
    //   key: "work_adrs",
    //   label: "آدرس مطب: ",
    //   children: <span>مشهد، خیابان شهید بهشتی، کوچه ۱، پلاک ۱۸</span>,
    // },
  ];
  const tabItems: TabsProps["items"] = [
    {
      key: "1",
      label: "مدیریت پروفایل",
      children: (
        <Flex vertical>
          <InfoForm />,
        <Card title="تغییر شماره تماس">
          <Col span={20}>
            <Steps current={current2} items={stepItems2} />
            <div>{steps2[current2].content}</div>
          </Col>
        </Card>
        </Flex>
      ),
    },
    {
      key: "2",
      label: "مدیریت امنیتی",
      children: (
        <Card title="تغییر رمز عبور">
          <Col span={20}>
            <Steps current={current} items={stepItems} />
            <div>{steps[current].content}</div>
          </Col>
        </Card>
      ),
    },
    // {
    //   key: "3",
    //   label: "مدیریت حساب",
    //   children: "Content of Tab Pane 3",
    // },
  ];
  return (
    <ConfigProvider
      theme={{
        components: {},
      }}
    >
      <Layout style={layoutStyle}>
        <PageHeader
          title="تنظیمات"
          icon={<SettingOutlined size={30} />}
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
                  <SettingOutlined />
                  <span>تنظیمات</span>
                </>
              ),
            },
          ]}
        />
        <Row gutter={[16, 16]}>
          <Col span={21}>
            <Descriptions
              title="اطلاعات کاربر"
              items={DESCRIPTION_ITEMS}
              column={{ xs: 1, sm: 2, md: 2, lg: 3, xl: 3, xxl: 4 }}
            />
          </Col>
          <Col span={3}>
            <Image
              src={process.env.PUBLIC_URL + "/img/logo.png"}
              alt="user profile image"
              height="100%"
              width="100%"
              fallback="data:image/png;base64,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"
            />
          </Col>
          <Col span={24}>
            <Tabs type="card" defaultActiveKey="1" items={tabItems}  />
          </Col>
        </Row>
      </Layout>
    </ConfigProvider>
  );
};
export default Settings;
