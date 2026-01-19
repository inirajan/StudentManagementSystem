import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const sections = ["home", "about", "service", "contact", "map"];

const Landing = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [scrollY, setScrollY] = useState(0);

  // Toggle dark mode & scroll listener
  useEffect(() => {
    const html = document.documentElement;
    if (darkMode) html.classList.add("dark");
    else html.classList.remove("dark");

    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [darkMode]);

  // Intersection Observer for fade-in sections
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-fadeInUp");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 },
    );

    const elements = document.querySelectorAll(".fade-section");
    elements.forEach((el) => observer.observe(el));
  }, []);

  // Smooth scroll function
  const scrollToSection = (id) => {
    const section = document.getElementById(id);
    section?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-500">
      {/* Navbar */}
      <nav
        className={`fixed w-full backdrop-blur bg-white/80 dark:bg-gray-900/80 z-50 transition-all duration-300 ${
          scrollY > 50 ? "shadow-lg" : ""
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center h-16">
          <a
            href="#"
            className="text-2xl font-bold text-blue-600 hover:text-blue-500 transition"
          >
            School Managment System
          </a>

          <div className="hidden md:flex space-x-8">
            {sections.map((sec) => (
              <button
                key={sec}
                onClick={() => scrollToSection(sec)}
                className="nav-link font-medium hover:text-blue-600 transition"
              >
                {sec.charAt(0).toUpperCase() + sec.slice(1)}
              </button>
            ))}
          </div>

          <div className="flex items-center space-x-4">
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="text-xl focus:outline-none"
            >
              {darkMode ? "☀" : "🌙"}
            </button>
            <Link
              to="/login"
              className="px-5 py-2 bg-blue-600 text-white rounded-full font-semibold hover:bg-blue-700 transition"
            >
              Login
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section
        id="home"
        className="h-screen relative flex items-center justify-center text-center overflow-hidden"
      >
        <div className="absolute inset-0">
          <img
            src="https://beams360.com/wp-content/uploads/2024/08/School-Management-system-02-1170x580.jpg"
            alt="Hero"
            className="w-full h-full object-cover transform scale-105 animate-heroParallax"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-blue-800/80 to-indigo-700/80"></div>
        </div>
        <div className="relative z-10 max-w-3xl px-6 animate-fadeInUp">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
            School Management System
          </h1>
          <p className="text-xl text-gray-200 mb-8">
            Manage students ,teacher, courses, attendance & performance
            seamlessly
          </p>
          <button
            onClick={() => scrollToSection("about")}
            className="px-10 py-3 bg-white text-blue-600 rounded-full font-semibold hover:scale-105 transition-transform duration-300"
          >
            Get Started
          </button>
        </div>
      </section>

      {/* About */}
      <section
        id="about"
        className="py-24 bg-gray-100 dark:bg-gray-800 fade-section"
      >
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-10 px-6 items-center">
          <img
            src="https://img.freepik.com/free-photo/close-up-keyboard-glasses-with-executives-background_1098-3635.jpg"
            alt="About"
            className="rounded-xl shadow-xl hover:scale-105 transition transform duration-500"
          />
          <div>
            <h2 className="text-4xl font-bold mb-4">About Our System</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Our platform helps institutions manage,teacher, students, grades,
              attendance, and performance efficiently.
            </p>
            <p className="text-gray-600 dark:text-gray-300">
              Secure, modern, and fully responsive for schools & colleges.
            </p>
          </div>
        </div>
      </section>

      {/* Services */}
      <section id="service" className="py-24 fade-section">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold">Our Services</h2>
          <p className="text-gray-600 dark:text-gray-300 mt-2">
            Everything you need in one platform
          </p>
        </div>
        <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-8 px-6 text-gray-600 dark:text-black">
          {[
            {
              icon: "fas fa-user-graduate",
              title: "Student Records",
              desc: "Complete student profiles & attendance tracking.",
            },
            {
              icon: "fas fa-book-open",
              title: "Course Management",
              desc: "Create, assign and monitor courses easily.",
            },
            {
              icon: "fas fa-chart-line",
              title: "Analytics",
              desc: "Powerful reports & performance insights.",
            },
          ].map((service, idx) => (
            <div
              key={idx}
              className="service-card hover:scale-105 transform transition duration-500"
            >
              <i className={`${service.icon} text-5xl text-blue-600 mb-4`}></i>
              <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
              <p>{service.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Contact */}
      <section
        id="contact"
        className="py-24 bg-gray-100 dark:bg-gray-800 fade-section"
      >
        <div className="max-w-xl mx-auto text-center px-6">
          <h2 className="text-4xl font-bold mb-6">Contact Us</h2>
          <form className="space-y-4">
            <input className="form-input" placeholder="Name" />
            <input className="form-input" placeholder="Email" />
            <textarea className="form-input" placeholder="Message"></textarea>
            <button className="px-10 py-3 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition">
              Send Message
            </button>
          </form>
          <div className="flex justify-center space-x-6 mt-8 text-3xl">
            <a href="#" className="social">
              <i className="fab fa-facebook-f"></i>
            </a>
            <a href="#" className="social">
              <i className="fab fa-twitter"></i>
            </a>
            <a href="#" className="social">
              <i className="fab fa-instagram"></i>
            </a>
            <a href="#" className="social">
              <i className="fab fa-linkedin-in"></i>
            </a>
          </div>
        </div>
      </section>

      {/* Map */}
      <section
        id="map"
        className="py-24 bg-white dark:bg-gray-900 fade-section"
      >
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold mb-4">Our Location</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-10">
            Visit us at our office or reach out anytime
          </p>
          <div className="w-full h-[450px] rounded-2xl overflow-hidden shadow-2xl border border-gray-200 dark:border-gray-700">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d742.6826955514566!2d84.437652528111!3d27.692137427903287!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3994fb34c6c40133%3A0x70ff6035333ee499!2sMCRP%2BRW6%2C%20Bharatpur%2044200!5e0!3m2!1sen!2snp!4v1768748801088!5m2!1sen!2snp"
              className="w-full h-full border-0"
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Google Map"
            ></iframe>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-6 text-center">
        © 2026 Student Management System
      </footer>

      {/* Styles */}
      <style>{`
        html { scroll-behavior: smooth; }
        .nav-link { transition: 0.3s; cursor: pointer; }
        .nav-link:hover { color: #3b82f6; }
        .service-card {
          background: white;
          padding: 2rem;
          border-radius: 1rem;
          text-align: center;
          box-shadow: 0 10px 25px rgba(0,0,0,0.1);
          transition: 0.4s;
        }
        .form-input {
          width: 100%;
          padding: 0.8rem;
          border-radius: 0.5rem;
          border: 1px solid #ccc;
        }
        .social {
          color: #6b7280;
          transition: 0.3s;
        }
        .social:hover {
          color: #3b82f6;
          transform: scale(1.2);
        }
        @keyframes fadeInUp {
          0% { opacity: 0; transform: translateY(50px);}
          100% { opacity: 1; transform: translateY(0);}
        }
        .animate-fadeInUp { animation: fadeInUp 1s ease forwards; }
        @keyframes heroParallax {
          0% { transform: scale(1.05) translateY(0); }
          50% { transform: scale(1.05) translateY(-10px); }
          100% { transform: scale(1.05) translateY(0); }
        }
        .animate-heroParallax { animation: heroParallax 15s ease-in-out infinite; }
      `}</style>

      {/* Font Awesome */}
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css"
      />
    </div>
  );
};

export default Landing;
