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
import ActiveButton from "../../../components/Table/button/ActiveButton";
import DeactivateButton from "../../../components/Table/button/DeactivateButton";
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
            <Card title={"لیست دکتر ها"}>
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
                clearSelectionTrigger={selectedDoctors.length === 0}
              />
            </Card>
          </Col>

          <Col xs={24} lg={24}>
            <Card title={"لیست بیماران فعال"}>
              <AdminPatientsTable
                title={
                  selectedPatients.length > 0 ? (
                    <Flex align="center" justify="space-between">
                      <span style={{ marginLeft: "20px" }}>
                        {selectedPatients.length} مورد انتخاب شد
                      </span>
                      <span style={{ marginLeft: "10px" }}>
                        <DeleteButton
                          id={selectedPatients.map((d) => d.toString())}
                          onDeleteSuccess={(deletedId) => {
                            setLocalDataPatient((prev) =>
                              prev.filter(
                                (item) => !deletedId.includes(item.id)
                              )
                            );
                            setSelectedPatients([]);
                          }}
                        />
                      </span>

                      <DeactivateButton
                        id={selectedPatients.map((d) => d.toString())}
                        onDeactivateSuccess={(deactivateId) => {
                          // setLocalDataPending((prev) =>
                          //   prev.filter((item) => item.id !== deletedId)
                          // );
                          // setSelectedRowKeys((prev) =>
                          //   prev.filter((key) => key !== deletedId)
                          // );
                        }}
                      />
                    </Flex>
                  ) : (
                    "لیست بیماران فعال"
                  )
                }
                onSelectChange={setSelectedPatients}
                // قبل api
                clearSelectionTrigger={selectedDoctors.length === 0}
              />
            </Card>
          </Col>
          <Col xs={24} lg={24}>
            <Card title={"لیست بیماران در حال ثبت نام"}>
              <AdminPendingsTable
                title={
                  selectedPendingPatients.length > 0 ? (
                    <Flex align="center" justify="space-between">
                      <span style={{ marginLeft: "20px" }}>
                        {selectedPendingPatients.length} مورد انتخاب شد
                      </span>
                      <span style={{ marginLeft: "10px" }}>
                        <DeleteButton
                          id={selectedPendingPatients.map((d) => d.toString())}
                          onDeleteSuccess={(deletedId) => {
                            setLocalDataPending((prev) =>
                              prev.filter(
                                (item) => !deletedId.includes(item.id)
                              )
                            );
                            setSelectedPendingPatients([]);
                          }}
                        />
                      </span>

                      <ActiveButton
                        id={selectedPendingPatients.map((d) => d.toString())}
                        onActiveSuccess={(activeId) => {
                          // setLocalDataPending((prev) =>
                          //   prev.filter((item) => item.id !== deletedId)
                          // );
                          // setSelectedRowKeys((prev) =>
                          //   prev.filter((key) => key !== deletedId)
                          // );
                        }}
                      />
                    </Flex>
                  ) : (
                    "لیست بیماران در حال ثبت نام"
                  )
                }
                onSelectChange={setSelectedPendingPatients}
                // قبل api
                clearSelectionTrigger={selectedDoctors.length === 0}
              />
            </Card>
          </Col>
        </Row>
      </Layout>
    </ConfigProvider>
  );
};
export default AdminDash;
