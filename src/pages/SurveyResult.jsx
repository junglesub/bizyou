import React from "react";
import Header from "../components/Header";
import { Link } from "react-router";

function SurveyResult() {
  // 실제 추천 결과/유형/부스 등은 props, location, context 등으로 전달 필요
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
      <Header />
      <div className="bg-white shadow-xl p-8 w-full flex flex-col items-center flex-grow">
        <h2 className="text-2xl font-bold mb-2 text-blue-700">추천 결과</h2>
        <div className="mb-4 text-center text-lg">
          당신의 유형:{" "}
          <span className="font-semibold text-green-600">혁신 지향형</span>
        </div>
        <div className="mb-6 text-gray-700 text-center">
          추천 부스: 포스코케미칼, 포항산업과학연구원(RIST), 나노소재 스타트업
          등
        </div>
        <Link
          to="/home"
          className="w-full py-3 rounded-xl bg-blue-600 text-white text-lg font-semibold hover:bg-blue-700 transition-colors text-center block"
        >
          나에게 맞는 기업 추천받기
        </Link>
      </div>
    </div>
  );
}

export default SurveyResult;
