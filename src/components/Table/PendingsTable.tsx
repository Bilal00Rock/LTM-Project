import {
  Badge,
  Button,
  ConfigProvider,
  Input,
  InputRef,
  Space,
  Table,
  TableColumnsType,
  TableColumnType,
} from "antd";
import { useRef, useState } from "react";
import { SearchOutlined } from "@ant-design/icons";
import { FilterDropdownProps } from "antd/es/table/interface";
import Highlighter from "react-highlight-words";
import fa_IR from "antd/locale/fa_IR";
import "moment-jalaali";
var moment = require("moment-jalaali");
moment().format("jYYYY/jM/jD");

type Props = {
  title: string;
};
//#region test table
interface DataType {
  key: string;
  n_id: string;
  name: string;
  phoneNO: string;
  status: string;
}

type DataIndex = keyof DataType;

const data: DataType[] = [
  {
    key: "1",
    phoneNO: "۰۹۱۲۳۴۵۶۷۸۹",
    n_id: "۰۱۳۲۲۹۰۱۲۹",
    status: "2024-9-10 16:40:00",
    name: "محمد صادقی",
  },
  {
    key: "2",
    phoneNO: "۰۹۱۲۳۴۵۶۷۸۹",
    n_id: "۰۱۳۲۲۹۰۱۲۹",
    status: "2024-9-10 16:40:00",
    name: "امیر رضایی",
  },
  {
    key: "3",
    phoneNO: "۰۹۱۲۳۴۵۶۷۸۹",
    n_id: "۰۱۳۲۲۹۰۱۲۹",
    status: "2024-9-10 16:40:00",
    name: "یاسین محمودی",
  },
  {
    key: "4",
    phoneNO: "۰۹۱۲۳۴۵۶۷۸۹",
    n_id: "۰۱۳۲۲۹۰۱۲۹",
    status: "2024-9-10 16:40:00",
    name: "یاسین محمودی",
  },
  {
    key: "5",
    phoneNO: "۰۹۱۲۳۴۵۶۷۸۹",
    n_id: "۰۱۳۲۲۹۰۱۲۹",
    status: "2024-9-10 16:40:00",
    name: "یاسین محمودی",
  },
  {
    key: "6",
    phoneNO: "۰۹۱۲۳۴۵۶۷۸۹",
    n_id: "۰۱۳۲۲۹۰۱۲۹",
    status: "2024-9-10 16:40:00",
    name: "یاسین محمودی",
  },
  {
    key: "7",

    phoneNO: "۰۹۱۲۳۴۵۶۷۸۹",
    n_id: "۰۱۳۲۲۹۰۱۲۹",
    status: "2024-9-10 16:40:00",
    name: "یاسین محمودی",
  },
  {
    key: "8",

    phoneNO: "۰۹۱۲۳۴۵۶۷۸۹",
    n_id: "۰۱۳۲۲۹۰۱۲۹",
    status: "2024-9-10 16:40:00",
    name: "یاسین محمودی",
  },
  {
    key: "9",

    phoneNO: "۰۹۱۲۳۴۵۶۷۸۹",
    n_id: "۰۱۳۲۲۹۰۱۲۹",
    status: "2024-9-10 16:40:00",
    name: "یاسین محمودی",
  },
  {
    key: "10",

    phoneNO: "۰۹۱۲۳۴۵۶۷۸۹",
    n_id: "۰۱۳۲۲۹۰۱۲۹",
    status: "2024-9-10 16:40:00",
    name: "یاسین محمودی",
  },
  {
    key: "11",

    phoneNO: "۰۹۱۲۳۴۵۶۷۸۹",
    n_id: "۰۱۳۲۲۹۰۱۲۹",
    status: "2024-9-10 16:40:00",
    name: "یاسین محمودی",
  },
  {
    key: "12",

    phoneNO: "۰۹۱۲۳۴۵۶۷۸۹",
    n_id: "۰۱۳۲۲۹۰۱۲۹",
    status: "2024-9-10 16:40:00",
    name: "یاسین محمودی",
  },
  {
    key: "13",

    phoneNO: "۰۹۱۲۳۴۵۶۷۸۹",
    n_id: "۰۱۳۲۲۹۰۱۲۹",
    status: "2024-9-10 16:40:00",
    name: "یاسین محمودی",
  },
  {
    key: "14",

    phoneNO: "۰۹۱۲۳۴۵۶۷۸۹",
    n_id: "۰۱۳۲۲۹۰۱۲۹",
    status: "2024-9-10 16:40:00",
    name: "یاسین محمودی",
  },
];
//#endregion

export const PendingsTable = ({ title, ...other }: Props) => {
  //#region table
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef<InputRef>(null);

  const handleSearch = (
    selectedKeys: string[],
    confirm: FilterDropdownProps["confirm"],
    dataIndex: DataIndex
  ) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters: () => void) => {
    clearFilters();
    setSearchText("");
  };

  const getColumnSearchProps = (
    dataIndex: DataIndex
  ): TableColumnType<DataType> => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
      close,
    }) => (
      <ConfigProvider locale={fa_IR} direction="rtl">
        <div style={{ padding: 8 }} onKeyDown={(e) => e.stopPropagation()}>
          <Input
            ref={searchInput}
            placeholder={`جستجو `}
            value={selectedKeys[0]}
            onChange={(e) =>
              setSelectedKeys(e.target.value ? [e.target.value] : [])
            }
            onPressEnter={() =>
              handleSearch(selectedKeys as string[], confirm, dataIndex)
            }
            style={{ marginBottom: 8, display: "block" }}
          />
          <Space>
            <Button
              type="primary"
              onClick={() =>
                handleSearch(selectedKeys as string[], confirm, dataIndex)
              }
              icon={<SearchOutlined />}
              size="small"
              style={{ width: "auto" }}
            >
              جستجو
            </Button>
            <Button
              onClick={() => clearFilters && handleReset(clearFilters)}
              size="small"
              style={{ width: "auto" }}
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
      <SearchOutlined style={{ color: filtered ? "#1677ff" : undefined }} />
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
          highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ""}
        />
      ) : (
        text
      ),
  });

  const columns: TableColumnsType<DataType> = [
    {
      title: "نام ",
      dataIndex: "name",
      key: "name",
      width: "auto",
      sorter: (a, b) => a.name.length - b.name.length,
      ...getColumnSearchProps("name"),
    },
    {
      title: "کد ملی",
      dataIndex: "n_id",
      key: "n_id",
      width: "auto",
      ...getColumnSearchProps("n_id"),
    },
    {
      title: "شماره تماس",
      dataIndex: "phoneNO",
      key: "phoneNO",
      width: "auto",
      ...getColumnSearchProps("phoneNO"),
    },
    {
      title: "تاریخ ارسال لینک",
      key: "status",
      width: "auto",
      render: (_, record) => {
        const persianDate = moment(record.status, "YYYY-M-D HH:mm:ss"); // Format the date as Persian
        return persianDate.format("در jYYYY/jM/jD ساعت HH:mm:ss");
      },
    },
  ];

  //#endregion

  return (
    <div>
      <div>
        بیمارانی که لینک ثبت‌نام برای آنها ارسال شده، اما هنوز مراحل ثبت‌نام را
        تکمیل نکرده‌اند.
      </div>
      <Table
        {...other}
        bordered
        title={() => title}
        columns={columns}
        dataSource={data}
        style={{ margin: "10px 0" }}
        pagination={{ responsive: true, position: ["bottomRight"] }}
        loading={false}
      />
    </div>
  );
};
