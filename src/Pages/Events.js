import React, { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";
import "../Styles/Events.css";

const Events = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      const { data, error } = await supabase.from("events").select("*").order("date", { ascending: true });
      if (error) {
        console.error("Error fetching events:", error);
      } else {
        setEvents(data);
      }
      setLoading(false);
    };

    fetchEvents();
  }, []);

  if (loading) return <p className="loading">Loading events...</p>;

  return (
    <div className="events-page">
      <h2 className="events-title">Upcoming Events</h2>
      {events.length === 0 ? (
        <p className="no-events">No events available right now.</p>
      ) : (
        <div className="events-list">
          {events.map((event) => (
            <div key={event.id} className="event-card">
              <h3>{event.title}</h3>
              <p className="event-date">{new Date(event.date).toLocaleDateString()}</p>
              <p className="event-desc">{event.description}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Events;
