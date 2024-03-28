// import Table from "@/components/Table";
import React, { useEffect, useRef, useState } from "react";
import {
  Table,
  Tooltip,
  Button,
  Card,
  Input,
  Row,
  Col,
  Popconfirm,
  Image,
} from "antd";
import {
  EditOutlined,
  DeleteOutlined,
  PlusCircleOutlined,
} from "@ant-design/icons";
import FilmModal from "./FilmModal";
import { convertFileUrl, requestFetch } from "@/service/request";
import { formatPrice } from "@/utils/index";

function ManagerFilm() {
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
    { title: "STT", key: "stt", render: (_, __, idx) => idx + 1 },
    {
      title: "",
      key: "picture",
      dataIndex: "imageUrl",
      render: (item) =>
        item ? (
          <Image
            style={{ objectFit: "contain" }}
            src={convertFileUrl(item)}
            width={100}
            height={100}
          />
        ) : null,
    },
    { title: "Tên phim", key: "name", dataIndex: "nameFilm" },
    { title: "Mã", dataIndex: "codeFilm" },
    { title: "Thời lượng", dataIndex: "duration" },
    {
      title: "Giá vé",
      dataIndex: "balance",
      render: (i) => formatPrice(i),
    },
    { title: "Thể loại", dataIndex: "type" },
    { title: "Số vé đá bán" },
    {
      title: "",
      width: 80,
      render: (_, row) => (
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
            cancelText="Hủy"
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
      "/movie/film?sort=createdAt,desc&textSearch=" +
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

  useEffect(() => {
    fetchData();
  }, []);

  const onCreate = () => {
    setState({ visible: true, editData: null });
  };

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
        <Row className="mb-3">
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
        </Row>
        <Table
          rowKey={(record, idx) => `${1}_${idx}`}
          columns={columns}
          dataSource={state.data}
        />
      </Card>

      <FilmModal
        open={state.visible}
        onCancel={() => {
          setState({ visible: false });
        }}
        onRefresh={fetchData}
        data={state.editData}
      />
    </div>
  );
}

export default ManagerFilm;
