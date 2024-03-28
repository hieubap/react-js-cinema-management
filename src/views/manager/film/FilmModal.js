import React, { useEffect, useState } from "react";
import { Modal, Input, Form, Upload } from "antd";
import { requestFetch, requestUpload } from "@/service/request";

function FilmModal({ data = {}, open, onCancel, onRefresh } = {}) {
  console.log(open, "open");
  const [file, setFile] = useState(null);

  const [form] = Form.useForm();

  const onSubmit = (values) => {
    console.log("submit...", values);
    if (file?.originFileObj) {
      requestUpload("/asset/upload", file.originFileObj).then((res) => {
        requestSave({ ...values, imageUrl: res.data?.url });
      });
      return;
    }
    requestSave(values);
  };

  const requestSave = (values) => {
    requestFetch(data?._id ? "put" : "post", "/movie/film", {
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
    setFile(null);
  };

  useEffect(() => {
    form.setFieldsValue(data);
  }, [data]);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");

  const getBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });

  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }

    setPreviewImage(file.url || file.preview);
    setPreviewOpen(true);
    setPreviewTitle(
      file.name || file.url.substring(file.url.lastIndexOf("/") + 1)
    );
  };

  const handleChange = (payload) => {
    console.log(payload, "payload");
    setFile(payload.fileList?.[0]);
  };
  const handleRemove = () => {
    console.log("handleremove");
  };
  const handleCancel = () => setPreviewOpen(false);
  return (
    <>
      <Modal
        open={open}
        onCancel={onClose}
        onOk={() => {
          form.submit();
        }}
      >
        <Upload
          listType="picture-card"
          fileList={file ? [file] : null}
          onPreview={handlePreview}
          onChange={handleChange}
          onRemove={handleRemove}
          beforeUpload={() => false}
        >
          {!file && (
            <button style={{ border: 0, background: "none" }} type="button">
              <div style={{ marginTop: 8 }}>Upload</div>
            </button>
          )}
        </Upload>
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
          <Form.Item
            label="Mô tả"
            tooltip="Nhập mô tả về bộ phim"
            name="content"
          >
            <Input.TextArea placeholder="Viết mô tả" rows={5} />
          </Form.Item>
        </Form>
        {/* <Button></Button> */}
      </Modal>
      <Modal
        open={previewOpen}
        title={previewTitle}
        footer={null}
        onCancel={handleCancel}
      >
        <img alt="example" style={{ width: "100%" }} src={previewImage} />
      </Modal>
    </>
  );
}

export default FilmModal;
