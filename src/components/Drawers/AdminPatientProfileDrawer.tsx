import { Drawer, Spin, Alert, Row, Col, Flex, Button } from "antd";
import { useFetchData } from "../../hooks";
import moment from "moment-jalaali";

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
  const shouldFetch = !!phoneNumber && open;
  const { data, loading, error } = useFetchData(
    shouldFetch
      ? `/Patient/GetPatientsData?From=2025-09-13&To=2025-10-14&PhoneNumber=${phoneNumber}`
      : ""
  );
  console.log("profile : ", data);

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
        <Spin />
      ) : error ? (
        <Alert
          message="خطا در دریافت اطلاعات"
          description={String(error)}
          type="error"
          showIcon
        />
      ) : data ? (
        <div style={{ lineHeight: "2rem" ,paddingBlock:"2rem"}}>
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
                <Button size="middle" >
                  دارو ها
                </Button>{" "}
                <Button size="middle" >
                  سایر مشخصات
                </Button>
              </Flex></Col>
            </Row>
          </div>
        </div>
      ) : (
        <p>داده‌ای برای نمایش وجود ندارد</p>
      )}
    </Drawer>
  );
};

export default ProfileDrawer;
