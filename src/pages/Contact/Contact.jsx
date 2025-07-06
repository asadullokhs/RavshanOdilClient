import React from "react";
import "./Contact.scss";
import { MailOutlined, PhoneOutlined, EnvironmentOutlined } from "@ant-design/icons";

const Contact = () => {
  return (
    <div className="contact-page">
      <h1 className="contact-title">Bog‘lanish</h1>
      <p className="contact-subtitle">Savolingiz bormi? Biz bilan bog‘laning!</p>

      <div className="contact-container">
        <div className="contact-info">
          <div className="info-block">
            <PhoneOutlined className="icon" />
            <div>
              <h3>Telefon raqami</h3>
              <p>+998 90 123 45 67</p>
            </div>
          </div>
          <div className="info-block">
            <MailOutlined className="icon" />
            <div>
              <h3>Email manzili</h3>
              <p>ravshanodil@gmail.com</p>
            </div>
          </div>
          <div className="info-block">
            <EnvironmentOutlined className="icon" />
            <div>
              <h3>Manzil</h3>
              <p>Toshkent shahri, Yunusobod tumani</p>
            </div>
          </div>
        </div>

        <form className="contact-form">
          <input type="text" placeholder="Ismingiz" required />
          <input type="email" placeholder="Email manzilingiz" required />
          <input type="tel" placeholder="Telefon raqamingiz" required />
          <textarea placeholder="Xabaringiz..." rows="5" required></textarea>
          <button type="submit">Xabar Yuborish</button>
        </form>
      </div>
    </div>
  );
};

export default Contact;