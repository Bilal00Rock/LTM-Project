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
import { useState } from "react";
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
                      <Button
                        style={{
                          padding: 8,
                          backgroundColor: "rgba(254, 81, 81, 0.07)",
                          color: "#FE5151",
                          border: "1px solid #FE5151",
                          fontSize: "12px",
                        }}
                        // onClick={() => handleDelete(record.id)}
                      >
                        <svg
                          width="19px"
                          height="19px"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                          style={{ marginLeft: "-8px", marginRight: "-3px" }}
                        >
                          <g id="SVGRepo_bgCarrier" stroke-width="0" />

                          <g
                            id="SVGRepo_tracerCarrier"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />

                          <g id="SVGRepo_iconCarrier">
                            <path
                              d="M20 14V7C20 5.34315 18.6569 4 17 4H12M20 14L13.5 20M20 14H15.5C14.3954 14 13.5 14.8954 13.5 16V20M13.5 20H7C5.34315 20 4 18.6569 4 17V12"
                              stroke="#FE5151"
                              stroke-width="2"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                            />
                            <path
                              d="M4 4L6.5 6.5M9 9L6.5 6.5M6.5 6.5L9 4M6.5 6.5L4 9"
                              stroke="#FE5151"
                              stroke-width="2"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                            />
                          </g>
                        </svg>
                        حذف
                      </Button>
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
                      <Button
                        style={{
                          padding: 8,
                          backgroundColor: "rgba(254, 81, 81, 0.07)",
                          color: "#FE5151",
                          border: "1px solid #FE5151",
                          fontSize: "12px",
                          marginRight: "30px",
                        }}
                        // onClick={() => handleDelete(record.id)}
                      >
                        <svg
                          width="19px"
                          height="19px"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                          style={{ marginLeft: "-8px", marginRight: "-3px" }}
                        >
                          <g id="SVGRepo_bgCarrier" stroke-width="0" />

                          <g
                            id="SVGRepo_tracerCarrier"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />

                          <g id="SVGRepo_iconCarrier">
                            <path
                              d="M20 14V7C20 5.34315 18.6569 4 17 4H12M20 14L13.5 20M20 14H15.5C14.3954 14 13.5 14.8954 13.5 16V20M13.5 20H7C5.34315 20 4 18.6569 4 17V12"
                              stroke="#FE5151"
                              stroke-width="2"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                            />
                            <path
                              d="M4 4L6.5 6.5M9 9L6.5 6.5M6.5 6.5L9 4M6.5 6.5L4 9"
                              stroke="#FE5151"
                              stroke-width="2"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                            />
                          </g>
                        </svg>
                        حذف
                      </Button>
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
                      <Button
                        style={{
                          padding: 8,
                          backgroundColor: "rgba(254, 81, 81, 0.07)",
                          color: "#FE5151",
                          border: "1px solid #FE5151",
                          fontSize: "12px",
                          marginRight:"30px"
                        }}
                        // onClick={() => handleDelete(record.id)}
                      >
                        <svg
                          width="19px"
                          height="19px"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                          style={{ marginLeft: "-8px", marginRight: "-3px" }}
                        >
                          <g id="SVGRepo_bgCarrier" stroke-width="0" />

                          <g
                            id="SVGRepo_tracerCarrier"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />

                          <g id="SVGRepo_iconCarrier">
                            <path
                              d="M20 14V7C20 5.34315 18.6569 4 17 4H12M20 14L13.5 20M20 14H15.5C14.3954 14 13.5 14.8954 13.5 16V20M13.5 20H7C5.34315 20 4 18.6569 4 17V12"
                              stroke="#FE5151"
                              stroke-width="2"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                            />
                            <path
                              d="M4 4L6.5 6.5M9 9L6.5 6.5M6.5 6.5L9 4M6.5 6.5L4 9"
                              stroke="#FE5151"
                              stroke-width="2"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                            />
                          </g>
                        </svg>
                        حذف
                      </Button>
                      <Button
                        style={{
                          padding: 8,
                          backgroundColor: "rgba(2, 251, 2, 0.1)",
                          color: "rgb(0, 153, 0)",
                          border: "1px solid rgb(0, 153, 0)",
                          fontSize: "12px",
                          marginRight:"10px"
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
