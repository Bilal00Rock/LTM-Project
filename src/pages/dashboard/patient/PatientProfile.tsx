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
  DatePicker,
  Typography,
} from "antd";
import { Card } from "../../../components/Card/Card";
import { useFetchData } from "../../../hooks";
import { useParams } from "react-router-dom";
import { PatientsApi } from "../../../api";
import { useState } from "react";
import NutritionState from "../../../components/Charts/Patinet/NutritionState";
import MentalState from "../../../components/Charts/Patinet/MentalState";
import SleepState from "../../../components/Charts/Patinet/SleepState";

import {
  DatePicker as DatePickerJalali,
  Calendar,
  JalaliLocaleListener,
} from "antd-jalali"; // Ant Design DatePicker
import moment from "moment-jalaali"; // Jalali Moment
import fa_IR from "antd/lib/locale/fa_IR";
import en_US from "antd/lib/locale/en_US";

// Ensure the date picker uses Persian locale
import "moment/locale/fa";
import "antd/dist/reset.css"; // Import Ant Design styles
import { MdCenterFocusStrong } from "react-icons/md";
import { createEnumMember } from "typescript";
import WorkoutState from "../../../components/Charts/Patinet/WorkoutState";
import SeizureChart from "../../../components/Charts/Patinet/SeizureChart";

const PatientProfile = () => {
  const { id } = useParams<{ id: string }>();
  // Date state for range picker (default to start to now)
  const [dates, setDates] = useState<[moment.Moment, moment.Moment]>([
    moment().locale("fa").subtract(1, "jMonth"), // Start of the Jalali year
    moment(), // Current date
  ]);
  const from = dates[0].locale("en").format("YYYY-MM-DD");
  const to = dates[1].locale("en").format("YYYY-MM-DD");
  //console.log(from , to);
  //fetch data from API
  const {
    data: patientData,
    loading: patientDataLoading,
    error: error,
    //} = useFetchData(`${PatientsApi.getbyid}?PhoneNumber=${id}`);
  } = useFetchData(
    `${PatientsApi.getbyid}?From=${from}&To=${to}&PhoneNumber=${id}`
  );
  //} = useFetchData(`${PatientsApi.getbyid}`);
  //console.log(`${PatientsApi.getbyid}?PhoneNumber=${id}`);
  //console.log(patientData);
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
  const patientInfo: DescriptionsProps["items"] = patientData
    ? [
        {
          key: "fullName",
          label: "نام و نام خانوادگی",
          children: patientData?.fullName,
        },
        {
          key: "phoneNumber",
          label: "شماره تماس",
          children: patientData?.phoneNumber,
        },
        //{ key: "n_id", label: "کد ملی", children: patientData[0]?.n_id },
        {
          key: "gender",
          label: "جنسیت",
          children:
            patientData?.gender === "Male"
              ? "مرد"
              : patientData?.gender === "Female"
              ? "زن"
              : "",
        },
        { key: "birthdate", label: "تاریخ تولد", children: moment(patientData?.birthdate).format("jYYYY/jMM/jDD") },
        {
          key: "maritalStatus",
          label: "وضیعت تاهل",
          children:
            patientData?.maritalStatus === "Single"
              ? "مجرد"
              : patientData?.maritalStatus === "Married"
              ? "متاهل"
              : "", //correct the marital
        },
        // { key: "address", label: "آدرس", children: patientData?.address },
      ]
    : [];
  const medicalInfo: DescriptionsProps["items"] =
    patientData.medicalInformations
      ? [
          {
            key: "dateOfDiagnose",
            label: "تاریخ تشخیص",
            children: moment(patientData?.medicalInformations.diagnosisDate).format("jYYYY/jMM/jDD"),
          },
          {
            key: "epitype",
            label: "نوع صرع",
            children: patientData?.medicalInformations.epilepsyTypeId,
          },
          {
            key: "epiconsciouns",
            label: "وضیعت آگاهی صرع",
            children:
              patientData?.medicalInformations.epilepsyConsciousnessTypeId,
          },
          {
            key: "epimove",
            label: "وضیعت حرکتی صرع",
            children: patientData?.medicalInformations.movementStatus,
          },
          {
            key: "typesecond",
            label: "نوع دوم صرع",
            children: patientData?.medicalInformations.epilepsySecondType,
          },
          {
            key: "medicine",
            children: (
              <Flex gap={5} align="flex-start">
                <Button size="middle" onClick={showModal}>
                  دارو ها
                </Button>{" "}
                <Button size="middle" onClick={showotherModal}>
                  سایر مشخصات
                </Button>
              </Flex>
            ),
          },
        ]
      : [];

  // Medicines breakdown (fetched from the API)
  const currentMedications =
    patientData?.medicalInformations?.currentAntiepilepticMedicineList || [];
  const pastMedications =
    patientData?.medicalInformations?.pastAntiepilepticMedicineList || [];
  const otherMedications =
    patientData?.medicalInformations?.otherMedicineList || [];
  //Results breackdown
  const EEGresult = patientData[0]?.results || [];
  // Function to render medicine lists
  // const renderMedicines = (medications: any[]) => (
  //   <div>
  //     {/* <Typography.Title level={4}>{title}</Typography.Title> */}

  //     {medications.length > 0 ? (
  //       medications.map((med, index) => (
  //         <div key={index}>
  //           {med.name && (
  //             <p>
  //               <strong>نام دارو:</strong> {med.name}
  //             </p>
  //           )}
  //           {med.amount && (
  //             <p>
  //               <strong>مقدار:</strong> {med.amount}
  //             </p>
  //           )}
  //           {med.duration && (
  //             <p>
  //               <strong>مدت زمان مصرف:</strong> {med.duration}
  //             </p>
  //           )}
  //           {med.complications && (
  //             <p>
  //               <strong>عوارض:</strong> {med.complications}
  //             </p>
  //           )}
  //           <Divider />
  //         </div>
  //       ))
  //     ) : (
  //       <p>دارویی ثبت نشده است</p>
  //     )}
  //   </div>
  // );
  const renderMedicines = (medications: any[]) => (
    <div>
      {medications.length > 0 ? (
        medications.map((med, index) => (
          <div key={index}>
            {med.medicine?.name && (
              <p>
                <strong>نام دارو:</strong> {med.medicine.name}
              </p>
            )}
            {med.medicine?.type && (
              <p>
                <strong>نوع دارو:</strong> {med.medicine.type}
              </p>
            )}
            {med.amount !== undefined && (
              <p>
                <strong>مقدار:</strong> {med.amount}
              </p>
            )}
            {med.durationOfUseTypeId !== undefined && (
              <p>
                <strong>شناسه مدت زمان مصرف:</strong> {med.durationOfUseTypeId}
              </p>
            )}
            {med.stopDate && (
              <p>
                <strong>تاریخ توقف:</strong> {new Date(med.stopDate).toLocaleDateString('fa-IR')}
              </p>
            )}
             {med.resonOfStop && (
              <p>
                <strong>دلیل توقف:</strong> {med.resonOfStop}
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

  const handleDateChange = (date: any, dateString: [string, string]) => {
    //console.log(date);

    const start = moment(date[0].format("YYYY-MM-DD"), "jYYYY/jMM/jDD");
    const end = moment(date[1].format("YYYY-MM-DD"), "jYYYY/jMM/jDD");

    setDates([start, end]);
    let from = start.locale("en").format("YYYY-MM-DD");
    let to = end.locale("en").format("YYYY-MM-DD");
  };
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
          Button: {
            controlHeight: 22,
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

          <Divider />
          <Col span={24}>
            <b style={{ fontSize: 25 }}>گزارش های آماری</b>

            {/* Jalali Date Range Picker */}
            <Flex
              className="date-picker"
              justify={"center"}
              align={"center"}
              gap={20}
            >
              <ConfigProvider locale={fa_IR} direction="rtl">
                <JalaliLocaleListener />
                <DatePickerJalali.RangePicker
                  onChange={handleDateChange}
                  placeholder={["تاریخ شروع", "تاریخ پایان"]}
                />
              </ConfigProvider>
              <Typography>
                محدوده تاریخ انتخاب شده: {dates[0].format("jYYYY/jMM/jDD")} -{" "}
                {dates[1].format("jYYYY/jMM/jDD")}
              </Typography>
            </Flex>

            {/* Display the selected date range */}
            <div></div>
          </Col>

          <Col span={8}>
            <Card title={"وضیعت تغذیه بیمار"} loading={patientDataLoading}>
              <NutritionState data={patientData} />
            </Card>
          </Col>

          <Col span={8}>
            <Card title={"وضیعت تشنج بیمار"} loading={patientDataLoading}>
              <SeizureChart data={patientData} />
            </Card>
          </Col>
          <Col span={8}>
            <Card title={"وضیعت روحی بیمار"} loading={patientDataLoading}>
              <MentalState data={patientData} />
            </Card>
          </Col>
          <Col span={12}>
            <Card title={"وضیعت تحرک بیمار"} loading={patientDataLoading}>
              <WorkoutState data={patientData} />
            </Card>
          </Col>
          <Col span={12}>
            <Card title={"وضیعت خواب بیمار"} loading={patientDataLoading}>
              <SleepState data={patientData} />
            </Card>
          </Col>
        </Row>
      </Layout>
    </ConfigProvider>
  );
};
export default PatientProfile;
