import { Col, ConfigProvider, Layout, Row, Space } from "antd/es";
import { HomeOutlined } from "@ant-design/icons";
import { PageHeader } from "../../components/PageHeader/PageHeader";
import ReactApexChart from "react-apexcharts";
import { useStylesContext } from "../../context";
import { Card } from "../../components/Card/Card";
import Chart from "react-apexcharts";
import Chartw from "../../components/Charts/Chart";
import EpiTypeChart from "../../components/Charts/EpiTypeChart";
import SeizuresChart from "../../components/Charts/SeizuresChart";
import ChartTimeline from "../../components/Charts/Chart";
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
        
        <Row {...stylesContext?.rowProps}>

          <Col xs={24} lg={8}>
            <Card title={"آمار تشنج ها"}>
            <SeizuresChart/>
            </Card>
          </Col>
          <Col xs={24} lg={8}>
            <Card title={"توزیع انواع صرع"}>
              <EpiTypeChart/>
            </Card>
          </Col>
          <Col xs={24} lg={8}>
            <Card title={"توزیع انواع صرع"}>
              <ChartTimeline/>
            </Card>
          </Col>
        </Row>
        
      </Layout>
    </ConfigProvider>
  );
};
export default Overview;
