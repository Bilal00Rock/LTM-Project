import { Col, ConfigProvider, Layout, Row, Space } from "antd/es";
import { HomeOutlined } from "@ant-design/icons";
import { PageHeader } from "../../components/PageHeader/PageHeader";
import ReactApexChart from "react-apexcharts";
import { useStylesContext } from "../../context";
import { Card } from "../../components/Card/Card";
import EpiTypeChart from "../../components/Charts/EpiTypeChart";
import ChartTimeline from "../../components/Charts/Chart";
import { StatsCard } from "../../components/StatsCard/StatsCard";
const layoutStyle: React.CSSProperties = {
  background: "#F2FCFC",
  borderRadius: "6px",
  boxShadow: "0 2px 5px rgba(0, 0, 0, 0.25)",
  display: "flex",
  padding: "15px",
  height: "inherit",
};

const Overview = () => {
  const stylesContext = useStylesContext();

  return (
    <ConfigProvider>
      <Layout style={layoutStyle}>
        <PageHeader
          title="داشبورد"
          icon={<HomeOutlined size={30} />}
          backbtn={false}
          breadcrumbs={undefined}
        />
        <Row gutter={[12, 24]}>
          <Col xs={24} lg={8}>
            <StatsCard title={"تعداد تشنج های ثبت شده امروز"} />
          </Col>
          <Col xs={24} lg={8}>
            <StatsCard title={"تعداد بیماران فعال"} />
          </Col>
          <Col xs={24} lg={8}>
            <StatsCard title={"بیماران در حال ثبت نام"} />
          </Col>
          <Col xs={24} lg={12}>
            <Card title={"آمار تشنج ها"}>
              <ChartTimeline />
            </Card>
          </Col>
          <Col xs={24} lg={12}>
            <Card title={"توزیع انواع صرع"}>
              <EpiTypeChart />
            </Card>
          </Col>
        </Row>
      </Layout>
    </ConfigProvider>
  );
};
export default Overview;
