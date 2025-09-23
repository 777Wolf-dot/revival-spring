import React, { useState, useEffect } from "react";
import { supabase } from "../supabaseClient";
import "../Styles/Dashboard.css";

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("programs");

  return (
    <div className="dashboard">
      <h1>Admin Dashboard</h1>
      <div className="dashboard-tabs">
        <button
          className={activeTab === "programs" ? "active" : ""}
          onClick={() => setActiveTab("programs")}
        >
          Manage Programs
        </button>
        <button
          className={activeTab === "events" ? "active" : ""}
          onClick={() => setActiveTab("events")}
        >
          Manage Events
        </button>
        <button
          className={activeTab === "verse" ? "active" : ""}
          onClick={() => setActiveTab("verse")}
        >
          Update Verse
        </button>
      </div>

      <div className="dashboard-content">
        {activeTab === "programs" && <ManagePrograms />}
        {activeTab === "events" && <ManageEvents />}
        {activeTab === "verse" && <UpdateVerse />}
      </div>
    </div>
  );
};

// ==========================
// Manage Programs
// ==========================
const ManagePrograms = () => {
  const [programs, setPrograms] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    fetchPrograms();
  }, []);

  const fetchPrograms = async () => {
    const { data } = await supabase
      .from("programs")
      .select("*")
      .order("id", { ascending: false });
    setPrograms(data || []);
  };

  const addProgram = async () => {
    if (!title || !description) return;
    await supabase.from("programs").insert([{ title, description }]);
    setTitle("");
    setDescription("");
    fetchPrograms();
  };

  return (
    <div className="section">
      <h2>Programs</h2>
      <div className="form">
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Program Title"
        />
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Program Description"
        />
        <button onClick={addProgram}>Add Program</button>
      </div>

      <ul className="list">
        {programs.map((p) => (
          <li key={p.id}>
            <strong>{p.title}</strong> - {p.description}
          </li>
        ))}
      </ul>
    </div>
  );
};

// ==========================
// Manage Events
// ==========================
const ManageEvents = () => {
  const [events, setEvents] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [image, setImage] = useState(null);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    const { data } = await supabase
      .from("events")
      .select("*")
      .order("date", { ascending: true });
    setEvents(data || []);
  };

  const uploadImage = async (file) => {
    const { data, error } = await supabase.storage
      .from("events")
      .upload(`event-${Date.now()}.jpg`, file);

    if (error) {
      console.error(error);
      return null;
    }
    return supabase.storage.from("events").getPublicUrl(data.path).data.publicUrl;
  };

  const addEvent = async () => {
    if (!title || !description || !date) return;
    let imageUrl = null;
    if (image) imageUrl = await uploadImage(image);

    await supabase
      .from("events")
      .insert([{ title, description, date, image_url: imageUrl }]);

    setTitle("");
    setDescription("");
    setDate("");
    setImage(null);
    fetchEvents();
  };

  return (
    <div className="section">
      <h2>Events</h2>
      <div className="form">
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Event Title"
        />
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Event Description"
        />
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
        <input type="file" onChange={(e) => setImage(e.target.files[0])} />
        <button onClick={addEvent}>Add Event</button>
      </div>

      <ul className="list">
        {events.map((ev) => (
          <li key={ev.id}>
            <strong>{ev.title}</strong> ({ev.date})
            <p>{ev.description}</p>
            {ev.image_url && (
              <img src={ev.image_url} alt={ev.title} width="150" />
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

// ==========================
// Update Verse
// ==========================
const UpdateVerse = () => {
  const [verse, setVerse] = useState("");
  const [reference, setReference] = useState("");
  const [currentVerse, setCurrentVerse] = useState(null);

  useEffect(() => {
    fetchVerse();
  }, []);

  const fetchVerse = async () => {
    const { data } = await supabase
      .from("verses")
      .select("*")
      .order("id", { ascending: false })
      .limit(1);
    if (data && data.length) setCurrentVerse(data[0]);
  };

  const updateVerse = async () => {
    if (!verse || !reference) return;
    await supabase.from("verses").insert([{ verse_text: verse, reference }]);
    setVerse("");
    setReference("");
    fetchVerse();
  };

  return (
    <div className="section">
      <h2>Verse of the Day</h2>
      {currentVerse && (
        <p className="current-verse">
          <strong>{currentVerse.verse_text}</strong> – {currentVerse.reference}
        </p>
      )}
      <div className="form">
        <input
          value={verse}
          onChange={(e) => setVerse(e.target.value)}
          placeholder="Verse text"
        />
        <input
          value={reference}
          onChange={(e) => setReference(e.target.value)}
          placeholder="Reference (e.g. John 3:16)"
        />
        <button onClick={updateVerse}>Update Verse</button>
      </div>
    </div>
  );
};

export default Dashboard;
