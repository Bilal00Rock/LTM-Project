import {
  Alert,
  Badge,
  Button,
  ConfigProvider,
  Drawer,
  Flex,
  Input,
  InputRef,
  Space,
  Table,
  TableColumnsType,
  TableColumnType,
} from "antd";
import { useCallback, useRef, useState } from "react";
import { SearchOutlined } from "@ant-design/icons";
import { FilterDropdownProps } from "antd/es/table/interface";
import Highlighter from "react-highlight-words";
import fa_IR from "antd/locale/fa_IR";
import { MdOutlinePendingActions } from "react-icons/md";
import { PendingsTable } from "./PendingsTable";
import { useNavigate } from "react-router-dom";
import { useFetchData } from "../../hooks";
import { PatientsApi, PendingPatientsApi } from "../../api";
import { PATH_PATIENTS } from "../../constants";
type Props = {
  title: string;
};

//cahnge according to API data types
interface DataType {
  key: string;
  fullName: string;
  n_id: string;
  age: number;
  description: string;
  phoneNumber: string;
  type: string;
  address: string;
  member: string;
}

type DataIndex = keyof DataType;

export const PatientTable = ({ title, ...other }: Props) => {
  //fetch data from API
  const {
    data: patientdata,
    loading: patientDataLoading,
    error: error,
  } = useFetchData(PatientsApi.get);//change this back

  const [open, setOpen] = useState(false);

  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef<InputRef>(null);

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

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
  const navigate = useNavigate();
  const gotoProf = useCallback(
    (id: string) => {
      navigate(`${PATH_PATIENTS.id}/${id}`);
    },
    [navigate]
  );

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
              type="link"
              size="small"
              onClick={() => {
                clearFilters && handleReset(clearFilters);
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
      dataIndex: "fullName",
      key: "fullName",
      width: "auto",
      sorter: (a, b) => a.fullName.length - b.fullName.length,
      ...getColumnSearchProps("fullName"),
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
      dataIndex: "phoneNumber",
      key: "phoneNumber",
      width: "auto",
      ...getColumnSearchProps("phoneNumber"),
    },
    {
      title: "سن",
      dataIndex: "age",
      key: "age",
      width: "auto",
      sorter: (a, b) => a.age - b.age,
      ...getColumnSearchProps("age"),
    },
    {
      title: "نوع صرع",
      dataIndex: "type",
      key: "type",
      ...getColumnSearchProps("type"),
      sorter: (a, b) => a.type.length - b.type.length,
      sortDirections: ["descend", "ascend"],
      width: "auto",
      render: function (_, { type }) {
        let color = "green";
        if (type === "ناشناخته") {
          color = "red";
        }
        if (type === "فوکال") {
          color = "yellow";
        }
        return <Badge color={color} text={type} />;
      },
    },
    {
      title: "عضویت انجمن ",
      dataIndex: "member",
      key: "member",
      ...getColumnSearchProps("member"),
      //sorter: (a, b) => a.member.length - b.member.length,
      sortDirections: ["descend", "ascend"],
      width: "auto",
      render: function (_, { member }) {
        let color = "";
        let text = "";
        if (member === "false") {
          color = "red";
          text = "ندارد";
        }
        if (member === "true") {
          color = "green";
          text = "دارد";
        }
        if (member === "pending") {
          color = "yellow";
          text = "در انتظار تایید";
        }
        return <Badge color={color} text={text} />;
      },
    },
    {
      title: "",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <a
            onClick={() => {
              console.log(record);
              gotoProf(record.phoneNumber);
              console.log(record?.phoneNumber);
            }}
          >
            پروفایل
          </a>
        </Space>
      ),
      width: "auto",
    },
  ];

  //#endregion
  if (error)
    return (
        <Space wrap align="center">

<Alert
          message="Error"
          description={error.data?.message? error.data.message : error.toString()}
          type="error"
          showIcon
        />
        <Button
          type={"primary"}
          icon={<MdOutlinePendingActions fontSize={25} />}
          onClick={showDrawer}
          >
          بیماران در حال ثبت نام
        </Button>
        
        <Drawer
        title="بیماران در حال ثبت نام"
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
        <PendingsTable title="فهرست انتظار بیماران" />
      </Drawer>
        
         </Space>
    );
  return (
    <div>
       {(patientdata.message === 'Success') ? 
      <Table
        {...other}
        bordered
        rowKey="phoneNumber"
        title={() => (
          <Flex justify="space-between">
            {title}
            <Button
              type={"primary"}
              icon={<MdOutlinePendingActions fontSize={25} />}
              onClick={showDrawer}
            >
              بیماران در حال ثبت نام
            </Button>
          </Flex>
        )}
        columns={columns}
        dataSource={patientdata.data.list}
        style={{ margin: "10px 0" }}
        pagination={{ responsive: true, position: ["bottomRight"] }}
        expandable={{
          expandedRowRender: (record) => (
            <p style={{ margin: 0, overflow: "auto", tableLayout: "auto" }}>
              {record.description}
            </p>
          ),
        }}
        loading={patientDataLoading}
      />
      :<></>}
      <Drawer
        title="بیماران در حال ثبت نام"
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
        <PendingsTable title="فهرست انتظار بیماران" />
      </Drawer>
    </div>
  );
};
