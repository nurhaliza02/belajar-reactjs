import { motion, useScroll } from "framer-motion";

export default function About() {
  const { scrollYProgress } = useScroll();

  return (
    <div className="bg-[#F8F7FF] min-h-screen">
      
      {/* Scroll Progress Indicator */}
      <motion.div
        style={{
          scaleX: scrollYProgress,
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          height: 6,
          originX: 0,
          backgroundColor: "#D25353",
        }}
      />

      <Content />
    </div>
  );
}

/* ===== CONTENT ===== */

function Content() {
  return (
    <article className="max-w-2xl mx-auto px-6 py-28 flex flex-col gap-6 text-grey-600">

      <h1 className="text-4xl font-bold text-[#FD7979]">
        About Me 🌷
      </h1>

      <p>
        Hello! I'm someone who enjoys exploring the world of technology and 
        creativity. I have a strong interest in designing and building digital 
        experiences that are both functional and visually appealing.
      </p>

      <p>
        Currently, I am studying <span className="font-medium">Management Information Systems</span>, 
        where I learn about how technology can help organizations manage data, 
        systems, and processes more effectively.
      </p>

      <h2 className="text-2xl font-semibold mt-6 text-[#FF8FA3]">
        My Interests
      </h2>

      <p>
        I enjoy learning about web development, user interface design, and 
        creating digital projects. Combining technology with creativity is 
        something that excites me the most.
      </p>

      <p>
        Besides coding, I also enjoy exploring design ideas, experimenting with 
        layouts, colors, and creating simple but aesthetic user interfaces.
      </p>

      <h2 className="text-2xl font-semibold mt-6 text-[#FF8FA3]">
        My Learning Journey
      </h2>

      <p>
        My journey in technology started from curiosity about how websites and 
        systems work. Over time, I began learning programming, building small 
        projects, and understanding how systems are designed and developed.
      </p>

      <p>
        Every project I work on helps me improve my skills, not only technically 
        but also creatively. I believe learning is a continuous process, and 
        every experience helps shape who we become.
      </p>

      <h2 className="text-2xl font-semibold mt-6 text-[#FF8FA3]">
        Looking Forward
      </h2>

      <p>
        In the future, I hope to continue growing in the field of technology and 
        design, creating meaningful digital experiences, and collaborating with 
        others to build innovative solutions.
      </p>

      <p>
        Thank you for visiting my personal space on the internet 💌
      </p>

    </article>
  );
}