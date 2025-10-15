import { Drawer, Spin, Alert, Row, Col, Flex, Button, Modal, Tabs, Table } from "antd";
import { useFetchData } from "../../hooks"; // فرض می‌شود این هوک داده‌ها را واکشی می‌کند
import moment from "moment-jalaali"; // برای کار با تاریخ شمسی
import React, { useState } from "react"; 

// --- تعریف Props کامپوننت ---
interface ProfileDrawerProps {
  open: boolean;
  onClose: () => void;
  phoneNumber: string | null;
}

const ProfileDrawer: React.FC<ProfileDrawerProps> = ({
  open,
  onClose,
  phoneNumber,
}) => {
  // --- مدیریت وضعیت واکشی داده ---
  const shouldFetch = !!phoneNumber && open;
  // از نوع 'any' برای داده‌ها استفاده می‌شود
  const { data, loading, error } = useFetchData( 
    shouldFetch
      ? `/Patient/GetPatientsData?From=2025-09-13&To=2025-10-14&PhoneNumber=${phoneNumber}`
      : ""
  );

  // داده‌های پزشکی برای راحتی دسترسی (با اطمینان از عدم خطا)
  const medicalInformations: any = data?.medicalInformations;

  // --- مدیریت وضعیت مودال‌ها ---
  const [isMedModalOpen, setIsMedModalOpen] = useState(false);
  const [isOtherModalOpen, setOtherModalOpen] = useState(false);

  const showMedModal = () => setIsMedModalOpen(true);
  const showOtherModal = () => setOtherModalOpen(true);
  
  const handleCloseModals = () => { // برای بسته شدن هر دو استفاده می‌شود
    setIsMedModalOpen(false);
    setOtherModalOpen(false);
  };
  
  // --- توابع رندر محتوای مودال (کاملاً مشابه کد PatientProfile) ---

  // ۱. رندر جدول داروها
  const renderMedicines = (medications: any[] = []) => {
    const columns = [
      {
        title: "نام دارو",
        dataIndex: ["medicine", "name"],
        key: "name",
      },
      {
        title: "نوع دارو",
        dataIndex: ["medicine", "type"],
        key: "type",
      },
      {
        title: "مقدار",
        dataIndex: "amount",
        key: "amount",
      },
      {
        title: "شناسه مدت زمان مصرف",
        dataIndex: "durationOfUseTypeId",
        key: "durationOfUseTypeId",
      },
      {
        title: "تاریخ توقف",
        dataIndex: "stopDate",
        key: "stopDate",
        render: (date: any) =>
          date ? moment(date).format("jYYYY/jMM/jDD") : "-",
      },
      {
        title: "دلیل توقف",
        dataIndex: "resonOfStop",
        key: "resonOfStop",
      },
    ];

    return (
      <Table
        columns={columns}
        dataSource={medications}
        rowKey={(record, index: any) => index}
        pagination={false} 
      />
    );
  };
  
  // ۲. رندر نتایج آزمایش‌ها
  const renderResults = (medicalInfo: any) => {
    const results = [
      {
        category: "EEG",
        date: medicalInfo?.eegDate,
        details: medicalInfo?.eegResult,
      },
      {
        category: "اقدامات تصویربرداری",
        date: medicalInfo?.photoDate,
        details: medicalInfo?.photoResult,
      },
      {
        category: "سایر اقدامات تشخیصی",
        date: medicalInfo?.otherDiagnosticMeasuresDate,
        details: medicalInfo?.otherDiagnosticMeasuresResult,
      },
    ];

    const columns = [
      { title: "نتایج", dataIndex: "category", key: "category" },
      {
        title: "تاریخ",
        dataIndex: "date",
        key: "date",
        render: (date: string) =>
          date ? moment(date).format("jYYYY/jMM/jDD") : "-",
      },
      { title: "نتیجه", dataIndex: "details", key: "details" },
    ];

    return <Table columns={columns} dataSource={results} rowKey="category" pagination={false} bordered />;
  };

  // ۳. رندر اطلاعات تشنج
  const renderSeizureInfo = (medicalInfo: any) => {
    const seizureData = [
      { label: "اولین تشنج", value: medicalInfo?.firstSeizure },
      { label: "آخرین تشنج", value: medicalInfo?.lastSeizure },
      { label: "تعداد تشنج سالانه", value: medicalInfo?.yearlySeizureCount },
      { label: "فاصله بین تشنج‌ها", value: medicalInfo?.seizureInterval },
      { label: "واحد زمان تشنج", value: medicalInfo?.seizureTimeUnitId },
      {
        label: "ارتباط خانوادگی والدین",
        value: medicalInfo?.parentFamilyRelationshipId,
      },
      { label: "تاریخ بستری", value: medicalInfo?.hospitalizationDate },
      { label: "تعداد دفعات بستری", value: medicalInfo?.hospitalizationCount },
      { label: "مدت زمان بستری", value: medicalInfo?.hospitalizationDuration },
      {
        label: "واحد زمان بستری",
        value: medicalInfo?.hospitalizationTimeUnitId,
      },
      { label: "بیماری‌های سیستمیک", value: medicalInfo?.systemicDisease },
      {
        label: "شکایات سال گذشته",
        value: medicalInfo?.pastYearComplaints?.map((pyc: any) => pyc.Id).join(", "),
      },
    ];

    const columns = [
      { title: "مشخصات", dataIndex: "label", key: "label" },
      {
        title: "مقدار",
        dataIndex: "value",
        key: "value",
        render: (value: string | number) => (value !== undefined && value !== null ? value : "-"),
      },
    ];

    return <Table columns={columns} dataSource={seizureData} rowKey="label" pagination={false} bordered />;
  };

  // ۴. رندر سابقه بیماری‌های خانوادگی
  const renderFamilyDiseaseHistory = (medicalInfo: any) => {
    const familyDiseaseData = medicalInfo?.familyDiseaseHistoryList
      ? medicalInfo.familyDiseaseHistoryList.map((fdh: any) => ({
          name: fdh.name,
          relationship: fdh.relationship,
          diseaseHistoryType: fdh.familyDiseasesHistoryTypeId,
        }))
      : [];

    const columns = [
      { title: "نام بیماری", dataIndex: "name", key: "name" },
      { title: "ارتباط خانوادگی", dataIndex: "relationship", key: "relationship" },
      { title: "نوع تاریخچه بیماری", dataIndex: "diseaseHistoryType", key: "diseaseHistoryType" },
    ];

    return <Table columns={columns} dataSource={familyDiseaseData} rowKey="name" pagination={false} bordered />;
  };

  // ۵. رندر سابقه مصرف مواد
  const renderDrugConsumption = (medicalInfo: any) => {
    const drugConsumptionData = medicalInfo?.drugConsumption
      ? medicalInfo.drugConsumption.map((dc: any) => ({
          drugName: dc.drugTypeId,
          dailyAmount: dc.dailyAmount,
          duration: dc.drugConsumptionDuration,
          timeUnit: dc.dateTimeUnitTypeId,
        }))
      : [];

    const columns = [
      { title: "نام دارو", dataIndex: "drugName", key: "drugName" },
      { title: "مقدار روزانه", dataIndex: "dailyAmount", key: "dailyAmount" },
      { title: "مدت زمان مصرف", dataIndex: "duration", key: "duration" },
      { title: "واحد زمان مصرف", dataIndex: "timeUnit", key: "timeUnit" },
    ];

    return <Table columns={columns} dataSource={drugConsumptionData} rowKey="drugName" pagination={false} bordered />;
  };

  // ۶. رندر شرح حال خانواده
  const renderFamilyDescription = (medicalInfo: any) => {
    return <div>{medicalInfo?.familyDescription || "-"}</div>;
  };
  

  // --- تعریف آیتم‌های Tab برای مودال داروها ---
  const tabItems = [
    {
      key: "1",
      label: "داروهای ضد صرع قبلی",
      children: renderMedicines(medicalInformations?.pastAntiepilepticMedicineList),
    },
    {
      key: "2",
      label: "داروهای ضد صرع فعلی",
      children: renderMedicines(medicalInformations?.currentAntiepilepticMedicineList),
    },
    {
      key: "3",
      label: "سایر داروها",
      children: renderMedicines(medicalInformations?.otherMedicineList),
    },
  ];

  // --- تعریف آیتم‌های Tab داخلی برای بخش اجتماعی مودال سایر مشخصات ---
  const medicaltabItems = [
    {
      key: "1",
      label: "سابقه خانوادگی بیماری های مختلف",
      children: renderFamilyDiseaseHistory(medicalInformations),
    },
    {
      key: "2",
      label: "سابقه سوء مصرف مواد و دخانیات توسط بیمار",
      children: renderDrugConsumption(medicalInformations),
    },
    {
      key: "3",
      label: "شرح حال خانواده و میانگین درامد",
      children: renderFamilyDescription(medicalInformations),
    },
  ];

  // --- تعریف آیتم‌های Tab اصلی برای مودال سایر مشخصات ---
  const othertabItems = [
    {
      key: "1",
      label: "نتایج آزمایش ها",
      children: renderResults(medicalInformations),
    },
    {
      key: "2",
      label: "سابقه شکایت با بیماری",
      children: renderSeizureInfo(medicalInformations),
    },
    {
      key: "3",
      label: "اجتماعی",
      children: (
        // Tabهای داخلی
        <Tabs type="card" defaultActiveKey="1" items={medicaltabItems} />
      ),
    },
  ];


  // --- JSX رندر ---
  return (
    <Drawer
      title="پروفایل بیمار"
      placement="left"
      width={850}
      onClose={onClose}
      open={open}
      destroyOnClose
    >
      {loading ? (
        <Spin size="large" style={{ display: 'block', margin: '50px auto' }} />
      ) : error ? (
        <Alert
          message="خطا در دریافت اطلاعات"
          description={String(error)}
          type="error"
          showIcon
        />
      ) : data ? (
        <div style={{ lineHeight: "2rem" ,paddingBlock:"2rem"}}>
          
          {/* --- اطلاعات فردی --- */}
          <div className="profileMainSection">
            <h3>اطلاعات فردی</h3>
            <Row gutter={[10, 13]}>
              <Col span={8}>
                <p>
                  <span
                    style={{ fontWeight: "400", color: "rgba(0, 0, 0, 0.67)" }}
                  >
                    نام و نام خانوادگی:
                  </span>{" "}
                  {data.fullName ?? "-"}
                </p>
              </Col>
              <Col span={8}>
                <p>
                  <span
                    style={{ fontWeight: "400", color: "rgba(0, 0, 0, 0.67)" }}
                  >
                    شماره تماس:
                  </span>{" "}
                  {data.phoneNumber ?? "-"}
                </p>
              </Col>
              <Col span={8}>
                <p>
                  جنسیت:{" "}
                  <b>
                    {data.gender && typeof data.gender === "string"
                      ? data.gender.toLowerCase() === "male"
                        ? "مرد"
                        : data.gender.toLowerCase() === "female"
                          ? "زن"
                          : "-"
                      : "-"}
                  </b>
                </p>
              </Col>
              <Col span={8}>
                <p>
                  <span
                    style={{ fontWeight: "400", color: "rgba(0, 0, 0, 0.67)" }}
                  >
                    تاریخ تولد:
                  </span>{" "}
                  {moment(data?.birthdate).format("jYYYY/jMM/jDD") ?? "-"}
                </p>
              </Col>
              <Col span={8}>
                <p>
                  <span
                    style={{ fontWeight: "400", color: "rgba(0, 0, 0, 0.67)" }}
                  >
                    وضیعت تاهل:
                  </span>{" "}
                  {data.maritalStatus && typeof data.maritalStatus === "string"
                    ? data.maritalStatus.toLowerCase() === "single"
                      ? "مجرد"
                      : data.maritalStatus.toLowerCase() === "married"
                        ? "متاهل"
                        : "-"
                    : "-"}
                </p>
              </Col>
            </Row>
          </div>
          
          {/* --- اطلاعات پزشکی و دکمه‌های مودال --- */}
          <div className="profileMainSection">
            <h3>اطلاعات پزشکی</h3>
            <Row gutter={[10, 13]}>
              <Col span={8}>
                <p>
                  <span
                    style={{ fontWeight: "400", color: "rgba(0, 0, 0, 0.67)" }}
                  >
                    تاریخ تشخیص:
                  </span>{" "}
                  {moment(data?.medicalInformations?.diagnosisDate).format(
                    "jYYYY/jMM/jDD"
                  ) ?? "-"}
                </p>
              </Col>
              <Col span={8}>
                <p>
                  <span
                    style={{ fontWeight: "400", color: "rgba(0, 0, 0, 0.67)" }}
                  >
                    نوع صرع:
                  </span>{" "}
                  {data?.medicalInformations?.epilepsyTypeName ?? "-"}
                </p>
              </Col>
              <Col span={8}>
                <p>
                  وضیعت آگاهی صرع:{" "}
                  <b>
                    {data?.medicalInformations?.epilepsyConsciousnessTypeId ??
                      "-"}
                  </b>
                </p>
              </Col>
              <Col span={8}>
                <p>
                  <span
                    style={{ fontWeight: "400", color: "rgba(0, 0, 0, 0.67)" }}
                  >
                    وضیعت حرکتی صرع:
                  </span>{" "}
                  {data?.medicalInformations?.movementStatus ?? "-"}
                </p>
              </Col>
              <Col span={8}>
                <p>
                  <span
                    style={{ fontWeight: "400", color: "rgba(0, 0, 0, 0.67)" }}
                  >
                    نوع دوم صرع:
                  </span>{" "}
                  {data?.medicalInformations?.epilepsySecondType ?? "-"}
                </p>
              </Col>
              <Col span={8}>
                <Flex gap={5} align="flex-start">
                  <Button 
                    size="middle" 
                    onClick={showMedModal} 
                    // دکمه زمانی فعال است که medicalInformations وجود داشته باشد
                    disabled={!medicalInformations}
                  >
                    دارو ها
                  </Button>{" "}
                  <Button 
                    size="middle" 
                    onClick={showOtherModal}
                    // دکمه زمانی فعال است که medicalInformations وجود داشته باشد
                    disabled={!medicalInformations}
                  >
                    سایر مشخصات
                  </Button>
                </Flex>
              </Col>
            </Row>
          </div>
          
          {/* --- Modal داروها --- */}
          <Modal
            title={"داروها"}
            open={isMedModalOpen}
            centered
            onCancel={handleCloseModals}
            width={800}
            footer={
              <Button type="primary" onClick={handleCloseModals}>
                تایید
              </Button>
            }
          >
            <Tabs type="card" defaultActiveKey="1" items={tabItems} />
          </Modal>

          {/* --- Modal سایر مشخصات --- */}
          <Modal
            title={"سایر مشخصات"}
            open={isOtherModalOpen}
            centered
            onCancel={handleCloseModals}
            width={800}
            footer={
              <Button type="primary" onClick={handleCloseModals}>
                تایید
              </Button>
            }
          >
            <Tabs type="card" defaultActiveKey="1" items={othertabItems} />
          </Modal>

        </div>
      ) : (
        <p>داده‌ای برای نمایش وجود ندارد</p>
      )}
    </Drawer>
  );
};

export default ProfileDrawer;