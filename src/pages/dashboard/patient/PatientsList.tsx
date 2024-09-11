import { PageHeader } from "../../../components/PageHeader/PageHeader";
import {
  HomeOutlined,
  ContactsOutlined,
  PlusOutlined,
  SolutionOutlined,
  MessageOutlined,
  FileDoneOutlined
} from "@ant-design/icons";
import { BsPeople } from "react-icons/bs";
import {
  Button,
  Col,
  ConfigProvider,
  Drawer,
  Flex,
  Layout,
  Row,
  Select,
  Space,
  Steps,
  theme,
} from "antd";
import { Link, useNavigate } from "react-router-dom";
import { PATH_PATIENTS, PATINETS_ITEMS } from "../../../constants";
import { useCallback, useState } from "react";
import { PatientTable } from "../../../components/Table/PatientTable";
import AddPatientForm from "../../../components/Forms/AddPatient/AddPatientForm";

const steps = [
  {
    title: "ثبت اطلاعات",
    content: <AddPatientForm />,
    icon: <SolutionOutlined />,
  },
  {
    title: "رمز یکبار مصرف",
    content: "Second-content",
    icon: <MessageOutlined />,
  },
  {
    title: "انجام شد",
    content: "Last-content",
    icon: <FileDoneOutlined />
  },
];

const PatientsList = () => {
  const [open, setOpen] = useState(false);

  const { token } = theme.useToken();
  const [current, setCurrent] = useState(0);

  const next = () => {
    setCurrent(current + 1);
  };

  const prev = () => {
    setCurrent(current - 1);
  };

  const items = steps.map((item) => ({
    key: item.title,
    title: item.title,
    icon: item.icon,
  }));

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  const navigate = useNavigate();

  const onClick = useCallback(() => {
    navigate(PATH_PATIENTS.pendings);
  }, [navigate]);
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
  return (
    <ConfigProvider
      theme={{
        components: {},
      }}
    >
      <Layout style={layoutStyle}>
        <PageHeader
          title="لیست بیماران"
          icon={<BsPeople size={30} />}
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

              menu: {
                items: PATINETS_ITEMS.map((d) => ({
                  key: d.title,
                  title: <Link to={d.path}>{d.title}</Link>,
                })),
              },
            },
            {
              title: "لیست بیماران",
            },
          ]}
        />
        <Button type={"primary"} icon={<PlusOutlined />} onClick={showDrawer}>
          افزودن بیمار
        </Button>

        <Drawer
          title="افزودن بیمار"
          placement="left"
          closable={false}
          open={open}
          getContainer={false}
          width={720}
          onClose={onClose}
          styles={{
            body: {
              paddingBottom: 80,
            },
          }}
          extra={<Button onClick={onClose}>بازگشت</Button>}
        >
          <Steps current={current} items={items} />
          <div>{steps[current].content}</div>
        </Drawer>

        <PatientTable title="فهرست بیماران" />
      </Layout>
    </ConfigProvider>
  );
};
export default PatientsList;
