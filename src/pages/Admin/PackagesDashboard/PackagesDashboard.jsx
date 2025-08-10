import React, { useState } from "react";
import {
  Table,
  Drawer,
  Image,
  Tag,
  Button,
  Popconfirm,
  message,
  Form,
  Input,
  InputNumber,
  DatePicker,
} from "antd";
import { useInfoContext } from "../../../context/InfoContext";
import "./Packages.scss";
import moment from "moment";
import { deletePackage, updatePackage } from "../../../api/packageRequests";

const { TextArea } = Input;

const PackagesDashboard = () => {
  const { packages, isRender, setIsRender } = useInfoContext();
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [form] = Form.useForm();

  // Convert stopoverCities and gifts from array to comma-separated string for Input fields
  const formatForForm = (pkg) => ({
    ...pkg,
    departureDate: pkg.departureDate ? moment(pkg.departureDate) : null,
    returnDate: pkg.returnDate ? moment(pkg.returnDate) : null,
    stopoverCities: Array.isArray(pkg.stopoverCities)
      ? pkg.stopoverCities.join(", ")
      : pkg.stopoverCities || "",
    gifts: Array.isArray(pkg.gifts) ? pkg.gifts.join(", ") : pkg.gifts || "",
  });

  const openDrawer = (pkg) => {
    setSelectedPackage(pkg);
    setDrawerOpen(true);
    setEditMode(false);
    form.setFieldsValue(formatForForm(pkg)); // Set Moment dates here
  };

  const closeDrawer = () => {
    setDrawerOpen(false);
    setSelectedPackage(null);
    setEditMode(false);
    form.resetFields();
  };

  const handleDelete = async (id) => {
    try {
      await deletePackage(id);
      setIsRender(!isRender);
      window.alert("Umra paketi muvaffaqiyatli o'chirildi!");
    } catch (error) {
      window.alert(error?.message);
    }
  };

  const handleEdit = () => {
    if (!selectedPackage) return;
    setEditMode(true);

    // Set all relevant fields with proper formatting
    form.setFieldsValue(formatForForm(selectedPackage));
  };

  const onFinish = async (values) => {
    try {
      // Convert comma-separated strings back to arrays
      const updatedValues = {
        ...values,
        stopoverCities: values.stopoverCities
          ? values.stopoverCities.split(",").map((s) => s.trim())
          : [],
        gifts: values.gifts ? values.gifts.split(",").map((s) => s.trim()) : [],
        departureDate: values.departureDate
          ? values.departureDate.toISOString()
          : null,
        returnDate: values.returnDate ? values.returnDate.toISOString() : null,
      };

      await updatePackage(selectedPackage._id, updatedValues);
      message.success("Paket muvaffaqiyatli yangilandi!");
      setIsRender(!isRender);
      closeDrawer();
    } catch (err) {
      message.error(err.message || "Xatolik yuz berdi");
    }
  };

  const columns = [
    {
      title: "Rasm",
      dataIndex: "photo",
      render: (photo) => <Image width={60} src={photo?.url} alt="photo" />,
    },
    {
      title: "Nom",
      dataIndex: "name",
    },
    {
      title: "Turi",
      dataIndex: "type",
      render: (type) => (
        <Tag color={type === "luxury" ? "gold" : "blue"}>
          {type?.toUpperCase()}
        </Tag>
      ),
    },
    {
      title: "Narxi ($)",
      dataIndex: "price",
    },
    {
      title: "Qolgan joylar",
      dataIndex: "seatsLeft",
    },
    {
      title: "Kompaniya",
      dataIndex: ["company", "name"],
    },
    {
      title: "Sanalar",
      render: (_, record) => {
        const d = new Date(record.departureDate);
        const r = new Date(record.returnDate);
        return `${d.toLocaleDateString()} - ${r.toLocaleDateString()}`;
      },
    },
  ];

  return (
    <div className="packages-dashboard">
      <h2 className="page-title">Umra Paketlari Paneli</h2>

      <Table
        dataSource={packages}
        columns={columns}
        rowKey="_id"
        onRow={(record) => ({
          onClick: () => openDrawer(record),
        })}
        pagination={{ pageSize: 5 }}
        scroll={{ x: "max-content" }}
      />

      <Drawer
        title={selectedPackage?.name?.uz || selectedPackage?.name}
        placement="right"
        width={480}
        onClose={closeDrawer}
        open={drawerOpen}
        footer={
          <div className="drawer-footer">
            {!editMode ? (
              <Button type="primary" onClick={handleEdit}>
                Edit
              </Button>
            ) : (
              <Button type="primary" onClick={() => form.submit()}>
                Saqlash
              </Button>
            )}

            <Popconfirm
              title="Paketni o‘chirish"
              description="Ishonchingiz komilmi?"
              onConfirm={() => handleDelete(selectedPackage._id)}
              okText="Ha"
              cancelText="Yo‘q"
            >
              <Button className="deleteBtn">Delete</Button>
            </Popconfirm>
            <Button className="closeBtn" onClick={closeDrawer}>
              Close
            </Button>
          </div>
        }
      >
        {!editMode ? (
          selectedPackage && (
            <>
              <Image
                src={selectedPackage.photo.url}
                alt="main-img"
                width="100%"
              />
              <p>
                <strong>Turi:</strong> {selectedPackage.type}
              </p>
              <p>
                <strong>Narxi:</strong> ${selectedPackage.price}
              </p>
              <p>
                <strong>Qolgan joylar:</strong> {selectedPackage.seatsLeft}
              </p>
              <p>
                <strong>Viza turi:</strong> {selectedPackage.visaType}
              </p>
              <p>
                <strong>Parvoz:</strong> {selectedPackage.departureCity} ✈{" "}
                {selectedPackage.stopoverCities.join(" ✈ ")} ✈{" "}
                {selectedPackage.arrivalCity}
              </p>
              <p>
                <strong>Sanalar:</strong>{" "}
                {new Date(selectedPackage.departureDate).toLocaleDateString()} -{" "}
                {new Date(selectedPackage.returnDate).toLocaleDateString()}
              </p>
              <p>
                <strong>Mehmonxona:</strong> {selectedPackage.hotelName} (
                {selectedPackage.hotelStars}⭐, {selectedPackage.hotelDistance}
                m)
              </p>
              <p>
                <strong>Ovqatlanish:</strong> {selectedPackage.mealPlan} mahal
              </p>
              <p>
                <strong>Sog'liqni saqlash:</strong>{" "}
                {selectedPackage.medicalService}
              </p>
              <p>
                <strong>Transport:</strong> {selectedPackage.transportService}
              </p>
              <p>
                <strong>Sovg'alar:</strong> {selectedPackage.gifts?.join(", ")}
              </p>
              <p>
                <strong>Tavsif:</strong> {selectedPackage.details}
              </p>
              <div className="company-info">
                <h3>📦 Kompaniya Ma'lumotlari</h3>
                <Image
                  width={100}
                  src={selectedPackage.company.logo.url}
                  alt="company-logo"
                />
                <p>
                  <strong>Nom:</strong> {selectedPackage.company.name}
                </p>
                <p>
                  <strong>Davlat:</strong> {selectedPackage.company.country}
                </p>
                <p>
                  <strong>Web:</strong>{" "}
                  <a
                    href={`https://${selectedPackage.company.website}`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {selectedPackage.company.website}
                  </a>
                </p>
              </div>
            </>
          )
        ) : (
          <Form
            layout="vertical"
            form={form}
            onFinish={onFinish}
            style={{ maxWidth: 700, margin: "auto" }}
          >
            <Form.Item
              label="Paket nomi"
              name="name"
              rules={[{ required: true, message: "Nomni kiriting" }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Narxi"
              name="price"
              rules={[{ required: true, message: "Narxni kiriting" }]}
            >
              <InputNumber min={0} style={{ width: "100%" }} />
            </Form.Item>

            <Form.Item
              label="Jo‘nash sanasi"
              name="departureDate"
              rules={[{ required: true, message: "Jo‘nash sanasini kiriting" }]}
            >
              <DatePicker style={{ width: "100%" }} format="YYYY-MM-DD" />
            </Form.Item>

            <Form.Item
              label="Qaytish sanasi"
              name="returnDate"
              rules={[{ message: "Qaytish sanasini kiriting" }]}
            >
              <DatePicker style={{ width: "100%" }} format="YYYY-MM-DD" />
            </Form.Item>

            <Form.Item
              label="Qolgan joylar"
              name="seatsLeft"
              rules={[{ required: true, message: "Joylar sonini kiriting" }]}
            >
              <InputNumber min={0} style={{ width: "100%" }} />
            </Form.Item>

            <Form.Item label="Tavsif" name="details">
              <TextArea rows={4} />
            </Form.Item>

            <Form.Item label="Davomiyligi" name="duration">
              <Input />
            </Form.Item>

            <Form.Item label="Viza turi" name="visaType">
              <Input />
            </Form.Item>

            <Form.Item label="Jo‘nash shahri" name="departureCity">
              <Input />
            </Form.Item>

            <Form.Item label="Yetib borish shahri" name="arrivalCity">
              <Input />
            </Form.Item>

            <Form.Item
              label="Oraliq shaharlar (vergul bilan)"
              name="stopoverCities"
            >
              <Input />
            </Form.Item>

            <Form.Item label="Mehmonxona nomi" name={"hotelName"}>
              <Input />
            </Form.Item>

            <Form.Item label="Mehmonxona yulduzlari" name={"hotelStars"}>
              <InputNumber min={1} max={5} style={{ width: "100%" }} />
            </Form.Item>

            <Form.Item label="Mehmonxona tavsifi" name={"hotelDescription"}>
              <TextArea rows={3} />
            </Form.Item>

            <Form.Item label="Taomnoma" name="mealPlan">
              <TextArea rows={2} />
            </Form.Item>

            <Form.Item label="Tibbiy xizmat" name="medicalService">
              <TextArea rows={2} />
            </Form.Item>

            <Form.Item label="Transport xizmati" name="transportService">
              <TextArea rows={2} />
            </Form.Item>

            <Form.Item label="Sovg'alar (vergul bilan)" name="gifts">
              <Input />
            </Form.Item>
          </Form>
        )}
      </Drawer>
    </div>
  );
};

export default PackagesDashboard;
