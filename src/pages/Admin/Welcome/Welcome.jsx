import './welcome.scss';
import bg from '../../../assets/adminBg.svg'; // Replace with your actual image path

const Welcome = () => {
  return (
    <div className="admin-welcome" style={{ backgroundImage: `url(${bg})` }}>
      <div className="overlay">
        <div className="welcome-content">
          <h1>Xush kelibsiz, Admin!</h1>
          <p>Bu yerda siz Umra to‘plamlarini boshqarishingiz, buyurtmalarni ko‘rishingiz va foydalanuvchilarni nazorat qilishingiz mumkin.</p>
          <div className="admin-actions">
            <a href="/admin/packagesDashboard">To‘plamlar</a>
            <a href="/admin/order">Buyurtmalar</a>
            <a href="/admin/add">Qo‘shish</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Welcome;