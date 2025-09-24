// src/Pages/AdminVerse.js
import React, { useState, useEffect } from "react";
import { supabase } from "../supabaseClient";
import "../Styles/AdminVerse.css"; // create a CSS file for styling

const AdminVerse = () => {
  const [verse, setVerse] = useState(null);

  useEffect(() => {
    fetchVerse();
  }, []);

  const fetchVerse = async () => {
    const { data, error } = await supabase
      .from("verses")
      .select("*")
      .order("id", { ascending: false })
      .limit(1);

    if (error) {
      console.error("Error fetching verse:", error);
    } else if (data && data.length) {
      setVerse(data[0]);
    }
  };

  return (
    <div className="admin-verse">
      <h2>Verse of the Day</h2>
      {verse ? (
        <p>
          <strong>{verse.verse_text}</strong> – {verse.reference}
        </p>
      ) : (
        <p>No verse set yet.</p>
      )}
    </div>
  );
};

export default AdminVerse;
