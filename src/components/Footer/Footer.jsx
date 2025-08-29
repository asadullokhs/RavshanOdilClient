import React from "react";
import "./Footer.scss";
import {
  FacebookFilled,
  InstagramOutlined,
  YoutubeFilled,
  SendOutlined,
  EnvironmentOutlined,
  MailOutlined,
  PhoneOutlined,
} from "@ant-design/icons";

const Footer = () => {
  return (
    <footer className="site-footer">
      <div className="footer-container">
        <div className="footer-left">
          <div className="logo-section">
            <img src="/logo.png" alt="Logo" className="footer-logo" />
            <span className="brand-name">avshan odil</span>
          </div>
          <ul className="contact-info">
            <li><EnvironmentOutlined />Toshkent shahri, Yunusobod tumani</li>
            <li><MailOutlined /> ravshanodil2017@gmail.com</li>
            <li><PhoneOutlined /> +998 94 496 09 29</li>
          </ul>
        </div>

        <div className="footer-center">
          <h4>Xarita</h4>
          <ul>
            <li><a href="/">Asosiy</a></li>
            <li><a href="/packages">Umra to‘plamlari va biletlar</a></li>
            <li><a href="/about">Biz haqimizda</a></li>
            <li><a href="/partners">Hamkorlar</a></li>
            <li><a href="/adminLogin">Adminlar uchun</a></li>
          </ul>
        </div>

        <div className="footer-right">
          <h4>Bizni Kuzatib Boring</h4>
          <div className="icons">
            <a href="https://www.facebook.com/ravshanodill" target="_blank" rel="noopener noreferrer">
              <FacebookFilled />
            </a>
            <a href="https://www.instagram.com/ravshanodill" target="_blank" rel="noopener noreferrer">
              <InstagramOutlined />
            </a>
            <a href="https://www.youtube.com/watch?v=H9w7aLeuEDo" target="_blank" rel="noopener noreferrer">
              <YoutubeFilled />
            </a>
            <a href="https://t.me/+V-K-pa8f9ygyYTgy" target="_blank" rel="noopener noreferrer">
              <SendOutlined />
            </a>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        © {new Date().getFullYear()} Arzon Umra. Barcha huquqlar himoyalangan.
      </div>
    </footer>
  );
};

export default Footer;