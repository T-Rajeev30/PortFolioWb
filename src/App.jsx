import React, { useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

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
            <div className="imagesdiv relative w-full h-screen">
              <img
                className="absolute top-0 left-0 w-full h-full object-cover"
                src="/public/sky.png"
                alt=""
              />
              <img
                className="absolute top-0 left-0 w-full h-full object-cover"
                src="/public/bg.png"
                alt=""
              />
              <img
                className=" absolute  character bottom-[6%] left-1/2 -translate-x-1/2  scale-[1.2] "
                src="/boy.png"
                alt=""
              />
            </div>
          </div>
        </div>
      )}
      ;
    </>
  );
}

export default App;
