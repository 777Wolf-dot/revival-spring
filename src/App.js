// src/App.js
import {  Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import { AuthProvider } from "./context/AuthContext";

function App() {
  return (
    <AuthProvider>
      <>
        <Navbar />
        <Routes>
          <Route path="/" element={<h1>Home Page</h1>} />
          <Route path="/about" element={<h1>About Page</h1>} />
          <Route path="/programs" element={<h1>Programs Page</h1>} />
          <Route path="/events" element={<h1>Events Page</h1>} />
          <Route path="/contact" element={<h1>Contact Page</h1>} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </>
    </AuthProvider>
  );
}

export default App;
