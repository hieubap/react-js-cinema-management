// import Table from "@/components/Table";
import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  Table,
  Tooltip,
  Button,
  Card,
  Input,
  Row,
  Col,
  Popconfirm,
} from "antd";
import {
  EditOutlined,
  DeleteOutlined,
  PlusCircleOutlined,
} from "@ant-design/icons";
import TimetableModal from "./TimetableModal";
import { requestFetch } from "@/service/request";
import { formatPrice } from "@/utils/index";
import moment from "moment";

function ManagerTimetable() {
  const [state, _setState] = useState({
    visible: false,
    data: [],
  });
  const searchRef = useRef({ textSearch: "" });
  const timeRef = useRef();

  const setState = (data) => {
    _setState((pre) => ({ ...pre, ...data }));
  };
  const columns = [
    { title: "STT", width: 50, key: "stt", render: (_, __, idx) => idx + 1 },
    {
      title: "Thời gian",
      width: 120,
      dataIndex: "startAt",
      render: (item) => moment(item).format("HH:mm"),
    },
    {
      title: "Ngày",
      width: 120,
      dataIndex: "startAt",
      render: (item) => moment(item).format("DD/MM/YYYY"),
    },
    { title: "Bộ phim", dataIndex: "film", render: (i) => i.nameFilm },
    {
      title: "Phòng",
      dataIndex: "room",
      render: (i) => i.nameRoom,
    },
    {
      title: "Số vé",
      dataIndex: "room",
      render: (_, item) => {
        const { row = 0, column = 0 } = item;
        return row * column;
      },
    },
    {
      title: "Ghi chú",
      dataIndex: "content",
    },
    {
      title: "Ngày tạo",
      width: 150,
      dataIndex: "createdAt",
      render: (i) => moment(i).format("HH:mm DD/MM/YYYY"),
    },
    {
      title: "",
      width: 80,
      render: (_, row) =>
        row.status == 1 && (
          <div className="group-btn-action">
            <Tooltip title="Sửa">
              <EditOutlined
                onClick={() => {
                  setState({
                    editData: row,
                    visible: true,
                  });
                }}
                style={{ cursor: "pointer", fontSize: 20, color: "blue" }}
              />
            </Tooltip>
            <Popconfirm
              title="Bạn chắc chứ ?"
              onConfirm={() => {}}
              cancelText="Hủy lịch"
              okText="Xóa"
              okButtonProps={{
                color: "secondary",
                danger: true,
              }}
            >
              <DeleteOutlined
                style={{
                  cursor: "pointer",
                  fontSize: 20,
                  marginLeft: 10,
                  color: "red",
                }}
              />
            </Popconfirm>
          </div>
        ),
    },
  ];

  const fetchData = () => {
    requestFetch(
      "get",
      "/movie/timetable?sort=startAt,desc&textSearch=" +
        searchRef.current?.textSearch,
      {}
    ).then((res) => {
      if (res.code == 200) {
        setState({
          data: res.data,
        });
      }
    });
  };

  const fetchDataField = () => {
    requestFetch("get", "/movie/film?sort=createdAt,desc", {}).then((res) => {
      if (res.code == 200) {
        setState({
          filmList: res.data,
        });
      }
    });

    requestFetch("get", "/movie/room?sort=createdAt,desc", {}).then((res) => {
      if (res.code == 200) {
        setState({
          roomList: res.data,
        });
      }
    });
  };

  useEffect(() => {
    fetchData();
    fetchDataField();
  }, []);

  const onCreate = () => {
    setState({ visible: true, editData: null });
  };

  const customData = useMemo(() => {
    return state.data.map((item) => {
      const startTime = moment(item.startAt);

      const status =
        moment() < startTime
          ? 1
          : startTime.add(item.film?.duration, "minute") < moment()
          ? 3
          : 2;

      return { ...item, status };
    });
  }, [state.data]);

  return (
    <div style={{ padding: "10px 50px", background: "white" }}>
      <Card>
        <div
          className="row justify-content-between"
          style={{ marginBottom: 8 }}
        >
          <h3>Danh sách</h3>
          <Button
            type="primary"
            onClick={onCreate}
            icon={<PlusCircleOutlined width={30} height={30} size={30} />}
          >
            Thêm mới
          </Button>
        </div>
        {/* <Row className="mb-3">
          <Col span={12}>
            <Input
              placeholder="Tìm theo tên hoặc mã"
              onChange={(e) => {
                searchRef.current.textSearch = e.target?.value;
                if (timeRef.current) {
                  clearTimeout(timeRef.current);
                }

                timeRef.current = setTimeout(() => {
                  fetchData();
                }, 800);
              }}
            />
          </Col>
        </Row> */}
        <Table
          rowKey={(record, idx) => `${1}_${idx}`}
          rowClassName={(item) => {
            return item.status == 1
              ? "film-coming"
              : item.status == 3
              ? "film-finish"
              : "film-showing";
          }}
          columns={columns}
          dataSource={customData}
          pagination={{ defaultPageSize: 100 }}
        />
      </Card>

      <TimetableModal
        open={state.visible}
        onCancel={() => {
          setState({ visible: false });
        }}
        onRefresh={fetchData}
        data={state.editData}
        roomList={state.roomList}
        filmList={state.filmList}
      />
    </div>
  );
}

export default ManagerTimetable;
