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

const App = () => {
  const location = useLocation();
  const hideChatbotOn = ['/', '/signup', '/login'];

  return (
    <>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/dashboardPage" element={<DashboardPage />} />
        <Route path="/dashboardorg" element={<OrganizerDashboard />} />
        <Route path="/signup" element={<SignupForm />} />
        <Route path="/comedy" element={<ComedyNights />} />
        <Route path="/home" element={<Home />} />
        <Route path="/create-event" element={<EventForm />} />
        <Route path="/rsvp" element={<RSVPPage />} />
        <Route path="/events" element={<EventsPage />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/user" element={<UserProfile />} />
        <Route path="/calendar-reminders" element={<CalendarReminders />} />
      </Routes>

      {/* ✅ Show chatbot except on specific routes */}
      {!hideChatbotOn.includes(location.pathname) && <ChatBot />}
    </>
  );
};

export default App;
