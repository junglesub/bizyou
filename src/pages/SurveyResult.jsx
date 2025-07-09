import React, { useState, useMemo } from "react";
import Header from "../components/Header";
import { Link } from "react-router";
import {
  CheckCircleIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/solid";

// 부스 데이터 예시
const boothList = [
  { name: "포스코", tags: ["철강", "글로벌"] },
  { name: "포스코케미칼", tags: ["첨단소재", "이차전지"] },
  { name: "현대제철", tags: ["친환경 철강"] },
  { name: "에너지솔루션㈜", tags: ["수소", "에너지"] },
  { name: "나노소재랩", tags: ["스타트업", "신소재"] },
  { name: "RIST", tags: ["연구기관", "R&D"] },
  { name: "에코테크", tags: ["친환경", "신기술"] },
];

const tagColors = [
  "bg-blue-100 text-blue-700",
  "bg-green-100 text-green-700",
  "bg-yellow-100 text-yellow-700",
  "bg-purple-100 text-purple-700",
  "bg-pink-100 text-pink-700",
  "bg-orange-100 text-orange-700",
  "bg-gray-100 text-gray-700",
];

function SurveyResult() {
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState([]);
  const [toast, setToast] = useState("");

  // 실시간 필터링
  const filtered = useMemo(() => {
    if (!search) return boothList;
    return boothList.filter(
      (b) => b.name.includes(search) || b.tags.some((t) => t.includes(search))
    );
  }, [search]);

  const toggleSelect = (name) => {
    setSelected((sel) =>
      sel.includes(name) ? sel.filter((n) => n !== name) : [...sel, name]
    );
  };

  const handleComplete = () => {
    setToast("✅ 선택이 완료되었어요! 앞으로 더 정밀하게 추천해드릴게요.");
    setTimeout(() => setToast(""), 2000);
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-50">
      <Header />
      <div className="w-full max-w-md mx-auto flex flex-col gap-2 py-8 px-2">
        {/* 결과 카드 */}
        <div className="bg-white rounded-2xl shadow  p-8 w-full flex flex-col items-center flex-grow">
          <h2 className="text-2xl font-bold mb-2 text-blue-700">추천 결과</h2>
          <div className="mb-4 text-center text-lg">
            당신의 유형:{" "}
            <span className="font-semibold text-green-600">혁신 지향형</span>
          </div>
          <div className="text-gray-700 text-center">
            추천 부스: 포스코케미칼, 포항산업과학연구원(RIST), 나노소재 스타트업
            등
          </div>
        </div>

        {/* 부스 직접 선택 안내 */}
        <div className="bg-white rounded-2xl shadow p-5">
          <div className="mb-2 text-base font-bold text-gray-800 flex items-center gap-2">
            <span className="text-xl">🎯</span> 직접 가고 싶은 부스를
            골라보세요!
          </div>
          <div className="mb-4 text-gray-500 text-sm">
            좋아하는 부스를 알려주시면, 더 나은 제안을 드릴 수 있어요.
            <br />
            (선택은 자유이며, 건너뛸 수도 있어요)
          </div>
          {/* 검색바 */}
          <div className="relative mb-4">
            <MagnifyingGlassIcon className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              className="w-full pl-10 pr-3 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-200 focus:outline-none"
              placeholder="🔍 부스명 또는 기업명을 입력하세요"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          {/* 부스 리스트 */}
          <div className="max-h-64 overflow-y-auto divide-y divide-gray-100">
            {filtered.map((b, i) => {
              const isChecked = selected.includes(b.name);
              return (
                <button
                  key={b.name}
                  className={`w-full flex items-center justify-between py-3 px-2 transition-all ${
                    isChecked ? "bg-blue-50" : ""
                  }`}
                  onClick={() => toggleSelect(b.name)}
                >
                  <div className="flex items-center gap-2">
                    <span
                      className={`inline-flex items-center justify-center w-6 h-6 rounded-full border-2 ${
                        isChecked
                          ? "border-blue-500 bg-blue-500 text-white"
                          : "border-gray-300 bg-white text-gray-300"
                      }`}
                    >
                      {isChecked && <CheckCircleIcon className="w-5 h-5" />}
                    </span>
                    <span className="font-medium text-gray-800">{b.name}</span>
                  </div>
                  <div className="flex gap-1 flex-wrap">
                    {b.tags.map((tag, idx) => (
                      <span
                        key={tag}
                        className={`px-2 py-0.5 rounded text-xs font-semibold ${
                          tagColors[(i + idx) % tagColors.length]
                        }`}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </button>
              );
            })}
            {filtered.length === 0 && (
              <div className="text-gray-400 text-center py-6">
                검색 결과가 없습니다.
              </div>
            )}
          </div>
        </div>
        {/* 하단 고정 버튼 */}
        {/* <div className="bottom-0 left-0 w-full max-w-md mx-auto flex gap-4 px-4 pb-6 bg-gradient-to-t from-white via-white/80 to-transparent z-30">
          <button
            className="flex-1 py-3 rounded-xl bg-gray-200 text-gray-700 text-lg font-semibold hover:bg-gray-300 transition-colors"
            onClick={() => (window.location.href = "/home")}
          >
            🔄 건너뛰기
          </button>
          <button
            className="flex-1 py-3 rounded-xl bg-blue-600 text-white text-lg font-semibold hover:bg-blue-700 transition-colors disabled:bg-gray-300 disabled:text-gray-400"
            onClick={handleComplete}
            disabled={selected.length === 0}
          >
            ✔️ 선택 완료
          </button>
        </div> */}
        <Link
          to="/home"
          className="w-full py-3 rounded-xl bg-blue-600 text-white text-lg font-semibold hover:bg-blue-700 transition-colors text-center block"
        >
          나에게 맞는 기업 추천받기
        </Link>
      </div>
      {/* 토스트 메시지 */}
      {toast && (
        <div className="fixed bottom-24 left-1/2 -translate-x-1/2 bg-green-600 text-white px-6 py-3 rounded-xl shadow-lg z-50 animate-fade-in">
          {toast}
        </div>
      )}
    </div>
  );
}

export default SurveyResult;
