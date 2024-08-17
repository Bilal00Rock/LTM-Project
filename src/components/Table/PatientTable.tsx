import { Badge, Button, Col, Flex, Input, InputRef, Popover, Row, Space, Table, TableColumnsType, TableColumnType, Typography } from 'antd';
import { useRef, useState } from 'react';
import { SearchOutlined, QuestionOutlined, ArrowUpOutlined } from '@ant-design/icons';
import { FilterDropdownProps } from "antd/es/table/interface";
import Highlighter from 'react-highlight-words';
import { TestingLibraryMatchers } from '@testing-library/jest-dom/matchers';
type Props = {
    title: string;
}
//#region test table
interface DataType {
    key: string;
    name: string;
    age: number;
    description: string;
    type: string;
    lastEeg: Date;
    address: string;
}

type DataIndex = keyof DataType;

const data: DataType[] = [
    {
        key: '1',
        name: 'John Brown',
        age: 32,
        address: 'New York No. 1 Lake Park',
        description: 'this is defualt description',
        type: 'General',
        lastEeg: new Date(Date())
    },
    {
        key: '2',
        name: 'Joe Black',
        age: 42,
        address: 'London No. 1 Lake Park',
        description: 'this is defualt description',
        type: 'Focal',
        lastEeg: new Date(Date())
    },
    {
        key: '3',
        name: 'Jim Green',
        age: 32,
        address: 'Sydney No. 1 Lake Park',
        description: 'this is defualt description',
        type: 'Temporal',
        lastEeg: new Date(Date())
    },
    {
        key: '4',
        name: 'Jim Red',
        age: 32,
        address: 'London No. 2 Lake Park',
        description: 'this is defualt description',
        type: 'Temporal',
        lastEeg: new Date(Date())
    },
    {
        key: '5',
        name: 'Jim Red',
        age: 32,
        address: 'London No. 2 Lake Park',
        description: 'this is defualt description',
        type: 'Temporal',
        lastEeg: new Date(Date())
    },
    {
        key: '6',
        name: 'Jim Red',
        age: 32,
        address: 'London No. 2 Lake Park',
        description: 'this is defualt description',
        type: 'Temporal',
        lastEeg: new Date(Date())
    },
    {
        key: '7',
        name: 'Jim Red',
        age: 32,
        address: 'London No. 2 Lake Park',
        description: 'this is defualt description',
        type: 'Temporal',
        lastEeg: new Date(Date())
    },
    {
        key: '8',
        name: 'Jim Red',
        age: 32,
        address: 'London No. 2 Lake Park',
        description: 'this is defualt description',
        type: 'Temporal',
        lastEeg: new Date(Date())
    },
    {
        key: '9',
        name: 'Jim Red',
        age: 32,
        address: 'London No. 2 Lake Park',
        description: 'this is defualt description',
        type: 'Temporal',
        lastEeg: new Date(Date())
    },
    {
        key: '10',
        name: 'Jim Red',
        age: 32,
        address: 'London No. 2 Lake Park',
        description: 'this is defualt description',
        type: 'Temporal',
        lastEeg: new Date(Date())
    },
    {
        key: '11',
        name: 'Jim Red',
        age: 32,
        address: 'London No. 2 Lake Park',
        description: 'this is defualt description',
        type: 'Temporal',
        lastEeg: new Date(Date())
    },
    {
        key: '12',
        name: 'Jim Red',
        age: 32,
        address: 'London No. 2 Lake Park',
        description: 'this is defualt description',
        type: 'Temporal',
        lastEeg: new Date(Date())
    },
    {
        key: '13',
        name: 'Jim Red',
        age: 32,
        address: 'London No. 2 Lake Park',
        description: 'this is defualt description',
        type: 'Temporal',
        lastEeg: new Date(Date())
    },
    {
        key: '14',
        name: 'Jim Red',
        age: 32,
        address: 'London No. 2 Lake Park',
        description: 'this is defualt description',
        type: 'Temporal',
        lastEeg: new Date(Date())
    },
    {
        key: '15',
        name: 'Jim Red',
        age: 32,
        address: 'London No. 2 Lake Park',
        description: 'this is defualt description',
        type: 'Temporal',
        lastEeg: new Date(Date())
    },
    {
        key: '16',
        name: 'Jim Red',
        age: 32,
        address: 'London No. 2 Lake Park',
        description: 'this is defualt description',
        type: 'Temporal',
        lastEeg: new Date(Date())
    },
    {
        key: '17',
        name: 'Jim Red',
        age: 32,
        address: 'London No. 2 Lake Park',
        description: 'this is defualt description',
        type: 'Temporal',
        lastEeg: new Date(Date())
    },
    {
        key: '18',
        name: 'Jim Red',
        age: 32,
        address: 'London No. 2 Lake Park',
        description: 'this is defualt description',
        type: 'Temporal',
        lastEeg: new Date(Date())
    },
    {
        key: '19',
        name: 'Jim Red',
        age: 32,
        address: 'London No. 2 Lake Park',
        description: 'this is defualt description',
        type: 'Temporal',
        lastEeg: new Date(Date())
    },
    {
        key: '20',
        name: 'Jim Red',
        age: 32,
        address: 'London No. 2 Lake Park',
        description: 'this is defualt description',
        type: 'Temporal',
        lastEeg: new Date(Date())
    },
    {
        key: '21',
        name: 'Jim Red',
        age: 32,
        address: 'London No. 2 Lake Park',
        description: 'this is defualt description',
        type: 'Temporal',
        lastEeg: new Date(Date())
    },
    {
        key: '22',
        name: 'Jim Red',
        age: 32,
        address: 'London No. 2 Lake Park',
        description: 'this is defualt description',
        type: 'Temporal',
        lastEeg: new Date(Date())
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
            <div style={{ padding: 8 }} onKeyDown={(e) => e.stopPropagation()}>
                <Input
                    ref={searchInput}
                    placeholder={`Search ${dataIndex}`}
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
                        Search
                    </Button>
                    <Button
                        onClick={() => clearFilters && handleReset(clearFilters)}
                        size="small"
                        style={{ width: 'auto' }}
                    >
                        Reset
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
                        Filter
                    </Button>
                    <Button
                        type="link"
                        size="small"
                        onClick={() => {
                            close();
                        }}
                    >
                        close
                    </Button>
                </Space>
            </div>
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
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            width: 'auto',
            sorter: (a, b) => a.name.length - b.name.length,
            ...getColumnSearchProps('name'),

        },
        {
            title: 'Age',
            dataIndex: 'age',
            key: 'age',
            width: 'auto',
            sorter: (a, b) => a.age - b.age,
            ...getColumnSearchProps('age'),
        },
        {
            title: 'Type',
            dataIndex: 'type',
            key: 'type',
            ...getColumnSearchProps('type'),
            sorter: (a, b) => a.address.length - b.address.length,
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
        {
            title: 'Last EEG Analyze Time',
            dataIndex: 'lastEeg',
            key: 'lastEeg',
            ...getColumnSearchProps('lastEeg'),
            sorter: (a, b) => a.lastEeg.getTime() - b.lastEeg.getTime(),
            sortDirections: ['descend', 'ascend'],
            width: 'auto',
        },
        {
            title: 'Action',
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
                    expandedRowRender: (record) => <p style={{ margin: 0, overflow: 'auto', tableLayout: 'auto' }}>{record.description}</p>,
                }}
                loading={false}
            />
        </div>
    );
};