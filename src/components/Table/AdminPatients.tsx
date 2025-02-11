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
  import { PATH_PATIENTS } from "../../constants";
import { AdminPanelAPI } from "../../api/axios";
import useFetchDataPOST from "../../hooks/useFetchDataPOST";
  type Props = {
    title: string;
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
  
  export const AdminPatientsTable = ({ title, ...other }: Props) => {
    //fetch data from API
    const {
      data: patientdata,
      loading: patientDataLoading,
      error: error,
    } = useFetchDataPOST(AdminPanelAPI.getPatients);//change this back
  console.log(patientdata)
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
        title: "آیدی ",
        dataIndex: "id",
        key: "id",
        width: "auto",
        sorter: (a, b) => a.id.length - b.id.length,
        ...getColumnSearchProps("id"),
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
         
          
           </Space>
      );
    return (
      <div>
         {(patientdata) ? 
        <Table
          {...other}
          bordered
          rowKey="mobile"
          title={() => (
            <Flex justify="space-between">
              {title}
              
            </Flex>
          )}
          columns={columns}
          dataSource={patientdata}
          style={{ margin: "10px 0" }}
          pagination={{ responsive: true, position: ["bottomRight"] ,pageSize: 7}}
          // expandable={{
          //   expandedRowRender: (record) => (
          //     <p style={{ margin: 0, overflow: "auto", tableLayout: "auto" }}>
          //       {record.description}
          //     </p>
          //   ),
          // }}
          loading={patientDataLoading}
        />
        :<></>}
        
      </div>
    );
  };
  