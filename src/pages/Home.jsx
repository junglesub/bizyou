import React, { useState, useMemo, useRef } from "react";
import TinderCard from "react-tinder-card";
import Header from "../components/Header";

const companies = [
  {
    logo: "https://logo.clearbit.com/google.com",
    name: "Google",
    description: "글로벌 IT 기업, 검색엔진 및 다양한 서비스를 제공.",
    reason: "AI/Tech 분야에 관심이 많아 추천드려요!",
  },
  {
    logo: "https://logo.clearbit.com/naver.com",
    name: "Naver",
    description: "대한민국 대표 포털 및 IT 서비스 기업.",
    reason: "국내 IT 트렌드와 혁신을 경험할 수 있어요!",
  },
  {
    logo: "https://logo.clearbit.com/samsung.com",
    name: "Samsung",
    description: "글로벌 전자제품 및 반도체 선도 기업.",
    reason: "글로벌 무대에서 일하고 싶다면 추천!",
  },
];

function Home() {
  const [currentIndex, setCurrentIndex] = useState(companies.length - 1);
  const [showMatch, setShowMatch] = useState(false);
  const [lastDirection, setLastDirection] = useState();
  const currentIndexRef = useRef(currentIndex);
  const childRefs = useMemo(
    () =>
      Array(companies.length)
        .fill(0)
        .map(() => React.createRef()),
    []
  );

  const updateCurrentIndex = (val) => {
    setCurrentIndex(val);
    currentIndexRef.current = val;
  };

  const canGoBack = currentIndex < companies.length - 1;
  const canSwipe = currentIndex >= 0;

  const swiped = (direction, nameToDelete, idx) => {
    setLastDirection(direction);
    if (direction === "right") {
      if (idx === 0) {
        setShowMatch(true);
      } else {
        updateCurrentIndex(idx - 1);
      }
    } else if (direction === "left") {
      if (idx > 0) {
        updateCurrentIndex(idx - 1);
      } else {
        updateCurrentIndex(-1);
      }
    }
  };

  const outOfFrame = (name, idx) => {
    // 카드가 화면을 벗어났을 때 복원 방지
    if (currentIndexRef.current >= idx && childRefs[idx].current) {
      childRefs[idx].current.restoreCard();
    }
  };

  const swipe = async (dir) => {
    if (canSwipe && currentIndex < companies.length) {
      await childRefs[currentIndex].current.swipe(dir);
    }
  };

  const goBack = async () => {
    if (!canGoBack) return;
    const newIndex = currentIndex + 1;
    updateCurrentIndex(newIndex);
    await childRefs[newIndex].current.restoreCard();
  };

  return (
    <div className="relative min-h-screen bg-gray-50 flex flex-col h-screen">
      {/* <Header /> */}
      <main className="px-0 py-0 relative h-full">
        <div className="flex flex-col justify-between h-full">
          {!showMatch && (
            <div className="top-0 left-0 w-full h-full flex flex-col items-center justify-center z-10 mt-3">
              {companies.map((company, index) => (
                <TinderCard
                  ref={childRefs[index]}
                  className="absolute w-full h-[80vh] max-w-md mx-auto"
                  key={company.name}
                  onSwipe={(dir) => swiped(dir, company.name, index)}
                  onCardLeftScreen={() => outOfFrame(company.name, index)}
                  preventSwipe={["up", "down"]}
                >
                  <div className="w-full h-full bg-white rounded-3xl shadow-2xl flex flex-col items-center justify-center p-6 mb-10">
                    <img
                      src={company.logo}
                      alt={company.name}
                      className="w-32 h-32 rounded-full object-contain mb-6 border-2 border-gray-200"
                    />
                    <h2 className="text-3xl font-bold mb-3 text-center">
                      {company.name}
                    </h2>
                    <p className="text-gray-600 mb-6 text-center text-lg">
                      {company.description}
                    </p>
                    <div className="bg-blue-50 text-blue-700 px-5 py-3 rounded-xl mb-8 text-center text-base font-medium">
                      {company.reason}
                    </div>
                  </div>
                </TinderCard>
              ))}
            </div>
          )}
          {/* 버튼은 여전히 하단에 고정, 클릭 시 스와이프 트리거 */}
          {!showMatch && (
            <div className="bottom-0 left-0 w-full flex gap-6 px-6 pb-8 pt-4 bg-gradient-to-t from-white via-white/80 to-transparent z-20">
              <button
                className="flex-1 py-4 rounded-2xl bg-gray-200 text-gray-700 text-xl font-bold shadow hover:bg-gray-300 transition-colors"
                onClick={() => swipe("left")}
                disabled={!canSwipe}
              >
                Skip
              </button>
              <button
                className="flex-1 py-4 rounded-2xl bg-green-500 text-white text-xl font-bold shadow hover:bg-green-600 transition-colors"
                onClick={() => swipe("right")}
                disabled={!canSwipe}
              >
                Like
              </button>
            </div>
          )}
        </div>
        {showMatch && (
          <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 animate-fade-in">
            <div className="bg-white rounded-3xl shadow-2xl p-8 max-w-xs w-full flex flex-col items-center">
              <img
                src={companies[0].logo}
                alt={companies[0].name}
                className="w-24 h-24 rounded-full object-contain mb-4 border-2 border-green-400"
              />
              <h2 className="text-2xl font-bold mb-2 text-green-600">
                매칭 성공!
              </h2>
              <p className="text-gray-700 mb-4 text-center">
                {companies[0].name}와(과) 매칭되었습니다.
              </p>
              <button
                className="w-full py-3 rounded-xl bg-blue-600 text-white text-lg font-semibold hover:bg-blue-700 transition-colors mt-2"
                onClick={() => setShowMatch(false)}
              >
                대화 시작하기
              </button>
            </div>
          </div>
        )}
        {currentIndex < 0 && !showMatch && (
          <div className="text-center text-xl text-gray-500 w-full h-full flex items-center justify-center">
            더 이상 추천 기업이 없습니다.
          </div>
        )}
      </main>
    </div>
  );
}

export default Home;
