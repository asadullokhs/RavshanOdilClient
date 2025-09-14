import React, { useState, useCallback, useMemo, useEffect } from "react";
import { Select, Button, DatePicker } from "antd";
import { useInfoContext } from "../../context/InfoContext";
import { useLocation } from "react-router-dom";
import plane from "../../assets/plane.png";
import "./Tickets.scss";

const { Option } = Select;
const { RangePicker } = DatePicker;

const formatDate = (dateStr) => {
  const date = new Date(dateStr);
  return `${date.getDate()} ${date.toLocaleString("default", { month: "short" })}`;
};

const Tickets = () => {
  const { tickets } = useInfoContext();
  const location = useLocation();
  const initialForm = location.state;

  const [filters, setFilters] = useState({
    from: null,
    to: null,
    class: null,
    company: null,
    priceFrom: null,
    priceTo: null,
    dateFrom: null,
    dateTo: null,
  });

  // 🟢 apply Hero search data as initial filters
  useEffect(() => {
    if (initialForm) {
      setFilters((prev) => ({
        ...prev,
        from: initialForm.from || null,
        to: initialForm.to || null,
        dateFrom: initialForm.date ? new Date(initialForm.date) : null,
      }));
    }
  }, [initialForm]);

  const handleFilterChange = useCallback((key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  }, []);

  const resetFilters = useCallback(() => {
    setFilters({
      from: null,
      to: null,
      class: null,
      company: null,
      priceFrom: null,
      priceTo: null,
      dateFrom: null,
      dateTo: null,
    });
  }, []);

  const filteredTickets = useMemo(() => {
    let result = [...tickets];

    if (filters.from) {
      result = result.filter((t) =>
        t.departureCity?.toLowerCase().includes(filters.from.toLowerCase())
      );
    }
    if (filters.to) {
      result = result.filter((t) =>
        t.arrivalCity?.toLowerCase().includes(filters.to.toLowerCase())
      );
    }
    if (filters.class) {
      result = result.filter((t) => t.type === filters.class);
    }
    if (filters.company) {
      result = result.filter((t) => t.company?.name === filters.company);
    }
    if (filters.priceFrom !== null) {
      result = result.filter((t) => t.price >= filters.priceFrom);
    }
    if (filters.priceTo !== null) {
      result = result.filter((t) => t.price <= filters.priceTo);
    }
    if (filters.dateFrom) {
      result = result.filter(
        (t) => new Date(t.departureDate) >= new Date(filters.dateFrom)
      );
    }
    if (filters.dateTo) {
      result = result.filter(
        (t) => new Date(t.departureDate) <= new Date(filters.dateTo)
      );
    }

    return result;
  }, [tickets, filters]);

  return (
    <section className="tickets-page">
      {/* ===== Hero section ===== */}
      <div className="tickets-hero">
        <img src={plane} alt="Plane background" className="hero-bg" />
        <div className="search-bar">
          <Select
            placeholder="Qayerdan"
            value={filters.from}
            onChange={(val) => handleFilterChange("from", val)}
            className="search-input"
            allowClear
          >
            {[...new Set(tickets.map((t) => t.departureCity))].map((city) => (
              <Option key={city} value={city}>
                {city}
              </Option>
            ))}
          </Select>
          <Select
            placeholder="Qayerga"
            value={filters.to}
            onChange={(val) => handleFilterChange("to", val)}
            className="search-input"
            allowClear
          >
            {[...new Set(tickets.map((t) => t.arrivalCity))].map((city) => (
              <Option key={city} value={city}>
                {city}
              </Option>
            ))}
          </Select>
          <RangePicker
            className="search-input"
            placeholder={["Ketish", "Qaytish"]}
            onChange={(dates) =>
              handleFilterChange("dateFrom", dates ? dates[0] : null) ||
              handleFilterChange("dateTo", dates ? dates[1] : null)
            }
          />
          <Select
            placeholder="Klass"
            value={filters.class}
            onChange={(val) => handleFilterChange("class", val)}
            className="search-input"
            allowClear
          >
            <Option value="economy">Economy</Option>
            <Option value="standart">Standart</Option>
            <Option value="comfort">Comfort</Option>
            <Option value="luxury">Luxury</Option>
          </Select>
          <Button type="primary" className="search-btn">
            Chiptani Topish
          </Button>
          <Button type="primary" className="reset-btn" onClick={resetFilters}>
            Tozalash
          </Button>
        </div>
      </div>

      {/* ===== Results ===== */}
      <div className="tickets-results container">
        {filteredTickets.length > 0 && (
          <div className="results-count">
            Jami topildi: {filteredTickets.length} ta chipta
          </div>
        )}

        <div className="tickets-grid">
          {filteredTickets.length ? (
            filteredTickets.map((t) => (
              <div className="ticket-card" key={t._id}>
                {t.photo?.url && (
                  <img
                    src={t.photo.url}
                    alt="Ticket illustration"
                    className="ticket-image"
                  />
                )}
                <div className="ticket-header">
                  {t.company?.logo && (
                    <img
                      src={t.company.logo.url}
                      alt={`${t.company.name} logo`}
                      className="company-logo"
                    />
                  )}
                  <div className="price">{t.price}$</div>
                </div>
                <div className="ticket-route">
                  <div className="city">{t.departureCity}</div>
                  <span className="arrow">✈</span>
                  <div className="city">{t.arrivalCity}</div>
                </div>
                <div className="ticket-dates">
                  {formatDate(t.departureDate)} → {formatDate(t.returnDate)}
                </div>
                <div className="ticket-type">{t.type.toUpperCase()}</div>
                <div className="ticket-seats">Qolgan joylar: {t.seatsLeft}</div>
              </div>
            ))
          ) : (
            <p className="no-results">Hech qanday chipta topilmadi</p>
          )}
        </div>
      </div>
    </section>
  );
};

export default Tickets;