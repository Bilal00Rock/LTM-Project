import { Col, ConfigProvider, Flex, Layout, Row, Space } from "antd/es";
import { HomeOutlined } from "@ant-design/icons";
import { PageHeader } from "../../../components/PageHeader/PageHeader";
import { Card } from "../../../components/Card/Card";
import EpiTypeChart from "../../../components/Charts/Dashbaord/EpiTypeChart";
import ChartTimeline from "../../../components/Charts/Dashbaord/Chart";
import { StatsCard } from "../../../components/StatsCard/StatsCard";
import { useFetchData } from "../../../hooks";
import { DashDataApi } from "../../../api";
import { AdminPanelAPI } from "../../../api/axios";
import useFetchDataPOST from "../../../hooks/useFetchDataPOST";
import { AdminPatientsTable } from "../../../components/Table/AdminPatients";
import { AdminDoctorTable } from "../../../components/Table/AdminDoctors";
import { AdminPendingsTable } from "../../../components/Table/AdminPendings";
const layoutStyle: React.CSSProperties = {
  background: "#F2FCFC",
  borderRadius: "6px",
  boxShadow: "0 2px 5px rgba(0, 0, 0, 0.25)",
  display: "flex",
  padding: "15px",
  height: "inherit",
};

const AdminDash = () => {

  //APIs
  const {
    data: DocCount,
    loading: DocCountLoading,
    error: docerror,
  } = useFetchDataPOST(AdminPanelAPI.getDoctorCount);
  const {
    data: PCount,
    loading: PCountLoading,
    error: Perror,
  } = useFetchDataPOST(AdminPanelAPI.getPatientsCount);
  const {
    data: UPData,
    loading:UPDataLoading,
    error:UPerror,
  } = useFetchDataPOST(AdminPanelAPI.getUnregP);
  const {
    data: Pdata,
    loading: PdataLoading,
    error: perror,
  } = useFetchDataPOST(AdminPanelAPI.getPatients);

  return (
    <ConfigProvider>
      <Layout style={layoutStyle}>
        <PageHeader
          title="پنل ادمین"
          icon={<HomeOutlined size={30} />}
          backbtn={false}
          breadcrumbs={undefined}
        />

        <Row gutter={[12, 24]}>
          
          <Col xs={24} lg={8}>
            <StatsCard title={"تعداد دکتر های ثبت شده"} value={DocCount} error={docerror} loading={DocCountLoading}/>
          </Col>
          <Col xs={24} lg={8}>
            <StatsCard title={"تعداد بیماران ثبت شده"} value={PCount} error={Perror} loading={PCountLoading}/>
          </Col>    
          <Col xs={24} lg={8}>
            <StatsCard title={"تعداد بیماران ثبت نام نشده"} value={UPData} error={UPerror} loading={UPDataLoading}/>
          </Col> 
          <Col xs={24} lg={24}>
            <Card title={"لیست دکتر ها"}>
            <AdminDoctorTable title="لیست دکتر ها"/>
            </Card>
          </Col>
          <Col xs={24} lg={24}>
            <Card title={"لیست بیماران "}>
            <AdminPatientsTable title="لیست بیماران"/>
            </Card>
          </Col>
          <Col xs={24} lg={24}>
            <Card title={"لیست بیماران "}>
            <AdminPendingsTable title="لیست بیماران"/>
            </Card>
          </Col>
        </Row>
      </Layout>
    </ConfigProvider>
  );
};
export default AdminDash;
