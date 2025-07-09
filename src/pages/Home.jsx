import React, { useState, useMemo, useRef } from "react";
import TinderCard from "react-tinder-card";
import Header from "../components/Header";

const companies = [
  {
    logo: "https://logo.clearbit.com/posco.co.kr",
    name: "포스코 (POSCO)",
    description: "대한민국을 대표하는 글로벌 No.1 철강 기업.",
    reason:
      "지아님, 졸업 논문 주제인 '지속가능한 미래'에 필수적인 수소환원제철(HyREX) 기술을 직접 확인할 기회예요. 미래 커리어의 목표로 삼기에도 최고의 기업이죠.",
  },
  {
    logo: "https://logo.clearbit.com/hyundai-steel.com",
    name: "현대제철 (Hyundai Steel)",
    description: "자동차 강판과 H형강에 강점을 가진 글로벌 철강 기업.",
    reason:
      "친환경 전기로 분야의 선두주자라 지아님의 관심사와 잘 맞아요. 특히 미래차에 적용될 초고장력강과 경량화 소재는 논문에도 좋은 영감을 줄 거예요.",
  },
  {
    logo: "https://logo.clearbit.com/dongkuk.co.kr",
    name: "동국제강 (Dongkuk Steel)",
    description: "국내 최초 민간 철강회사이자 컬러강판 시장의 강자.",
    reason:
      "금속 소재가 어떻게 고부가가치 디자인 제품으로 재탄생하는지 보고 싶지 않으세요? '소재의 심미성' 파트를 논문에 추가할 아이디어를 얻을 수 있을 거예요.",
  },
  {
    logo: "https://logo.clearbit.com/seah.co.kr",
    name: "세아제강 (SeAH Steel)",
    description: "세계적인 경쟁력을 갖춘 강관 전문 제조 기업.",
    reason:
      "지아님이 관심 있는 '지속가능성'이 해상풍력 같은 신재생에너지로 구현될 때, 세아제강의 강관이 어떤 역할을 하는지 직접 확인하면 논문이 훨씬 깊어질 거예요.",
  },
  {
    logo: "https://logo.clearbit.com/poongsan.co.kr",
    name: "풍산 (Poongsan)",
    description: "신동(구리 및 구리합금)과 방위산업 분야의 글로벌 리더.",
    reason:
      "신소재공학도로서 전기차, 반도체의 핵심인 구리 합금 기술의 끝을 볼 수 있는 곳이에요. 기초 소재의 중요성을 다시 한번 깨닫게 될 겁니다.",
  },
  {
    logo: "https://logo.clearbit.com/tccsteel.com",
    name: "TCC스틸 (TCC Steel)",
    description: "이차전지 원통형 캔 소재인 니켈도금강판 분야의 숨은 강자.",
    reason:
      "지아님이 목표하는 이차전지 분야의 '알짜' 기업이에요. 배터리의 안전성을 책임지는 핵심 소재 기술을 파악하고 면접에서 어필할 포인트를 찾아보세요.",
  },
  {
    logo: "https://logo.clearbit.com/ecopro.co.kr",
    name: "에코프로 (Ecopro)",
    description:
      "세계 1위 하이니켈 양극재 기술력을 보유한 이차전지 소재 선도 기업.",
    reason:
      "이차전지 소재 분야 취업을 꿈꾼다면 여긴 성지나 다름없죠. 세계 1위 양극재 기술이 어떤 건지 직접 보고, 미래 엔지니어로서의 꿈을 키워보세요!",
  },
  {
    logo: "https://logo.clearbit.com/doosanenerbility.com",
    name: "두산에너빌리티 (Doosan Enerbility)",
    description: "원자력, 화력, 가스터빈 등 에너지 플랜트 분야의 글로벌 리더.",
    reason:
      "SMR, 수소터빈 같은 차세대 에너지 기술에 필요한 극한 환경 소재들을 볼 수 있어요. 지아님의 전공이 미래 에너지 산업에 어떻게 기여할지 그려볼 수 있는 곳이죠.",
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
            <div className="top-0 left-0 w-full h-full flex flex-col items-center justify-center z-10 mt-3 ">
              {companies.map((company, index) => (
                <TinderCard
                  ref={childRefs[index]}
                  className="absolute w-full h-[80vh] max-w-md mx-auto "
                  key={company.name}
                  onSwipe={(dir) => swiped(dir, company.name, index)}
                  onCardLeftScreen={() => outOfFrame(company.name, index)}
                  preventSwipe={["up", "down"]}
                >
                  <div className="w-full h-full bg-white rounded-3xl border border-zinc-200 flex flex-col items-center justify-center p-6 mb-10">
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
