import { PageHeader } from "../../../components/PageHeader/PageHeader";
import { HomeOutlined, ContactsOutlined, PlusOutlined, } from '@ant-design/icons';
import { BsPeople } from "react-icons/bs";
import { Button, ConfigProvider, Layout } from "antd";
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { PATH_PATIENTS, PATINETS_ITEMS } from "../../../constants";
import { useCallback, } from "react";
import { PatientTable } from "../../../components/Table/PatientTable";

const layoutStyle: React.CSSProperties = {
    
    background: "#F2FCFC",
    borderRadius: '6px',
    boxShadow: '0 2px 5px rgba(0, 0, 0, 0.25)',
    display: 'flex',
    padding: '15px',
    height: 'inherit',

};


const PatientsList = () => {


    const navigate = useNavigate();

    const onClick = useCallback(() => {
        navigate(PATH_PATIENTS.addpatient);
    }, [navigate]);
    return (
        <ConfigProvider
            theme={{
                components: {


                },
            }}
        >
            <Layout style={layoutStyle} >
                <PageHeader
                    title="لیست بیماران"
                    icon={<BsPeople size={30} />}
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
                            }
                        },
                        {
                            title: 'لیست بیماران',
                        },

                    ]}
                />
                <Button type={'primary'} icon={<PlusOutlined />} onClick={onClick}>افزودن بیمار</Button>
                <PatientTable title="فهرست بیماران" />
            </Layout>

        </ConfigProvider >

    );
};
export default PatientsList;