import React from "react";

function PosterPage() {
  return (
    <div
      className="w-screen h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-700 via-blue-400 to-indigo-600 relative overflow-hidden"
      style={{ minHeight: "100dvh" }}
    >
      {/* 배경 애니메이션 */}
      <div className="absolute inset-0 pointer-events-none z-0 animate-pulse">
        <svg
          width="100%"
          height="100%"
          className="absolute inset-0"
          style={{ opacity: 0.12 }}
        >
          <defs>
            <radialGradient id="g1" cx="50%" cy="50%" r="80%">
              <stop offset="0%" stopColor="#fff" stopOpacity="0.7" />
              <stop offset="100%" stopColor="#2563eb" stopOpacity="0" />
            </radialGradient>
          </defs>
          <circle cx="60%" cy="40%" r="400" fill="url(#g1)" />
          <circle cx="20%" cy="80%" r="250" fill="url(#g1)" />
        </svg>
      </div>

      {/* 프레이즈 */}
      <h1 className="z-10 text-white text-4xl md:text-6xl font-extrabold mb-10 drop-shadow-lg animate-bounce">
        나에게 맞는 부스 찾기
      </h1>

      {/* QR 코드 */}
      <div className="z-10 bg-white rounded-3xl shadow-2xl p-6 flex flex-col items-center">
        <img
          src={"/qr.png"}
          alt="QR 코드"
          className="w-56 h-56 md:w-72 md:h-72 object-contain mb-4"
        />
        <span className="text-lg text-gray-700 font-semibold mt-2">
          QR 코드를 스캔하세요
        </span>
      </div>

      {/* 하단 안내 */}
      <div className="absolute bottom-8 left-0 w-full flex justify-center z-10">
        <span className="text-white/80 text-base md:text-lg animate-fade-in animate-repeat-infinite animate-duration-3000">
          스캔 후 나만의 추천을 받아보세요!
        </span>
      </div>
    </div>
  );
}

export default PosterPage;
