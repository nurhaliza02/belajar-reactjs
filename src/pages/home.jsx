import React from "react";

export default function Home() {
  return (
    <div className="w-full min-h-screen ">

      {/* Navbar */}
      <nav className="w-full flex items-center justify-between px-10 py-6">

        {/* Logo */}
        <div className="flex items-center gap-3">
          <span className="font-semibold text-lg">Portofolio</span>
        </div>

        {/* Menu */}
        <div className="flex gap-8 text-blue-500 font-medium">
          <a href="#">Home</a>
          <a href="#">About</a>
          <a href="#">Skills</a>
          <a href="#">Projects</a>
          <a href="#">Contact</a>
        </div>

      </nav>


      {/* Hero Section */}
      <section className="w-full flex flex-col items-center text-center py-20">

        {/* Title */}
        <h1 className="text-5xl md:text-6xl font-bold text-gray-900 leading-tight max-w-4xl">
          Building modern web <br/>
          applications✨ <br />
        </h1>

        {/* Description */}
        <p className="text-gray-500 mt-6 max-w-2xl">
          Explore my projects and creative works in web development, 
          from simple  websites to full web applications.
        </p>

        {/* Buttons */}
        <div className="flex gap-6 mt-10">
          <button className="px-6 py-3 rounded-full border border-gray-300 hover:bg-gray-100">
            View My Projects →
          </button>

        </div>

      </section>

    </div>
  );
}