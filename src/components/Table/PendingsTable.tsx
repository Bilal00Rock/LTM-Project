import {
  Alert,
  Badge,
  Button,
  ConfigProvider,
  Flex,
  Input,
  InputRef,
  Space,
  Table,
  TableColumnsType,
  TableColumnType,
} from "antd";
import { useRef, useState } from "react";
import { ReloadOutlined, SearchOutlined } from "@ant-design/icons";
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
  fullName: string;
  phoneNumber: string;
  create: string;
}

type DataIndex = keyof PendingDataType;

//#endregion

export const PendingsTable = ({ title, ...other }: Props) => {


 //fetch data from API
//  const {
//   data: pendingpatientdata,
//   loading: pendingpatientDataLoading,
//   error: error,
// } = useFetchData(PendingPatientsApi.get);
const [refreshKey, setRefreshKey] = useState(0); // Local state for triggering re-fetch

  // Use refreshKey in key prop to force re-mount (which triggers API re-fetch)
  const { data: pendingpatientdata, loading, error } = useFetchData(
    PendingPatientsApi.get + `?refresh=${refreshKey}` // Modify the URL slightly to trigger a re-fetch
  );

  const handleRefresh = () => {
    setRefreshKey((prev) => prev + 1); // Change state to force re-fetch
  };

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
      title: "نام و نام خانوادگی",
      dataIndex: "fullName",
      key: "fullName",
      width: "auto",
      sorter: (a, b) => a.fullName.length - b.fullName.length,
      ...getColumnSearchProps("fullName"),
    },
    // {
    //   title: "کد ملی",
    //   dataIndex: "n_id",
    //   key: "n_id",
    //   width: "auto",
    //   ...getColumnSearchProps("n_id"),
    // },
    {
      title: "شماره تماس",
      dataIndex: "phoneNumber",
      key: "phoneNumber",
      width: "auto",
      ...getColumnSearchProps("phoneNumber"),
    },
    {
      title: "تاریخ ارسال لینک",
      key: "create",
      width: "auto",
      render: (_, record) => {
        if(record){

          const persianDate = moment(record.create, "YYYY-M-DTHH:mm:ss"); // Format the date as Persian
          return persianDate.format("در jYYYY/jM/jD ساعت HH:mm:ss");
        }
      },
    },
  ];

  //#endregion
  if(error)
    return(
      <Alert
        message="Error"
        description={error.data?.message? error.data.message : error.toString()}
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
      
      {(pendingpatientdata.message === 'Success') ? 
      <Table
      {...other}
      bordered
      title={() => (
        <Flex justify="space-between">
          {title}
          <Button type="primary" icon={<ReloadOutlined />} onClick={handleRefresh} loading={loading}>
          بروزرسانی
        </Button>
        </Flex>
      )}
      columns={columns}
      rowKey="phoneNumber"
      dataSource={pendingpatientdata.data.list}
      style={{ margin: "10px 0" }}
      pagination={{ responsive: true, position: ["bottomRight"], pageSize: 7 }}
      loading={loading}
      />
    : <></>}
    </div>
  );
};
