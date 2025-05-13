import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import "remixicon/fonts/remixicon.css";
import TextPlugin from "gsap/TextPlugin";
import React, { useEffect, useRef, useState } from "react";

import {
  SiJavascript,
  SiReact,
  SiCplusplus,
  SiMongodb,
  SiDrone,
  SiGit,
} from "react-icons/si";
import { FaCoffee } from "react-icons/fa";
import devDesk from "/assemble.png";
import devAvatar from "/aboutboy.png";

const techIcons = [
  { icon: <SiJavascript />, name: "JavaScript" },
  { icon: <SiReact />, name: "React" },
  { icon: <SiCplusplus />, name: "C++" },
  { icon: <SiMongodb />, name: "MongoDB" },
  { icon: <SiDrone />, name: "Drone" },
  { icon: <SiGit />, name: "Git" },
];

function App() {
  const audioRef = useRef(null);

  let [showContent, setShowContent] = useState(false);
  useGSAP(() => {
    const tl = gsap.timeline();

    tl.to(".vi-mask-group", {
      rotate: 30,
      duration: 2,
      ease: "Power4.easeInOut",
      transformOrigin: "50% 50%",
    }).to(".vi-mask-group", {
      scale: 10,
      duration: 2,
      delay: -1.8,
      ease: "Expo.easeInOut",
      transformOrigin: "50% 50%",
      opacity: 0,
      onUpdate: function () {
        // Only run once when progress reaches 0.9
        if (this.progress() >= 0.9 && !this._ranOnce) {
          this._ranOnce = true; // custom flag to prevent repeat

          const svg = document.querySelector(".svg");
          if (svg) svg.remove();

          setShowContent(true);

          // Fade audio volume in after animation finishes
          const audio = audioRef.current;
          if (audio) {
            audio.muted = false; // unmute
            let vol = 0;
            const fade = setInterval(() => {
              if (vol < 1) {
                vol += 0.1;
                audio.volume = Math.min(vol, 1);
              } else {
                clearInterval(fade);
              }
            }, 300);
          }

          this.kill(); // kill timeline once done
        }
      },
    });
  });

  useGSAP(() => {
    if (!showContent) return;
    const main = document.querySelector(".main");

    gsap.to(".main", {
      scale: 1,
      rotate: 0,
      duration: 2,
      delay: "-1",
      ease: "Expo.expoInOut",
    });
    gsap.to(".sky", {
      scale: 1.2,
      rotate: 0,
      duration: 2,
      delay: "-.8",
      ease: "Expo.expoInOut",
    });
    gsap.to(".bg", {
      scale: 1.3,
      rotate: 0,
      duration: 2,
      delay: "-.8",
      ease: "Expo.expoInOut",
    });
    gsap.to(".character", {
      scale: 0.9,
      rotate: 0,
      x: "-50%",
      bottom: 0,
      duration: 2,
      delay: "-.8",
      ease: "Expo.expoInOut",
    });
    main?.addEventListener("mousemove", function (e) {
      const xMove = (e.clientX / window.innerWidth - 0.5) * 40;
      // const yMove = (e.clientY / window.innerWidth - 0.5) * 40;

      gsap.to(".main .text", {
        x: `${xMove * 0.4}%`,
      });
      gsap.to(".sky", {
        x: `${xMove * 0.2}%`,
      });
      gsap.to(".bg", {
        x: xMove,
      });
    });

    gsap.from(".aboutsection section", {
      scrollTrigger: {
        trigger: ".aboutsection",
        start: "top 80%",
        toggleActions: "play none none none",
      },
      opacity: 0,
      y: 50,
      duration: 1,
      stagger: 0.3,
      ease: "power3.out",
    });
    gsap.to(".about-avatar", {
      y: "-5%",
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
      duration: 2,
    });
    gsap.from(".about-intro-heading", {
      text: "Hi, I'm Rajeev Tiwari",
      duration: 2,
      ease: "none",
    });
    gsap.from(".tech-icon", {
      opacity: 0,
      scale: 0.5,
      stagger: 0.2,
      duration: 0.6,
      ease: "back.out(1.7)",
    });
    gsap.to(".tropical-city-bg", {
      scrollTrigger: {
        trigger: ".tropical-city-bg",
        start: "top bottom",
        scrub: true,
      },
      y: "-30%",
    });
  }, [showContent]);
  return (
    <>
      <div className="svg fixed top-0 left-0 z-[100] w-full h-screen overflow-hidden bg-black">
        <svg
          viewBox="0 0 800 600"
          preserveAspectRatio="xMidYMid slice"
          className="w-full h-full"
        >
          <defs>
            <mask id="viMask">
              <rect width="100%" height="100%" fill="black" />
              <g className="vi-mask-group">
                <text
                  x="50%"
                  y="50%"
                  fontSize="250"
                  textAnchor="middle"
                  fill="white"
                  dominantBaseline="middle"
                  fontFamily="Arial Black"
                >
                  XI
                </text>
              </g>
            </mask>
          </defs>
          <image
            href="/bg.png" // Corrected path
            x="0"
            y="0"
            width="800"
            height="600"
            preserveAspectRatio="xMidYMid slice"
            mask="url(#viMask)"
          />
        </svg>
      </div>
      {showContent && (
        <div className="main w-full rotate-[-10deg] scale-[1.7] bg-black">
          <div className="landing w-full h-screen bg-black">
            <div className="navbar absolute top-0 left-0 z-[10] w-full py-10 px-10">
              <div className="logo flex gap-7">
                <div className="lines flex flex-col gap-[5px]">
                  <div className="line w-10 h-1.5 bg-white"></div>
                  <div className="line w-8 h-1.5 bg-white"></div>
                  <div className="line w-5 h-1.5 bg-white"></div>
                </div>
                <h3 className="text-3xl -mt-[8px] leading-none text-white">
                  Rockstar
                </h3>
              </div>
            </div>
            <div className="imagesdiv relative overflow-hidden w-full h-screen">
              <img
                className="absolute sky scale-[1.5] rotate-[-20deg]  top-0 left-0 w-full h-full object-cover"
                src="/sky.png"
                alt=""
              />
              <img
                className="absolute bg scale-[1.8] rotate-[-3deg] top-0 left-0 w-full h-full object-cover"
                src="/bg.png"
                alt=""
              />
              <div className="text text-white flex flex-col gap-1 absolute top-20 left-[60%] -translate-x-1/2 scale-[1.5] rotate-[-7deg]">
                <h1 className="text-[7rem] leading-none -ml-40">rajeev</h1>
                <h1 className="text-[8.5rem] leading-none ml-52">tiwari</h1>
              </div>
              <img
                className=" absolute -bottom-[-150%] character top-[19%]   left-1/2 -translate-x-1/2  scale-[3] rotate-[-30] "
                src="/boy.png"
                alt=""
              />
            </div>
            <div className="btmbar text-white absolute  bottom-0 left-0 w-full py-10 px-8 bg-gradient-to-t from-black to-transparent z-50">
              <div className="flex gap-4 items-center">
                <i className="text-4xl ri-arrow-down-line"></i>
                <h3 className="text-xl font-[Helvetica_Now_Display]">
                  Scroll Down
                </h3>
              </div>
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex gap-10">
                <h2 className="text-xl">
                  Github <i className="ri-github-fill"></i>
                </h2>
                <h2 className="text-xl">
                  LinkedIn <i className="ri-linkedin-box-fill"></i>
                </h2>
                <h2 className="text-xl">
                  Instagram <i className="ri-instagram-fill"></i>
                </h2>
              </div>
            </div>
            <div className="w-full aboutsection  bg-black text-[#d0d3bc]  ">
              {/* [1] Section Heading */}
              <section className="text-center py-10 px-4">
                <h2 className="text-5xl font-bold text-[#e39847] mb-2">
                  About Me
                </h2>
                <p className="text-lg text-[#23b9b2]">
                  From a curious learner to a problem-solver in the world of
                  tech.
                </p>
              </section>

              {/* [2] Top Content Row */}
              <section className="flex flex-col md:flex-row items-center justify-center gap-6 px-6 py-4">
                {/* A: Avatar */}
                <div>
                  <img
                    src={devAvatar}
                    alt="Developer Avatar"
                    className="w-48 md:w-64  shadow-[0_4px_30px_rgba(0,0,0,0.4)]"
                  />
                </div>

                {/* B: About Text */}
                <div className="max-w-3xl text-center md:text-left">
                  <h3 className="text-2xl font-semibold mb-4 text-[#23b9b2]">
                    Hi, I'm Rajeev Tiwari
                  </h3>
                  <p className="leading-relaxed">
                    I'm an engineering student passionate about crafting
                    impactful solutions at the intersection of{" "}
                    <span className="text-[#e39847]">technology</span> and the
                    real world. I enjoy turning ideas into functional projects—
                    whether it's a sleek web app, autonomous drone system, or an
                    embedded prototype.
                    <br />
                    <br />
                    I’m actively exploring{" "}
                    <span className="text-[#069fb8]">Web Dev</span>,{" "}
                    <span className="text-[#3c8c4f]">Robotics</span>,{" "}
                    <span className="text-[#069fb8]">Computer Vision</span>, and{" "}
                    <span className="text-[#3c8c4f]">Embedded Systems</span>,
                    while sharpening my skills in JavaScript, C++, and DSA.
                    <br />
                    <br />I believe in learning by building — and building to
                    solve real problems.
                  </p>
                </div>
              </section>

              {/* [3] Desk Setup */}
              {/* <section className="py-10 px-6">
              <img
                src={devDesk}
                alt="Developer Desk Setup"
                className="rounded-xl w-full max-h-[500px] object-cover shadow-lg border border-[#0f6363]"
              />
            </section> */}

              {/* [4] Tech Stack Icons */}
              <section className="py-4 px-4">
                <h4 className="text-2xl font-bold text-center text-[#e39847] mb-8">
                  Tech Stack
                </h4>
                <div className="grid grid-cols-3 sm:grid-cols-6 gap-6 justify-center text-center">
                  {techIcons.map(({ icon, name }, index) => (
                    <div
                      key={index}
                      className="flex flex-col items-center text-[#d0d3bc] hover:text-[#069fb8] transition-colors duration-300"
                    >
                      <div className="text-4xl">{icon}</div>
                      <span className="text-sm mt-2">{name}</span>
                    </div>
                  ))}
                </div>
              </section>

              {/* [5] Fun Facts Comic Strip */}
              <section className="py-2 px-6">
                <div className=" rounded-xl p-6 flex flex-col sm:flex-row justify-around items-center gap-3 text-center">
                  <div className=" p-4 rounded-lg shadow-md">
                    <FaCoffee className="text-3xl mb-1 text-[#e39847]" />
                    <p>Loves Coffee</p>
                  </div>
                  <div className=" p-4 rounded-lg shadow-md">
                    <SiDrone className="text-3xl mb-1 text-[#23b9b2]" />
                    <p>Builds Drones at 2AM</p>
                  </div>
                  <div className=" p-4 rounded-lg shadow-md">
                    <span className="text-3xl mb-1">🚀</span>
                    <p>Always Launching Projects</p>
                  </div>
                </div>
              </section>

              {/* [6] Tropical City Banner */}
              <section className="relative bg-gradient-to-t from-[#0f6363] to-transparent text-center py-20 overflow-hidden">
                <div className="absolute inset-0 bg-[url('/city-bg.svg')] bg-cover bg-center opacity-10 z-0" />
                <div className="relative z-10 text-[#d0d3bc]">
                  <h3 className="text-3xl font-bold">Scroll to see Projects</h3>
                  <p className="text-lg mt-2">
                    Let’s Build Something Awesome ✨
                  </p>
                </div>
              </section>
            </div>
            <div className="project_page w-full h-full bg-[#0f6363]"></div>
          </div>
        </div>
      )}
    </>
  );
}

export default App;
