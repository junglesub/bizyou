import React, { useMemo, useState } from "react";
// @tanstack/react-table 훅 사용 안함 (직접 구현)
import { motion } from "framer-motion";

function AdminPage() {
  // 샘플 데이터 (실제 환경에서는 API로 대체)
  const [data] = useState([
    {
      name: "김지은",
      org: "포스텍",
      job: "연구원",
      interests: ["스마트팩토리", "철강"],
      reason: "기술 혁신형 + 스마트 생산 관심",
      fit: "very_high",
      fitText: "🟢 매우 높음",
      fitScore: 95,
      contact: "010-****-1234",
    },
    {
      name: "박민수",
      org: "현대제철",
      job: "생산기획",
      interests: ["철강", "비철금속"],
      reason: "전통 제조 선호 + 철강 관심",
      fit: "high",
      fitText: "🟡 높음",
      fitScore: 80,
      contact: "010-****-5678",
    },
    {
      name: "이나영",
      org: "창업준비",
      job: "예비창업자",
      interests: ["수소", "에너지"],
      reason: "스타트업志 + 지속 가능성 중시",
      fit: "medium",
      fitText: "🟠 보통",
      fitScore: 60,
      contact: "010-****-9999",
    },
    {
      name: "윤성훈",
      org: "K-대",
      job: "학생",
      interests: ["철강", "스마트팩토리"],
      reason: "미래 진로 탐색형 + 기술 체험 지향",
      fit: "low",
      fitText: "🔵 낮음",
      fitScore: 40,
      contact: "010-****-8888",
    },
    {
      name: "최정현",
      org: "포스코",
      job: "구매팀",
      interests: ["비철금속", "공급망관리"],
      reason: "원자재 공급선 발굴 목적",
      fit: "very_high",
      fitText: "🟢 매우 높음",
      fitScore: 98,
      contact: "010-****-2345",
    },
    {
      name: "강민준",
      org: "엘앤에프",
      job: "R&D",
      interests: ["이차전지", "신소재"],
      reason: "경쟁사 기술 분석 + 신소재 탐색",
      fit: "very_high",
      fitText: "🟢 매우 높음",
      fitScore: 92,
      contact: "010-****-3456",
    },
    {
      name: "송혜리",
      org: "고려아연",
      job: "신사업기획",
      interests: ["자원순환", "친환경"],
      reason: "도시광산 및 재활용 기술 파트너 탐색",
      fit: "high",
      fitText: "🟡 높음",
      fitScore: 88,
      contact: "010-****-4567",
    },
    {
      name: "정대호",
      org: "두산에너빌리티",
      job: "엔지니어",
      interests: ["에너지", "가스터빈"],
      reason: "터빈용 특수 합금 소재 동향 파악",
      fit: "high",
      fitText: "🟡 높음",
      fitScore: 85,
      contact: "010-****-1122",
    },
    {
      name: "한지민",
      org: "RIST",
      job: "선임연구원",
      interests: ["탄소중립", "수소"],
      reason: "수소환원제철 공동 연구 파트너 물색",
      fit: "very_high",
      fitText: "🟢 매우 높음",
      fitScore: 96,
      contact: "010-****-3344",
    },
    {
      name: "유재석",
      org: "현대자동차",
      job: "경량화소재팀",
      interests: ["경량화", "비철금속"],
      reason: "차세대 전기차용 경량 소재 발굴",
      fit: "high",
      fitText: "🟡 높음",
      fitScore: 89,
      contact: "010-****-5566",
    },
    {
      name: "서예지",
      org: "TCC스틸",
      job: "마케팅",
      interests: ["이차전지", "철강"],
      reason: "신규 고객사 발굴 및 시장 동향 분석",
      fit: "high",
      fitText: "🟡 높음",
      fitScore: 82,
      contact: "010-****-7788",
    },
    {
      name: "임성민",
      org: "서울대학교",
      job: "대학원생",
      interests: ["신소재", "철강"],
      reason: "석사 논문 연구자료 수집",
      fit: "medium",
      fitText: "🟠 보통",
      fitScore: 70,
      contact: "010-****-9900",
    },
    {
      name: "황보라",
      org: "풍산",
      job: "방산사업부",
      interests: ["비철금속", "특수합금"],
      reason: "특수합금 기술 협력사 탐색",
      fit: "high",
      fitText: "🟡 높음",
      fitScore: 86,
      contact: "010-****-1212",
    },
    {
      name: "오지환",
      org: "동국제강",
      job: "디자인팀",
      interests: ["컬러강판", "디자인"],
      reason: "신규 컬러 및 텍스쳐 트렌드 파악",
      fit: "medium",
      fitText: "🟠 보통",
      fitScore: 72,
      contact: "010-****-3434",
    },
    {
      name: "문상철",
      org: "세아창원특수강",
      job: "품질관리",
      interests: ["특수강", "에너지"],
      reason: "에너지 플랜트용 고합금강 품질 비교",
      fit: "high",
      fitText: "🟡 높음",
      fitScore: 83,
      contact: "010-****-5656",
    },
    {
      name: "차민경",
      org: "KOTRA",
      job: "전문위원",
      interests: ["수출입", "철강"],
      reason: "국내 기업 수출 지원 및 해외 바이어 매칭",
      fit: "medium",
      fitText: "🟠 보통",
      fitScore: 68,
      contact: "010-****-7878",
    },
    {
      name: "조동희",
      org: "SK오션플랜트",
      job: "설계엔지니어",
      interests: ["해상풍력", "철강"],
      reason: "해상풍력용 후판 및 특수강 공급사 물색",
      fit: "very_high",
      fitText: "🟢 매우 높음",
      fitScore: 91,
      contact: "010-****-9090",
    },
    {
      name: "배정대",
      org: "에코프로비엠",
      job: "공정기술",
      interests: ["이차전지", "자동화"],
      reason: "양극재 생산 공정 자동화 설비 검토",
      fit: "high",
      fitText: "🟡 높음",
      fitScore: 87,
      contact: "010-****-1357",
    },
    {
      name: "천성호",
      org: "KAIST",
      job: "학부생",
      interests: ["신소재", "창업"],
      reason: "창업 아이템 탐색 및 기술 트렌드 학습",
      fit: "medium",
      fitText: "🟠 보통",
      fitScore: 65,
      contact: "010-****-2468",
    },
    {
      name: "신본기",
      org: "중소기업진흥공단",
      job: "매니저",
      interests: ["중소기업지원", "DX"],
      reason: "지원 사업 연계 가능 중소기업 발굴",
      fit: "medium",
      fitText: "🟠 보통",
      fitScore: 62,
      contact: "010-****-1029",
    },
    {
      name: "장성우",
      org: "포스코DX",
      job: "AI개발자",
      interests: ["스마트팩토리", "DX"],
      reason: "철강 도메인 AI 솔루션 적용사례 연구",
      fit: "high",
      fitText: "🟡 높음",
      fitScore: 81,
      contact: "010-****-3847",
    },
    {
      name: "김민혁",
      org: "기아자동차",
      job: "소재분석",
      interests: ["철강", "비철금속"],
      reason: "경쟁사 소재 분석 및 신소재 평가",
      fit: "high",
      fitText: "🟡 높음",
      fitScore: 84,
      contact: "010-****-5968",
    },
    {
      name: "이강인",
      org: "알루코",
      job: "영업팀",
      interests: ["알루미늄", "이차전지"],
      reason: "배터리 모듈용 알루미늄 부품 고객사 탐색",
      fit: "very_high",
      fitText: "🟢 매우 높음",
      fitScore: 90,
      contact: "010-****-7071",
    },
    {
      name: "손흥민",
      org: "벤처캐피탈",
      job: "심사역",
      interests: ["신소재", "에너지"],
      reason: "투자가능한 기술 스타트업 발굴",
      fit: "medium",
      fitText: "🟠 보통",
      fitScore: 75,
      contact: "010-****-8283",
    },
    {
      name: "황희찬",
      org: "한양대학교",
      job: "교수",
      interests: ["금속재료", "피로파괴"],
      reason: "산학협력 과제 발굴 및 최신 기술 동향 파악",
      fit: "high",
      fitText: "🟡 높음",
      fitScore: 80,
      contact: "010-****-4637",
    },
    {
      name: "김민재",
      org: "취업준비생",
      job: "구직자",
      interests: ["철강", "품질관리"],
      reason: "철강업계 취업 희망, 기업 정보 수집",
      fit: "low",
      fitText: "🔵 낮음",
      fitScore: 50,
      contact: "010-****-2847",
    },
    {
      name: "박지성",
      org: "한국가스공사",
      job: "수소사업팀",
      interests: ["수소", "에너지"],
      reason: "수소 저장/운송용 소재 및 기술 탐색",
      fit: "high",
      fitText: "🟡 높음",
      fitScore: 88,
      contact: "010-****-1739",
    },
    {
      name: "안정환",
      org: "산업부",
      job: "사무관",
      interests: ["산업정책", "탄소중립"],
      reason: "철강/비철금속 산업 정책 수립을 위한 현장 조사",
      fit: "medium",
      fitText: "🟠 보통",
      fitScore: 78,
      contact: "010-****-2849",
    },
    {
      name: "이영표",
      org: "특허법인",
      job: "변리사",
      interests: ["특허", "신소재"],
      reason: "신소재 분야 기술 특허 동향 분석",
      fit: "medium",
      fitText: "🟠 보통",
      fitScore: 67,
      contact: "010-****-3827",
    },
    {
      name: "홍명보",
      org: "대한제강",
      job: "안전관리팀장",
      interests: ["안전", "스마트팩토리"],
      reason: "스마트 안전 솔루션 및 설비 도입 검토",
      fit: "high",
      fitText: "🟡 높음",
      fitScore: 81,
      contact: "010-****-4928",
    },
    {
      name: "김태영",
      org: "KITECH",
      job: "연구원",
      interests: ["뿌리기술", "DX"],
      reason: "중소기업 지원용 디지털 전환 기술 탐색",
      fit: "high",
      fitText: "🟡 높음",
      fitScore: 84,
      contact: "010-****-5827",
    },
    {
      name: "설기현",
      org: "영남대학교",
      job: "학생",
      interests: ["비철금속", "이차전지"],
      reason: "졸업 후 진로 탐색 및 기업 문화 체험",
      fit: "low",
      fitText: "🔵 낮음",
      fitScore: 45,
      contact: "010-****-6837",
    },
    {
      name: "이운재",
      org: "LS전선",
      job: "소재개발",
      interests: ["비철금속", "케이블"],
      reason: "차세대 케이블용 신소재 및 합금 기술 동향 파악",
      fit: "high",
      fitText: "🟡 높음",
      fitScore: 85,
      contact: "010-****-7837",
    },
    {
      name: "최용수",
      org: "증권사",
      job: "애널리스트",
      interests: ["철강", "이차전지"],
      reason: "담당 섹터 기업 분석 및 투자 리포트 작성",
      fit: "medium",
      fitText: "🟠 보통",
      fitScore: 77,
      contact: "010-****-8839",
    },
    {
      name: "이동국",
      org: "효성첨단소재",
      job: "탄소섬유사업부",
      interests: ["경량화", "신소재"],
      reason: "탄소섬유와 경쟁/보완 관계의 금속소재 시장 분석",
      fit: "high",
      fitText: "🟡 높음",
      fitScore: 83,
      contact: "010-****-9832",
    },
    {
      name: "차두리",
      org: "독일 자동차부품사",
      job: "한국지사장",
      interests: ["경량화", "공급망관리"],
      reason: "국내 우수 부품/소재 기업 발굴 및 파트너십 체결",
      fit: "very_high",
      fitText: "🟢 매우 높음",
      fitScore: 93,
      contact: "010-****-1049",
    },
    {
      name: "김남일",
      org: "건설사",
      job: "자재구매",
      interests: ["철강", "건축"],
      reason: "고품질 철근, H형강 공급사 단가 및 납기 비교",
      fit: "high",
      fitText: "🟡 높음",
      fitScore: 80,
      contact: "010-****-2049",
    },
    {
      name: "유상철",
      org: "한국에너지기술연구원",
      job: "책임연구원",
      interests: ["에너지효율", "친환경"],
      reason: "에너지 절감형 신소재 및 공정 기술 벤치마킹",
      fit: "high",
      fitText: "🟡 높음",
      fitScore: 88,
      contact: "010-****-3049",
    },
    {
      name: "박항서",
      org: "베트남 투자 컨설팅",
      job: "대표",
      interests: ["수출입", "철강"],
      reason: "베트남 진출 희망 국내 철강기업 컨설팅 및 파트너 발굴",
      fit: "medium",
      fitText: "🟠 보통",
      fitScore: 74,
      contact: "010-****-4049",
    },
    {
      name: "거스 히딩크",
      org: "네덜란드 장비사",
      job: "아시아 총괄",
      interests: ["스마트팩토리", "자동화"],
      reason: "한국 시장 진출을 위한 제철/압연 설비 고객사 발굴",
      fit: "very_high",
      fitText: "🟢 매우 높음",
      fitScore: 94,
      contact: "010-****-5049",
    },
  ]);

  // 필터/검색 상태
  const [search, setSearch] = useState("");
  const [jobFilter, setJobFilter] = useState("");
  const [interestFilter, setInterestFilter] = useState("");
  const [fitFilter, setFitFilter] = useState("");
  const [sort, setSort] = useState("fit");

  // 필터링/검색/정렬
  const filtered = useMemo(() => {
    let filtered = data;
    if (search) {
      filtered = filtered.filter(
        (d) => d.name.includes(search) || d.org.includes(search)
      );
    }
    if (jobFilter) {
      filtered = filtered.filter((d) => d.job === jobFilter);
    }
    if (interestFilter) {
      filtered = filtered.filter((d) => d.interests.includes(interestFilter));
    }
    if (fitFilter) {
      filtered = filtered.filter((d) => d.fit === fitFilter);
    }
    if (sort === "fit") {
      filtered = filtered.slice().sort((a, b) => b.fitScore - a.fitScore);
    } else if (sort === "latest") {
      // 최신순: 샘플 데이터는 순서대로, 실제는 createdAt 등 활용
      filtered = filtered.slice();
    }
    return filtered;
  }, [data, search, jobFilter, interestFilter, fitFilter, sort]);

  // 필터 옵션
  const jobOptions = Array.from(new Set(data.map((d) => d.job)));
  const interestOptions = Array.from(new Set(data.flatMap((d) => d.interests)));
  const fitOptions = [
    { value: "very_high", label: "🟢 매우 높음" },
    { value: "high", label: "🟡 높음" },
    { value: "medium", label: "🟠 보통" },
    { value: "low", label: "🔵 낮음" },
  ];

  // CSV 다운로드
  const downloadCSV = () => {
    const header = ["이름", "소속", "직군", "관심산업", "추천사유", "적합도"];
    const rows = filtered.map((d) => [
      d.name,
      d.org,
      d.job,
      d.interests.join(", "),
      d.reason,
      d.fitText,
    ]);
    const csv = [header, ...rows].map((r) => r.join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "like_users.csv";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-100 p-0 md:py-8 md:px-2 flex flex-col items-center">
      <div className="w-full max-w-5xl mx-auto bg-white/95 rounded-2xl shadow-xl p-2 sm:p-4 md:p-8 border border-blue-100">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between mb-6 md:mb-8">
          <div className="flex flex-wrap gap-2 items-center w-full md:w-auto">
            <input
              className="border rounded-xl px-3 py-2 text-base w-full sm:w-auto focus:outline-blue-400 bg-white shadow-sm"
              placeholder="이름/소속 검색"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <select
              className="border rounded-xl px-3 py-2 text-base bg-white shadow-sm w-full sm:w-auto"
              value={jobFilter}
              onChange={(e) => setJobFilter(e.target.value)}
            >
              <option value="">직군 전체</option>
              {jobOptions.map((j) => (
                <option key={j} value={j}>
                  {j}
                </option>
              ))}
            </select>
            <select
              className="border rounded-xl px-3 py-2 text-base bg-white shadow-sm w-full sm:w-auto"
              value={interestFilter}
              onChange={(e) => setInterestFilter(e.target.value)}
            >
              <option value="">관심 산업 전체</option>
              {interestOptions.map((i) => (
                <option key={i} value={i}>
                  {i}
                </option>
              ))}
            </select>
            <select
              className="border rounded-xl px-3 py-2 text-base bg-white shadow-sm w-full sm:w-auto"
              value={fitFilter}
              onChange={(e) => setFitFilter(e.target.value)}
            >
              <option value="">적합도 전체</option>
              {fitOptions.map((f) => (
                <option key={f.value} value={f.value}>
                  {f.label}
                </option>
              ))}
            </select>
          </div>
          <div className="flex flex-wrap gap-2 items-center mt-2 md:mt-0 w-full md:w-auto">
            <button
              className={`px-3 py-2 rounded-xl font-bold text-sm sm:text-base border shadow-sm w-full sm:w-auto ${
                sort === "fit"
                  ? "bg-blue-600 text-white"
                  : "bg-white text-blue-600 border-blue-600"
              }`}
              onClick={() => setSort("fit")}
            >
              적합도순
            </button>
            <button
              className={`px-3 py-2 rounded-xl font-bold text-sm sm:text-base border shadow-sm w-full sm:w-auto ${
                sort === "latest"
                  ? "bg-blue-600 text-white"
                  : "bg-white text-blue-600 border-blue-600"
              }`}
              onClick={() => setSort("latest")}
            >
              최신순
            </button>
            <button
              className="px-3 py-2 rounded-xl font-bold text-sm sm:text-base bg-green-500 text-white hover:bg-green-600 shadow-sm w-full sm:w-auto"
              onClick={downloadCSV}
            >
              CSV 다운로드
            </button>
          </div>
        </div>
        <div className="mb-4 md:mb-6 text-base md:text-lg font-semibold text-gray-700 flex flex-wrap gap-2 md:gap-4 items-center px-1 md:px-2">
          👥 총 관심자 수:{" "}
          <span className="text-blue-600 font-bold">{data.length}명</span>
          <span className="text-gray-400">|</span>
          적합도 높은 순 10명 우선 노출
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-blue-100 rounded-xl text-sm sm:text-base">
            <thead>
              <tr className="bg-blue-50 text-blue-900">
                <th className="py-3 px-2 font-bold border-b">이름</th>
                <th className="py-3 px-2 font-bold border-b">소속</th>
                <th className="py-3 px-2 font-bold border-b">직군</th>
                <th className="py-3 px-2 font-bold border-b">관심 산업군</th>
                <th className="py-3 px-2 font-bold border-b">추천 사유</th>
                <th className="py-3 px-2 font-bold border-b w-[100px] ">
                  적합도
                </th>
                <th className="py-3 px-2 font-bold border-b">관리</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((user, idx) => (
                <motion.tr
                  key={user.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.02 }}
                  className={
                    `border-b hover:bg-blue-50/40 ` +
                    (idx < 10
                      ? "bg-yellow-50/60 font-bold ring-2 ring-yellow-300"
                      : "")
                  }
                >
                  <td
                    className={
                      "py-2 px-2 whitespace-nowrap " +
                      (idx < 10 ? "text-yellow-900" : "text-blue-900")
                    }
                  >
                    {user.name}
                  </td>
                  <td
                    className={
                      "py-2 px-2 whitespace-nowrap " +
                      (idx < 10 ? "text-yellow-900" : "text-gray-700")
                    }
                  >
                    {user.org}
                  </td>
                  <td
                    className={
                      "py-2 px-2 whitespace-nowrap " +
                      (idx < 10 ? "text-yellow-900" : "text-gray-700")
                    }
                  >
                    {user.job}
                  </td>
                  <td
                    className={
                      "py-2 px-2 " +
                      (idx < 10 ? "text-yellow-900" : "text-gray-700")
                    }
                  >
                    {user.interests.join(", ")}
                  </td>
                  <td
                    className={
                      "py-2 px-2 max-w-xs whitespace-pre-line " +
                      (idx < 10 ? "text-yellow-900" : "text-gray-600")
                    }
                  >
                    {user.reason}
                  </td>
                  <td className="py-2 px-2">
                    <span
                      className={
                        user.fit === "very_high"
                          ? "text-green-600 font-bold"
                          : user.fit === "high"
                          ? "text-yellow-500 font-bold"
                          : user.fit === "medium"
                          ? "text-orange-500 font-bold"
                          : "text-blue-500 font-bold"
                      }
                    >
                      {user.fitText}
                    </span>
                  </td>
                  <td className="py-2 px-2 whitespace-nowrap">
                    <div className="flex gap-1">
                      <button className="px-2 py-1 rounded bg-blue-100 text-blue-700 font-semibold text-xs hover:bg-blue-200 shadow">
                        📩
                      </button>
                      <button className="px-2 py-1 rounded bg-gray-100 text-gray-700 font-semibold text-xs hover:bg-gray-200 shadow">
                        📝
                      </button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
          <div className="text-xs text-yellow-700 mt-2 flex items-center gap-2">
            <span className="inline-block w-3 h-3 rounded-full bg-yellow-300 border border-yellow-400"></span>
            <span>상위 10명(적합도순) 강조 표시</span>
          </div>
        </div>
        {filtered.length === 0 && (
          <div className="text-center text-gray-400 text-lg py-12">
            조건에 맞는 참여자가 없습니다.
          </div>
        )}
      </div>
    </div>
  );
}

export default AdminPage;
