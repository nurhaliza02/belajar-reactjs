import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Home from "./pages/home";
import { Route, Routes } from "react-router-dom";
import ScrollLinked from "./pages/motion";
import About from "./pages/about";
import SharedLayoutAnimation from "./pages/projects";
import NameInput from "./pages/useState";
import DataUser from "./pages/data-user";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/projects" element={<SharedLayoutAnimation />} />
      <Route path="/motion" element={<ScrollLinked />} />
      <Route path="/useState" element={<NameInput />} />
      <Route path="/data-user" element={<DataUser />} />
    </Routes>
  );
}
