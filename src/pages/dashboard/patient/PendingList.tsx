import { Button, ConfigProvider, Layout } from "antd";
import { PageHeader } from "../../../components/PageHeader/PageHeader";
import { BsPeople } from "react-icons/bs";
import {
    HomeOutlined,
    ContactsOutlined,
    PlusOutlined,
  } from "@ant-design/icons";
import { PATH_PATIENTS, PATINETS_ITEMS } from "../../../constants";
import { Link, useNavigate } from "react-router-dom";
import { PendingsTable } from "../../../components/Table/PendingsTable";
import { useCallback } from "react";

const layoutStyle: React.CSSProperties = {
    background: "#F2FCFC",
    borderRadius: "6px",
    boxShadow: "0 2px 5px rgba(0, 0, 0, 0.25)",
    display: "flex",
    padding: "15px",
    height: "inherit",
  };
  
const PendingList = () => {
    const navigate = useNavigate();

  const onClick = useCallback(() => {
    navigate(PATH_PATIENTS.patientslist);
  }, [navigate]);
    return (
        <ConfigProvider
      theme={{
        components: {},
      }}
    >
      <Layout style={layoutStyle}>
        <PageHeader
          title="لیست انتظار بیماران"
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
              title: "لیست انتظار بیماران",
            },
          ]}
        />
        <PendingsTable title="فهرست انتظار بیماران" />
      </Layout>
    </ConfigProvider>
    );
};
export default PendingList;