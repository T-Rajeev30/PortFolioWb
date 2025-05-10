import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import "remixicon/fonts/remixicon.css";
import React, { useEffect, useRef, useState } from "react";

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

  useEffect(() => {
    const audio = audioRef.current;

    const tryPlayAudio = () => {
      if (!audio) return;

      audio.muted = true;
      audio.volume = 0;

      audio
        .play()
        .then(() => {
          console.log("Autoplay successful");

          setTimeout(() => {
            audio.muted = false;
            let vol = 0;
            const fade = setInterval(() => {
              if (vol < 1) {
                vol += 0.1;
                audio.volume = Math.min(vol, 1);
              } else {
                clearInterval(fade);
              }
            }, 300);
          }, 4000); // delay to match animation
        })
        .catch((err) => {
          console.warn("Autoplay blocked. Waiting for user interaction.");

          const resumeAudio = () => {
            audio.play().then(() => {
              console.log("Playback resumed after interaction");
              audio.muted = false;
              audio.volume = 1;
            });
            document.removeEventListener("click", resumeAudio);
          };

          document.addEventListener("click", resumeAudio);
        });
    };

    tryPlayAudio();
  }, []);

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
  }, [showContent]);
  return (
    <>
      <audio
        ref={audioRef}
        src="/videoplayback.m4a"
        autoPlay
        playsInline
        preload="auto"
      />
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
            <div className="btmbar text-white absolute bottom-0 left-0 w-full py-10 px-8 bg-gradient-to-t from-black to-transparent">
              <div className="flex gap-4 items-center">
                <i className="text-4xl ri-arrow-down-line"></i>
                <h3 className="text-xl  font-[Helvetica_Now_Display]">
                  Scroll Down
                </h3>
              </div>
              <div className="absolute  top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex gap-10  ">
                <h2 className="text-xl">
                  Github <i className="ri-github-fill"></i>
                </h2>
                <h2 className="text-xl">
                  Linkdin <i className="ri-linkedin-box-fill"></i>
                </h2>
                <h2 className="text-xl">
                  Instagram<i className="ri-instagram-fill"></i>
                </h2>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default App;
