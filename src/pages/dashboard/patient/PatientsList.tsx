import { PageHeader } from "../../../components/PageHeader/PageHeader";
import { HomeOutlined,ContactsOutlined } from '@ant-design/icons';
import { ConfigProvider, Layout } from "antd";
import { Link, Outlet } from 'react-router-dom';
const layoutStyle: React.CSSProperties = {
    margin: '32px 24px 32px 15px',
    background: "#F2FCFC",
    borderRadius: '6px',
    boxShadow: '0 2px 5px rgba(0, 0, 0, 0.25)',
    display: 'flex',
    padding: '15px',
    height: 'inherit'
};
const PatientsList = () => {
    return (
        <ConfigProvider
            theme={{
                components: {


                },
            }}
        >
            <Layout style={layoutStyle} >
                <PageHeader
                    title="Patients List"
                    breadcrumbs={[
                        {
                            title: (
                                <>
                                    <HomeOutlined />
                                    <span>Dashboard</span>
                                </>
                            ),
                        },
                        {
                            title: (
                                <>
                                    <ContactsOutlined />
                                    <span>Patients</span>
                                </>
                            ),
                        },
                        {
                            title: 'Patients list',
                        },

                    ]}
                />

                <Outlet />
            </Layout>

        </ConfigProvider>

    );
};
export default PatientsList;