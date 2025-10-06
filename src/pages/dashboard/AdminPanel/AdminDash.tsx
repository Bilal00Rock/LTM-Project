import { Button, Col, ConfigProvider, Flex, Layout, Row, Space } from "antd/es";
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
import { useEffect, useState } from "react";
import DeleteButton from "../../../components/Table/button/DeleteButton";
import { useLocalTableContext } from "../../../context/LocalTableProvider";
const layoutStyle: React.CSSProperties = {
  background: "#F2FCFC",
  borderRadius: "6px",
  boxShadow: "0 2px 5px rgba(0, 0, 0, 0.25)",
  display: "flex",
  padding: "15px",
  height: "inherit",
};

const AdminDash = () => {
  const [selectedPatients, setSelectedPatients] = useState<React.Key[]>([]);
  const [selectedPendingPatients, setSelectedPendingPatients] = useState<
    React.Key[]
  >([]);
  const [selectedDoctors, setSelectedDoctors] = useState<React.Key[]>([]);
  const {
    localDataDoc,
    setLocalDataDoc,
    localDataPatient,
    setLocalDataPatient,
    localDataPending,
    setLocalDataPending,
  } = useLocalTableContext();

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
    loading: UPDataLoading,
    error: UPerror,
  } = useFetchDataPOST(AdminPanelAPI.getUnregP);
  const {
    data: Pdata,
    loading: PdataLoading,
    error: perror,
  } = useFetchDataPOST(AdminPanelAPI.getPatients);
  useEffect(() => {
    setSelectedDoctors([]);
  }, [localDataDoc]);
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
            <StatsCard
              title={"تعداد دکتر های ثبت شده"}
              value={DocCount}
              error={docerror}
              loading={DocCountLoading}
            />
          </Col>
          <Col xs={24} lg={8}>
            <StatsCard
              title={"تعداد بیماران ثبت شده"}
              value={PCount}
              error={Perror}
              loading={PCountLoading}
            />
          </Col>
          <Col xs={24} lg={8}>
            <StatsCard
              title={"تعداد بیماران ثبت نام نشده"}
              value={UPData}
              error={UPerror}
              loading={UPDataLoading}
            />
          </Col>
          <Col xs={24} lg={24}>
            <Card>
              <AdminDoctorTable
                title={
                  selectedDoctors.length > 0 ? (
                    <Flex align="center" justify="space-between" gap={30}>
                      <span>{selectedDoctors.length} مورد انتخاب شد</span>
                      <DeleteButton
                        id={selectedDoctors.map((d) => d.toString())}
                        onDeleteSuccess={(deletedId) => {
                          setLocalDataDoc((prev) =>
                            prev.filter((item) => !deletedId.includes(item.id))
                          );
                          setSelectedDoctors([]);
                        }}
                      />
                    </Flex>
                  ) : (
                    "لیست دکتر ها"
                  )
                }
                onSelectChange={setSelectedDoctors}
              />
            </Card>
          </Col>

          <Col xs={24} lg={24}>
            <Card title={"لیست بیماران فعال"}>
              <AdminPatientsTable
                title={
                  selectedPatients.length > 0 ? (
                    <Flex align="center" justify="space-between">
                      <span>{selectedPatients.length} مورد انتخاب شد</span>
                      <DeleteButton
                        id={selectedPatients.map((d) => d.toString())}
                        onDeleteSuccess={(deletedId) => {
                          setLocalDataPatient((prev) =>
                            prev.filter((item) => !deletedId.includes(item.id))
                          );
                          setSelectedPatients([]);
                        }}
                      />
                      <Button
                        style={{
                          padding: 8,
                          backgroundColor: "rgba(81, 81, 81, 0.07)",
                          color: "rgb(112, 112, 112)",
                          border: "1px solid rgb(112, 112, 112)",
                          fontSize: "12px",
                          marginRight: "10px",
                        }}
                        // onClick={() => handleDelete(record.id)}
                      >
                        <img
                          src="/img/deactive-account.png"
                          alt="deactive"
                          style={{ width: "20px", marginLeft: "-5px" }}
                        />
                        <span style={{ marginBottom: "-2px" }}>deactivate</span>
                      </Button>
                    </Flex>
                  ) : (
                    "لیست بیماران فعال"
                  )
                }
                onSelectChange={setSelectedPatients}
              />
            </Card>
          </Col>
          <Col xs={24} lg={24}>
            <Card title={"لیست بیماران در حال ثبت نام"}>
              <AdminPendingsTable
                title={
                  selectedPendingPatients.length > 0 ? (
                    <Flex align="center" justify="space-between">
                      <span>
                        {selectedPendingPatients.length} مورد انتخاب شد
                      </span>
                      <DeleteButton
                        id={selectedPendingPatients.map((d) => d.toString())}
                        onDeleteSuccess={(deletedId) => {
                          setLocalDataPending((prev) =>
                            prev.filter((item) => !deletedId.includes(item.id))
                          );
                          setSelectedPendingPatients([]);
                        }}
                      />
                      <Button
                        style={{
                          padding: 8,
                          backgroundColor: "rgba(2, 251, 2, 0.1)",
                          color: "rgb(0, 153, 0)",
                          border: "1px solid rgb(0, 153, 0)",
                          fontSize: "12px",
                          marginRight: "10px",
                        }}
                        // onClick={() => handleDelete(record.id)}
                      >
                        <img
                          src="/img/active-account.png"
                          alt="active"
                          style={{ width: "20px", marginLeft: "-5px" }}
                        />
                        <span style={{ marginBottom: "-2px" }}>active</span>
                      </Button>
                    </Flex>
                  ) : (
                    "لیست بیماران در حال ثبت نام"
                  )
                }
                onSelectChange={setSelectedPendingPatients}
              />
            </Card>
          </Col>
        </Row>
      </Layout>
    </ConfigProvider>
  );
};
export default AdminDash;
