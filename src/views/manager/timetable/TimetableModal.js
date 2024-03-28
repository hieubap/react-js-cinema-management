import React, { useEffect } from "react";
import { Modal, Input, Form, Select, DatePicker } from "antd";
import { requestFetch } from "@/service/request";
import moment from "moment";

function TimetableModal({
  data,
  open,
  onCancel,
  onRefresh,
  roomList = [],
  filmList = [],
} = {}) {
  console.log(open, "open");

  const [form] = Form.useForm();

  const onSubmit = (values) => {
    console.log("submit...", values);
    requestFetch(data?._id ? "put" : "post", "/movie/timetable", {
      _id: data?._id,
      ...values,
    }).then((res) => {
      if (res.code === 0) {
        onRefresh();
        onClose();
      } else {
      }
    });
  };

  const onClose = () => {
    form.resetFields();
    onCancel();
  };

  useEffect(() => {
    if (data) {
      form.setFieldsValue({ ...data, startAt: moment(data.startAt) });
    }
  }, [data]);
  return (
    <Modal
      open={open}
      onCancel={onClose}
      onOk={() => {
        form.submit();
      }}
    >
      <Form layout="vertical" onFinish={onSubmit} form={form}>
        <Form.Item label="Phim" name={"filmId"}>
          <Select
            placeholder="Chọn phim"
            options={filmList.map((i) => ({
              label: i.nameFilm,
              value: i._id,
            }))}
          />
        </Form.Item>
        <Form.Item label="Phòng" name={"roomId"}>
          <Select
            placeholder="Chọn phòng"
            options={roomList.map((i) => ({
              label: i.nameRoom,
              value: i._id,
            }))}
          />
        </Form.Item>
        <Form.Item label="Thời gian chiếu" name={"startAt"}>
          <DatePicker
            placeholder="Chọn thời điểm"
            showTime
            format={"HH:mm DD/MM/YYYY"}
            style={{ width: "100%" }}
          />
        </Form.Item>
        <Form.Item label="Ghi chú" name="content">
          <Input.TextArea placeholder="Viết ghi chú" rows={5} />
        </Form.Item>
      </Form>
      {/* <Button></Button> */}
    </Modal>
  );
}

export default TimetableModal;
