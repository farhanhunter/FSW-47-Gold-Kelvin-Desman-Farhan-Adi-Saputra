import React from "react";
import { useLocation } from "react-router-dom";

const Header = () => {
  const location = useLocation();

  const getTitle = () => {
    switch (location.pathname) {
      case "/":
        return "Home";
      case "/about":
        return "About";
      case "/login":
        return "Login";
      case "/register":
        return "Register";
      case "/attendance":
        return "Attendance List";
      default:
        return "Page";
    }
  };

  return (
    <header className="bg-white shadow">
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900">
          {getTitle()}
        </h1>
      </div>
    </header>
  );
};

export default Header;
