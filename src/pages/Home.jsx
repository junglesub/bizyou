import React, { useState, useMemo, useRef } from "react";
import TinderCard from "react-tinder-card";
import Header from "../components/Header";

const initialCompanies = [
  {
    logo: "https://logo.clearbit.com/posco.co.kr",
    name: "포스코 (POSCO)",
    description: "대한민국을 대표하는 글로벌 No.1 철강 기업.",
    reason:
      "김 팀장님, 포스코의 '기가스틸'은 우리 경량화 차체 프로젝트의 핵심 파트너가 될 수 있습니다. 공급 안정성과 기술 협력 가능성을 직접 타진해볼 최고의 기회입니다.",
  },
  {
    logo: "https://logo.clearbit.com/hyundai-steel.com",
    name: "현대제철 (Hyundai Steel)",
    description: "자동차 강판과 H형강에 강점을 가진 글로벌 철강 기업.",
    reason:
      "경쟁사들이 현대제철의 자동차강판을 어떻게 활용하는지 파악하고, 우리 '넥스트 모빌리티'가 채택할 경량화 소재 포트폴리오의 대안으로 검토해볼 필요가 있습니다.",
  },
  {
    logo: "https://logo.clearbit.com/dongkuk.co.kr",
    name: "동국제강 (Dongkuk Steel)",
    description: "국내 최초 민간 철강회사이자 컬러강판 시장의 강자.",
    reason:
      "전기차는 디자인 차별화도 중요합니다. 동국제강의 고기능성 컬러강판을 내외장재에 적용하는 신사업 아이디어를 얻고, 소재 적용성을 상담해볼 수 있겠습니다.",
  },
  {
    logo: "https://logo.clearbit.com/seah.co.kr",
    name: "세아제강 (SeAH Steel)",
    description: "세계적인 경쟁력을 갖춘 강관 전문 제조 기업.",
    reason:
      "수소차의 핵심인 수소연료 이송 및 저장용 특수강관 기술 동향을 파악해야 합니다. 우리 회사의 수소차 부품 사업 진출을 위한 기술 파트너로서 가능성을 엿볼 수 있습니다.",
  },
  {
    logo: "https://logo.clearbit.com/poongsan.co.kr",
    name: "풍산 (Poongsan)",
    description: "신동(구리 및 구리합금)과 방위산업 분야의 글로벌 리더.",
    reason:
      "전기차의 E-모터와 배터리 시스템에 필수적인 구리 부품 공급선 다변화를 위해 반드시 만나봐야 합니다. 풍산의 고전도성 구리 합금은 우리 제품의 효율을 높일 카드입니다.",
  },
  {
    logo: "https://logo.clearbit.com/tccsteel.com",
    name: "TCC스틸 (TCC Steel)",
    description: "이차전지 원통형 캔 소재인 니켈도금강판 분야의 숨은 강자.",
    reason:
      "향후 우리 회사가 배터리 모듈이나 팩 비즈니스로 확장할 경우, TCC스틸은 핵심 소재 공급 파트너가 될 수 있습니다. 원소재 기술력을 미리 파악하고 네트워킹을 구축해두시죠.",
  },
  {
    logo: "https://logo.clearbit.com/ecopro.co.kr",
    name: "에코프로 (Ecopro)",
    description:
      "세계 1위 하이니켈 양극재 기술력을 보유한 이차전지 소재 선도 기업.",
    reason:
      "배터리 소재 시장의 현재와 미래를 알려면 에코프로 부스는 필수입니다. 양극재 기술의 발전 방향을 보면, 우리 부품이 어떻게 진화해야 할지 전략적 인사이트를 얻을 수 있습니다.",
  },
  {
    logo: "https://logo.clearbit.com/doosanenerbility.com",
    name: "두산에너빌리티 (Doosan Enerbility)",
    description: "원자력, 화력, 가스터빈 등 에너지 플랜트 분야의 글로벌 리더.",
    reason:
      "수소터빈용 부품 제조 기술은 우리 회사의 정밀가공 기술과 접목할 새로운 사업 기회가 될 수 있습니다. 기술 협력 가능성을 타진해볼 좋은 기회입니다.",
  },
];

function Home() {
  const [companies, setCompanies] = useState(
    initialCompanies.map((c) => ({ ...c, hidden: false, liked: false }))
  );
  const [currentIndex, setCurrentIndex] = useState(initialCompanies.length - 1);
  const [showMatch, setShowMatch] = useState(false);
  const [lastDirection, setLastDirection] = useState();
  const [showLikedModal, setShowLikedModal] = useState(false);
  const [showMap, setShowMap] = useState(false);
  const currentIndexRef = useRef(currentIndex);
  const childRefs = useMemo(
    () =>
      Array(initialCompanies.length)
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
      setCompanies((prev) =>
        prev.map((c, i) => (i === idx ? { ...c, liked: true } : c))
      );
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
    // 카드가 화면을 벗어났을 때 복원 방지 및 hidden 처리
    setCompanies((prev) =>
      prev.map((c, i) => (i === idx ? { ...c, hidden: true } : c))
    );
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
              {companies.map(
                (company, index) =>
                  !company.hidden && (
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
                  )
              )}
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
                className="flex-1 py-4 rounded-2xl bg-blue-500 text-white text-xl font-bold shadow hover:bg-blue-600 transition-colors"
                onClick={() => setShowLikedModal(true)}
              >
                관심 기업 ({companies.filter((c) => c.liked).length})
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
        {/* 관심 기업 모달 */}
        {showLikedModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 animate-fade-in">
            <div className="bg-white rounded-3xl shadow-2xl p-8 max-w-md w-full flex flex-col items-center relative">
              <button
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 text-2xl font-bold"
                onClick={() => setShowLikedModal(false)}
                aria-label="닫기"
              >
                ×
              </button>
              <h2 className="text-2xl font-bold mb-4 text-blue-600">
                관심 기업 목록
              </h2>
              {companies.filter((c) => c.liked).length === 0 ? (
                <div className="text-gray-500 text-lg">
                  아직 선택한 기업이 없습니다.
                </div>
              ) : (
                <>
                  <ul className="w-full space-y-4 mb-6">
                    {companies
                      .filter((c) => c.liked)
                      .map((c) => (
                        <li
                          key={c.name}
                          className="flex items-center gap-4 p-3 rounded-xl bg-blue-50"
                        >
                          <img
                            src={c.logo}
                            alt={c.name}
                            className="w-12 h-12 rounded-full object-contain border-2 border-blue-200"
                          />
                          <div>
                            <div className="font-bold text-blue-800">
                              {c.name}
                            </div>
                            <div className="text-gray-600 text-sm">
                              {c.description}
                            </div>
                          </div>
                        </li>
                      ))}
                  </ul>
                  <button
                    className="w-full py-3 rounded-xl bg-green-500 text-white text-lg font-semibold hover:bg-green-600 transition-colors"
                    onClick={() => setShowMap(true)}
                  >
                    기업들 위치 보기
                  </button>
                </>
              )}
            </div>
          </div>
        )}
        {/* 지도 모달 */}
        {showMap && (
          <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 animate-fade-in">
            <div className="bg-white rounded-3xl shadow-2xl p-6 max-w-lg w-full flex flex-col items-center relative">
              <button
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 text-2xl font-bold"
                onClick={() => setShowMap(false)}
                aria-label="닫기"
              >
                ×
              </button>
              <h2 className="text-xl font-bold mb-4 text-green-600">
                기업 부스 위치 안내
              </h2>
              <img
                src="/map.png"
                alt="부스 지도"
                className="w-full max-w-xs md:max-w-md rounded-xl border mb-2"
              />
              <span className="text-gray-500 text-sm">
                현장 안내도를 참고하세요
              </span>
            </div>
          </div>
        )}
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
