import { Badge, Button, ConfigProvider,  Input, InputRef, Space, Table, TableColumnsType, TableColumnType } from 'antd';
import { useRef, useState } from 'react';
import { SearchOutlined,  } from '@ant-design/icons';
import { FilterDropdownProps } from "antd/es/table/interface";
import Highlighter from 'react-highlight-words';
import { TestingLibraryMatchers } from '@testing-library/jest-dom/matchers';
import fa_IR from 'antd/locale/fa_IR';
type Props = {
    title: string;
}
//#region test table
interface DataType {
    key: string;
    name: string;
    n_id: string;
    age: number;
    description: string;
    phoneNO: string;
    type: string;
    lastEeg: Date;
    address: string;
}

type DataIndex = keyof DataType;

const data: DataType[] = [
    {
        key: '1',
        name: 'صادق محمدی',
        age: 32,
        address: 'مشهد، خیابان شهید بهشتی، کوچه ۱، پلاک ۱۸',
        description: 'توضیحات تکمیلی',
        type: 'General',
        lastEeg: new Date(Date()),
        phoneNO: '۰۹۱۲۳۴۵۶۷۸۹',
        n_id: '۰۱۳۲۲۹۰۱۲۹'
    },
    {
        key: '2',
        name: 'مهسا حاتمی',
        age: 42,
        address: 'مشهد، خیابان شهید بهشتی، کوچه ۱، پلاک ۱۸',
        description: 'توضیحات تکمیلی',
        type: 'Focal',
        lastEeg: new Date(Date()),
        phoneNO: '۰۹۱۲۳۴۵۶۷۸۹',
        n_id: '۰۱۳۲۲۹۰۱۲۹'
    },
    {
        key: '3',
        name: 'امیر امیری',
        age: 15,
        address: 'مشهد، خیابان شهید بهشتی، کوچه ۱، پلاک ۱۸',
        description: 'توضیحات تکمیلی',
        type: 'Temporal',
        lastEeg: new Date(Date()),
        phoneNO: '۰۹۱۲۳۴۵۶۷۸۹',
        n_id: '۰۱۳۲۲۹۰۱۲۹'
    },
    {
        key: '4',
        name: 'محمد صادقی',
        age: 32,
        address: 'مشهد، خیابان شهید بهشتی، کوچه ۱، پلاک ۱۸',
        description: 'توضیحات تکمیلی',
        type: 'Temporal',
        lastEeg: new Date(Date()),
        phoneNO: '۰۹۱۲۳۴۵۶۷۸۹',
        n_id: '۰۱۳۲۲۹۰۱۲۹'
    },
    {
        key: '5',
        name: 'محمدی',
        age: 32,
        address: 'مشهد، خیابان شهید بهشتی، کوچه ۱، پلاک ۱۸',
        description: 'توضیحات تکمیلی',
        type: 'Temporal',
        lastEeg: new Date(Date()),
        phoneNO: '۰۹۱۲۳۴۵۶۷۸۹',
        n_id: '۰۱۳۲۲۹۰۱۲۹'
    },
    {
        key: '6',
        name: 'محمد صادقی',
        age: 32,
        address: 'مشهد، خیابان شهید بهشتی، کوچه ۱، پلاک ۱۸',
        description: 'توضیحات تکمیلی',
        type: 'Temporal',
        lastEeg: new Date(Date()),
        phoneNO: '۰۹۱۲۳۴۵۶۷۸۹',
        n_id: '۰۱۳۲۲۹۰۱۲۹'
    },
    {
        key: '7',
        name: 'محمد صادقی',
        age: 32,
        address: 'مشهد، خیابان شهید بهشتی، کوچه ۱، پلاک ۱۸',
        description: 'توضیحات تکمیلی',
        type: 'Temporal',
        lastEeg: new Date(Date()),
        phoneNO: '۰۹۱۲۳۴۵۶۷۸۹',
        n_id: '۰۱۳۲۲۹۰۱۲۹'
    },
    {
        key: '8',
        name: 'محمد صادقی',
        age: 32,
        address: 'مشهد، خیابان شهید بهشتی، کوچه ۱، پلاک ۱۸',
        description: 'توضیحات تکمیلی',
        type: 'Temporal',
        lastEeg: new Date(Date()),
        phoneNO: '۰۹۱۲۳۴۵۶۷۸۹',
        n_id: '۰۱۳۲۲۹۰۱۲۹'
    },
    {
        key: '9',
        name: 'محمد صادقی',
        age: 32,
        address: 'مشهد، خیابان شهید بهشتی، کوچه ۱، پلاک ۱۸',
        description: 'توضیحات تکمیلی',
        type: 'Temporal',
        lastEeg: new Date(Date()),
        phoneNO: '۰۹۱۲۳۴۵۶۷۸۹',
        n_id: '۰۱۳۲۲۹۰۱۲۹'
    },
    {
        key: '10',
        name: 'محمد صادقی',
        age: 32,
        address: 'مشهد، خیابان شهید بهشتی، کوچه ۱، پلاک ۱۸',
        description: 'توضیحات تکمیلی',
        type: 'Temporal',
        lastEeg: new Date(Date()),
        phoneNO: '۰۹۱۲۳۴۵۶۷۸۹',
        n_id: '۰۱۳۲۲۹۰۱۲۹'
    },
    {
        key: '11',
        name: 'محمد صادقی',
        age: 32,
        address: 'مشهد، خیابان شهید بهشتی، کوچه ۱، پلاک ۱۸',
        description: 'توضیحات تکمیلی',
        type: 'Temporal',
        lastEeg: new Date(Date()),
        phoneNO: '۰۹۱۲۳۴۵۶۷۸۹',
        n_id: '۰۱۳۲۲۹۰۱۲۹'
    },
    {
        key: '12',
        name: 'محمد صادقی',
        age: 32,
        address: 'مشهد، خیابان شهید بهشتی، کوچه ۱، پلاک ۱۸',
        description: 'توضیحات تکمیلی',
        type: 'Temporal',
        lastEeg: new Date(Date()),
        phoneNO: '۰۹۱۲۳۴۵۶۷۸۹',
        n_id: '۰۱۳۲۲۹۰۱۲۹'
    },
    {
        key: '13',
        name: 'محمد صادقی',
        age: 32,
        address: 'مشهد، خیابان شهید بهشتی، کوچه ۱، پلاک ۱۸',
        description: 'توضیحات تکمیلی',
        type: 'Temporal',
        lastEeg: new Date(Date()),
        phoneNO: '۰۹۱۲۳۴۵۶۷۸۹',
        n_id: '۰۱۳۲۲۹۰۱۲۹'
    },
    {
        key: '14',
        name: 'محمد صادقی',
        age: 32,
        address: 'مشهد، خیابان شهید بهشتی، کوچه ۱، پلاک ۱۸',
        description: 'توضیحات تکمیلی',
        type: 'Temporal',
        lastEeg: new Date(Date()),
        phoneNO: '۰۹۱۲۳۴۵۶۷۸۹',
        n_id: '۰۱۳۲۲۹۰۱۲۹'
    },
    {
        key: '15',
        name: 'محمد صادقی',
        age: 32,
        address: 'مشهد، خیابان شهید بهشتی، کوچه ۱، پلاک ۱۸',
        description: 'توضیحات تکمیلی',
        type: 'Temporal',
        lastEeg: new Date(Date()),
        phoneNO: '۰۹۱۲۳۴۵۶۷۸۹',
        n_id: '۰۱۳۲۲۹۰۱۲۹'
    },
    {
        key: '16',
        name: 'محمد صادقی',
        age: 32,
        address: 'مشهد، خیابان شهید بهشتی، کوچه ۱، پلاک ۱۸',
        description: 'توضیحات تکمیلی',
        type: 'Temporal',
        lastEeg: new Date(Date()),
        phoneNO: '۰۹۱۲۳۴۵۶۷۸۹',
        n_id: '۰۱۳۲۲۹۰۱۲۹'
    },
    {
        key: '17',
        name: 'محمد صادقی',
        age: 32,
        address: 'مشهد، خیابان شهید بهشتی، کوچه ۱، پلاک ۱۸',
        description: 'توضیحات تکمیلی',
        type: 'Temporal',
        lastEeg: new Date(Date()),
        phoneNO: '۰۹۲۱۹۸۸۸۹۹۹',
        n_id: '۰۱۳۲۲۹۰۱۲۹'
    },
    {
        key: '18',
        name: 'محمد صادقی',
        age: 32,
        address: 'مشهد، خیابان شهید بهشتی، کوچه ۱، پلاک ۱۸',
        description: 'توضیحات تکمیلی',
        type: 'Temporal',
        lastEeg: new Date(Date()),
        phoneNO: '۰۹۱۲۲۳۳۸۸۷۷',
        n_id: '۰۱۳۲۲۹۰۱۲۹'
    },
    {
        key: '19',
        name: 'محمد صادقی',
        age: 32,
        address: 'مشهد، خیابان شهید بهشتی، کوچه ۱، پلاک ۱۸',
        description: 'توضیحات تکمیلی',
        type: 'Temporal',
        lastEeg: new Date(Date()),
        phoneNO: '۰۹۱۲۳۴۵۶۷۸۹',
        n_id: '۰۱۳۲۲۹۰۱۲۹'
    },
    {
        key: '20',
        name: 'محمد صادقی',
        age: 32,
        address: 'مشهد، خیابان شهید بهشتی، کوچه ۱، پلاک ۱۸',
        description: 'توضیحات تکمیلی',
        type: 'Temporal',
        lastEeg: new Date(Date()),
        phoneNO: '۰۹۱۲۳۴۵۶۷۸۹',
        n_id: '۰۱۳۲۲۹۰۱۲۹'
    },
    {
        key: '21',
        name: 'محمد صادقی',
        age: 32,
        address: 'مشهد، خیابان شهید بهشتی، کوچه ۱، پلاک ۱۸',
        description: 'توضیحات تکمیلی',
        type: 'Temporal',
        lastEeg: new Date(Date()),
        phoneNO: '۰۹۱۲۳۴۵۶۷۸۹',
        n_id: '۰۱۳۲۲۹۰۱۲۹'
    },
    {
        key: '22',
        name: 'محمد صادقی',
        age: 32,
        address: 'مشهد، خیابان شهید بهشتی، کوچه ۱، پلاک ۱۸',
        description: 'توضیحات تکمیلی',
        type: 'Temporal',
        lastEeg: new Date(Date()),
        phoneNO: '۰۹۱۲۳۴۵۶۷۸۹',
        n_id: '۰۱۳۲۲۹۰۱۲۹'
    },
];
//#endregion

export const PatientTable = ({ title, ...other }: Props) => {
    //#region table
    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');
    const searchInput = useRef<InputRef>(null);

    const handleSearch = (
        selectedKeys: string[],
        confirm: FilterDropdownProps['confirm'],
        dataIndex: DataIndex,
    ) => {
        confirm();
        setSearchText(selectedKeys[0]);
        setSearchedColumn(dataIndex);
    };

    const handleReset = (clearFilters: () => void) => {
        clearFilters();
        setSearchText('');
    };

    const getColumnSearchProps = (dataIndex: DataIndex): TableColumnType<DataType> => ({
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => (
            <ConfigProvider locale={fa_IR} direction='rtl'>
                <div style={{ padding: 8 }} onKeyDown={(e) => e.stopPropagation()}>
                    <Input
                        ref={searchInput}
                        placeholder={`جستجو `}
                        value={selectedKeys[0]}
                        onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                        onPressEnter={() => handleSearch(selectedKeys as string[], confirm, dataIndex)}
                        style={{ marginBottom: 8, display: 'block' }}
                    />
                    <Space>
                        <Button
                            type="primary"
                            onClick={() => handleSearch(selectedKeys as string[], confirm, dataIndex)}
                            icon={<SearchOutlined />}
                            size="small"
                            style={{ width: 'auto' }}
                        >
                            جستجو
                        </Button>
                        <Button
                            onClick={() => clearFilters && handleReset(clearFilters)}
                            size="small"
                            style={{ width: 'auto' }}
                        >
                            ریست
                        </Button>
                        <Button
                            type="link"
                            size="small"
                            onClick={() => {
                                confirm({ closeDropdown: false });
                                setSearchText((selectedKeys as string[])[0]);
                                setSearchedColumn(dataIndex);
                            }}
                        >
                            فیلتر
                        </Button>
                        <Button
                            type="link"
                            size="small"
                            onClick={() => {
                                close();
                            }}
                        >
                            بستن
                        </Button>
                    </Space>
                </div>
            </ConfigProvider>
        ),
        filterIcon: (filtered: boolean) => (
            <SearchOutlined style={{ color: filtered ? '#1677ff' : undefined }} />
        ),
        onFilter: (value, record) =>
            record[dataIndex]
                .toString()
                .toLowerCase()
                .includes((value as string).toLowerCase()),
        onFilterDropdownOpenChange: (visible) => {
            if (visible) {
                setTimeout(() => searchInput.current?.select(), 100);
            }
        },
        render: (text) =>
            searchedColumn === dataIndex ? (
                <Highlighter
                    highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
                    searchWords={[searchText]}
                    autoEscape
                    textToHighlight={text ? text.toString() : ''}
                />
            ) : (
                text
            ),
    });

    const columns: TableColumnsType<DataType> = [
        {
            title: 'نام ',
            dataIndex: 'name',
            key: 'name',
            width: 'auto',
            sorter: (a, b) => a.name.length - b.name.length,
            ...getColumnSearchProps('name'),

        },
        {
            title: 'کد ملی',
            dataIndex: 'n_id',
            key: 'n_id',
            width: 'auto',
            ...getColumnSearchProps('n_id'),

        },
        {
            title: 'شماره تماس',
            dataIndex: 'phoneNO',
            key: 'phoneNO',
            width: 'auto',
            ...getColumnSearchProps('phoneNO'),

        },
        {
            title: 'سن',
            dataIndex: 'age',
            key: 'age',
            width: 'auto',
            sorter: (a, b) => a.age - b.age,
            ...getColumnSearchProps('age'),
        },
        {
            title: 'نوع صرع',
            dataIndex: 'type',
            key: 'type',
            ...getColumnSearchProps('type'),
            sorter: (a, b) => a.type.length - b.type.length,
            sortDirections: ['descend', 'ascend'],
            width: 'auto',
            render: function (_, { type }) {
                let color = 'green';
                if (type === 'Focal') {
                    color = 'red';
                }
                if (type === 'Temporal') {
                    color = 'yellow'
                }
                return (
                    <Badge color={color} text={type} />
                );
            },
        },
        // {//not showing date until search for it 
        //     title: 'آخرین الکتروانسفالوگرام آنالیز شده ',
        //     dataIndex: 'lastEeg',
        //     key: 'lastEeg',
        //     sorter: (a, b) => a.lastEeg.getTime() - b.lastEeg.getTime(),
        //     sortDirections: ['descend', 'ascend'],
        //     width: 'auto',
        //     ...getColumnSearchProps('lastEeg'),
        // },
        {
            title: '',
            key: 'action',
            render: (_, record) => (
                <Space size="middle">
                    <a>Profile</a>
                    <a>Delete</a>
                </Space>
            ),
            width: 'auto',

        },
    ];

    //#endregion

    return (
        <div>
            <Table

                {...other}
                bordered
                title={() => title}
                columns={columns}
                dataSource={data} style={{ margin: '10px 0' }}
                pagination={{ responsive: true, position: ['bottomRight'] }}
                expandable={{
                    expandedRowRender: (record) => <p style={{ margin: 0, overflow: 'auto', tableLayout: 'auto' }}>{record.description }</p>,
                }}
                loading={false}
            />
        </div>
    );
};