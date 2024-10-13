import { PageHeader } from "../../../components/PageHeader/PageHeader";
import {
  HomeOutlined,
  ContactsOutlined,
  DownOutlined,
  UpOutlined,
} from "@ant-design/icons";
import { BsPersonVcard } from "react-icons/bs";
import {
  Button,
  Carousel,
  Col,
  ConfigProvider,
  Descriptions,
  DescriptionsProps,
  Divider,
  Layout,
  Row,
  theme,
  Typography,
} from "antd";
import { Card } from "../../../components/Card/Card";
import SleepStat from "../../../components/Charts/SleepStat";
import { useFetchData } from "../../../hooks";
import { useParams } from "react-router-dom";

const PatientProfile = () => {
  const { id } = useParams<{ id: string }>();
  //fetch data from API
  const {
    data: patientdata,
    loading: patientDataLoading,
    error: error,
  } = useFetchData(`api/patient?id=${id}`);
  console.log(`api/patient?id=${id}`);
  console.log(patientdata);
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
  const Userinfo_ITEMS: DescriptionsProps["items"] = [
    {
      key: "name",
      label: "نام و نام خانوادگی",
      children: <span>{patientdata[0]?.name}</span>,
    },
    {
      key: "n_id",
      label: "کد ملی",
      children: <span>{patientdata[0]?.n_id}</span>,
    },
    {
      key: "age",
      label: "سن",
      children: <span>{patientdata[0]?.age}</span>,
    },
    {
      key: "address",
      label: "آدرس",
      children: <span> {patientdata[0]?.address}</span>,
    },
    {
      key: "phoneNO",
      label: "شماره تماس",
      children: <span>{patientdata[0]?.phoneNO}</span>,
    },
    {
      key: "type",
      label: "نوع صرع",
      children: <span>{patientdata[0]?.type}</span>,
    },
  ];

  
interface AntdArrowProps {
  currentSlide?: number
  slideCount?: number
}

interface ArrowProps {
  direction: 'up' | 'down'
}

const Arrow = ({ currentSlide, direction, slideCount, ...carouselProps }: ArrowProps & AntdArrowProps) =>
  direction === 'up' ? (
   <Button  type="link" {...carouselProps } style={{ paddingLeft:60 , paddingBottom: 5 ,color: 'black'}} >اطلاعات فردی</Button>
  ) : (
    <Button type="link" {...carouselProps}   style={{  paddingLeft:65 , paddingTop: 5 ,color:'black' }}>اطلاعات پزشکی </Button>
  )
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
          <Card style={{padding:15}} loading = {patientDataLoading}>

            <Carousel
            
            arrows={true}
            dotPosition="left"
            infinite={false}
            nextArrow={<Arrow direction="down" />}
            prevArrow={<Arrow direction="up" />}
            >
              <div>
                <Descriptions title="اطلاعات فردی" items={Userinfo_ITEMS}  />
              </div>
              <div>
                <Descriptions title="اطلاعات پزشکی" items={Userinfo_ITEMS} />
              </div>
            </Carousel>
              </Card>
          </Col>
          <Col span={24} >
            <Divider />
            <b style={{ fontSize: 25 }}>گزارشات</b>
          </Col>
          <Col span={12}>
            <Card children={<></>} />
          </Col>

          <Col span={12}>
            <Card title={"وضیعت خواب بیمار"} loading = {patientDataLoading}>
              <SleepStat  />
            </Card>
          </Col>
        </Row>
      </Layout>
    </ConfigProvider>
  );
};
export default PatientProfile;
