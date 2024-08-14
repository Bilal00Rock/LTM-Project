import { PageHeader } from "../../../components/PageHeader/PageHeader";
import { HomeOutlined, ContactsOutlined, PlusOutlined,SearchOutlined } from '@ant-design/icons';
import { BsPeople } from "react-icons/bs";
import { Button, ConfigProvider, Divider, Input, InputRef, Layout, Space, Table, TableColumnsType, TableColumnType, } from "antd";
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { PATH_PATIENTS, PATINETS_ITEMS } from "../../../constants";
import { useCallback, useRef, useState } from "react";
import { FilterDropdownProps } from "antd/es/table/interface";
import Highlighter from 'react-highlight-words';

const layoutStyle: React.CSSProperties = {
    margin: '32px 24px 32px 15px',
    background: "#F2FCFC",
    borderRadius: '6px',
    boxShadow: '0 2px 5px rgba(0, 0, 0, 0.25)',
    display: 'flex',
    padding: '15px',
    height: 'inherit'
};

// //#region test table
// interface DataType {
//     key: string;
//     name: string;
//     age: number;
//     address: string;
// }

// type DataIndex = keyof DataType;

// const data: DataType[] = [
//     {
//         key: '1',
//         name: 'John Brown',
//         age: 32,
//         address: 'New York No. 1 Lake Park',
//     },
//     {
//         key: '2',
//         name: 'Joe Black',
//         age: 42,
//         address: 'London No. 1 Lake Park',
//     },
//     {
//         key: '3',
//         name: 'Jim Green',
//         age: 32,
//         address: 'Sydney No. 1 Lake Park',
//     },
//     {
//         key: '4',
//         name: 'Jim Red',
//         age: 32,
//         address: 'London No. 2 Lake Park',
//     },
// ];

const PatientsList = () => {
//     //table
//     const [searchText, setSearchText] = useState('');
//     const [searchedColumn, setSearchedColumn] = useState('');
//     const searchInput = useRef<InputRef>(null);

//     const handleSearch = (
//         selectedKeys: string[],
//         confirm: FilterDropdownProps['confirm'],
//         dataIndex: DataIndex,
//     ) => {
//         confirm();
//         setSearchText(selectedKeys[0]);
//         setSearchedColumn(dataIndex);
//     };

//     const handleReset = (clearFilters: () => void) => {
//         clearFilters();
//         setSearchText('');
//     };

//     const getColumnSearchProps = (dataIndex: DataIndex): TableColumnType<DataType> => ({
//         filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => (
//             <div style={{ padding: 8 }} onKeyDown={(e) => e.stopPropagation()}>
//                 <Input
//                     ref={searchInput}
//                     placeholder={`Search ${dataIndex}`}
//                     value={selectedKeys[0]}
//                     onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
//                     onPressEnter={() => handleSearch(selectedKeys as string[], confirm, dataIndex)}
//                     style={{ marginBottom: 8, display: 'block' }}
//                 />
//                 <Space>
//                     <Button
//                         type="primary"
//                         onClick={() => handleSearch(selectedKeys as string[], confirm, dataIndex)}
//                         icon={<SearchOutlined />}
//                         size="small"
//                         style={{ width: 90 }}
//                     >
//                         Search
//                     </Button>
//                     <Button
//                         onClick={() => clearFilters && handleReset(clearFilters)}
//                         size="small"
//                         style={{ width: 90 }}
//                     >
//                         Reset
//                     </Button>
//                     <Button
//                         type="link"
//                         size="small"
//                         onClick={() => {
//                             confirm({ closeDropdown: false });
//                             setSearchText((selectedKeys as string[])[0]);
//                             setSearchedColumn(dataIndex);
//                         }}
//                     >
//                         Filter
//                     </Button>
//                     <Button
//                         type="link"
//                         size="small"
//                         onClick={() => {
//                             close();
//                         }}
//                     >
//                         close
//                     </Button>
//                 </Space>
//             </div>
//         ),
//         filterIcon: (filtered: boolean) => (
//             <SearchOutlined style={{ color: filtered ? '#1677ff' : undefined }} />
//         ),
//         onFilter: (value, record) =>
//             record[dataIndex]
//                 .toString()
//                 .toLowerCase()
//                 .includes((value as string).toLowerCase()),
//         onFilterDropdownOpenChange: (visible) => {
//             if (visible) {
//                 setTimeout(() => searchInput.current?.select(), 100);
//             }
//         },
//         render: (text) =>
//             searchedColumn === dataIndex ? (
//                 <Highlighter
//                     highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
//                     searchWords={[searchText]}
//                     autoEscape
//                     textToHighlight={text ? text.toString() : ''}
//                 />
//             ) : (
//                 text
//             ),
//     });

//     const columns: TableColumnsType<DataType> = [
//         {
//             title: 'Name',
//             dataIndex: 'name',
//             key: 'name',
//             width: '30%',
//             ...getColumnSearchProps('name'),
//         },
//         {
//             title: 'Age',
//             dataIndex: 'age',
//             key: 'age',
//             width: '20%',
//             ...getColumnSearchProps('age'),
//         },
//         {
//             title: 'Address',
//             dataIndex: 'address',
//             key: 'address',
//             ...getColumnSearchProps('address'),
//             sorter: (a, b) => a.address.length - b.address.length,
//             sortDirections: ['descend', 'ascend'],
//         },
//     ];

//     //#endregion

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
                    title="Patients List"
                    icon={<BsPeople size={30} />}
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

                            menu: {
                                items: PATINETS_ITEMS.map((d) => ({
                                    key: d.title,
                                    title: <Link to={d.path}>{d.title}</Link>,
                                })),
                            }
                        },
                        {
                            title: 'Patients list',
                        },

                    ]}
                />
                <Button type={'primary'} icon={<PlusOutlined />} onClick={onClick}>Add Patient</Button>
                {/* <Table columns={columns} dataSource={data} /> */}
            </Layout>

        </ConfigProvider >

    );
};
export default PatientsList;