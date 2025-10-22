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
import AddFormLayout from "../Forms/AddPatient/AddFormLayout";
import AddDoctorForm from "../Forms/AddAdminPanel/AddDoctorForm";
import EditEntityButton from "./button/EditPatientButton";
type Props = {
  title: string;
  onSelectChange?: (selectedKeys: React.Key[]) => void;
};

//cahnge according to API data types
interface DataType {
  mobile: string;
  nationalCode: string;
  fullName: string;
  personnelCode: string;
  gender?: "male" | "female" | string;
  birthdate?: string;
  clinicAddress?: string;
  id: string;
  createdAt: string;
  updatedAt: string;
}

type DataIndex = keyof DataType;

export const AdminDoctorTable = ({
  title,
  onSelectChange,
  ...other
}: Props) => {
  //fetch data from API
  const {
    data: patientdata,
    loading: patientDataLoading,
    error: error,
  } = useFetchDataPOST(AdminPanelAPI.getDoctors);
  const [open, setOpen] = useState(false);
  const [checkAll, setCheckAll] = useState(false);
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const { localDataDoc, setLocalDataDoc } = useLocalTableContext();

  const handleSelectAll = (e: any) => {
    const checked = e.target.checked;
    setCheckAll(checked);
    let newSelected: React.Key[] = [];
    if (checked && patientdata) {
      newSelected = patientdata.map((item: any) => item.id);
    }
    setSelectedRowKeys(newSelected);
    onSelectChange?.(newSelected); 
  };

  const handleSelectRow = (recordKey: React.Key, checked: boolean) => {
    setSelectedRowKeys((prev) => {
      const newSelected = checked
        ? [...prev, recordKey]
        : prev.filter((key) => key !== recordKey);
      onSelectChange?.(newSelected); 
      return newSelected;
    });
  };
  useEffect(() => {
    if (patientdata) {
      setLocalDataDoc(patientdata);
    }
  }, [patientdata, setLocalDataDoc]);
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
      (record[dataIndex] ?? "")
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
      title: "آیدی",
      dataIndex: "id",
      key: "id",
      width: 130,
      sorter: (a, b) => a.id.length - b.id.length,
      ...getColumnSearchProps("id"),
      render: (text: string, record) => {
        const isExpanded = expandedId === record.id;
        const displayText = isExpanded
          ? text
          : text.length > 6
          ? text.slice(0, 6) + "..."
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
      title: "کد ملی",
      dataIndex: "nationalCode",
      key: "nationalCode",
      width: 100,
      ...getColumnSearchProps("nationalCode"),
    },
    {
      title: "نام و نام خانوادگی",
      dataIndex: "fullName",
      key: "fullName",
      width: 170,
      ...getColumnSearchProps("fullName"),
    },
    {
      title: "شماره تماس",
      dataIndex: "mobile",
      key: "mobile",
      width: 100,
      ...getColumnSearchProps("mobile"),
    },
    {
      title: " کد نظام پزشکی",
      dataIndex: "personnelCode",
      key: "personnelCode",
      width: 170,
      ...getColumnSearchProps("personnelCode"),
    },
    {
      title: "جنسیت",
      dataIndex: "gender",
      key: "gender",
      width: 80,
      render: (gender: string) =>
        gender === "male" ? "مرد" : gender === "female" ? "زن" : "-",
    },
    {
      title: "تاریخ تولد",
      dataIndex: "birthdate",
      key: "birthdate",
      width: 130,
      render: (birthdate: string) => birthdate || "-",
      ...getColumnSearchProps("birthdate" as DataIndex),
    },
    {
      title: "آدرس مطب",
      dataIndex: "clinicAddress",
      key: "clinicAddress",
      width: 200,
      ...getColumnSearchProps("clinicAddress" as DataIndex),
    },

    {
      title: "Created At",
      dataIndex: "createdAt",
      key: "createdAt",
      width: 120,
      ...getColumnSearchProps("createdAt"),
    },
    {
      title: "Updated At",
      dataIndex: "updatedAt",
      key: "updatedAt",
      width: 120,
      ...getColumnSearchProps("updatedAt"),
    },
    {
      title: "Actions",
      key: "actions",
      width: "auto",
      fixed: "right",
      align: "center",
      render: (_, record) => (
        <Space align="center">
          <EditEntityButton type="doctor" data={record} />
          <DeleteButton
            id={record.id}
            onDeleteSuccess={(deletedId) => {
              setLocalDataDoc((prev) =>
                prev.filter((item) => item.id !== deletedId)
              );
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
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <span>{title}</span>
              <AddNewButton onClick={showDrawer} />
            </div>
          )}
          columns={columns}
          dataSource={localDataDoc}
          style={{ margin: "10px 0" }}
          pagination={{
            responsive: true,
            position: ["bottomRight"],
            pageSize: 7,
          }}
          loading={patientDataLoading}
          scroll={{ x: "max-content" }}
        />
      ) : (
        <></>
      )}
      <Drawer
        title="افزودن پزشک"
        placement="left"
        closable={false}
        open={open}
        destroyOnClose
        width={780}
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
        <AddDoctorForm />
      </Drawer>
    </div>
  );
};
