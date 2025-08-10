import React, { useState } from "react";
import "./OnePackage.scss";
import { useParams } from "react-router-dom";
import { useInfoContext } from "../../context/InfoContext";
import Loading from "../../components/Loader/Loader";
import { createOrder } from "../../api/orderRequests";
import { message } from "antd";

const OnePackage = () => {
  const { id } = useParams();
  const { packages, isRender, setIsRender } = useInfoContext();
  const selected = packages.find((item) => item._id === id);

  const [form, setForm] = useState({
    fullName: "",
    phoneNumber: "",
    quantity: "",
  });
  const [submitting, setSubmitting] = useState(false);

  const handleOrderSubmit = async (e) => {
    e.preventDefault();

    if (!form.fullName || !form.phoneNumber || !form.quantity) {
      return message.warning("Iltimos, barcha maydonlarni to'ldiring.");
    }

    setSubmitting(true);
    try {
      const formData = new FormData();
      formData.append("fullName", form.fullName.trim());
      formData.append("phoneNumber", form.phoneNumber.trim());
      formData.append("quantity", form.quantity);
      formData.append("package", selected._id);

      await createOrder(formData);
      message.success("Buyurtma muvaffaqiyatli yuborildi!");
      setForm({ fullName: "", phoneNumber: "", quantity: "" });
      setIsRender(!isRender);
    } catch (err) {
      message.error("Xatolik yuz berdi. Qaytadan urinib ko'ring.");
    } finally {
      setSubmitting(false);
    }
  };

  if (!selected) return <Loading />;

  // ✅ Helpers to clean up possible bad data
  const cleanText = (value) =>
    value && value !== "undefined" ? value : "Ma'lumot yo‘q";

  return (
    <div className="packageDetail">
      <div className="container">
        <div className="hero">
          {selected.photo?.url && (
            <img src={selected.photo.url} alt={selected.name || "Umra"} loading="lazy" />
          )}
          <div className="badge">
            {selected.price ? `${selected.price} dollar` : "Narx belgilanmagan"}
          </div>
        </div>

        <div className="info">
          <div className="infoItem">
            <h4>Davomiyligi</h4>
            <p>{cleanText(selected.duration)}</p>
          </div>
          <div className="infoItem">
            <h4>Ziyorat davri</h4>
            <p>
              {selected.departureDate
                ? new Date(selected.departureDate).toLocaleDateString()
                : "Sana belgilanmagan"}{" "}
              -{" "}
              {selected.returnDate
                ? new Date(selected.returnDate).toLocaleDateString()
                : "Qaytish sanasi belgilanmagan"}
            </p>
          </div>
          <div className="infoItem">
            <h4>Viza turi</h4>
            <p>{cleanText(selected.visaType)}</p>
          </div>
          <div className="infoItem">
            <h4>Jo'nash shahri</h4>
            <p>{cleanText(selected.departureCity)}</p>
          </div>
          {selected.stopoverCities?.length > 0 && (
            <div className="infoItem">
              <h4>To‘xtash shaharlari</h4>
              <p>{selected.stopoverCities.join(", ")}</p>
            </div>
          )}
          <div className="infoItem">
            <h4>Yetib boriladigan shahar</h4>
            <p>{cleanText(selected.arrivalCity)}</p>
          </div>
          <div className="infoItem">
            <h4>Ovqatlanish</h4>
            <p>{cleanText(selected.mealPlan)}</p>
          </div>
          <div className="infoItem">
            <h4>Tibbiy xizmat</h4>
            <p>{cleanText(selected.medicalService)}</p>
          </div>
          <div className="infoItem">
            <h4>Transport</h4>
            <p>{cleanText(selected.transportService)}</p>
          </div>
          {selected.gifts?.length > 0 && (
            <div className="infoItem">
              <h4>Sovg’alar</h4>
              <p>{selected.gifts.join(", ")}</p>
            </div>
          )}
          <div className="infoItem">
            <h4>Bo'sh joylar</h4>
            <p>{selected.seatsLeft ?? "Ma'lumot yo‘q"} ta</p>
          </div>
        </div>

        {selected.details && selected.details !== "undefined" && (
          <div className="detailsSection">
            <h3>Ziyorat haqida</h3>
            <p>{selected.details}</p>
          </div>
        )}

        {(selected.hotelName || selected.hotelDescription) && (
          <div className="detailsSection">
            <h3>
              Mehmonxona: {cleanText(selected.hotelName)}
            </h3>
            <p>{cleanText(selected.hotelDescription)}</p>
            <ul>
              {selected.hotelStars && (
                <li>
                  <strong>Yulduzlar: </strong>
                  <span className="stars">
                    {[...Array(Number(selected.hotelStars))].map((_, i) => (
                      <span key={i}>★</span>
                    ))}
                  </span>
                </li>
              )}
              {selected.hotelDistance && (
                <li>
                  <strong>Masofa: </strong>
                  {selected.hotelDistance} metr
                </li>
              )}
            </ul>
          </div>
        )}

        {selected.hotelImages?.length > 0 && (
          <div className="imageGrid">
            {selected.hotelImages.map((img, i) => (
              <img
                src={img?.url || img}
                alt={`Hotel image ${i + 1} of ${selected.hotelName || ""}`}
                key={i}
                loading="lazy"
              />
            ))}
          </div>
        )}

        <div className="orderForm">
          <h3>Buyurtma berish</h3>
          <form onSubmit={handleOrderSubmit}>
            <input
              type="text"
              placeholder="To'liq ismingiz"
              value={form.fullName}
              minLength={3}
              required
              onChange={(e) => setForm({ ...form, fullName: e.target.value })}
            />
            <input
              type="tel"
              placeholder="+998 91 123 45 67"
              className="phone-input"
              value={form.phoneNumber}
              required
              onChange={(e) => setForm({ ...form, phoneNumber: e.target.value })}
            />
            <input
              type="number"
              placeholder="Ziyoratchilar soni"
              value={form.quantity}
              min={1}
              required
              onChange={(e) => setForm({ ...form, quantity: e.target.value })}
            />
            <button type="submit" disabled={submitting}>
              {submitting ? "Yuborilmoqda..." : "Buyurtma berish"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default OnePackage;