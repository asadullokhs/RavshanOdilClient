import React, { useState, useEffect } from "react";
import {
  Form,
  Input,
  InputNumber,
  DatePicker,
  Upload,
  Select,
  Button,
  message,
} from "antd";
import { UploadOutlined } from "@ant-design/icons";
import axios from "axios";
import { useInfoContext } from "../../../context/InfoContext"; // Adjust path if needed
import "./AddPackage.scss";
import { createPackage } from "../../../api/packageRequests";

const { TextArea } = Input;

const AddPackage = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  // Get companies from context
  const { companies, isRender, setIsRender } = useInfoContext();

  // Helper to upload one image file to Cloudinary
  const handleSubmit = async (values) => {
    try {
      setLoading(true);

      const formData = new FormData();

      // Append primitive values
      formData.append("name", values.name);
      formData.append("type", values.type);
      formData.append("seatsLeft", values.seatsLeft);
      formData.append("price", values.price || "");
      formData.append("duration", values.duration);
      formData.append(
        "departureDate",
        values.departureDate?.toISOString() || ""
      );
      formData.append("returnDate", values.returnDate?.toISOString() || "");
      formData.append("visaType", values.visaType);
      formData.append("departureCity", values.departureCity);
      formData.append("arrivalCity", values.arrivalCity);
      formData.append(
        "stopoverCities",
        JSON.stringify(values.stopoverCities || [])
      );
      formData.append("hotelName", values.hotelName || "");
      formData.append("hotelDistance", values.hotelDistance || "");
      formData.append("hotelStars", values.hotelStars || "");
      formData.append("hotelDescription", values.hotelDescription);
      formData.append("mealPlan", values.mealPlan);
      formData.append("medicalService", values.medicalService);
      formData.append("transportService", values.transportService);
      formData.append("gifts", JSON.stringify(values.gifts || []));
      formData.append("company", values.company);
      formData.append("details", values.details);

      // Append main photo
      if (values.photo && values.photo.length > 0) {
        formData.append("photo", values.photo[0].originFileObj);
      }

      // Append hotel images
      if (values.hotelImages && values.hotelImages.length > 0) {
        values.hotelImages.forEach((file) => {
          formData.append("hotelImages", file.originFileObj);
        });
      }

      // Send request using your createPackage function
      await createPackage(formData);

      message.success("Paket muvaffaqiyatli qo‘shildi!");
      form.resetFields();
      setIsRender(!isRender); // Trigger re-fetch in context
    } catch (err) {
      console.error("Paket qo‘shishda xatolik:", err);
      message.error("Paketni qo‘shishda xatolik yuz berdi.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="add-package">
      <h2>Paket qo‘shish</h2>
      <Form
        layout="vertical"
        form={form}
        onFinish={handleSubmit}
        initialValues={{ type: "economy", seatsLeft: 10 }}
      >
        <div className="form-grid">
          {/* Name */}
          <Form.Item
            name="name"
            label="Paket nomi"
            rules={[{ required: true }]}
          >
            <Input placeholder="Masalan: Arzon Umra" />
          </Form.Item>

          {/* Type */}
          <Form.Item
            name="type"
            label="Paket turi"
            rules={[{ required: true }]}
          >
            <Select
              options={[
                { label: "Ekonom", value: "economy" },
                { label: "Standart", value: "standart" },
                { label: "Komfort", value: "comfort" },
                { label: "Lyuks", value: "luxury" },
              ]}
            />
          </Form.Item>

          {/* Seats Left */}
          <Form.Item
            name="seatsLeft"
            label="Qolgan o‘rinlar"
            rules={[{ required: true }]}
          >
            <InputNumber min={0} style={{ width: "100%" }} />
          </Form.Item>

          {/* Price */}
          <Form.Item name="price" label="Narxi" rules={[{ required: true }]}>
            <InputNumber min={0} style={{ width: "100%" }} />
          </Form.Item>

          {/* Duration */}
          <Form.Item name="duration" label="Davomiyligi">
            <Input placeholder="Masalan: 10 kun / 9 kecha" />
          </Form.Item>

          {/* Visa Type */}
          <Form.Item
            name="visaType"
            label="Viza turi"
            rules={[{ required: true }]}
          >
            <Input placeholder="eVisa, turistik va h.k." />
          </Form.Item>

          {/* Departure Date */}
          <Form.Item name="departureDate" label="Jo‘nash sanasi">
            <DatePicker style={{ width: "100%" }} />
          </Form.Item>

          {/* Return Date */}
          <Form.Item name="returnDate" label="Qaytish sanasi">
            <DatePicker style={{ width: "100%" }} />
          </Form.Item>

          {/* Departure City */}
          <Form.Item
            name="departureCity"
            label="Jo‘nash shahri"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>

          {/* Arrival City */}
          <Form.Item
            name="arrivalCity"
            label="Yetib borish shahri"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>

          {/* Stopover Cities */}
          <Form.Item name="stopoverCities" label="Oraliq shaharlar">
            <Select mode="tags" placeholder="Shaharlarni kiriting" />
          </Form.Item>

          {/* Hotel Name */}
          <Form.Item name="hotelName" label="Mehmonxona nomi">
            <Input />
          </Form.Item>

          {/* Hotel Distance */}
          <Form.Item name="hotelDistance" label="Haramgacha masofa (metr)">
            <InputNumber min={0} style={{ width: "100%" }} />
          </Form.Item>

          {/* Hotel Stars */}
          <Form.Item name="hotelStars" label="Mehmonxona yulduzlari">
            <InputNumber min={1} max={5} style={{ width: "100%" }} />
          </Form.Item>

          {/* Hotel Description */}
          <Form.Item name="hotelDescription" label="Mehmonxona tavsifi">
            <TextArea rows={3} />
          </Form.Item>

          {/* Meal Plan */}
          <Form.Item name="mealPlan" label="Taomnoma">
            <Input />
          </Form.Item>

          {/* Medical Service */}
          <Form.Item name="medicalService" label="Tibbiy xizmat">
            <Input />
          </Form.Item>

          {/* Transport Service */}
          <Form.Item name="transportService" label="Transport xizmati">
            <Input />
          </Form.Item>

          {/* Gifts */}
          <Form.Item name="gifts" label="Sovg‘alar">
            <Select mode="tags" placeholder="Sovg‘alarni kiriting" />
          </Form.Item>

          {/* Details */}
          <Form.Item
            name="details"
            label="Batafsil ma’lumot"
            rules={[{ required: true }]}
          >
            <TextArea rows={4} />
          </Form.Item>

          {/* Company Selector */}
          <Form.Item
            name="company"
            label="Kompaniya"
            rules={[{ required: true }]}
          >
            <Select
              showSearch
              placeholder="Kompaniyani tanlang"
              optionFilterProp="children"
              filterOption={(input, option) =>
                option.children.toLowerCase().includes(input.toLowerCase())
              }
              options={companies?.map((c) => ({
                label: c.name,
                value: c._id,
              }))}
            />
          </Form.Item>

          {/* Main Photo Upload */}
          <Form.Item
            name="photo"
            label="Asosiy surat"
            valuePropName="fileList"
            getValueFromEvent={(e) => e?.fileList}
            rules={[{ required: true, message: "Iltimos, surat yuklang" }]}
          >
            <Upload maxCount={1} beforeUpload={() => false} listType="picture">
              <Button icon={<UploadOutlined />}>Asosiy surat yuklash</Button>
            </Upload>
          </Form.Item>

          {/* Hotel Images Upload */}
          <Form.Item
            name="hotelImages"
            label="Mehmonxona suratlari"
            valuePropName="fileList"
            getValueFromEvent={(e) => e?.fileList}
            rules={[{ message: "Suratlarni yuklang" }]}
          >
            <Upload multiple beforeUpload={() => false} listType="picture-card">
              <div>+</div>
            </Upload>
          </Form.Item>
        </div>

        {/* Submit Button */}
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            loading={loading}
            className="submit-btn"
          >
            Saqlash
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default AddPackage;
