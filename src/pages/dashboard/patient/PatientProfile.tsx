import { PageHeader } from "../../../components/PageHeader/PageHeader";
import {
  HomeOutlined,
  ContactsOutlined,
  DownOutlined,
  UpOutlined,
} from "@ant-design/icons";
import { BsPersonVcard } from "react-icons/bs";
import {
  Alert,
  Button,
  Carousel,
  Col,
  ConfigProvider,
  Descriptions,
  DescriptionsProps,
  Divider,
  Flex,
  Layout,
  Modal,
  Row,
  Tabs,
  TabsProps,
  theme,
} from "antd";
import { Card } from "../../../components/Card/Card";
import { useFetchData } from "../../../hooks";
import { useParams } from "react-router-dom";
import { PatientsApi } from "../../../api";
import { useState } from "react";
import NutritionState from "../../../components/Charts/Patinet/NutritionState";
import MentalState from "../../../components/Charts/Patinet/MentalState";
import SleepState from "../../../components/Charts/Patinet/SleepState";

const PatientProfile = () => {
  const { id } = useParams<{ id: string }>();
  //fetch data from API
  const {
    data: patientData,
    loading: patientDataLoading,
    error: error,
  } = useFetchData(`${PatientsApi.getbyid}?PhoneNumber=${id}`);
//} = useFetchData(`${PatientsApi.getbyid}`);
  console.log(`${PatientsApi.getbyid}?PhoneNumber=${id}`);
  //console.log(patientdata);
  //for theme
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
  const [isMedModalOpen, setIsMedModalOpen] = useState(false);
  const [isOtherModalOpen, setOtherModalOpen] = useState(false);
  const showModal = () => {
    setIsMedModalOpen(true);
  };
  const showotherModal = () => {
    setOtherModalOpen(true);
  };
  const handleOk = () => {
    setIsMedModalOpen(false);
    setOtherModalOpen(false);
  };

  const handleCancel = () => {
    setIsMedModalOpen(false);
    setOtherModalOpen(false);
  };
  const patientInfo: DescriptionsProps["items"] =
    patientData && patientData[0]
      ? [
          {
            key: "name",
            label: "نام و نام خانوادگی",
            children: patientData[0]?.name,
          },
          {
            key: "phoneNO",
            label: "شماره تماس",
            children: patientData[0]?.phoneNO,
          },
          { key: "n_id", label: "کد ملی", children: patientData[0]?.n_id },
          {
            key: "gender",
            label: "جنسیت",
            children: patientData[0]?.gender === "male" ? "مرد" : "زن",
          },
          { key: "age", label: "سن", children: patientData[0]?.age },
          {
            key: "maritalState",
            label: "وضیعت تاهل",
            children:
              patientData[0]?.maritalState === "single" ? "مجرد" : "متاهل",
          },
          { key: "address", label: "آدرس", children: patientData[0]?.address },
        ]
      : [];
  const medicalInfo: DescriptionsProps["items"] =
    patientData && patientData[0]
      ? [
          {
            key: "dateOfDiagnose",
            label: "تاریخ تشخیص",
            children: patientData[0]?.diagnoseDate,
          },
          { key: "epitype", label: "نوع صرع", children: patientData[0]?.type },
          {
            key: "epiconsciouns",
            label: "وضیعت آگاهی صرع",
            children: patientData[0]?.consciousness,
          },
          {
            key: "epimove",
            label: "وضیعت حرکتی صرع",
            children: patientData[0]?.movementStatus,
          },
          {
            key: "typesecond",
            label: "نوع دوم صرع",
            children: patientData[0]?.secondaryType,
          },
          {
            key: "medicine",
            children: (
              <Flex gap={5}>
                <Button onClick={showModal}>دارو ها</Button>{" "}
                <Button onClick={showotherModal}>سایر مشخصات</Button>
              </Flex>
            ),
          },
        ]
      : [];

  // Medicines breakdown (fetched from the API)
  const currentMedications = patientData[0]?.medicines?.current || [];
  const pastMedications = patientData[0]?.medicines?.past || [];
  const otherMedications = patientData[0]?.medicines?.other || [];
//Results breackdown
const EEGresult = patientData[0]?.results || [];
  // Function to render medicine lists
  const renderMedicines = (medications: any[]) => (
    <div>
      {/* <Typography.Title level={4}>{title}</Typography.Title> */}

      {medications.length > 0 ? (
        medications.map((med, index) => (
          <div key={index}>
            {med.name && (
            <p>
              <strong>نام دارو:</strong> {med.name}
            </p>
            )}
            {med.amount && (
            <p>

              <strong>مقدار:</strong> {med.amount}
            </p>
          )}
            {med.duration && (
            <p>
              <strong>مدت زمان مصرف:</strong> {med.duration}
            </p>
          )}
            {med.complications && (
              <p>
                <strong>عوارض:</strong> {med.complications}
              </p>
            )}
            <Divider />
          </div>
        ))
      ) : (
        <p>دارویی ثبت نشده است</p>
      )}
    </div>
  );
  const renderResults = (Result: any[]) => (
    <div>
      {Result.length > 0 ? (
        Result.map((res, index) => (
          <div key={index}>
            {res.title && (
              <p>
                <strong>نام آزمایش:</strong> {res.title}
              </p>
            )}
            {res.date && (
              <p>
                <strong>تاریخ:</strong> {res.date}
              </p>
            )}
            {res.details && (
              <p>
                <strong> شرح نتیجه:</strong> {res.details}
              </p>
            )}
            <Divider />
          </div>
        ))
      ) : (
        <p>آزمایشی ثبت نشده است</p>
      )}
    </div>
  );
  const tabItems: TabsProps["items"] = [
    {
      key: "1",
      label: "داروهای ضد صرع قبلی",
      children: <>{renderMedicines(pastMedications)}</>,
    },
    {
      key: "2",
      label: "داروهای صد صرع فعلی",
      children: <> {renderMedicines(currentMedications)}</>,
    },
    {
      key: "3",
      label: "سایر داروها",
      children: <>{renderMedicines(otherMedications)}</>,
    },
  ];
  const othertabItems: TabsProps["items"] = [
    {
      key: "1",
      label: "نتایج آزمایش ها",
      children: <>{renderResults(EEGresult)}</>,
    },
    {
      key: "2",
      label: "سابقه شکایت با بیماری",
      children: <> {renderMedicines(currentMedications)}</>,
    },
    {
      key: "3",
      label: "اجتماعی",
      children: <>{renderMedicines(otherMedications)}</>,
    },
  ];
  interface AntdArrowProps {
    currentSlide?: number;
    slideCount?: number;
  }

  interface ArrowProps {
    direction: "up" | "down";
  }

  const Arrow = ({
    currentSlide,
    direction,
    slideCount,
    ...carouselProps
  }: ArrowProps & AntdArrowProps) =>
    direction === "up" ? (
      <Button
        type="link"
        {...carouselProps}
        style={{ paddingLeft: 60, paddingBottom: 5, color: "black" }}
      >
        اطلاعات فردی
      </Button>
    ) : (
      <Button
        type="link"
        {...carouselProps}
        style={{ paddingLeft: 65, paddingTop: 5, color: "black" }}
      >
        اطلاعات پزشکی{" "}
      </Button>
    );
  if (error)
    return (
      <Alert
        message="Error"
        description={error.toString()}
        type="error"
        showIcon
      />
    );
  return (
    <ConfigProvider
      theme={{
        components: {
          Carousel: {
            /* here is your component tokens */
            colorBgContainer: "black",
            arrowOffset: -20,
          },
        },
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
            <Card style={{ padding: 15 }} loading={patientDataLoading}>
              <Carousel
                arrows={true}
                dotPosition="left"
                infinite={false}
                nextArrow={<Arrow direction="down" />}
                prevArrow={<Arrow direction="up" />}
              >
                <div>
                  <Descriptions title="اطلاعات فردی" items={patientInfo} />
                </div>
                <div>
                  <Descriptions title="اطلاعات پزشکی" items={medicalInfo} />
                </div>
              </Carousel>
              <Modal
                title={"داروها"}
                open={isMedModalOpen}
                centered
                onCancel={handleCancel}
                footer={
                  <Button type="primary" onClick={handleOk}>
                    تایید
                  </Button>
                }
              >
                <Tabs type="card" defaultActiveKey="1" items={tabItems} />
              </Modal>
              <Modal
                title={"سایر مشخصات"}
                open={isOtherModalOpen}
                centered
                onCancel={handleCancel}
                footer={
                  <Button type="primary" onClick={handleOk}>
                    تایید
                  </Button>
                }
              >
                <Tabs type="card" defaultActiveKey="1" items={othertabItems} />
              </Modal>
            </Card>
          </Col>
          <Col span={24}>
            <Divider />
            <b style={{ fontSize: 25 }}>گزارش های آماری</b>
          </Col>
          <Col span={8}>
            <Card title={"وضیعت تغذیه بیمار"} loading={patientDataLoading} >
            <NutritionState />
            </Card>
          </Col>

          <Col span={8}>
            <Card title={"وضیعت روحی بیمار"} loading={patientDataLoading}>
              
              <MentalState />
            </Card>
          </Col>
          <Col span={8}>
            <Card title={"وضیعت خواب بیمار"} loading={patientDataLoading}>
              <SleepState />
            </Card>
          </Col>
          <Col span={8}>
            <Card title={"وضیعت خواب بیمار"} loading={patientDataLoading}>
              <NutritionState />
            </Card>
          </Col>
          <Col span={8}>
            <Card title={"وضیعت خواب بیمار"} loading={patientDataLoading}>
              <NutritionState />
            </Card>
          </Col>
          <Col span={8}>
            <Card title={"وضیعت خواب بیمار"} loading={patientDataLoading}>
              <NutritionState />
            </Card>
          </Col>
        </Row>
      </Layout>
    </ConfigProvider>
  );
};
export default PatientProfile;
