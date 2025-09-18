import React, { useMemo } from "react";
import { useInfoContext } from "../../context/InfoContext";
import { Link } from "react-router-dom";
import "./TicketCarousel.scss";

// Helper to format dates nicely
const formatDate = (dateStr) => {
  const date = new Date(dateStr);
  if (isNaN(date)) return "";
  return `${date.getDate()} ${date.toLocaleString("default", {
    month: "short",
  })} ${date.getFullYear()}`;
};

const TicketCarousel = () => {
  const { tickets } = useInfoContext();

  // ✅ Take only the latest 6 tickets
  const latestTickets = useMemo(() => {
    return tickets
      .map((ticket) => ({
        ...ticket,
        formattedDeparture: formatDate(ticket.departureDate),
        formattedReturn: formatDate(ticket.returnDate),
      }))
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      .slice(0, 6);
  }, [tickets]);

  return (
    <section className="tickets-section">
      <h2 className="section-title">Oxirgi qo‘shilgan chiptalar</h2>

      {latestTickets.length === 0 ? (
        <p className="no-tickets">Hozircha chiptalar mavjud emas</p>
      ) : (
        <div className="tickets-wrapper">
          {latestTickets.map((ticket) => (
            <div className="ticket-card" key={ticket._id}>
              {/* Ticket image */}
              <div className="ticket-img-wrapper">
                <img
                  src={ticket.photo?.url}
                  alt={ticket.name}
                  className="ticket-img"
                  loading="lazy"
                />
              </div>

              {/* Info */}
              <div className="info">
                <div className="type">{ticket.type?.toUpperCase()}</div>
                <h3 className="ticket-name">{ticket.name}</h3>

                <div className="route">
                  {ticket.departureCity} ✈ {ticket.arrivalCity}
                </div>

                <div className="dates">
                  {ticket.formattedDeparture} – {ticket.formattedReturn}
                </div>

                <div className="seats">{ticket.seatsLeft} ta joy qoldi</div>

                <div className="price">
                  Narxi: <strong>{ticket.price}$</strong>
                </div>

                <Link to={`/ticket/${ticket._id}`}>
                  <button className="more-btn">Batafsil</button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default React.memo(TicketCarousel);