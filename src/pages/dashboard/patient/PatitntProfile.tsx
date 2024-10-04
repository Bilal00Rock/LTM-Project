import { PageHeader } from "../../../components/PageHeader/PageHeader";
import {
  HomeOutlined,
  ContactsOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import { BsPersonVcard } from "react-icons/bs";
import {
  Button,
  Col,
  ConfigProvider,
  Descriptions,
  DescriptionsProps,
  Divider,
  Layout,
  Row,
  theme,
  Typography,
} from "antd";
import { useState } from "react";
import { Card } from "../../../components/Card/Card";
import SleepStat from "../../../components/Charts/SleepStat";
const { Link } = Typography;
const PatitntProfile = () => {
  const [open, setOpen] = useState(false);
  const { token } = theme.useToken();
  const [current, setCurrent] = useState(0);

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
    setCurrent(0);
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
  const DESCRIPTION_ITEMS: DescriptionsProps["items"] = [
    {
      key: "name",
      label: "نام و نام خانوادگی",
      children: <span>امیر محمدی</span>,
    },
    {
      key: "n_id",
      label: "کد ملی",
      children: <span>۰۱۳۲۲۹۰۱۲۹</span>,
    },
    {
      key: "age",
      label: "سن",
      children: <span>15</span>,
    },
    {
      key: "address",
      label: "آدرس",
      children: <span>مشهد، خیابان شهید بهشتی، کوچه ۱، پلاک ۱۸</span>,
    },
    {
      key: "phoneNO",
      label: "شماره تماس",
      children: <Link href="tel:+989123456789">۰۹۱۲۳۴۵۶۷۸۹</Link>,
    },
    {
      key: "type",
      label: "نوع صرع",
      children: <span> فوکال و ژنرالیزه</span>,
    },
    {
      key: "description",
      label: "توضیحات",
      children: <span>توضیحات تکمیلی</span>,
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
          title="اطلاعات بیمار"
          icon={<BsPersonVcard size={30} />}
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
                  <ContactsOutlined />
                  <span>مدیرت بیماران</span>
                </>
              ),
            },
            {
              title: "لیست بیماران",
            },
          ]}
        />
        <Row gutter={[16, 16]}>
          <Col span={24}>
            <Descriptions
              title=""
              items={DESCRIPTION_ITEMS}
              column={{ xs: 1, sm: 2, md: 2, lg: 3, xl: 3, xxl: 4 }}
            />
          </Col>
          <Col span={24}>
            <Divider />
            <b style={{ fontSize: 25 }}>گزارشات</b>
          </Col>
          <Col span={12}>
            <Card children={<></>}/>
          </Col>

          <Col span={12}>
            <Card title={'وضیعت خواب بیمار'}><SleepStat /></Card>
          </Col>
        </Row>
      </Layout>
    </ConfigProvider>
  );
};
export default PatitntProfile;
