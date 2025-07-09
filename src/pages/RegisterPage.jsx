import React, { useState } from "react";
import Header from "../components/Header";
import { motion } from "framer-motion";

const ROLES = ["연구원", "구매담당", "학생", "경영진", "영업/마케팅", "기타"];
const INDUSTRIES = [
  "철강",
  "비철금속",
  "스마트팩토리",
  "수소/에너지",
  "R&D/신소재",
];

function RegisterPage() {
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [role, setRole] = useState("");
  const [industries, setIndustries] = useState([]);
  const [agree, setAgree] = useState(false);
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleIndustryToggle = (item) => {
    setIndustries((prev) =>
      prev.includes(item) ? prev.filter((i) => i !== item) : [...prev, item]
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) {
      setError("이름을 입력해주세요.");
      return;
    }
    setError("");
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      // TODO: 실제 추천/설문 페이지로 이동
      window.location.href = "/survey";
    }, 800);
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Header />
      <motion.form
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        onSubmit={handleSubmit}
        className="flex-1 flex flex-col items-center justify-center px-4 pb-24"
        autoComplete="off"
      >
        <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-6 flex flex-col gap-4 animate-fade-in">
          <div className="text-xl font-bold mb-2 text-center">
            🎯 간단한 정보를 입력하고, 더 정확한 부스 추천을 받아보세요!
          </div>
          <div>
            <label className="block text-sm font-semibold mb-1">
              이름 <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-400 focus:outline-none text-lg bg-gray-50"
              placeholder="김성훈"
              value={name}
              onChange={(e) => setName(e.target.value)}
              autoComplete="off"
              maxLength={12}
            />
            {error && (
              <div className="text-xs text-red-500 mt-1 animate-pulse">
                {error}
              </div>
            )}
          </div>
          <div>
            <label className="block text-sm font-semibold mb-1">
              회사 또는 소속
            </label>
            <input
              type="text"
              className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-400 focus:outline-none text-lg bg-gray-50"
              placeholder="포스코"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              maxLength={20}
            />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-1">
              직군 / 역할
            </label>
            <select
              className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-400 focus:outline-none text-lg bg-gray-50"
              value={role}
              onChange={(e) => setRole(e.target.value)}
            >
              <option value="">선택</option>
              {ROLES.map((r) => (
                <option key={r} value={r}>
                  {r}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-semibold mb-1">
              관심 산업군{" "}
              <span className="text-xs text-gray-400">(다중 선택 가능)</span>
            </label>
            <div className="flex flex-wrap gap-2 mt-1">
              {INDUSTRIES.map((item) => (
                <button
                  type="button"
                  key={item}
                  className={`px-3 py-2 rounded-full border text-sm font-medium transition-all focus:outline-none focus:ring-2 focus:ring-blue-400 ${
                    industries.includes(item)
                      ? "bg-blue-600 text-white border-blue-600 shadow"
                      : "bg-gray-100 text-gray-700 border-gray-200 hover:bg-blue-50"
                  }`}
                  onClick={() => handleIndustryToggle(item)}
                >
                  {industries.includes(item) ? "✔️ " : ""}
                  {item}
                </button>
              ))}
            </div>
          </div>
          <div className="flex items-center mt-2">
            <input
              id="agree"
              type="checkbox"
              className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-400"
              checked={agree}
              onChange={(e) => setAgree(e.target.checked)}
            />
            <label
              htmlFor="agree"
              className="ml-2 text-sm text-gray-600 select-none"
            >
              행사 안내, 추천 소식 등 수신에 동의합니다
            </label>
          </div>
        </div>
        <motion.button
          type="submit"
          whileTap={{ scale: 0.97 }}
          whileHover={{ scale: name.trim() ? 1.03 : 1 }}
          className={`mt-4 bottom-0 left-0 w-full max-w-md mx-auto mb-4 py-4 rounded-xl text-white font-bold text-lg shadow-lg transition-all z-20 ${
            name.trim()
              ? "bg-blue-600 hover:bg-blue-700"
              : "bg-gray-300 cursor-not-allowed"
          }`}
          disabled={!name.trim() || submitting}
        >
          {submitting ? "처리 중..." : "🚀 계속하기 →"}
        </motion.button>
      </motion.form>
    </div>
  );
}

export default RegisterPage;
