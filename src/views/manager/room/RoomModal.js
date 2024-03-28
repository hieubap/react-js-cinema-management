import React, { useEffect } from "react";
import { Modal, Input, Form, TextArea } from "antd";
import { requestFetch } from "@/service/request";

function RoomModal({ data, open, onCancel, onRefresh } = {}) {
  console.log(open, "open");

  const [form] = Form.useForm();

  const onSubmit = (values) => {
    console.log("submit...", values);
    requestFetch(data?._id ? "put" : "post", "/movie/room", {
      _id: data?._id,
      ...values,
    }).then((res) => {
      if (res.code === 0) {
        onRefresh();
        onCancel();
      } else {
      }
    });
  };

  const onClose = () => {
    form.resetFields();
    onCancel();
  };

  useEffect(() => {
    form.setFieldsValue(data);
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
        <Form.Item label="Tên phòng" name={"nameRoom"}>
          <Input placeholder="Nhập tên phòng" />
        </Form.Item>
        <Form.Item label="Địa chỉ" name={"address"}>
          <Input placeholder="Nhập địa chỉ" />
        </Form.Item>
        <Form.Item label="Số hàng ghế" name={"row"}>
          <Input placeholder="Nhập số lượng" inputMode="numeric" />
        </Form.Item>
        <Form.Item label="Số ghế mỗi hàng" name="column">
          <Input placeholder="Nhập số lượng" inputMode="numeric" />
        </Form.Item>
        <Form.Item label="Mô tả" tooltip="Nhập mô tả" name="content">
          <Input.TextArea placeholder="Viết mô tả" rows={5} />
        </Form.Item>
      </Form>
      {/* <Button></Button> */}
    </Modal>
  );
}

export default RoomModal;
