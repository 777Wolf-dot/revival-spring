// src/Pages/Admin.js
import React, { useState } from "react";
import { supabase } from "../supabaseClient";
import "../Styles/Admin.css";

const Admin = () => {
  const [event, setEvent] = useState({
    title: "",
    description: "",
    date: "",
    image_url: "",
  });

  const [verse, setVerse] = useState({
    text: "",
    reference: "",
  });

  const [message, setMessage] = useState("");

  const handleEventChange = (e) => {
    setEvent({ ...event, [e.target.name]: e.target.value });
  };

  const handleVerseChange = (e) => {
    setVerse({ ...verse, [e.target.name]: e.target.value });
  };

  const addEvent = async (e) => {
    e.preventDefault();
    const { error } = await supabase.from("events").insert([event]);
    if (error) {
      setMessage("❌ Error adding event: " + error.message);
    } else {
      setMessage("✅ Event added successfully!");
      setEvent({ title: "", description: "", date: "", image_url: "" });
    }
  };

  const addVerse = async (e) => {
    e.preventDefault();
    const { error } = await supabase.from("verses").insert([verse]);
    if (error) {
      setMessage("❌ Error adding verse: " + error.message);
    } else {
      setMessage("✅ Verse added successfully!");
      setVerse({ text: "", reference: "" });
    }
  };

  return (
    <div className="admin-container">
      <h1>Admin Dashboard</h1>
      {message && <p className="admin-message">{message}</p>}

      <div className="admin-section">
        <h2>Add Event</h2>
        <form onSubmit={addEvent} className="admin-form">
          <input
            type="text"
            name="title"
            placeholder="Event Title"
            value={event.title}
            onChange={handleEventChange}
            required
          />
          <textarea
            name="description"
            placeholder="Event Description"
            value={event.description}
            onChange={handleEventChange}
            required
          />
          <input
            type="date"
            name="date"
            value={event.date}
            onChange={handleEventChange}
            required
          />
          <input
            type="text"
            name="image_url"
            placeholder="Image URL"
            value={event.image_url}
            onChange={handleEventChange}
          />
          <button type="submit">Add Event</button>
        </form>
      </div>

      <div className="admin-section">
        <h2>Add Verse of the Day</h2>
        <form onSubmit={addVerse} className="admin-form">
          <textarea
            name="text"
            placeholder="Bible Verse Text"
            value={verse.text}
            onChange={handleVerseChange}
            required
          />
          <input
            type="text"
            name="reference"
            placeholder="Reference (e.g. John 3:16)"
            value={verse.reference}
            onChange={handleVerseChange}
            required
          />
          <button type="submit">Add Verse</button>
        </form>
      </div>
    </div>
  );
};

export default Admin;
