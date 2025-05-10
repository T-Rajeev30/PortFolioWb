import React, { useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import "remixicon/fonts/remixicon.css";
function App() {
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
        if (this.progress() >= 0.9) {
          document.querySelector(".svg").remove();
          setShowContent(true);
          this.kill();
        }
      },
    });
  });

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
                  30
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
        <div className="main w-full  bg-black">
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
            <div></div>
            <div className="imagesdiv relative overflow-hidden w-full h-screen">
              <img
                className="absolute top-0 left-0 w-full h-full object-cover"
                src="/sky.png"
                alt=""
              />
              <img
                className="absolute top-0 left-0 w-full h-full object-cover"
                src="/bg.png"
                alt=""
              />
              <img
                className=" absolute  character top-[19%]   left-1/2 -translate-x-1/2  scale-[0.9] "
                src="/boy.png"
                alt=""
              />
            </div>
            <div className="btmbar text-white absolute bottom-0 left-0 w-full py-10 px-8 bg-gradient-to-t from-black to-transparent">
              <div className="flex gap-4 items-center">
                <i class="text-4xl ri-arrow-down-line"></i>
                <h3 className="text-xl  font-[Helvetica_Now_Display]">
                  Scroll Down
                </h3>
              </div>
              <h1 className="absolute  top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex gap-10  ">
                <h2 className="text-xl">
                  Github <i class="ri-github-fill"></i>
                </h2>
                <h2 className="text-xl">
                  Linkdin <i class="ri-linkedin-box-fill"></i>
                </h2>
                <h2 className="text-xl">
                  Instagram<i class="ri-instagram-fill"></i>
                </h2>
              </h1>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default App;
