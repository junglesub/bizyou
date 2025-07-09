import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import Typed from "typed.js";
// import Lottie from "lottie-react";
import AOS from "aos";
import "aos/dist/aos.css";

function LandPage() {
  const typedRef = useRef();
  useEffect(() => {
    AOS.init({ duration: 700, once: true });
    const typed = new Typed(typedRef.current, {
      strings: [
        "제12회 국제 철강 및 비철금속 산업전",
        "미래 소재와 기술의 최전선",
        "나에게 맞는 부스를 추천받으세요!",
      ],
      typeSpeed: 45,
      backSpeed: 25,
      backDelay: 1200,
      loop: true,
      showCursor: true,
    });
    return () => typed.destroy();
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-[#23272f] to-[#3a4256] text-white overflow-x-hidden">
      <div className="flex flex-col items-center w-full max-w-xl mx-auto px-4 py-12 gap-8">
        {/* 배경 이미지 + 로고 */}
        <div className="relative w-full flex flex-col items-center justify-center mb-6">
          {/* SVG 배경 */}
          {/* <div className="absolute inset-0 w-full h-full -z-10 opacity-80 pointer-events-none">
            <img
              src={"./pohang.svg"}
              alt="포항 배경"
              className="w-full h-full object-cover"
            />
          </div> */}
          <motion.img
            src="/pohang.svg"
            alt="행사 로고"
            className="w-[300px] h-28 mb-2 drop-shadow-xl"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: [0.8, 1], opacity: 1 }}
            transition={{ duration: 1.2, type: "spring" }}
          />
        </div>
        {/* 헤딩 타이핑 효과 */}
        <motion.h1
          className="text-2xl md:text-3xl font-bold text-center mb-2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          <span ref={typedRef} />
        </motion.h1>
        <motion.div
          className="text-lg text-center text-gray-200 mb-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.8 }}
        >
          미래 소재와 기술의 최전선, <br />
          나에게 맞는 부스를 추천받으세요.
        </motion.div>
        {/* 행사 정보 */}
        <div
          data-aos="fade-up"
          className="bg-white/10 rounded-xl p-5 w-full text-center mb-4"
        >
          <div className="text-lg font-semibold mb-1">
            제12회 국제 철강 및 비철금속 산업전
          </div>
          <div className="text-sm mb-1">
            2025.09.10 ~ 2025.09.13 | 포항 EXPO 전시장
          </div>
          <div className="text-sm text-gray-300">
            최신 철강 기술, 친환경 에너지, 스마트팩토리, 미래 소재까지
            <br />
            지금, 산업의 최전선을 직접 체험해보세요.
          </div>
        </div>
        {/* CTA 버튼 */}
        <motion.button
          whileHover={{ scale: 1.05, boxShadow: "0 0 16px #60a5fa" }}
          whileTap={{ scale: 0.96 }}
          className="mt-6 w-full py-4 rounded-xl bg-gradient-to-r from-blue-500 to-blue-700 text-white text-xl font-bold shadow-lg transition-all flex flex-col items-center gap-1"
          onClick={() => (window.location.href = "/survey")}
        >
          🎯 나에게 맞는 부스 찾기 시작하기
          <span className="text-sm font-normal text-blue-100">
            3분이면 끝나는 부스 추천 테스트
          </span>
        </motion.button>
        {/* 스크롤 다운 유도 */}
        <motion.div
          className="mt-10 flex flex-col items-center"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2, duration: 0.8 }}
        >
          <span className="animate-bounce text-3xl">↓</span>
          <span className="text-xs text-gray-300 mt-1">아래로 스크롤</span>
        </motion.div>
      </div>
    </div>
  );
}

export default LandPage;
