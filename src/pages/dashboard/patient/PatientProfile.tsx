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
  Table,
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
  const Medinfo = patientData?.medicalInformations || [];
  // Function to render medicine lists


const renderMedicines = (medications: any[]) => {
  const columns = [
    {
      title: 'نام دارو',
      dataIndex: ['medicine', 'name'],
      key: 'name',
    },
    {
      title: 'نوع دارو',
      dataIndex: ['medicine', 'type'],
      key: 'type',
    },
    {
      title: 'مقدار',
      dataIndex: 'amount',
      key: 'amount',
    },
    {
      title: 'شناسه مدت زمان مصرف',
      dataIndex: 'durationOfUseTypeId',
      key: 'durationOfUseTypeId',
    },
    {
      title: 'تاریخ توقف',
      dataIndex: 'stopDate',
      key: 'stopDate',
      render: (date : any) => (date ? new Date(date).toLocaleDateString('fa-IR') : '-'),
    },
    {
      title: 'دلیل توقف',
      dataIndex: 'resonOfStop',
      key: 'resonOfStop',
    },
  ];

  return <Table columns={columns} dataSource={medications} rowKey={(record, index: any) => index} pagination={{ responsive: true, position: ["bottomRight"] ,pageSize: 5}}/>;
};
interface FamilyDiseaseHistoryDTO {
  id: number;
  familyDiseasesHistoryTypeId: number;
  name: string;
  relationship: string;
}

interface DrugConsumptionDTO {
  id: number;
  drugTypeId: number;
  dailyAmount: string;
  drugConsumptionDuration: string;
  dateTimeUnitTypeId: number;
}
interface MedicalInfo {
  eegDate?: string;
  eegResult?: string;
  photoDate?: string;
  photoResult?: string;
  otherDiagnosticMeasuresDate?: string;
  otherDiagnosticMeasuresResult?: string;
  firstSeizure?: string;
  lastSeizure?: string;
  yearlySeizureCount?: number;
  seizureInterval?: number;
  seizureTimeUnitId?: number;
  parentFamilyRelationshipId?: number;
  hospitalizationDate?: string;
  hospitalizationCount?: number;
  hospitalizationDuration?: number;
  hospitalizationTimeUnitId?: number;
  systemicDisease?: string;
  pastYearComplaints?: { Id: number }[];
  familyDiseaseHistory: FamilyDiseaseHistoryDTO[];
  drugConsumption: DrugConsumptionDTO[];
  familyDescription: string;
}
const renderResults = (medicalInformation: MedicalInfo) => {
  const results = [
    { category: 'EEG', date: medicalInformation.eegDate, details: medicalInformation.eegResult },
    { category: 'اقدامات تصویربرداری', date: medicalInformation.photoDate, details: medicalInformation.photoResult },
    { category: 'سایر اقدامات تشخیصی', date: medicalInformation.otherDiagnosticMeasuresDate, details: medicalInformation.otherDiagnosticMeasuresResult },
  ];

  const columns = [
    {
      title: 'نتایج',
      dataIndex: 'category',
      key: 'category',
    },
    {
      title: 'تاریخ',
      dataIndex: 'date',
      key: 'date',
      render: (date: string) => (date ? new Date(date).toLocaleDateString('fa-IR') : '-'),
    },
    {
      title: 'نتیجه',
      dataIndex: 'details',
      key: 'details',
    },
  ];

  return <Table columns={columns} dataSource={results} rowKey={(record, index: any) => index} pagination={false} bordered />;
};
 
const renderSeizureInfo = (medicalInfo: MedicalInfo) => {
  const seizureData = [
    { label: 'اولین تشنج', value: medicalInfo.firstSeizure },
    { label: 'آخرین تشنج', value: medicalInfo.lastSeizure },
    { label: 'تعداد تشنج سالانه', value: medicalInfo.yearlySeizureCount },
    { label: 'فاصله بین تشنج‌ها', value: medicalInfo.seizureInterval },
    { label: 'واحد زمان تشنج', value: medicalInfo.seizureTimeUnitId },
    { label: 'ارتباط خانوادگی والدین', value: medicalInfo.parentFamilyRelationshipId },
    { label: 'تاریخ بستری', value: medicalInfo.hospitalizationDate },
    { label: 'تعداد دفعات بستری', value: medicalInfo.hospitalizationCount },
    { label: 'مدت زمان بستری', value: medicalInfo.hospitalizationDuration },
    { label: 'واحد زمان بستری', value: medicalInfo.hospitalizationTimeUnitId },
    { label: 'بیماری‌های سیستمیک', value: medicalInfo.systemicDisease },
    { label: 'شکایات سال گذشته', value: medicalInfo.pastYearComplaints?.map(pyc => pyc.Id).join(', ') },
  ];

  const columns = [
    {
      title: 'مشخصات',
      dataIndex: 'label',
      key: 'label',
    },
    {
      title: 'مقدار',
      dataIndex: 'value',
      key: 'value',
      render: (value: string | number) => (value !== undefined ? value : '-'),
    },
  ];

  return <Table columns={columns} dataSource={seizureData} rowKey={(record, index: any) => index} pagination={false} bordered />;
};
const renderFamilyDiseaseHistory = (medicalInfo: MedicalInfo) => {
  const familyDiseaseData =  medicalInfo.familyDiseaseHistory ? medicalInfo.familyDiseaseHistory.map(fdh => ({
    name: fdh.name,
    relationship: fdh.relationship,
    diseaseHistoryType: fdh.familyDiseasesHistoryTypeId,
  })) : [];

  const columns = [
    {
      title: 'نام بیماری',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'ارتباط خانوادگی',
      dataIndex: 'relationship',
      key: 'relationship',
    },
    {
      title: 'نوع تاریخچه بیماری',
      dataIndex: 'diseaseHistoryType',
      key: 'diseaseHistoryType',
    },
  ];

  return <Table columns={columns} dataSource={familyDiseaseData} rowKey="name" pagination={false} bordered />;
};

const renderDrugConsumption = (medicalInfo: MedicalInfo) => {
  const drugConsumptionData = medicalInfo.drugConsumption ? medicalInfo.drugConsumption.map(dc => ({
    drugName: dc.drugTypeId,
    dailyAmount: dc.dailyAmount,
    duration: dc.drugConsumptionDuration,
    timeUnit: dc.dateTimeUnitTypeId,
  })): [];

  const columns = [
    {
      title: 'نام دارو',
      dataIndex: 'drugName',
      key: 'drugName',
    },
    {
      title: 'مقدار روزانه',
      dataIndex: 'dailyAmount',
      key: 'dailyAmount',
    },
    {
      title: 'مدت زمان مصرف',
      dataIndex: 'duration',
      key: 'duration',
    },
    {
      title: 'واحد زمان مصرف',
      dataIndex: 'timeUnit',
      key: 'timeUnit',
    },
  ];

  return <Table columns={columns} dataSource={drugConsumptionData} rowKey="drugName" pagination={false} bordered />;
};

const renderFamilyDescription = (medicalInfo: MedicalInfo) => {
  return <div>{medicalInfo.familyDescription || '-'}</div>;
};

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
  const medicaltabItems: TabsProps["items"] = [
    {
      key: "1",
      label: "سابقه خانوادگی بیماری های مختلف",
      children: <>{renderFamilyDiseaseHistory(Medinfo)}</>,
    },
    {
      key: "2",
      label: "سابقه سوء مصرف مواد و  دخانیات توسط بیمار",
      children: <> {renderDrugConsumption(Medinfo)}</>,
    },
    {
      key: "3",
      label: "شرح حال خانواده و میانگین درامد",
      children: <>{renderFamilyDescription(Medinfo)}</>,
    },
  ];
  const othertabItems: TabsProps["items"] = [
    {
      key: "1",
      label: "نتایج آزمایش ها",
      children: <>{renderResults(Medinfo)}</>,
    },
    {
      key: "2",
      label: "سابقه شکایت با بیماری",
      children: <> {renderSeizureInfo(Medinfo)}</>,
    },
    {
      key: "3",
      label: "اجتماعی",
      children: <Tabs type="card" defaultActiveKey="1" items={medicaltabItems} />
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
