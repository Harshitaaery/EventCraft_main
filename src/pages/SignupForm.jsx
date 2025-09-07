import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FiSun, FiMoon, FiEye, FiEyeOff } from "react-icons/fi";

const SignupForm = () => {
  const [darkMode, setDarkMode] = useState(() => localStorage.getItem("theme") === "dark");
  const [role, setRole] = useState("User");
  const [isSignIn, setIsSignIn] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    contact: "",
    password: "",
  });

  const navigate = useNavigate();

  useEffect(() => {
    const root = document.documentElement;
    if (darkMode) {
      root.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      root.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "contact" && !/^\d{0,10}$/.test(value)) return;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isSignIn && formData.contact.length !== 10) {
      return alert("📞 Contact number must be exactly 10 digits.");
    }

    try {
      // ✅ Fixed baseURL to point to /api
      const baseURL = "https://eventcraft-backend-production.up.railway.app/api";
      let endpoint = "";
      let payload = {};

      if (isSignIn) {
        endpoint = `${baseURL}/login`;
        payload = { email: formData.email, password: formData.password };
      } else {
        endpoint = role === "Organizer"
          ? `${baseURL}/signup/organizer`
          : `${baseURL}/signup`;
        payload = role === "Organizer"
          ? {
              name: formData.name,
              email: formData.email,
              contact: formData.contact,
              password: formData.password,
            }
          : {
              ...formData,
              role,
            };
      }

      const res = await axios.post(endpoint, payload);
      const userData = isSignIn
        ? res.data.user
        : {
            _id: res.data.user?._id,
            name: formData.name,
            email: formData.email,
            contact: formData.contact,
            role: role,
          };

      localStorage.setItem("user", JSON.stringify(userData));
      alert(res.data.message || (isSignIn ? "✅ Login successful!" : "✅ Signup successful!"));
      setFormData({ name: "", email: "", contact: "", password: "" });
      navigate("/home");
    } catch (err) {
      alert(
        err.response?.data?.message ||
        err.response?.data?.error ||
        (isSignIn ? "❌ Login failed." : "❌ Signup failed.")
      );
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12 bg-gradient-to-br from-violet-500 via-white to-violet-200 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 relative">
      {/* Theme Toggle */}
      <div className="absolute top-4 right-4">
        <button onClick={() => setDarkMode(!darkMode)} className="text-2xl text-yellow-500 hover:text-yellow-400 transition">
          {darkMode ? <FiSun /> : <FiMoon />}
        </button>
      </div>

      <div className={`bg-white dark:bg-gray-900 rounded-3xl shadow-2xl w-full max-w-4xl flex overflow-hidden transition-all duration-700 ${isSignIn ? "flex-row-reverse" : ""}`}>
        {/* Left Panel */}
        <div className="w-1/2 bg-gradient-to-br from-violet-800 via-purple-600 to-indigo-700 text-white flex flex-col justify-center items-center px-8 py-16 space-y-6">
          {isSignIn ? (
            <>
              <h1 className="text-4xl font-bold text-center">New here?</h1>
              <p className="text-base text-center">Create an account to discover amazing events.</p>
              <button onClick={() => setIsSignIn(false)} className="bg-white text-violet-700 font-semibold px-6 py-2 rounded-full hover:bg-violet-100 transition">SIGN UP</button>
            </>
          ) : (
            <>
              <h1 className="text-4xl font-bold text-center">Welcome Back!</h1>
              <p className="text-base text-center">Already have an account? Sign in to explore events and manage your bookings.</p>
              <button onClick={() => setIsSignIn(true)} className="bg-white text-violet-700 font-semibold px-6 py-2 rounded-full hover:bg-violet-100 transition">SIGN IN</button>
            </>
          )}
        </div>

        {/* Right Panel */}
        <div className="w-1/2 p-10">
          <h2 className="text-2xl font-bold text-center text-violet-700 dark:text-white mb-6">
            {isSignIn ? "Sign In" : "Create Account"}
          </h2>

          {/* Role Toggle (Only for Signup) */}
          {!isSignIn && (
            <div className="flex justify-center mb-6">
              <button onClick={() => setRole("User")} className={`px-4 py-2 rounded-l-full font-semibold text-sm ${role === "User" ? "bg-violet-700 text-white" : "bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200"}`}>User</button>
              <button onClick={() => setRole("Organizer")} className={`px-4 py-2 rounded-r-full font-semibold text-sm ${role === "Organizer" ? "bg-violet-700 text-white" : "bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200"}`}>Organizer</button>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            {!isSignIn && (
              <>
                <input type="text" name="name" placeholder={role === "User" ? "Full Name" : "Organizer Name"} value={formData.name} onChange={handleChange} className="w-full px-4 py-3 rounded-xl bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-violet-500 outline-none" required />
                <input type="text" name="contact" placeholder="Contact Number" value={formData.contact} onChange={handleChange} className="w-full px-4 py-3 rounded-xl bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-violet-500 outline-none" required maxLength={10} pattern="\d{10}" />
              </>
            )}

            <input type="email" name="email" placeholder="Email Address" value={formData.email} onChange={handleChange} className="w-full px-4 py-3 rounded-xl bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-violet-500 outline-none" required />

            <div className="relative">
              <input type={showPassword ? "text" : "password"} name="password" placeholder="Password" value={formData.password} onChange={handleChange} className="w-full px-4 py-3 pr-12 rounded-xl bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-violet-500 outline-none" required />
              <span onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-600 dark:text-gray-300 cursor-pointer text-xl">
                {showPassword ? <FiEyeOff /> : <FiEye />}
              </span>
            </div>

            <button type="submit" className="w-full bg-violet-700 hover:bg-violet-800 text-white font-semibold py-3 rounded-xl transition duration-200">
              {isSignIn ? `Sign In as ${role}` : `Sign Up as ${role}`}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignupForm;
