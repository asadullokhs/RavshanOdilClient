import React, { useState, useCallback, useMemo } from "react";
import { Select, Button, InputNumber, DatePicker } from "antd";
import { useInfoContext } from "../../context/InfoContext";
import "./Packages.scss";

const { Option } = Select;
const { RangePicker } = DatePicker;

const formatDate = (dateStr) => {
  const date = new Date(dateStr);
  return `${date.getDate()} ${date.toLocaleString("default", {
    month: "short",
  })} ${date.getHours()}:${String(date.getMinutes()).padStart(2, "0")}`;
};

const Packages = () => {
  const { packages, companies } = useInfoContext();

  const [filters, setFilters] = useState({
    airline: null,
    type: null,
    company: null,
    priceFrom: null,
    priceTo: null,
    dateFrom: null,
    dateTo: null,
  });
  const [sort, setSort] = useState(null);

  // Memoize filtered and sorted packages
  const filteredPackages = useMemo(() => {
    let result = [...packages];

    if (filters.airline) {
      result = result.filter((pkg) => pkg.airline === filters.airline);
    }
    if (filters.type) {
      result = result.filter((pkg) => pkg.type === filters.type);
    }
    if (filters.company) {
      result = result.filter((pkg) => pkg.company?.name === filters.company);
    }
    if (filters.priceFrom !== null) {
      result = result.filter((pkg) => pkg.price >= filters.priceFrom);
    }
    if (filters.priceTo !== null) {
      result = result.filter((pkg) => pkg.price <= filters.priceTo);
    }
    if (filters.dateFrom) {
      result = result.filter(
        (pkg) => new Date(pkg.departureDate) >= filters.dateFrom.toDate()
      );
    }
    if (filters.dateTo) {
      result = result.filter(
        (pkg) => new Date(pkg.departureDate) <= filters.dateTo.toDate()
      );
    }

    if (sort === "priceAsc") {
      result.sort((a, b) => a.price - b.price);
    } else if (sort === "priceDesc") {
      result.sort((a, b) => b.price - a.price);
    } else if (sort === "dateSoon") {
      result.sort(
        (a, b) => new Date(a.departureDate) - new Date(b.departureDate)
      );
    } else if (sort === "dateLate") {
      result.sort(
        (a, b) => new Date(b.departureDate) - new Date(a.departureDate)
      );
    }

    return result;
  }, [packages, filters, sort]);

  const handleFilterChange = useCallback((key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  }, []);

  const resetFilters = useCallback(() => {
    setFilters({
      airline: null,
      type: null,
      company: null,
      priceFrom: null,
      priceTo: null,
      dateFrom: null,
      dateTo: null,
    });
    setSort(null);
  }, []);

  return (
    <section className="packages-page">
      <div className="packages-info-header">
        <div className="title">
          <h1>Umra Sayohati To‘plamlari</h1>
          <p>
            Bu sahifada siz o'zingizga mos, byudjet va ehtiyojlarga mos umra
            sayohati to'plamlarini topishingiz mumkin. Sayohatlar zamonaviy
            qulayliklar, to'liq ma'lumot va ishonchli hamkorlar bilan tashkil
            etiladi.
          </p>
        </div>
      </div>

      <div className="filters-bar">
        <Select
          placeholder="To’plam turi"
          allowClear
          value={filters.type}
          onChange={(val) => handleFilterChange("type", val)}
          style={{ minWidth: 140 }}
        >
          <Option value="economy">Economy</Option>
          <Option value="standart">Standart</Option>
          <Option value="comfort">Comfort</Option>
          <Option value="luxury">Luxury</Option>
        </Select>

        <Select
          placeholder="Aviakompaniyalar (firma)"
          allowClear
          value={filters.company}
          onChange={(val) => handleFilterChange("company", val)}
          style={{ minWidth: 160 }}
        >
          {companies.map((comp) => (
            <Option key={comp._id} value={comp.name}>
              {comp.name}
            </Option>
          ))}
        </Select>

        <InputNumber
          placeholder="Narxdan"
          min={0}
          value={filters.priceFrom}
          onChange={(val) => handleFilterChange("priceFrom", val)}
        />
        <InputNumber
          placeholder="Narxgacha"
          min={0}
          value={filters.priceTo}
          onChange={(val) => handleFilterChange("priceTo", val)}
        />

        <RangePicker
          placeholder={["Sana (dan)", "Sana (gacha)"]}
          value={filters.dateFrom && filters.dateTo ? [filters.dateFrom, filters.dateTo] : []}
          onChange={(dates) =>
            handleFilterChange("dateFrom", dates ? dates[0] : null) ||
            handleFilterChange("dateTo", dates ? dates[1] : null)
          }
        />

        {/* Example: If you want sorting select */}
        {/* <Select
          placeholder="Saralash"
          allowClear
          value={sort}
          onChange={setSort}
          style={{ minWidth: 120 }}
        >
          <Option value="priceAsc">Narx pastdan yuqoriga</Option>
          <Option value="priceDesc">Narx yuqoridan pastga</Option>
          <Option value="dateSoon">Tezroqqa</Option>
          <Option value="dateLate">Kechroq</Option>
        </Select> */}

        <Button type="primary" onClick={() => { /* handleFilter logic if needed */ }}>
          Saralash
        </Button>
        <Button onClick={resetFilters} type="default">
          Tozalash
        </Button>
      </div>

      {filteredPackages.length > 0 && (
        <div className="results-count">
          Jami topildi: {filteredPackages.length} ta to‘plam
        </div>
      )}

      <div className="packages-grid">
        {filteredPackages.length ? (
          filteredPackages.map((pkg) => (
            <div className="package-card" key={pkg._id}>
              {pkg.company?.logo && (
                <img
                  src={pkg.company.logo.url}
                  alt={`${pkg.company.name} logo`}
                  className="company-logo"
                  loading="lazy"
                />
              )}
              <div className="main-img-wrapper">
                <img
                  src={pkg.photo.url}
                  alt={`Photo of ${pkg.name}`}
                  className="main-img"
                  loading="lazy"
                />
              </div>
              <div className="info">
                <div className="type">{pkg.type.toUpperCase()}</div>
                <div className="route">
                  {pkg.departureCity} ✈ {pkg.stopoverCities.join(" ✈ ")} ✈{" "}
                  {pkg.arrivalCity}
                </div>
                <div className="dates">
                  {formatDate(pkg.departureDate)} - {formatDate(pkg.returnDate)}
                </div>
                <div className="seats">{pkg.seatsLeft} ta joy qoldi</div>
                <div className="progress-bar">
                  <div
                    className="fill"
                    style={{ width: `${(pkg.seatsLeft / 10) * 100}%` }}
                  ></div>
                </div>
                <div className="price">
                  Narxi: <strong>{pkg.price}$</strong>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="no-results">Hech qanday to’plam topilmadi</p>
        )}
      </div>
    </section>
  );
};

export default Packages;