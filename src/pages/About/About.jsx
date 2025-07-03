import React from "react";
import "./About.scss";
import { Collapse } from "antd";
const { Panel } = Collapse;
import aboutHeroImage from "../../assets/Umrah.webp"; // Assuming you have an image in this path

const About = () => {
  return (
    <div className="about-page">
      <section className="about-hero">
        <div className="text">
          <h1>Biz Haqimizda</h1>
          <p>
            Ravshan Odil — O‘zbekistonning birinchi arzon avia bileti sayti. Biz har bir yurtdoshimizga qulay narxlarda Umra va boshqa xalqaro ziyoratlarni taqdim etamiz.
          </p>
        </div>
        <div className="image">
          <img src={aboutHeroImage} alt="About Us" />
        </div>
      </section>

      <section className="about-details">
        <Collapse accordion className="faq-collapse">
          <Panel header="Kompaniyaning asosiy yo‘nalishi" key="1">
            <p>Bizning asosiy maqsadimiz – Umra safarlarini ishonchli va arzon tashkil etish.</p>
          </Panel>
          <Panel header="Ziyoratchilar uchun xizmatlar" key="2">
            <p>Viza, parvoz, mehmonxona, oziq-ovqat, transport, tibbiy xizmat va boshqa ko‘plab imkoniyatlar.</p>
          </Panel>
          <Panel header="Ishonchli hamkorlar" key="3">
            <p>Biz o‘z sohasida yetakchi bo‘lgan aviakompaniyalar va agentliklar bilan ishlaymiz.</p>
          </Panel>
        </Collapse>
      </section>

      <section className="stats-section">
        <div className="stat-card">
          <h2>20+</h2>
          <p>Hamkorlar</p>
        </div>
        <div className="stat-card">
          <h2>50+</h2>
          <p>Mijozlarimiz</p>
        </div>
        <div className="stat-card">
          <h2>5000+</h2>
          <p>Baxtli Ziyoratchilar</p>
        </div>
        <div className="stat-card">
          <h2>10000+</h2>
          <p>Obunachilar</p>
        </div>
      </section>
    </div>
  );
};

export default About;