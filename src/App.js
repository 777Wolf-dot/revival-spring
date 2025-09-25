// src/App.js
import { Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import Home from "./Pages/Home";
import Dashboard from "./Pages/Dashboard";
import Events from "./Pages/Events";
import Programs from "./Pages/Programs";
import AdminEvents from "./Pages/AdminEvents";
import AdminPrograms from "./Pages/AdminPrograms";
import AdminVerse from "./Pages/AdminVerse";
import About from "./Pages/About";
import Contribution from "./Pages/Contribution";
import Footer from "./Components/Footer";
import Contact from "./Pages/Contact";
import { AuthProvider } from "./context/AuthContext";

function App() {
  return (
    <AuthProvider>
      <>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About/>} />
          <Route path="/programs" element={<Programs />} />
          <Route path="/events" element={<Events />} />
          <Route path="/contact" element={<Contact/>} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/admin/events" element={<AdminEvents />} />
          <Route path="/admin/programs" element={<AdminPrograms />} />
          <Route path="/admin/verse" element={<AdminVerse />} />
          <Route path="/contribute" element={<Contribution />} />
          
          
        </Routes>
        <Footer />
      </>
    </AuthProvider>
  );
}

export default App;
