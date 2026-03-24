import React from "react";
import { Link } from "react-router-dom";

const features = [
  {
    title: "About Me 🌷",
    desc: "A little story about who I am.",
    link: "/about",
  },
  {
    title: "Projects 🚀",
    desc: "Some projects I've worked on.",
    link: "/data-user",
  },
  {
    title: "Skills 🛠️",
    desc: "Technologies I use.",
    link: "/skills",
  },
  {
    title: "My Journey 🌱",
    desc: "Experiences and learning moments.",
    link: "/journey",
  },
  {
    title: "Achievements 🏆",
    desc: "Certifications and milestones.",
    link: "/achievements",
  },
  {
    title: "Let's Connect 💌",
    desc: "Feel free to react out.",
    link: "/contact",
  },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-[#F8F7FF] py-8 md:py-16 px-4 sm:px-8 md:px-16 lg:px-36">
      {/* Header */}
      <div className="text-center mb-8 md:mb-14">
        <h1 className="text-2xl md:text-4xl font-bold text-gray-800">
          Welcome to{" "}
          <span className="text-[#FD7979]">
            {" "}
            <br className="md:hidden" />
            My Digital Space
          </span>
        </h1>
        <p className="text-gray-600 mt-3 text-sm md:text-base">
          A cozy place where ideas, creativity, and technology come together
          💻🌱
        </p>
      </div>

      {/* Card */}
      <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-4 md:gap-6 max-w-5xl mx-auto">
        {features.map((item, index) => (
          <Link to={item.link} key={index}>
            <div className="bg-white rounded-xl shadow-md p-4 md:p-6 text-center hover:shadow-xl hover:scale-105 transition duration-300 cursor-pointer">
              <h2 className="font-semibold text-base md:text-lg">
                {item.title}
              </h2>
              <p className="text-gray-500 text-xs md:text-sm mt-2">
                {item.desc}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
