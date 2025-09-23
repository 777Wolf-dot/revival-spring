import React, { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";
import "../Styles/Programs.css";

const Programs = () => {
  const [programs, setPrograms] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPrograms = async () => {
      const { data, error } = await supabase.from("programs").select("*").order("created_at", { ascending: false });
      if (error) {
        console.error("Error fetching programs:", error);
      } else {
        setPrograms(data);
      }
      setLoading(false);
    };

    fetchPrograms();
  }, []);

  if (loading) return <p className="loading">Loading programs...</p>;

  return (
    <div className="programs-page">
      <h2 className="programs-title">Our Programs</h2>
      {programs.length === 0 ? (
        <p className="no-programs">No programs available right now.</p>
      ) : (
        <div className="programs-list">
          {programs.map((program) => (
            <div key={program.id} className="program-card">
              <h3>{program.title}</h3>
              <p className="program-desc">{program.description}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Programs;
