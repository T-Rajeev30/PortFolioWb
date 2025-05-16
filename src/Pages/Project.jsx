import React, { useEffect, useState } from "react";
import { ThumbsUp, Github } from "lucide-react";

const projects = [
  {
    name: "Weather App",
    image: "/public/bg.png",
    description:
      "A weather forecasting application using OpenWeatherMap API with real-time data and city-based search.",
    github: "https://github.com/example/weather-app",
    languages: {
      JavaScript: 60,
      HTML: 25,
      CSS: 15,
    },
  },
  {
    name: "Portfolio Website",
    image: "/public/bg.png",
    description:
      "A personal portfolio built with React and TailwindCSS to showcase projects and blogs.",
    github: "https://github.com/example/portfolio",
    languages: {
      HTML: 30,
      CSS: 30,
      JavaScript: 40,
    },
  },
  {
    name: "Chat App",
    image: "/public/bg.png",
    description:
      "A real-time chat application using Socket.IO and Node.js with private and group chat support.",
    github: "https://github.com/example/chat-app",
    languages: {
      JavaScript: 80,
      HTML: 10,
      CSS: 10,
    },
  },
];

const defaultImage =
  "https://via.placeholder.com/600x300?text=👋+Click+a+Section!";

export default function Project() {
  const [selectedProject, setSelectedProject] = useState(null);
  const [likes, setLikes] = useState({});

  useEffect(() => {
    const styleSheet = `
      .horizontal-scroll::-webkit-scrollbar {
        height: 8px;
      }
      .horizontal-scroll::-webkit-scrollbar-track {
        background: transparent;
      }
      .horizontal-scroll::-webkit-scrollbar-thumb {
        background-color: #069fb8;
        border-radius: 4px;
      }
      .scroll-item:hover {
        transform: scale(1.05);
      }
    `;
    const styleTag = document.createElement("style");
    styleTag.innerHTML = styleSheet;
    document.head.appendChild(styleTag);
    return () => {
      document.head.removeChild(styleTag);
    };
  }, []);

  const handleUpvote = () => {
    if (selectedProject) {
      setLikes((prev) => ({
        ...prev,
        [selectedProject.name]: (prev[selectedProject.name] || 0) + 1,
      }));
    }
  };

  const getLangColor = (lang) => {
    const colors = {
      JavaScript: "#f1e05a",
      HTML: "#e34c26",
      CSS: "#563d7c",
      Python: "#3572A5",
      TypeScript: "#2b7489",
    };
    return colors[lang] || "#888";
  };

  return (
    <section className="relative bg-[#0d1117]">
      {/* Heading */}
      <section className="text-center py-10 px-4">
        <h2 className="text-3xl font-bold text-[#f0f6fc] mb-2">Projects</h2>
        <p className="text-2xl leading-relaxed text-[#58a6ff]">
          From concepts to code — turning ideas into real-world applications
        </p>
      </section>

      {/* Horizontal Scroll */}
      <div className="horizontal-scroll px-4" style={styles.scrollContainer}>
        {projects.map((project, idx) => (
          <section
            key={idx}
            className="scroll-item h-fit w-[20%]"
            style={styles.scrollItem}
            onClick={() => setSelectedProject(project)}
          >
            {project.name}
          </section>
        ))}
      </div>

      {/* Showcase Section */}
      <div className="w-full flex gap-4 h-fit flex-wrap lg:flex-nowrap px-4 py-4">
        {/* Left (Mini Window) */}
        <div className="relative w-full lg:w-[60%] aspect-video rounded-xl overflow-hidden border border-[#30363d] shadow-lg bg-[#161b22] flex flex-col">
          {/* Top Bar */}
          <div className="flex items-center gap-2 px-3 py-1.5 bg-[#21262d] rounded-t-xl">
            <div className="w-3 h-3 rounded-full bg-[#ff5f56]"></div>
            <div className="w-3 h-3 rounded-full bg-[#ffbd2e]"></div>
            <div className="w-3 h-3 rounded-full bg-[#27c93f]"></div>
          </div>

          {/* Image Background */}
          <div className="flex-1 bg-[#0d1117] relative">
            <img
              src={selectedProject ? selectedProject.image : defaultImage}
              alt="Project"
              className="w-full h-full object-cover"
            />

            {/* Language Bar */}
            {selectedProject && (
              <div className="absolute bottom-0 left-0 w-full h-6 flex text-xs font-bold z-10">
                {Object.entries(selectedProject.languages).map(
                  ([lang, percent], idx) => (
                    <div
                      key={idx}
                      style={{
                        width: `${percent}%`,
                        backgroundColor: getLangColor(lang),
                        color: "#000",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                      }}
                      title={`${lang}: ${percent}%`}
                    >
                      {lang}
                    </div>
                  )
                )}
              </div>
            )}
          </div>
        </div>

        {/* Right Description */}
        <div className="rightDescription w-full lg:w-[35%] text-[#58a6ff] space-y-4 p-4">
          <h1 className="text-2xl font-bold text-[#f0f6fc]">
            {selectedProject ? selectedProject.name : "Select a project"}
          </h1>
          <p className="text-sm leading-relaxed">
            {selectedProject
              ? selectedProject.description
              : "Click on a project from the top scroll list to view its details here."}
          </p>

          {/* Language Breakdown Bar (Right Section) */}
          {selectedProject?.languages && (
            <div className="mt-4">
              <h2 className="text-sm font-semibold text-[#f0f6fc] mb-1">
                Languages:
              </h2>
              <div className="flex h-3 w-full rounded overflow-hidden border border-[#30363d]">
                {Object.entries(selectedProject.languages).map(
                  ([lang, percent], idx) => (
                    <div
                      key={idx}
                      className="h-full"
                      style={{
                        width: `${percent}%`,
                        backgroundColor: getLangColor(lang),
                      }}
                      title={`${lang}: ${percent}%`}
                    />
                  )
                )}
              </div>
              <div className="flex flex-wrap gap-2 mt-2 text-xs text-[#d0d3bc]">
                {Object.entries(selectedProject.languages).map(
                  ([lang, percent], idx) => (
                    <div key={idx} className="flex items-center gap-1">
                      <span
                        className="w-3 h-3 inline-block rounded-full"
                        style={{ backgroundColor: getLangColor(lang) }}
                      ></span>
                      <span>
                        {lang} ({percent}%)
                      </span>
                    </div>
                  )
                )}
              </div>
            </div>
          )}

          {selectedProject && (
            <div className="flex items-center gap-4 mt-4">
              <a
                href={selectedProject.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 text-[#23b9b2] hover:underline"
              >
                <Github size={20} /> GitHub Repo
              </a>
              <button
                onClick={handleUpvote}
                className="flex items-center gap-1 bg-[#069fb8] hover:bg-[#057b94] text-white px-3 py-1 rounded"
              >
                <ThumbsUp size={16} /> {likes[selectedProject.name] || 0}
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

const styles = {
  scrollContainer: {
    display: "flex",
    overflowX: "auto",
    gap: "1rem",
    padding: "0.5rem 0",
    scrollbarWidth: "thin",
    scrollbarColor: "#d0d3bc transparent",
  },
  scrollItem: {
    flex: "0 0 auto",
    backgroundColor: "#d0d3bc",
    color: "#b53919",
    padding: "0.5rem 1rem",
    borderRadius: "12px",
    userSelect: "none",
    cursor: "pointer",
    transition: "transform 0.2s ease",
  },
};
