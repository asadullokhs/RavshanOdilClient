import React, { useState, useMemo, useCallback } from "react";
import { message, Modal, Input, Button, Drawer, Popconfirm } from "antd";
import { PlusOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { useInfoContext } from "../../../context/InfoContext";
import {
  createCompany,
  deleteCompany,
  updateCompany,
} from "../../../api/companyRequests";
import "./CompaniesDashboard.scss";

const CompaniesDashboard = () => {
  const { companies, isRender, setIsRender } = useInfoContext();
  const [isAdding, setIsAdding] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);

  // Drawer visibility for Add Company
  const [drawerVisible, setDrawerVisible] = useState(false);

  // Add form state
  const [form, setForm] = useState({
    name: "",
    country: "",
    description: "",
    website: "",
  });

  // Update modal state
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [updateData, setUpdateData] = useState({
    name: "",
    description: "",
    website: "",
  });

  // Expanded description toggling
  const [expanded, setExpanded] = useState({});

  const toggleExpand = useCallback(
    (id) => setExpanded((prev) => ({ ...prev, [id]: !prev[id] })),
    []
  );

  const normalizeWebsiteUrl = (url) => {
    if (!url) return "";

    let trimmedUrl = url.trim();

    // If URL already starts with http:// or https://, leave it as is
    if (/^https?:\/\//i.test(trimmedUrl)) {
      return trimmedUrl;
    }

    // Otherwise, add https://www. in front
    return `https://www.${trimmedUrl}`;
  };

  // Add form handlers
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleLogoChange = (e) => {
    setForm((prev) => ({ ...prev, logo: e.target.files[0] }));
  };

  const openDrawer = () => setDrawerVisible(true);
  const closeDrawer = () => setDrawerVisible(false);

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      setIsAdding(true); // Start loading

      const normalizedWebsite = normalizeWebsiteUrl(form.website);

      if (
        form.name.trim().length < 3 ||
        form.name.trim().length > 100 ||
        form.country.trim().length < 2 ||
        form.country.trim().length > 100 ||
        form.description.trim().length < 10 ||
        form.description.trim().length > 1000 ||
        (normalizedWebsite && !/^https?:\/\/.+\..+/.test(normalizedWebsite))
      ) {
        setIsAdding(false); // Stop loading if invalid
        return message.warning(
          "Iltimos, barcha maydonlarni to‘g‘ri to‘ldiring. Veb-sayt manzili to‘g‘ri formatda bo‘lishi kerak (http:// yoki https:// bilan boshlanishi)."
        );
      }
      if (!form.logo) {
        setIsAdding(false);
        return message.warning("Iltimos, kompaniya logotipini tanlang.");
      }

      try {
        const formData = new FormData();
        formData.append("name", form.name.trim());
        formData.append("country", form.country.trim());
        formData.append("description", form.description.trim());
        formData.append("website", normalizedWebsite);
        formData.append("logo", form.logo); // << Correct logo file here
        await createCompany(formData);
        message.success("Kompaniya qo‘shildi!");
        setForm({ name: "", country: "", description: "", website: "" });
        setIsRender(!isRender);
        closeDrawer();
      } catch {
        message.error("Xatolik yuz berdi. Qaytadan urinib ko‘ring.");
      } finally {
        setIsAdding(false); // Stop loading after try/catch
      }
    },
    [form, isRender, setIsRender]
  );

  // Delete company
  const handleDelete = async (id) => {
    try {
      await deleteCompany(id);
      message.success("Kompaniya o‘chirildi!");
      setIsRender(!isRender);
    } catch {
      message.error("O‘chirishda xatolik yuz berdi.");
    }
  };

  // Show update modal
  const openUpdateModal = (company) => {
    setUpdateData({
      _id: company._id,
      name: company.name,
      description: company.description,
      website: company.website || "",
    });
    setIsModalVisible(true);
  };

  // Handle update inputs
  const handleUpdateChange = (e) => {
    const { name, value } = e.target;
    setUpdateData((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdateSubmit = async () => {
    setIsUpdating(true);

    const { _id, name, description, website } = updateData;

    const trimmedName = name.trim();
    const trimmedDescription = description.trim();
    const normalizedWebsite = normalizeWebsiteUrl(website);

    if (
      trimmedName.length < 3 ||
      trimmedName.length > 100 ||
      trimmedDescription.length < 10 ||
      trimmedDescription.length > 1000 ||
      (normalizedWebsite && !/^https?:\/\/.+\..+/.test(normalizedWebsite))
    ) {
      setIsUpdating(false);
      return message.warning(
        "Iltimos, maydonlarni to‘g‘ri to‘ldiring. Veb-sayt manzili http:// yoki https:// bilan boshlanishi kerak."
      );
    }

    try {
      await updateCompany(_id, {
        name: trimmedName,
        description: trimmedDescription,
        website: normalizedWebsite,
      });
      message.success("Kompaniya yangilandi!");
      setIsModalVisible(false);
      setIsRender(!isRender);
    } catch (error) {
      message.error(
        error?.response?.data?.message || "Yangilashda xatolik yuz berdi."
      );
    } finally {
      setIsUpdating(false);
    }
  };
  // Render company cards with new minimalistic design
  const renderedCompanies = useMemo(() => {
    return companies?.map((c) => {
      const isLong = c.description.length > 150;
      const isExpanded = expanded[c._id];
      const shownText = isExpanded
        ? c.description
        : c.description.slice(0, 150);

      return (
        <div className="company-card" key={c._id}>
          <div className="company-logo">
            {c.logo?.url ? (
              <img src={c.logo.url} alt={`${c.name} logo`} />
            ) : (
              <div className="no-logo">No Logo</div>
            )}
          </div>
          <div className="company-content">
            <div className="company-header">
              <h3>{c.name}</h3>
              <div className="actions">
                <Button
                  type="text"
                  icon={<EditOutlined style={{ color: "#28a745" }} />}
                  onClick={() => openUpdateModal(c)}
                  aria-label="Update company"
                />
                <Popconfirm
                  title="Kompaniyani o‘chirish"
                  description="Ishonchingiz komilmi?"
                  onConfirm={() => handleDelete(c._id)}
                  okText="Ha"
                  cancelText="Yo‘q"
                >
                  <Button
                    type="text"
                    icon={<DeleteOutlined style={{ color: "#ff4d4f" }} />}
                    aria-label="Delete company"
                  />
                </Popconfirm>
              </div>
            </div>
            <p className="country">{c.country}</p>
            <p className="description">
              {shownText}
              {isLong && (
                <span
                  className="see-more"
                  onClick={() => toggleExpand(c._id)}
                  role="button"
                  tabIndex={0}
                  onKeyPress={(e) => {
                    if (e.key === "Enter") toggleExpand(c._id);
                  }}
                >
                  {isExpanded ? "Yopish" : "Ko‘proq"}
                </span>
              )}
            </p>
            {c.website && (
              <a
                href={c.website}
                target="_blank"
                rel="noopener noreferrer"
                className="website-link"
              >
                Veb-saytga tashrif buyuring
              </a>
            )}
          </div>
        </div>
      );
    });
  }, [companies, expanded, toggleExpand]);

  return (
    <div className="companies-page">
      <div className="header">
        <h1>Kompaniyalar</h1>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={openDrawer}
          className="add-button"
        >
          Kompaniya qo‘shish
        </Button>
      </div>

      <Drawer
        title="Yangi kompaniya qo‘shish"
        placement="right"
        onClose={closeDrawer}
        open={drawerVisible}
        width={400}
        styleBody={{ paddingBottom: 40 }}
      >
        <form
          onSubmit={handleSubmit}
          encType="multipart/form-data"
          className="company-form"
        >
          <Input
            name="name"
            placeholder="Kompaniya nomi"
            value={form.name}
            onChange={handleInputChange}
            minLength={3}
            maxLength={100}
            required
            style={{ marginBottom: 16 }}
          />
          <Input
            name="country"
            placeholder="Davlat"
            value={form.country}
            onChange={handleInputChange}
            minLength={2}
            maxLength={100}
            required
            style={{ marginBottom: 16 }}
          />
          <Input.TextArea
            name="description"
            placeholder="Kompaniya haqida ma'lumot"
            value={form.description}
            onChange={handleInputChange}
            minLength={10}
            maxLength={1000}
            required
            rows={5}
            style={{ marginBottom: 16 }}
          />
          <Input
            name="website"
            placeholder="Veb-sayt (ixtiyoriy)"
            value={form.website}
            onChange={handleInputChange}
            style={{ marginBottom: 16 }}
          />
          <input
            type="file"
            accept="image/*"
            onChange={handleLogoChange}
            required
            style={{ marginBottom: 24 }}
          />
          <Button
            className="drawer-button"
            type="primary"
            htmlType="submit"
            block
            loading={isAdding}
          >
            Qo‘shish
          </Button>
        </form>
      </Drawer>

      <div className="companies-list">{renderedCompanies}</div>

      {/* Update Modal */}
      <Modal
        title="Kompaniya ma'lumotlarini yangilash"
        open={isModalVisible}
        onOk={handleUpdateSubmit}
        confirmLoading={isUpdating}
        onCancel={() => setIsModalVisible(false)}
        okText="Yangilash"
        cancelText="Bekor qilish"
        destroyOnHidden
      >
        {/* Modal inputs */}

        <Input
          name="name"
          placeholder="Kompaniya nomi"
          value={updateData.name}
          onChange={handleUpdateChange}
          maxLength={100}
          style={{ marginBottom: 16 }}
        />
        <Input.TextArea
          name="description"
          placeholder="Kompaniya haqida"
          value={updateData.description}
          onChange={handleUpdateChange}
          rows={4}
          maxLength={1000}
          style={{ marginBottom: 16 }}
        />
        <Input
          name="website"
          placeholder="Veb-sayt (ixtiyoriy)"
          value={updateData.website}
          onChange={handleUpdateChange}
          maxLength={300}
        />
        <small style={{ display: "block", marginTop: 10, color: "#888" }}>
          Logotipni yangilash mumkin emas.
        </small>
      </Modal>
    </div>
  );
};

export default React.memo(CompaniesDashboard);
