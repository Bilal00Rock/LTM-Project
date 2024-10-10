import {
  Alert,
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
import { useFetchData } from "../../hooks";
import { PendingPatientsApi } from "../../api";
var moment = require("moment-jalaali");
moment().format("jYYYY/jM/jD");

type Props = {
  title: string;
};
//#region test table
export interface PendingDataType {
  key: string;
  n_id: string;
  name: string;
  phoneNO: string;
  status: string;
}

type DataIndex = keyof PendingDataType;

//#endregion

export const PendingsTable = ({ title, ...other }: Props) => {


 //fetch data from API
 const {
  data: pendingpatientdata,
  loading: pendingpatientDataLoading,
  error: error,
} = useFetchData(PendingPatientsApi.get);


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
  ): TableColumnType<PendingDataType> => ({
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
              type="link"
              size="small"
              onClick={() => {
                clearFilters && handleReset(clearFilters)
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

  const columns: TableColumnsType<PendingDataType> = [
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
  if(error)
    return(
      <Alert
        message="Error"
        description={error.toString()}
        type="error"
        showIcon
      />
    );
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
        dataSource={pendingpatientdata}
        style={{ margin: "10px 0" }}
        pagination={{ responsive: true, position: ["bottomRight"] }}
        loading={pendingpatientDataLoading}
      />
    </div>
  );
};
