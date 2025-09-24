// src/Pages/Home.js
import React, { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";
import "../Styles/Home.css";
import { Link } from "react-router-dom";

const Home = () => {
  const [events, setEvents] = useState([]);
  const [verse, setVerse] = useState(null);

  // Fetch events
  useEffect(() => {
    const fetchEvents = async () => {
      const { data, error } = await supabase
        .from("events")
        .select("*")
        .order("date", { ascending: true });

      if (error) {
        console.error("Error fetching events:", error.message);
      } else {
        setEvents(data);
      }
    };

    fetchEvents();
  }, []);

  // Fetch latest verse
useEffect(() => {
  const fetchVerse = async () => {
    const { data, error } = await supabase
      .from("verses")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(1);

    if (error) {
      console.error("Error fetching verse:", error);
    } else if (data && data.length > 0) {
      setVerse(data[0]);
    }
  };

  fetchVerse();
}, []);


  return (
    <div className="home-container">
      {/* Hero Section */}
      <section className="hero">
        <h1>Welcome to the Youth Department</h1>
        <p>Revival Springs Joy Of Love Church</p>
        <button  className="cta-btn"> <Link to="/register" className="cta-btn">
            Join Us
          </Link></button>
      </section>

      {/* Bible Verse Section */}
      <section className="verse">
        <h2>Verse of the Day</h2>
        {verse ? (
          <blockquote>
            "{verse.text}" <br />– {verse.reference}
          </blockquote>
        ) : (
          <p>Loading verse...</p>
        )}
      </section>

      {/* Upcoming Events Section */}
      <section className="events">
        <h2>Upcoming Events</h2>
        <div className="event-cards">
          {events.length > 0 ? (
            events.map((event) => (
              <div key={event.id} className="event-card">
                {event.image_url && (
                  <img
                    src={event.image_url}
                    alt={event.title}
                    className="event-image"
                  />
                )}
                <h3>{event.title}</h3>
                <p>{event.description}</p>
                <small>{new Date(event.date).toLocaleDateString()}</small>
              </div>
            ))
          ) : (
            <p>No events yet. Stay tuned!</p>
          )}
        </div>
      </section>

      {/* About Us Section */}
      <section className="about">
        <h2>About Us</h2>
        <p>
          We are the Youth Department of Revival Springs Joy Of Love Church in
          Mombasa, led by Apostle Remmy Nyamweya. Our mission is to empower
          young people through leadership, unity, and faith.
        </p>
      </section>

      {/* Footer */}
      
    </div>
  );
};

export default Home;
