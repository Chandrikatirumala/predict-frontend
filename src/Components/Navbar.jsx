import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import '@fortawesome/fontawesome-free/css/all.min.css';
import './Navbar.css';

const Navbar = ({ minimal = false }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const isLoggedIn = !!localStorage.getItem('token');

  const handleAuthAction = () => {
    if (location.pathname === '/signup') {
      navigate('/login');
    } else {
      navigate('/signup');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  const isSignupPage = location.pathname === '/signup';

  return (
    <>
      <nav className={`navbar navbar-expand-lg ${minimal ? 'navbar-light bg-light' : 'navbar-dark bg-dark'} fixed-top shadow-sm`}>
        <div className="container-fluid">
          {/* Logo */}
          <Link className={`navbar-brand fw-bold ${minimal ? '' : 'text-light'}`} to={isLoggedIn ? "/profile" : "/"}>
            <i className={`me-2 ${minimal ? '' : 'fa-solid fa-crystal-ball'}`}></i>
            Predict My Future
          </Link>

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarMystic"
            aria-controls="navbarMystic"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarMystic">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link" to="/tarot-reading">
                  <i className="fa-solid fa-chess-knight me-2"></i>Tarot Reading
                </Link>
              </li>
              <li className="nav-item dropdown">
                <Link
                  className="nav-link dropdown-toggle"
                  to="#"
                  id="predictionsDropdown"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <i className="fa-solid fa-chart-line me-2"></i>Predictions
                </Link>
                <ul className="dropdown-menu" aria-labelledby="predictionsDropdown">
                  <li>
                    <Link className="dropdown-item" to="/career-prediction">
                      <i className="fa-solid fa-briefcase me-2"></i>Career Prediction
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" to="/love-prediction">
                      <i className="fa-solid fa-heart me-2"></i>Love Compatibility
                    </Link>
                  </li>
                  <li><hr className="dropdown-divider" /></li>
                  <li>
                    <Link className="dropdown-item" to="/all-predictions">
                      <i className="fa-solid fa-list me-2"></i>All Predictions
                    </Link>
                  </li>
                </ul>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/fortuneteller">
                  <i className="fa-solid fa-comments me-2"></i>Chat AI
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/about">
                  <i className="fa-solid fa-user-astronaut me-2"></i>About
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/contact">
                  <i className="fa-solid fa-envelope me-2"></i>Contact
                </Link>
              </li>
            </ul>

            {/* Right side: Login/Signup or Logout */}
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0 align-items-center">
              {!isLoggedIn ? (
                <li className="nav-item">
                  <button
                    className="btn btn-primary text-white px-3"
                    onClick={handleAuthAction}
                    style={{ borderRadius: '0.375rem' }}
                  >
                    <i className="fa-solid fa-right-to-bracket me-2"></i>
                    {isSignupPage ? 'Login' : 'Signup'}
                  </button>
                </li>
              ) : (
                <li className="nav-item">
                  <button
                    className="btn btn-danger text-white px-3"
                    onClick={handleLogout}
                    style={{ borderRadius: '0.375rem' }}
                  >
                    <i className="fa-solid fa-right-from-bracket me-2"></i>Logout
                  </button>
                </li>
              )}
            </ul>
          </div>
        </div>
      </nav>

      {/* Spacer for fixed navbar */}
      <div style={{ paddingTop: '80px' }}></div>
    </>
  );
};

export default Navbar;
