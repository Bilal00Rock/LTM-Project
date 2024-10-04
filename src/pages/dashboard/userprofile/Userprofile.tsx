import { PageHeader } from "../../../components/PageHeader/PageHeader";
import { HomeOutlined, UserOutlined, } from "@ant-design/icons";
import {
  Col,
  ConfigProvider,
  Descriptions,
  DescriptionsProps,
  Layout,
  Row,
  Tabs,
  TabsProps,
  theme,
  Typography,
  Image,
  Space,
} from "antd";
const { Link } = Typography;
const Userprofile = () => {
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
  const DESCRIPTION_ITEMS: DescriptionsProps["items"] = [
    {
      key: "name",
      label: "نام و نام خانوادگی",
      children: (
        <Space>
          <b>دکتر</b> امیر محمدی
        </Space>
      ),
    },
    {
      key: "n_id",
      label: "کد ملی",
      children: <span>۰۱۳۲۲۹۰۱۲۹</span>,
    },
    {
      key: "D_id",
      label: "شماره نظام پزشکی",
      children: <span>۰۱۳۲۲۹۰۱۲۹</span>,
    },
    {
      key: "phoneNO",
      label: "شماره تماس",
      children: <Link href="tel:+989123456789">۰۹۱۲۳۴۵۶۷۸۹</Link>,
    },
    {
      key: "work_adrs",
      label: "آدرس مطب: ",
      children: <span>مشهد، خیابان شهید بهشتی، کوچه ۱، پلاک ۱۸</span>,
    },
  ];
  const items: TabsProps['items'] = [
    {
      key: '1',
      label: 'Tab 1',
      children: 'Content of Tab Pane 1',
    },
    {
      key: '2',
      label: 'Tab 2',
      children: 'Content of Tab Pane 2',
    },
    {
      key: '3',
      label: 'Tab 3',
      children: 'Content of Tab Pane 3',
    },
  ];
  return (
    <ConfigProvider
      theme={{
        components: {},
      }}
    >
      <Layout style={layoutStyle}>
        <PageHeader
          title=" اطلاعات کاربری"
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
                  <span>پروفایل</span>
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
              src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dXNlcnxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60"
              alt="user profile image"
              height="100%"
              width="100%"
            />
          </Col>
          <Col span={24}>
              <Tabs
                defaultActiveKey="1"
                items={items}
              />
          </Col>
        </Row>
      </Layout>
    </ConfigProvider>
  );
};
export default Userprofile;
