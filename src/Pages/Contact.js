// src/Pages/Contact.js
import React, { useState } from "react";
import { supabase } from "../supabaseClient";
import "../Styles/Contact.css";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [status, setStatus] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { error } = await supabase.from("messages").insert([formData]);

    if (error) {
      console.error("Error saving message:", error.message);
      setStatus("❌ Failed to send message. Please try again.");
    } else {
      setStatus("✅ Message sent successfully!");
      setFormData({ name: "", email: "", subject: "", message: "" });
    }
  };

  return (
    <div className="contact-page">
      <h2 className="contact-title">Contact Us</h2>
      <p className="contact-intro">
        We’d love to hear from you. Whether you have questions about our church,
        want to join us in worship, or simply want to say hello — reach out!
      </p>

      <div className="contact-container">
        {/* Contact Info */}
        <div className="contact-info">
          <h3>Our Address</h3>
          <p>📍 Mombasa, Kenya</p>
          <p>📞 +254 712 345 678</p>
          <p>✉️ info@revivalsprings.org</p>
          <p>🕒 Sunday Service: 10:00 AM – 1:00 PM</p>
        </div>

        {/* Contact Form */}
        <div className="contact-form">
          <h3>Send Us a Message</h3>
          {status && <p className="status-message">{status}</p>}
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={formData.name}
              onChange={handleChange}
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Your Email"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="subject"
              placeholder="Subject"
              value={formData.subject}
              onChange={handleChange}
              required
            />
            <textarea
              name="message"
              rows="5"
              placeholder="Your Message"
              value={formData.message}
              onChange={handleChange}
              required
            ></textarea>
            <button type="submit">Send Message</button>
          </form>
        </div>
      </div>

      {/* Google Map */}
      <div className="map-container">
        <h3>Find Us Here</h3>
        <iframe
          title="church-location"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3988.821885043374!2d39.6682!3d-4.0435!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1829d5b1b26d69d7%3A0xabcdef123456789!2sMombasa!5e0!3m2!1sen!2ske!4v123456789"
          width="100%"
          height="300"
          style={{ border: "0" }}
          allowFullScreen=""
          loading="lazy"
        ></iframe>
      </div>
    </div>
  );
}
