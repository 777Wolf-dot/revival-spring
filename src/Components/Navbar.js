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
  FaTools,
} from "react-icons/fa";
import { supabase } from "../supabaseClient";
import "../Styles/Navbar.css";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [session, setSession] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => setIsOpen(!isOpen);

  useEffect(() => {
    // Fetch session and check role
    const getSession = async () => {
      const { data } = await supabase.auth.getSession();
      setSession(data.session);

      if (data.session?.user) {
        // Check user role
        const { data: roleData } = await supabase
          .from("user_roles")
          .select("role")
          .eq("user_id", data.session.user.id)
          .single();

        if (roleData?.role === "admin") {
          setIsAdmin(true);
        } else {
          setIsAdmin(false);
        }
      }
    };

    getSession();

    // Listen for login/logout
    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setSession(session);

        if (session?.user) {
          supabase
            .from("user_roles")
            .select("role")
            .eq("user_id", session.user.id)
            .single()
            .then(({ data }) => {
              setIsAdmin(data?.role === "admin");
            });
        } else {
          setIsAdmin(false);
        }
      }
    );

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
        <Link to="/contribute"><FaCalendarAlt className="icon" /> Contribution</Link>
        <Link to="/contact"><FaEnvelope className="icon" /> Contact</Link>

        {!session ? (
          <>
            <Link to="/login"><FaSignInAlt className="icon" /> Login</Link>
            <Link to="/register"><FaUserPlus className="icon" /> Register</Link>
          </>
        ) : (
          <>
            <Link to="/dashboard"><FaUserCircle className="icon" /> {session.user.user_metadata?.name || "Dashboard"}</Link>
            {isAdmin && (
              <Link to="/admin"><FaTools className="icon" /> Admin</Link>
            )}
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
         <Link to="/contribute"><FaCalendarAlt className="icon" /> Contribution</Link>

        {!session ? (
          <>
            <Link to="/login" onClick={toggleMenu}><FaSignInAlt className="icon" /> Login</Link>
            <Link to="/register" onClick={toggleMenu}><FaUserPlus className="icon" /> Register</Link>
          </>
        ) : (
          <>
            <Link to="/dashboard" onClick={toggleMenu}><FaUserCircle className="icon" /> {session.user.user_metadata?.name || "Dashboard"}</Link>
            {isAdmin && (
              <Link to="/admin" onClick={toggleMenu}><FaTools className="icon" /> Admin</Link>
            )}
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
