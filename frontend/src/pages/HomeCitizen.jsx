import { useEffect, useState } from 'react';
import { FaRobot } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Chatbot from '../components/Chatbot'; // Make sure this path is correct
import Footer from '../components/Footer';
import Header from '../components/Header';
import '../styles/common.css';
import { clearRole } from '../utils/auth';

const HomeCitizen = () => {
  const [user, setUser] = useState('');
  const [showChatbot, setShowChatbot] = useState(false); // ← Manage visibility
  const navigate = useNavigate();

  useEffect(() => {
    setUser(localStorage.getItem('loggedInUser') || 'Citizen');
  }, []);

  const handleLogout = () => {
    clearRole();
    localStorage.removeItem('loggedInUser');
    navigate('/login');
  };

  return (
    <div className="home-container">
      <Header />

      {/* Hero Section */}
      <section className="hero">
        <h1>Report, Track, Stay Safe – For a Safer Tomorrow</h1>
        <p>Safeguarding Together: Your Bridge to a Secure Environment</p>

      
      </section>

      {/* Chatbot FAB */}
      <div
        className="chatbot-fab"
        onClick={() => setShowChatbot(prev => !prev)} // ← Toggle chatbot visibility
        style={{
          position: 'fixed',
          bottom: '20px',
          right: '20px',
          backgroundColor: '#d24f01',
          color: 'white',
          borderRadius: '50%',
          padding: '15px',
          cursor: 'pointer',
          zIndex: 1000
        }}
      >
        <FaRobot size={24} />
      </div>

      {/* Chatbot Popup */}
      {showChatbot && (
        <div
          style={{
            position: 'fixed',
            bottom: '80px',
            right: '20px',
            zIndex: 1001,
            width: '350px',
            maxHeight: '80vh',
            boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
            borderRadius: '10px',
            overflow: 'hidden',
            backgroundColor: 'white'
          }}
        >
          <Chatbot onClose={() => setShowChatbot(false)} />
        </div>
      )}

      <Footer />
      <ToastContainer />
    </div>
  );
};

export default HomeCitizen;
