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

  const handleOrderSubmit = async (e) => {
    e.preventDefault();

    if (!form.fullName || !form.phoneNumber || !form.quantity) {
      return message.warning("Iltimos, barcha maydonlarni to'ldiring.");
    }

    try {
      const formData = new FormData();
      formData.append("fullName", form.fullName);
      formData.append("phoneNumber", form.phoneNumber);
      formData.append("quantity", form.quantity);
      formData.append("package", selected._id);

      await createOrder(formData);
      message.success("Buyurtma muvaffaqiyatli yuborildi!");
      setForm({ fullName: "", phoneNumber: "", quantity: "" });
      setIsRender(!isRender);
    } catch (err) {
      message.error("Xatolik yuz berdi. Qaytadan urinib ko'ring.");
    }
  };

  if (!selected)
    return (
      <div>
        <Loading />
      </div>
    );

  return (
    <div className="packageDetail">
      <div className="container">
        <div className="hero">
          <img src={selected.photo?.url} alt="Umra" />
          <div className="badge">{selected.price} dollar</div>
        </div>

        <div className="info">
          <div className="infoItem">
            <h4>Davomiyligi</h4>
            <p>{selected.duration}</p>
          </div>
          <div className="infoItem">
            <h4>Ziyorat davri</h4>
            <p>
              {new Date(selected.departureDate).toLocaleDateString()} -{" "}
              {new Date(selected.returnDate).toLocaleDateString()}
            </p>
          </div>
          <div className="infoItem">
            <h4>Viza turi</h4>
            <p>{selected.visaType}</p>
          </div>
          <div className="infoItem">
            <h4>Jo'nash shahri</h4>
            <p>{selected.departureCity}</p>
          </div>
          <div className="infoItem">
            <h4>To‘xtash shaharlari</h4>
            <p>{selected.stopoverCities?.join(", ")}</p>
          </div>
          <div className="infoItem">
            <h4>Yetib boriladigan shahar</h4>
            <p>{selected.arrivalCity}</p>
          </div>
          <div className="infoItem">
            <h4>Ovqatlanish</h4>
            <p>{selected.mealPlan}</p>
          </div>
          <div className="infoItem">
            <h4>Tibbiy xizmat</h4>
            <p>{selected.medicalService}</p>
          </div>
          <div className="infoItem">
            <h4>Transport</h4>
            <p>{selected.transportService}</p>
          </div>
          <div className="infoItem">
            <h4>Sovg’alar</h4>
            <p>{selected.gifts?.join(", ")}</p>
          </div>
          <div className="infoItem">
            <h4>Bo'sh joylar</h4>
            <p>{selected.seatsLeft} ta</p>
          </div>
        </div>

        <div className="detailsSection">
          <h3>Ziyorat haqida</h3>
          <p>{selected.details}</p>
        </div>

        <div className="detailsSection">
          <h3>Mehmonxona: {selected.hotelName}</h3>
          <p>{selected.hotelDescription}</p>
          <ul>
            <li>
              <strong>Yulduzlar: </strong>
              <span className="stars">
                {[...Array(Number(selected.hotelStars))].map((_, i) => (
                  <span key={i}>★</span>
                ))}
              </span>
            </li>
            <li>
              <strong>Masofa: </strong>
              {selected.hotelDistance} metr
            </li>
          </ul>
        </div>

        <div className="imageGrid">
          {selected.hotelImages?.map((img, i) => (
            <img src={img?.url || img} alt={`hotel-${i}`} key={i} />
          ))}
        </div>

        <div className="orderForm">
          <h3>Buyurtma berish</h3>
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
              placeholder="+998 91 123 45 67"
              className="phone-input"
              value={form.phoneNumber}
              onChange={(e) =>
                setForm({ ...form, phoneNumber: e.target.value })
              }
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
    </div>
  );
};

export default OnePackage;
