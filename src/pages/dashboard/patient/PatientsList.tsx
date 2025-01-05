import { PageHeader } from "../../../components/PageHeader/PageHeader";
import {
  HomeOutlined,
  ContactsOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import { BsPeople } from "react-icons/bs";
import { Button, ConfigProvider, Drawer, Layout, theme } from "antd";
import { useState } from "react";
import { PatientTable } from "../../../components/Table/PatientTable";
import AddFormLayout from "../../../components/Forms/AddPatient/AddFormLayout";
import React from "react";

const PatientsList = () => {
  const [open, setOpen] = useState(false);
  const { token } = theme.useToken();
  const [current, setCurrent] = useState(0);
  

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
    setCurrent(0);
  };

  const layoutStyle: React.CSSProperties = {
    background: "#F2FCFC",
    borderRadius: "6px",
    boxShadow: "0 2px 5px rgba(0, 0, 0, 0.25)",
    display: "flex",
    padding: "15px",
    height: "87svh", //inherit
    position: "relative",
    overflow: "hidden",
    border: `1px solid ${token.colorBorderSecondary}`,
  };
  return (
    <React.Fragment>
      
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
            <AddFormLayout open={open} setOpen={setOpen} />
          </Drawer>
          
          <PatientTable title="فهرست بیماران" />
        </Layout>
      </ConfigProvider>
    </React.Fragment>
  );
};
export default PatientsList;
