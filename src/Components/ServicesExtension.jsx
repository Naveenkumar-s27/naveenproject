import React from "react";
import "./ServicesExtension.css"; // We'll create this next

const ServicesExtension = () => {
  return (
    <section className="services-section">
      <h1 className="title">Why Choose V-Mart?</h1>
      <p className="subtitle">
        We're committed to providing the freshest vegetables with exceptional
        service
      </p>

      <div className="services-flex">
        <div className="service-card">
          <div className="icon">🚚</div>
          <h3>Fast Delivery</h3>
          <p>
            Same-day delivery available. Get your fresh vegetables within hours
            of ordering.
          </p>
        </div>

        <div className="service-card">
          <div className="icon">⭐</div>
          <h3>Premium Quality</h3>
          <p>
            Hand-picked, farm-fresh vegetables. Quality checked before every
            delivery.
          </p>
        </div>

        <div className="service-card">
          <div className="icon">📍</div>
          <h3>Local Sourcing</h3>
          <p>
            Supporting local farmers while ensuring the freshest produce for our
            customers.
          </p>
        </div>
      </div>
    </section>
  );
};

export default ServicesExtension;
