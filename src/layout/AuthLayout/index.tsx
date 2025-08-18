import React from "react";
import LogoImage from "../../assets/brand/logo.svg";
import LogoWhiteImage from "../../assets/brand/logo-white.svg";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-row min-h-screen">
      {/* Left Side: Brand / Illustration */}
      <div className="hidden md:flex flex-[45%] bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 text-white flex-col justify-center px-12 relative overflow-hidden">
        {/* Logo */}
        <img
          src={LogoWhiteImage}
          alt="Brand"
          className="w-[180px] h-auto mb-6 z-10"
        />

        {/* Branding Info */}
        <h2 className="text-3xl font-extrabold mb-4 leading-tight z-10">
          Welcome to <span className="text-yellow-300">Dash UI</span>
        </h2>
        <p className="text-lg text-gray-200 z-10 max-w-md">
          Powering your productivity with modern dashboards & secure access.
        </p>

        {/* Decorative Gradient Shapes */}
        <div className="absolute -bottom-24 -right-24 w-72 h-72 rounded-full bg-white/10 blur-3xl z-0"></div>
        <div className="absolute top-10 right-10 w-40 h-40 rounded-full bg-yellow-400/20 blur-2xl z-0"></div>
      </div>

      {/* Right Side: Form Container */}
      <main className="flex-[55%] flex flex-col items-center md:items-start justify-center bg-[#F6F7F9] px-6 md:px-16 relative">
        <div className="bg-white shadow-2xl rounded-3xl w-full max-w-lg px-6 md:px-10 py-12 relative">
          {/* Mobile Logo */}
          <img
            src={LogoImage}
            alt="Brand"
            className="h-auto w-[180px] object-contain md:hidden mb-8"
          />
          {children}
        </div>
      </main>
    </div>
  );
};

export default AuthLayout;
