import React, { useState } from 'react';
import { FaRobot, FaTimes, FaPaperPlane } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      sender: 'bot',
      text: "Hi! I’m Harry 🤖. Ask me how to book tickets, view event schedules, or make a payment.",
    },
  ]);
  const [input, setInput] = useState('');
  const navigate = useNavigate();

  const toggleChat = () => setIsOpen(!isOpen);

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage = { sender: 'user', text: input };
    const newMessages = [...messages, userMessage];
    setMessages(newMessages);

    const lowerInput = input.toLowerCase();
    const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";

    let response = '';
    let redirect = '';

    if (lowerInput.includes('book') || lowerInput.includes('ticket')) {
      if (isLoggedIn) {
        response = 'Redirecting you to ticket booking page... 🎟️';
        redirect = '/rsvp';
      } else {
        response = 'Please login first to book tickets 🔑';
        redirect = '/signup';
      }
    } else if (lowerInput.includes('event') || lowerInput.includes('schedule')) {
      if (isLoggedIn) {
        response = 'Taking you to the events page... 📅';
        redirect = '/events';
      } else {
        response = 'Please login to view events 🔑';
        redirect = '/signup';
      }
    } else if (lowerInput.includes('pay') || lowerInput.includes('payment')) {
      if (isLoggedIn) {
        response = 'Redirecting you to the payment page... 💳';
        redirect = '/payment';
      } else {
        response = 'Please login before making payments 🔑';
        redirect = '/signup';
      }
    } else if (lowerInput.includes('create-event') || lowerInput.includes('organize')) {
      if (isLoggedIn) {
        response = 'Taking you to create an event... 📝';
        redirect = '/create-event';
      } else {
        response = 'Please login as an organizer first 🔑';
        redirect = '/signup';
      }
    } else if (lowerInput.includes('signup') || lowerInput.includes('register')) {
      response = 'Taking you to the signup page... 📝';
      redirect = '/signup';
    } else {
      response =
        "Sorry! I'm still learning. Please contact customer support at 813088**** for your query.";
    }

    setTimeout(() => {
      setMessages((prev) => [...prev, { sender: 'bot', text: response }]);
      if (redirect) {
        setTimeout(() => {
          navigate(redirect);
          setIsOpen(false);
        }, 1200);
      }
    }, 500);

    setInput('');
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') handleSend();
  };

  return (
    <>
      {/* Floating Chat Icon with Hover Tooltip */}
      <div className="fixed bottom-6 right-6 z-50 group">
        {/* Hover Tooltip */}
        <div className="absolute bottom-14 right-0 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-sm text-gray-800 dark:text-gray-200 px-4 py-2 rounded-lg shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none w-64">
          💬 Hi, I'm Harry! Ask me about tickets, events, or payments.
        </div>

        {/* Chat Button */}
        <div
          onClick={toggleChat}
          className="bg-violet-600 text-white p-3 rounded-full shadow-lg cursor-pointer hover:bg-violet-700 transition"
          title="Harry"
        >
          <FaRobot size={20} />
        </div>
      </div>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-20 right-6 w-80 bg-white dark:bg-gray-800 rounded-xl shadow-lg flex flex-col z-50">
          {/* Header */}
          <div className="bg-violet-600 text-white px-4 py-3 rounded-t-xl flex justify-between items-center">
            <span className="font-semibold">Harry 🤖</span>
            <FaTimes className="cursor-pointer" onClick={toggleChat} />
          </div>

          {/* Body */}
          <div className="p-3 space-y-2 h-64 overflow-y-auto bg-gray-100 dark:bg-gray-900">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`max-w-[80%] px-4 py-2 rounded-xl text-sm ${
                  msg.sender === 'user'
                    ? 'bg-violet-600 text-white self-end ml-auto rounded-br-none'
                    : 'bg-gray-300 dark:bg-gray-700 text-black dark:text-white self-start mr-auto rounded-bl-none'
                }`}
              >
                {msg.text}
              </div>
            ))}
          </div>

          {/* Input */}
          <div className="flex items-center border-t border-gray-200 dark:border-gray-700 px-3 py-2 bg-white dark:bg-gray-800">
            <input
              type="text"
              className="flex-1 px-3 py-1 text-sm border rounded-lg outline-none focus:ring-2 focus:ring-violet-500 bg-white dark:bg-gray-700 text-black dark:text-white placeholder-gray-400 dark:placeholder-gray-300"
              placeholder="Type your question..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
            />
            <button
              onClick={handleSend}
              className="ml-2 bg-violet-600 hover:bg-violet-700 text-white px-3 py-1.5 rounded-lg"
            >
              <FaPaperPlane size={14} />
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default ChatBot;
