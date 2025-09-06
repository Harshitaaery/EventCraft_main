import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';

import Home from './pages/Home';
import RSVPPage from './pages/RSVPPage';
import EventForm from './pages/EventForm';
import EventsPage from './pages/EventsPage';
import CalendarReminders from './pages/CalendarsReminders';
import DashboardPage from './pages/DashboardPage';
import OrganizerDashboard from './pages/Dashboard_org';
import Payment from './pages/Payment';
import SignupForm from './pages/SignupForm';
import ComedyNights from './pages/ComedyNights';
import UserProfile from './pages/UserProfile';
import LandingPage from './pages/LandingPage';
import ChatBot from './pages/ChatBot';
import ProtectedRoute from './pages/ProtectedRoute';

const App = () => {
  const location = useLocation();
  const hideChatbotOn = ['/', '/signup', '/login'];

  return (
    <>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/dashboardPage" element={<ProtectedRoute><DashboardPage /></ProtectedRoute>} />
        <Route path="/dashboardorg" element={<ProtectedRoute><OrganizerDashboard /></ProtectedRoute>} />
        <Route path="/signup" element={<SignupForm />} />
        <Route path="/comedy" element={<ComedyNights />} />
        <Route path="/home" element={<ProtectedRoute><Home /></ProtectedRoute>} />
        <Route path="/create-event" element={<ProtectedRoute><EventForm /></ProtectedRoute>} />
        <Route path="/rsvp" element={<ProtectedRoute><RSVPPage /></ProtectedRoute>} />
        <Route path="/events" element={<ProtectedRoute><EventsPage /></ProtectedRoute>} />
        <Route path="/payment" element={<ProtectedRoute><Payment /></ProtectedRoute>} />
        <Route path="/user" element={<ProtectedRoute><UserProfile /></ProtectedRoute>} />
        <Route path="/calendar-reminders" element={<ProtectedRoute><CalendarReminders /></ProtectedRoute>} />
      </Routes>

      {/* ✅ Show chatbot except on specific routes */}
      {!hideChatbotOn.includes(location.pathname) && <ChatBot />}
    </>
  );
};

export default App;