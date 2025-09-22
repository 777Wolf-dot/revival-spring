// import { useState } from "react";
// import { Link } from "react-router-dom";
// import {
//   FaBars,
//   FaTimes,
//   FaHome,
//   FaInfoCircle,
//   FaBookOpen,
//   FaCalendarAlt,
//   FaEnvelope,
//   FaSignInAlt,
//   FaUserPlus,
//   FaUserCircle,
//   FaSignOutAlt,
// } from "react-icons/fa";
// import "../Styles/Navbar.css";

// const Navbar = () => {
//   const [isOpen, setIsOpen] = useState(false);
//   const [user, setUser] = useState(null); // fake auth state for now

//   const toggleMenu = () => setIsOpen(!isOpen);

//   const handleLogout = () => {
//     setUser(null); // later we’ll replace with Supabase logout
//     setIsOpen(false);
//   };

//   return (
//     <nav className="navbar">
//       <div className="navbar-logo">Revival Springs Youth</div>

//       {/* Desktop Links */}
//       <div className="navbar-links">
//         <Link to="/"><FaHome className="icon"/> Home</Link>
//         <Link to="/about"><FaInfoCircle className="icon"/> About</Link>
//         <Link to="/programs"><FaBookOpen className="icon"/> Programs</Link>
//         <Link to="/events"><FaCalendarAlt className="icon"/> Events</Link>
//         <Link to="/contact"><FaEnvelope className="icon"/> Contact</Link>

//         {!user ? (
//           <>
//             <Link to="/login"><FaSignInAlt className="icon"/> Login</Link>
//             <Link to="/register"><FaUserPlus className="icon"/> Register</Link>
//           </>
//         ) : (
//           <>
//             <Link to="/dashboard"><FaUserCircle className="icon"/> Dashboard</Link>
//             <button className="logout-btn" onClick={handleLogout}>
//               <FaSignOutAlt className="icon"/> Logout
//             </button>
//           </>
//         )}
//       </div>

//       {/* Hamburger Icon */}
//       <div className="menu-icon" onClick={toggleMenu}>
//         {isOpen ? <FaTimes /> : <FaBars />}
//       </div>

//       {/* Mobile Menu */}
//       <div className={`mobile-menu ${isOpen ? "open" : ""}`}>
//         <Link to="/" onClick={toggleMenu}><FaHome className="icon"/> Home</Link>
//         <Link to="/about" onClick={toggleMenu}><FaInfoCircle className="icon"/> About</Link>
//         <Link to="/programs" onClick={toggleMenu}><FaBookOpen className="icon"/> Programs</Link>
//         <Link to="/events" onClick={toggleMenu}><FaCalendarAlt className="icon"/> Events</Link>
//         <Link to="/contact" onClick={toggleMenu}><FaEnvelope className="icon"/> Contact</Link>

//         {!user ? (
//           <>
//             <Link to="/login" onClick={toggleMenu}><FaSignInAlt className="icon"/> Login</Link>
//             <Link to="/register" onClick={toggleMenu}><FaUserPlus className="icon"/> Register</Link>
//           </>
//         ) : (
//           <>
//             <Link to="/dashboard" onClick={toggleMenu}><FaUserCircle className="icon"/> Dashboard</Link>
//             <button className="logout-btn" onClick={handleLogout}>
//               <FaSignOutAlt className="icon"/> Logout
//             </button>
//           </>
//         )}
//       </div>
//     </nav>
//   );
// };

// export default Navbar;




import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FaBars,
  FaTimes,
  FaHome,
  FaInfoCircle,
  FaBookOpen,
  FaCalendarAlt,
  FaEnvelope,
  FaSignInAlt,
  FaUserPlus,
  FaUserCircle,
  FaSignOutAlt,
} from "react-icons/fa";
import { supabase } from "../supabaseClient";
import "../Styles/Navbar.css";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [session, setSession] = useState(null);
  const navigate = useNavigate();

  const toggleMenu = () => setIsOpen(!isOpen);

  useEffect(() => {
    // Get current session on load
    const getSession = async () => {
      const { data } = await supabase.auth.getSession();
      setSession(data.session);
    };
    getSession();

    // Listen for login/logout changes
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setIsOpen(false);
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo">Revival Springs Youth</div>

      {/* Desktop Links */}
      <div className="navbar-links">
        <Link to="/"><FaHome className="icon" /> Home</Link>
        <Link to="/about"><FaInfoCircle className="icon" /> About</Link>
        <Link to="/programs"><FaBookOpen className="icon" /> Programs</Link>
        <Link to="/events"><FaCalendarAlt className="icon" /> Events</Link>
        <Link to="/contact"><FaEnvelope className="icon" /> Contact</Link>

        {!session ? (
          <>
            <Link to="/login"><FaSignInAlt className="icon" /> Login</Link>
            <Link to="/register"><FaUserPlus className="icon" /> Register</Link>
          </>
        ) : (
          <>
            <Link to="/dashboard"><FaUserCircle className="icon" /> {session.user.user_metadata?.name || "Dashboard"}</Link>
            <button className="logout-btn" onClick={handleLogout}>
              <FaSignOutAlt className="icon" /> Logout
            </button>
          </>
        )}
      </div>

      {/* Hamburger Icon */}
      <div className="menu-icon" onClick={toggleMenu}>
        {isOpen ? <FaTimes /> : <FaBars />}
      </div>

      {/* Mobile Menu */}
      <div className={`mobile-menu ${isOpen ? "open" : ""}`}>
        <Link to="/" onClick={toggleMenu}><FaHome className="icon" /> Home</Link>
        <Link to="/about" onClick={toggleMenu}><FaInfoCircle className="icon" /> About</Link>
        <Link to="/programs" onClick={toggleMenu}><FaBookOpen className="icon" /> Programs</Link>
        <Link to="/events" onClick={toggleMenu}><FaCalendarAlt className="icon" /> Events</Link>
        <Link to="/contact" onClick={toggleMenu}><FaEnvelope className="icon" /> Contact</Link>

        {!session ? (
          <>
            <Link to="/login" onClick={toggleMenu}><FaSignInAlt className="icon" /> Login</Link>
            <Link to="/register" onClick={toggleMenu}><FaUserPlus className="icon" /> Register</Link>
          </>
        ) : (
          <>
            <Link to="/dashboard" onClick={toggleMenu}><FaUserCircle className="icon" /> {session.user.user_metadata?.name || "Dashboard"}</Link>
            <button className="logout-btn" onClick={handleLogout}>
              <FaSignOutAlt className="icon" /> Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
