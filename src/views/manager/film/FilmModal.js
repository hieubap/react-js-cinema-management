import React, { useEffect } from "react";
import { Modal, Input, Form, TextArea } from "antd";
import { requestFetch } from "@/service/request";

function FilmModal({ data, open, onCancel, onRefresh } = {}) {
  console.log(open, "open");

  const [form] = Form.useForm();

  const onSubmit = (values) => {
    console.log("submit...", values);
    requestFetch(data._id ? "put" : "post", "/movie/film", {
      _id: data._id,
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
        <Form.Item label="Tên bộ phim" name={"nameFilm"}>
          <Input placeholder="Nhập tên bộ phim" />
        </Form.Item>
        <Form.Item label="Thời lượng" name={"duration"}>
          <Input placeholder="Nhập thời lượng" inputMode="numeric" />
        </Form.Item>
        <Form.Item label="Giá vé" name="balance">
          <Input placeholder="Nhập giá vé" inputMode="numeric" />
        </Form.Item>
        <Form.Item label="Mô tả" tooltip="Nhập mô tả về bộ phim" name="content">
          <Input.TextArea placeholder="Viết mô tả" rows={5} />
        </Form.Item>
      </Form>
      {/* <Button></Button> */}
    </Modal>
  );
}

export default FilmModal;
