// import React from 'react';
// import './landingpage.css';
// import logo from '../../assets/logo.png';
// import { FaRobot } from 'react-icons/fa';

// const LandingPage = () => {
//   return (
//     <div className="home-container">
//       {/* Navbar */}
//       <header className="navbar">
//         <div className="logo-section">
//           <img src={logo} alt="Crime Portal Logo" className="logo-icon" />
//           <span className="logo-text">Crime Portal</span>
//         </div>
//         <nav>
//           <ul className="nav-links">
//             <li><a href="/">Home</a></li>
//             <li><a href="/">About Us</a></li>
//             <li><a href="/">Contact Us</a></li>
//           </ul>
//         </nav>
//         <div className="auth-buttons">
//           <button className="login-btn">Login</button>
//           <button className="register-btn">Register</button>
//         </div>
//       </header>

//       {/* Hero Section */}
//       <section className="hero">
//         <h1>Report, Track, Stay Safe - For a Safer Tomorrow</h1>
//         <p>Safeguarding Together: Your Bridge to a Secure Environment</p>
//       </section>

//     </div>
//   );
// };

// export default LandingPage;

import React from 'react';
import './landingpage.css';
import logo from '../assets/logo.png';
import { Link } from 'react-router-dom'; // <-- Import Link

const LandingPage = () => {
  return (
    <div className="home-container">
      {/* Navbar */}
      <header className="navbar">
        <div className="logo-section">
          <img src={logo} alt="Crime Portal Logo" className="logo-icon" />
          <span className="logo-text">Crime Portal</span>
        </div>
        <nav>
          <ul className="nav-links">
            <li><a href="/">Home</a></li>
            <li><a href="/">About Us</a></li>
            <li><a href="/">Contact Us</a></li>
          </ul>
        </nav>
        <div className="auth-buttons">
            <Link to="/login"><button className="login-btn">Login</button></Link>
            <Link to="/signup"><button className="register-btn">Register</button></Link>
        </div>
      </header>

      {/* Hero Section */}
      <section className="hero">
        <h1>Report, Track, Stay Safe - For a Safer Tomorrow</h1>
        <p>Safeguarding Together: Your Bridge to a Secure Environment</p>
      </section>
    </div>
  );
};

export default LandingPage;
