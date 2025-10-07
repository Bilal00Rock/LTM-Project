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
import DeleteButton from "./button/DeleteButton";
import { useLocalTableContext } from "../../context/LocalTableProvider";
import ActiveButton from "./button/ActiveButton";
import AddFormLayout from "../Forms/AddPatient/AddFormLayout";
import EditPatientButton from "./button/EditPatientButton";
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

export const AdminPendingsTable = ({
  title,
  onSelectChange,
  ...other
}: Props) => {
  //fetch data from API
  const {
    data: patientdata,
    loading: patientDataLoading,
    error: error,
  } = useFetchDataPOST(AdminPanelAPI.getpendings); //change this back
  console.log(patientdata);
  const [open, setOpen] = useState(false);
  const [checkAll, setCheckAll] = useState(false);
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const { localDataPending, setLocalDataPending } = useLocalTableContext();

  const handleSelectAll = (e: any) => {
    const checked = e.target.checked;
    setCheckAll(checked);
    let newSelected: React.Key[] = [];
    if (checked && patientdata) {
      newSelected = patientdata.map((item: any) => item.id);
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
      setLocalDataPending(patientdata);
    }
  }, [patientdata]);
  useEffect(() => {
    if (patientdata) {
      setCheckAll(selectedRowKeys.length === patientdata.length);
    }
  }, [selectedRowKeys, patientdata]);
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef<InputRef>(null);

  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [docExpandedId, setDocExpandedId] = useState<string | null>(null);

  useEffect(() => {
    const handleClickOutside = () => {
      setExpandedId(null);
      setDocExpandedId(null);
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);
  const showDrawer = () => {
    setOpen(true);
    // setTimeout(() => {
    //   const drawer = document.querySelector(".ant-drawer");
    //   if (drawer) {
    //     drawer.scrollIntoView({ behavior: "smooth", block: "start" });
    //   }
    // }, 50); 
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
          checked={selectedRowKeys.includes(record.id)}
          onChange={(e) => handleSelectRow(record.id, e.target.checked)}
        />
      ),
      className: "no-right-border",
    },
    {
      title: "آیدی ",
      dataIndex: "id",
      key: "id",
      width: 125,
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
      render: (text: string | undefined, record) => {
        const safeText = text || "";
        const isDocExpanded = docExpandedId === record.id;
        const displayTextDoc = isDocExpanded
          ? safeText
          : safeText.length > 10
          ? safeText.slice(0, 10) + "..."
          : safeText;

        const dochandleClick = (e: React.MouseEvent) => {
          e.stopPropagation();
          if (isDocExpanded) {
            navigator.clipboard.writeText(safeText).then(() => {
              alert("آیدی دکتر کپی شد ✅");
              setDocExpandedId(null);
            });
          } else {
            setDocExpandedId(record.id);
          }
        };

        return (
          <span
            onClick={dochandleClick}
            style={{
              cursor: "pointer",
              color: "inherit",
              fontWeight: isDocExpanded ? "bold" : "normal",
            }}
          >
            {displayTextDoc || "-"}
          </span>
        );
      },
    },
    {
      title: "نام و نام خانوادگی پزشک",
      dataIndex: "doctorFullName",
      key: "doctorFullName",
      width: 190,
      ...getColumnSearchProps("fullName"),
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
          <EditPatientButton patient={record} />
          <DeleteButton
            id={record.id}
            onDeleteSuccess={(deletedId) => {
              setLocalDataPending((prev) =>
                prev.filter((item) => item.id !== deletedId)
              );
              setSelectedRowKeys((prev) =>
                prev.filter((key) => key !== deletedId)
              );
            }}
          />
          <ActiveButton
            id={record.id}
            onActiveSuccess={(activeId) => {
              // setLocalDataPending((prev) =>
              //   prev.filter((item) => item.id !== deletedId)
              // );
              // setSelectedRowKeys((prev) =>
              //   prev.filter((key) => key !== deletedId)
              // );
            }}
          />
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
              <AddNewButton onClick={showDrawer} />
            </Flex>
          )}
          columns={columns}
          dataSource={localDataPending}
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
      <Drawer
        title="افزودن بیمار"
        placement="left"
        closable={false}
        open={open}
        destroyOnClose
        width={720}
        onClose={onClose}
        styles={{
          mask: {
            backdropFilter: "blur(2px)",
          },
          body: {
            paddingBottom: 80,
          },
        }}
        extra={<Button onClick={onClose}>بازگشت</Button>}
      >
        <AddFormLayout open={open} setOpen={setOpen} />
      </Drawer>
    </div>
  );
};
