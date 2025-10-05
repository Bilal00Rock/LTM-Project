import {
  Alert,
  Badge,
  Button,
  Checkbox,
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
import { useCallback, useEffect, useRef, useState } from "react";
import { SearchOutlined } from "@ant-design/icons";
import { FilterDropdownProps } from "antd/es/table/interface";
import Highlighter from "react-highlight-words";
import fa_IR from "antd/locale/fa_IR";
import { MdOutlinePendingActions } from "react-icons/md";
import { PendingsTable } from "./PendingsTable";
import { useNavigate } from "react-router-dom";
import { useFetchData } from "../../hooks";
import { PATH_PATIENTS } from "../../constants";
import { AdminPanelAPI } from "../../api/axios";
import useFetchDataPOST from "../../hooks/useFetchDataPOST";
import AddNewButton from "./button/AddButton";
import "../../pages/Styles/AdminDashboard.css";
type Props = {
  title: string;
  onSelectChange?: (selectedKeys: React.Key[]) => void;
};

//cahnge according to API data types
interface DataType {
  mobile: string;
  id: string;
  createdAt: string;
  updatedAt: string;
  fullName: string;
  doctorId: string;
  gender: string;
  maritalStatus: string;
  birthdate: string;
}

type DataIndex = keyof DataType;

export const AdminPatientsTable = ({
  title,
  onSelectChange,
  ...other
}: Props) => {
  //fetch data from API
  const {
    data: patientdata,
    loading: patientDataLoading,
    error: error,
  } = useFetchDataPOST(AdminPanelAPI.getPatients); //change this back
  console.log(patientdata);
  const [open, setOpen] = useState(false);
  const [checkAll, setCheckAll] = useState(false);
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
const handleSelectAll = (e: any) => {
  const checked = e.target.checked;
  setCheckAll(checked);
  let newSelected: React.Key[] = [];
  if (checked && patientdata) {
    newSelected = patientdata.map((item: any) => item.mobile);
  }
  setSelectedRowKeys(newSelected);
  onSelectChange?.(newSelected); // ← الان شناخته میشه
};

const handleSelectRow = (recordKey: React.Key, checked: boolean) => {
  setSelectedRowKeys((prev) => {
    const newSelected = checked
      ? [...prev, recordKey]
      : prev.filter((key) => key !== recordKey);
    onSelectChange?.(newSelected); // ← الان شناخته میشه
    return newSelected;
  });
};

  useEffect(() => {
    if (patientdata) {
      setCheckAll(selectedRowKeys.length === patientdata.length);
    }
  }, [selectedRowKeys, patientdata]);
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef<InputRef>(null);

  const [expandedId, setExpandedId] = useState<string | null>(null);

  useEffect(() => {
    const handleClickOutside = () => setExpandedId(null);
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);
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
      title: (
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <Checkbox checked={checkAll} onChange={handleSelectAll} />
        </div>
      ),
      dataIndex: "bulk",
      key: "bulk",
      width: 20,
      render: (_, record) => (
        <Checkbox
          checked={selectedRowKeys.includes(record.mobile)}
          onChange={(e) => handleSelectRow(record.mobile, e.target.checked)}
        />
      ),
      className: "no-right-border",
    },
    {
      title: "آیدی ",
      dataIndex: "id",
      key: "id",
      width: 120,
      sorter: (a, b) => a.id.length - b.id.length,
      ...getColumnSearchProps("id"),
      render: (text: string, record) => {
        const isExpanded = expandedId === record.id;
        const displayText = isExpanded
          ? text
          : text.length > 10
          ? text.slice(0, 10) + "..."
          : text;
        const handleClick = (e: React.MouseEvent) => {
          e.stopPropagation();
          if (isExpanded) {
            navigator.clipboard.writeText(text).then(() => {
              alert("آیدی کپی شد ✅");
            });
          } else {
            setExpandedId(record.id);
          }
        };
        return (
          <span
            onClick={handleClick}
            style={{
              cursor: "pointer",
              color: "inherit",
              fontWeight: isExpanded ? "bold" : "normal",
            }}
          >
            {displayText}
          </span>
        );
      },
    },
    {
      title: "نام و نام خانوادگی",
      dataIndex: "fullName",
      key: "fullName",
      width: "auto",
      ...getColumnSearchProps("fullName"),
    },
    {
      title: "شماره تماس",
      dataIndex: "mobile",
      key: "mobile",
      width: "auto",
      ...getColumnSearchProps("mobile"),
    },
    {
      title: " جنسیت  ",
      dataIndex: "gender",
      key: "gender",
      width: "auto",
    },
    {
      title: " وضیعت تاهل",
      dataIndex: "maritalStatus",
      key: "maritalStatus",
      width: "auto",
      ...getColumnSearchProps("maritalStatus"),
    },
    {
      title: "تاریخ تولد",
      dataIndex: "birthdate",
      key: "birthdate",
      width: "auto",
      ...getColumnSearchProps("birthdate"),
    },
    {
      title: "آیدی دکتر",
      dataIndex: "doctorId",
      key: "doctorId",
      width: "auto",
      ...getColumnSearchProps("doctorId"),
    },
    {
      title: "Created At",
      dataIndex: "createdAt",
      key: "createdAt",
      width: "auto",
      ...getColumnSearchProps("createdAt"),
    },
    {
      title: "ََUpdated At",
      dataIndex: "updatedAt",
      key: "updatedAt",
      width: "auto",
      ...getColumnSearchProps("updatedAt"),
    },
    {
      title: "Actions",
      key: "actions",
      width: "auto",
      align: "center",
      render: (_, record) => (
        <Space align="center">
          <Button
            style={{
              padding: 5,
              backgroundColor: "rgba(239, 255, 59, 0.14)",
              color: "rgb(255, 174, 0)",
              border: "1px solid rgb(255, 174, 0)",
              fontSize: "12px",
              marginTop: "2px",
            }}
            // onClick={() => handleEdit(record)}
          >
            <svg
              width="25px"
              height="25px"
              style={{ marginLeft: "-8px", marginRight: "-5px" }}
              viewBox="0 -0.5 25 25"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g id="SVGRepo_bgCarrier" stroke-width="0" />

              <g
                id="SVGRepo_tracerCarrier"
                stroke-linecap="round"
                stroke-linejoin="round"
              />

              <g id="SVGRepo_iconCarrier">
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M17.7 5.12758L19.266 6.37458C19.4172 6.51691 19.5025 6.71571 19.5013 6.92339C19.5002 7.13106 19.4128 7.32892 19.26 7.46958L18.07 8.89358L14.021 13.7226C13.9501 13.8037 13.8558 13.8607 13.751 13.8856L11.651 14.3616C11.3755 14.3754 11.1356 14.1751 11.1 13.9016V11.7436C11.1071 11.6395 11.149 11.5409 11.219 11.4636L15.193 6.97058L16.557 5.34158C16.8268 4.98786 17.3204 4.89545 17.7 5.12758Z"
                  stroke="rgb(255, 174, 0)"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M12.033 7.61865C12.4472 7.61865 12.783 7.28287 12.783 6.86865C12.783 6.45444 12.4472 6.11865 12.033 6.11865V7.61865ZM9.23301 6.86865V6.11865L9.23121 6.11865L9.23301 6.86865ZM5.50001 10.6187H6.25001L6.25001 10.617L5.50001 10.6187ZM5.50001 16.2437L6.25001 16.2453V16.2437H5.50001ZM9.23301 19.9937L9.23121 20.7437H9.23301V19.9937ZM14.833 19.9937V20.7437L14.8348 20.7437L14.833 19.9937ZM18.566 16.2437H17.816L17.816 16.2453L18.566 16.2437ZM19.316 12.4937C19.316 12.0794 18.9802 11.7437 18.566 11.7437C18.1518 11.7437 17.816 12.0794 17.816 12.4937H19.316ZM15.8863 6.68446C15.7282 6.30159 15.2897 6.11934 14.9068 6.2774C14.5239 6.43546 14.3417 6.87397 14.4998 7.25684L15.8863 6.68446ZM18.2319 9.62197C18.6363 9.53257 18.8917 9.13222 18.8023 8.72777C18.7129 8.32332 18.3126 8.06792 17.9081 8.15733L18.2319 9.62197ZM8.30001 16.4317C7.8858 16.4317 7.55001 16.7674 7.55001 17.1817C7.55001 17.5959 7.8858 17.9317 8.30001 17.9317V16.4317ZM15.767 17.9317C16.1812 17.9317 16.517 17.5959 16.517 17.1817C16.517 16.7674 16.1812 16.4317 15.767 16.4317V17.9317ZM12.033 6.11865H9.23301V7.61865H12.033V6.11865ZM9.23121 6.11865C6.75081 6.12461 4.7447 8.13986 4.75001 10.6203L6.25001 10.617C6.24647 8.96492 7.58269 7.62262 9.23481 7.61865L9.23121 6.11865ZM4.75001 10.6187V16.2437H6.25001V10.6187H4.75001ZM4.75001 16.242C4.7447 18.7224 6.75081 20.7377 9.23121 20.7437L9.23481 19.2437C7.58269 19.2397 6.24647 17.8974 6.25001 16.2453L4.75001 16.242ZM9.23301 20.7437H14.833V19.2437H9.23301V20.7437ZM14.8348 20.7437C17.3152 20.7377 19.3213 18.7224 19.316 16.242L17.816 16.2453C17.8195 17.8974 16.4833 19.2397 14.8312 19.2437L14.8348 20.7437ZM19.316 16.2437V12.4937H17.816V16.2437H19.316ZM14.4998 7.25684C14.6947 7.72897 15.0923 8.39815 15.6866 8.91521C16.2944 9.44412 17.1679 9.85718 18.2319 9.62197L17.9081 8.15733C17.4431 8.26012 17.0391 8.10369 16.6712 7.7836C16.2897 7.45165 16.0134 6.99233 15.8863 6.68446L14.4998 7.25684ZM8.30001 17.9317H15.767V16.4317H8.30001V17.9317Z"
                  fill="rgb(255, 174, 0)"
                />
              </g>
            </svg>
            ویرایش
          </Button>
          <Button
            style={{
              padding: 8,
              backgroundColor: "rgba(254, 81, 81, 0.07)",
              color: "#FE5151",
              border: "1px solid #FE5151",
              fontSize: "12px",
            }}
            // onClick={() => handleDelete(record.id)}
          >
            <svg
              width="19px"
              height="19px"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              style={{ marginLeft: "-8px", marginRight: "-3px" }}
            >
              <g id="SVGRepo_bgCarrier" stroke-width="0" />

              <g
                id="SVGRepo_tracerCarrier"
                stroke-linecap="round"
                stroke-linejoin="round"
              />

              <g id="SVGRepo_iconCarrier">
                <path
                  d="M20 14V7C20 5.34315 18.6569 4 17 4H12M20 14L13.5 20M20 14H15.5C14.3954 14 13.5 14.8954 13.5 16V20M13.5 20H7C5.34315 20 4 18.6569 4 17V12"
                  stroke="#FE5151"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M4 4L6.5 6.5M9 9L6.5 6.5M6.5 6.5L9 4M6.5 6.5L4 9"
                  stroke="#FE5151"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </g>
            </svg>
            حذف
          </Button>
          <Button
            style={{
              padding: 8,
              backgroundColor: "rgba(81, 81, 81, 0.07)",
              color: "rgb(112, 112, 112)",
              border: "1px solid rgb(112, 112, 112)",
              fontSize: "12px",
            }}
            // onClick={() => handleDelete(record.id)}
          >
            <img
              src="/img/deactive-account.png"
              alt="deactive"
              style={{ width: "20px", marginLeft: "-5px" }}
            />
            <span style={{ marginBottom: "-2px" }}>deactivate</span>
          </Button>
        </Space>
      ),
    },
  ];

  //#endregion
  if (error)
    return (
      <Space wrap align="center">
        <Alert
          message="Error"
          description={
            error.data?.message ? error.data.message : error.toString()
          }
          type="error"
          showIcon
        />
      </Space>
    );
  return (
    <div>
      {patientdata ? (
        <Table
          {...other}
          bordered
          rowKey="mobile"
          title={() => (
            <Flex justify="space-between">
              <span>{title}</span>
              <AddNewButton />
            </Flex>
          )}
          columns={columns}
          dataSource={patientdata}
          style={{ margin: "10px 0" }}
          pagination={{
            responsive: true,
            position: ["bottomRight"],
            pageSize: 7,
          }}
          // expandable={{
          //   expandedRowRender: (record) => (
          //     <p style={{ margin: 0, overflow: "auto", tableLayout: "auto" }}>
          //       {record.description}
          //     </p>
          //   ),
          // }}
          loading={patientDataLoading}
          scroll={{ x: "max-content" }}
        />
      ) : (
        <></>
      )}
    </div>
  );
};
