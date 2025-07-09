import React, { useState } from "react";
import Header from "../components/Header";
import { RadioGroup } from "@headlessui/react";
import { CheckCircleIcon } from "@heroicons/react/24/solid";
import { useNavigate } from "react-router";

const questions = [
  // Part 1: 관심 산업군 (객관식)
  {
    type: "multi",
    title: "다음 중 관심 있는 분야를 모두 선택하세요.",
    options: [
      "철강 / 고기능 금속소재",
      "비철금속 / 경량소재",
      "스마트팩토리 / 자동화 기술",
      "수소·에너지 / 환경 기술",
      "신소재 R&D / 첨단기술",
      "지역 중소기업 / 창업 기업",
    ],
  },
  // Part 2, 3: 척도식 7문항 (3개씩 묶어서 보여줌)
  {
    type: "scales",
    questions: [
      {
        title: "나는 직접 만지고 체험할 수 있는 부스에 더 끌린다.",
        minLabel: "전혀 그렇지 않다",
        maxLabel: "매우 그렇다",
      },
      {
        title: "나는 기업 담당자와 상담하거나 대화를 나누는 걸 선호한다.",
        minLabel: "혼자 둘러보는 게 좋다",
        maxLabel: "사람과 소통하는 게 좋다",
      },
      {
        title: "전시에서 정보를 빠르게 훑고 핵심만 알고 싶다.",
        minLabel: "천천히 깊이 이해",
        maxLabel: "요점만 빠르게",
      },
    ],
  },
  {
    type: "scales",
    questions: [
      {
        title: "나는 기술혁신과 R&D를 적극 추진하는 기업에 끌린다.",
        minLabel: "전혀 아니다",
        maxLabel: "매우 그렇다",
      },
      {
        title: "나는 환경과 지속가능성을 고려하는 기업을 선호한다.",
        minLabel: "전혀 아니다",
        maxLabel: "매우 그렇다",
      },
      {
        title: "나는 복지와 조직문화를 중시하는 기업에 관심이 많다.",
        minLabel: "전혀 아니다",
        maxLabel: "매우 그렇다",
      },
    ],
  },
  {
    type: "scales",
    questions: [
      {
        title: "나는 글로벌 진출과 해외 진입 전략이 있는 기업을 선호한다.",
        minLabel: "전혀 아니다",
        maxLabel: "매우 그렇다",
      },
    ],
  },
];

function Survey() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState([]);
  const q = questions[step];

  // 다중 선택
  const handleMulti = (val) => {
    const prev = Array.isArray(answers[step]) ? answers[step] : [];
    let nextVal;
    if (prev.includes(val)) {
      nextVal = prev.filter((v) => v !== val);
    } else {
      nextVal = [...prev, val];
    }
    const next = [...answers];
    next[step] = nextVal;
    setAnswers(next);
  };
  // 다중 선택 다음
  const handleMultiNext = () => {
    setStep(step + 1);
  };

  // 척도형 여러개(한 페이지에 3개) 답변
  const handleScales = (idx, val) => {
    const prev = Array.isArray(answers[step])
      ? answers[step]
      : Array(q.questions.length).fill(null);
    const nextArr = [...prev];
    nextArr[idx] = val;
    const next = [...answers];
    next[step] = nextArr;
    setAnswers(next);
  };
  const handleScalesNext = () => {
    setStep(step + 1);
  };

  // 단일 선택
  const handleChoice = (val) => {
    const next = [...answers];
    next[step] = val;
    setAnswers(next);
    setTimeout(() => setStep(step + 1), 300);
  };
  const handleScale = (val) => {
    const next = [...answers];
    next[step] = val;
    setAnswers(next);
    setTimeout(() => setStep(step + 1), 300);
  };
  const handlePrev = () => setStep((s) => Math.max(0, s - 1));

  const navigate = useNavigate();
  if (step >= questions.length) {
    navigate("/survey-result");
    return null;
  }

  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-50">
      <Header />
      <div className="flex-1 flex flex-col justify-center items-center w-full px-4">
        <div className="w-full max-w-md min-h-[480px] bg-white rounded-2xl shadow-xl p-8 animate-fade-in flex flex-col justify-between">
          <div>
            <div className="mb-2 text-sm text-gray-400 text-right">
              {step + 1} / {questions.length}
            </div>
            {/* 멀티 선택 */}
            {q.type === "multi" && (
              <>
                <div className="mb-6 text-lg font-semibold text-gray-800 text-center">
                  {q.title}
                </div>
                <div className="space-y-3 mb-4">
                  {q.options.map((opt, i) => {
                    const checked =
                      Array.isArray(answers[step]) &&
                      answers[step].includes(opt);
                    return (
                      <button
                        key={opt}
                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl border text-left transition-all ${
                          checked
                            ? "bg-blue-100 border-blue-500 text-blue-700"
                            : "bg-gray-50 border-gray-200 text-gray-800"
                        } font-medium`}
                        type="button"
                        onClick={() => handleMulti(opt)}
                      >
                        {checked && (
                          <CheckCircleIcon className="w-6 h-6 text-blue-500" />
                        )}
                        {opt}
                      </button>
                    );
                  })}
                </div>
              </>
            )}
            {/* 척도형 여러개 */}
            {q.type === "scales" && (
              <>
                {q.questions.map((item, idx) => (
                  <div key={item.title} className="mb-6">
                    <div className="mb-2 text-base font-semibold text-gray-800 text-center">
                      {item.title}
                    </div>
                    <div className="flex w-full justify-between mb-2 text-xs text-gray-400">
                      <span>{item.minLabel}</span>
                      <span>{item.maxLabel}</span>
                    </div>
                    <div className="flex gap-2 w-full justify-center">
                      {[1, 2, 3, 4, 5].map((val) => (
                        <button
                          key={val}
                          className={`w-10 h-10 rounded-full border text-lg font-bold transition-all ${
                            Array.isArray(answers[step]) &&
                            answers[step][idx] === val
                              ? "bg-blue-500 text-white border-blue-500 scale-110"
                              : "bg-gray-100 border-gray-300 text-gray-700 hover:bg-blue-100"
                          }`}
                          onClick={() => handleScales(idx, val)}
                        >
                          {val}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </>
            )}
          </div>
          <div className="flex justify-between mt-8">
            <button
              className="px-4 py-2 rounded bg-gray-200 text-gray-700 font-semibold hover:bg-gray-300"
              onClick={handlePrev}
              disabled={step === 0}
            >
              이전
            </button>
            {q.type === "multi" && (
              <button
                className="px-4 py-2 rounded bg-blue-600 text-white font-semibold hover:bg-blue-700 disabled:bg-gray-300 disabled:text-gray-400"
                onClick={handleMultiNext}
                disabled={!answers[step] || answers[step].length === 0}
              >
                다음
              </button>
            )}
            {q.type === "scales" && (
              <button
                className="px-4 py-2 rounded bg-blue-600 text-white font-semibold hover:bg-blue-700 disabled:bg-gray-300 disabled:text-gray-400"
                onClick={handleScalesNext}
                disabled={
                  !(
                    Array.isArray(answers[step]) &&
                    answers[step].every((v) => !!v)
                  )
                }
              >
                다음
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Survey;
