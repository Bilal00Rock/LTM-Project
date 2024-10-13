import { Col, ConfigProvider, Flex, Layout, Row, Space } from "antd/es";
import { HomeOutlined } from "@ant-design/icons";
import { PageHeader } from "../../components/PageHeader/PageHeader";
import { Card } from "../../components/Card/Card";
import EpiTypeChart from "../../components/Charts/Dashbaord/EpiTypeChart";
import ChartTimeline from "../../components/Charts/Dashbaord/Chart";
import { StatsCard } from "../../components/StatsCard/StatsCard";
import { useFetchData } from "../../hooks";
import { DashDataApi } from "../../api";
const layoutStyle: React.CSSProperties = {
  background: "#F2FCFC",
  borderRadius: "6px",
  boxShadow: "0 2px 5px rgba(0, 0, 0, 0.25)",
  display: "flex",
  padding: "15px",
  height: "inherit",
};

const Overview = () => {

  //APIs
  const {
    data: dashData,
    loading: dashDataLoading,
    error: error,
  } = useFetchData(DashDataApi.get);


  const features = [
    {
      title: "مشاهده گزارش‌های جامع از وضعیت بیمار",
      description: "دریافت گزارش‌های دقیق از سوابق و وضعیت فعلی بیماران.",
    },
    {
      title: "ارسال معرفی‌نامه و تایید عضویت در انجمن",
      description: "امکان ارسال معرفی‌نامه بیمار به انجمن‌ صرع ایران .",
    },
  ];
  return (
    <ConfigProvider>
      <Layout style={layoutStyle}>
        <PageHeader
          title="داشبورد"
          icon={<HomeOutlined size={30} />}
          backbtn={false}
          breadcrumbs={undefined}
        />

        <Row gutter={[12, 24]}>
          <Col xs={24} lg={24}>
            <Card
              style={{ background: "#CAF4FF" }}
              children={
                <Row gutter={[10, 10]}>
                  <Col xs={24} lg={12}>
                    <Flex vertical gap={"middle"}>
                      <b style={{ fontSize: "25px", color: "#10439F" }}>
                        به پاینو خوش آمدید
                      </b>
                      <b style={{ fontSize: "20px" }}>
                        سامانه یکپارچه پایش صرع
                      </b>
                    </Flex>
                    <Col xs={24} lg={24}>
                      <div>
                        <h3>امکانات پاینِو</h3>
                        <ul>
                          {features.map((feature, index) => (
                            <li key={index}>
                              <h4>{feature.title}</h4>
                              <p style={{ fontSize: "14px" }}>
                                {feature.description}
                              </p>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </Col>
                  </Col>

                  <Col xs={24} lg={9}>
                    <div className="demo-logo-vertical">
                      <img
                        loading="lazy"
                        alt="Logo"
                        src={process.env.PUBLIC_URL + "/img/logo.png"}
                        style={{
                          maxWidth: "100%",
                          height: "auto",
                        }}
                      />
                      <div>
                        <h4>پشتیبانی و آموزش</h4>
                        <p style={{ fontSize: "12px" }}>
                          برای یادگیری بیشتر درباره نحوه استفاده از این امکانات،
                          می‌توانید ویدئوهای آموزشی موجود در بخش پشتیبانی برنامه
                          را مشاهده کنید. در صورت نیاز به آموزش‌های اختصاصی
                          حضوری یا مجازی، با پشتیبانی (۰۵۱۳۷۶۸۴۲۱۳) تماس بگیرید.
                        </p>
                      </div>
                    </div>
                  </Col>
                </Row>
              }
            ></Card>
          </Col>
          <Col xs={24} lg={8}>
            <StatsCard title={"تعداد تشنج های ثبت شده امروز"} value={dashData.SumSeizureToday} error={error} loading={dashDataLoading}/>
          </Col>
          <Col xs={24} lg={8}>
            <StatsCard title={"تعداد بیماران فعال"} value={dashData.CountPatients} error={error} loading={dashDataLoading}/>
          </Col>
          <Col xs={24} lg={8}>
            <StatsCard title={"بیماران در حال ثبت نام"} value={dashData.CountPendings} error={error} loading={dashDataLoading}/>
          </Col>
          <Col xs={24} lg={12}>
            <Card title={"آمار تشنج ها"}>
              <ChartTimeline />
            </Card>
          </Col>
          <Col xs={24} lg={12}>
            <Card title={"توزیع انواع صرع"}>
              <EpiTypeChart />
            </Card>
          </Col>
        </Row>
      </Layout>
    </ConfigProvider>
  );
};
export default Overview;
