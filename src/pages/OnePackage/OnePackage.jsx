import React, { useState } from "react";
import "./OnePackage.scss";
import { useParams } from "react-router-dom";
import { useInfoContext } from "../../context/InfoContext";
import { createOrder } from "../../api/orderRequests";
import { message } from "antd";

const OnePackage = () => {
  const { id } = useParams();
  const { packages, isRender, setIsRender } = useInfoContext();
  const selected = packages.find((item) => item._id === id);

  const [form, setForm] = useState({
    fullName: "",
    phone: "",
    quantity: "",
  });

  const handleOrderSubmit = async (e) => {
    e.preventDefault();

    if (!form.fullName || !form.phone || !form.quantity) {
      return message.warning("Iltimos, barcha maydonlarni to'ldiring.");
    }

    try {
      const formData = new FormData();
      formData.append("fullName", form.fullName);
      formData.append("phone", form.phone);
      formData.append("quantity", form.quantity);
      formData.append("packageId", selected._id);

      await createOrder(formData);
      message.success("Buyurtma muvaffaqiyatli yuborildi!");
      setForm({ fullName: "", phone: "", quantity: "" });
      setIsRender(!isRender);
    } catch (err) {
      message.error("Xatolik yuz berdi. Qaytadan urinib ko'ring.");
    }
  };

  if (!selected) return <div>Topilmadi</div>;

  return (
    <div className="package-detail">
      <div className="hero">
        <img src={selected.photo?.url} alt="Umra" className="main-image" />
        <div className="hero-overlay">
          <h1>{selected.name}</h1>
          <p className="price">{selected.price} dollar</p>
        </div>
      </div>

      <div className="info-section">
        <h2>UMRA ZIYORATI - MADINA - MAKKA</h2>
        <ul className="info-grid">
          <li><b>Davomiyligi:</b> {selected.duration}</li>
          <li><b>Ziyorat davri:</b> {new Date(selected.departureDate).toLocaleDateString()} - {new Date(selected.returnDate).toLocaleDateString()}</li>
          <li><b>Viza turi:</b> {selected.visaType}</li>
          <li><b>Jo'nash shahri:</b> {selected.departureCity}</li>
          <li><b>To‘xtash shaharlari:</b> {selected.stopoverCities?.join(", ")}</li>
          <li><b>Yetib boriladigan shahar:</b> {selected.arrivalCity}</li>
          <li><b>Ovqatlanish:</b> {selected.mealPlan}</li>
          <li><b>Tibbiy xizmat:</b> {selected.medicalService}</li>
          <li><b>Transport:</b> {selected.transportService}</li>
          <li><b>Sovg’alar:</b> {selected.gifts?.join(", ")}</li>
          <li><b>Bo'sh joylar:</b> {selected.seatsLeft} ta</li>
        </ul>
      </div>

      <div className="about-section">
        <h2>Ziyorat haqida</h2>
        <p>{selected.details}</p>
      </div>

      <div className="hotel-section">
        <h2>Mehmonxona</h2>
        <h3>{selected.hotelName}</h3>
        <p>{selected.hotelDescription}</p>
        <ul>
          <li><b>Yulduzlar:</b> {selected.hotelStars}</li>
          <li><b>Masofa:</b> {selected.hotelDistance} metr</li>
        </ul>
        <div className="hotel-gallery">
          {selected.hotelImages?.map((img, i) => (
            <img src={img?.url || img} alt={`hotel-${i}`} key={i} />
          ))}
        </div>
      </div>

      <div className="order-section">
        <h2>Buyurtma berish</h2>
        <form onSubmit={handleOrderSubmit}>
          <input
            type="text"
            placeholder="To'liq ismingiz"
            value={form.fullName}
            minLength={3}
            onChange={(e) => setForm({ ...form, fullName: e.target.value })}
          />
          <input
            type="tel"
            placeholder="Telefon raqamingiz"
            value={form.phone}
            pattern="^\+998\d{9}$"
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
          />
          <input
            type="number"
            placeholder="Ziyoratchilar soni"
            value={form.quantity}
            min={1}
            onChange={(e) => setForm({ ...form, quantity: e.target.value })}
          />
          <button type="submit">Buyurtma berish</button>
        </form>
      </div>
    </div>
  );
};

export default OnePackage;