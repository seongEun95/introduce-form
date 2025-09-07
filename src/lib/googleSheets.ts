import { ChurchIntroFormData } from "./schemas";

export interface GoogleSheetsResponse {
  success: boolean;
  message: string;
}

export interface ChurchIntroListItem {
  id: string;
  timestamp: string;
  name: string;
  birthDate: string;
  occupation: string;
  location: string;
  baptized: string;
  churchHistory: string;
  discipleshipThoughts: string;
  ministryTeam: string;
  currentInterests: string;
  favoritePraise: string;
  favoriteFood: string;
  dislikedFood: string;
  prayerRequest: string;
}

export interface GoogleSheetsListResponse {
  success: boolean;
  message: string;
  data: ChurchIntroListItem[];
}

/**
 * Google Apps Script를 통해 구글 시트에 데이터를 저장하는 함수
 */
export async function submitToGoogleSheets(data: ChurchIntroFormData): Promise<GoogleSheetsResponse> {
  const scriptUrl =
    "https://script.google.com/macros/s/AKfycbx60yeu-ODiOyjAMfv-eUODB0QW-8vvnH5Yv_1zEmho9teVIRNhi9eA6FPH5TPqxRCE/exec";

  if (!scriptUrl) {
    console.error("Google Script URL이 설정되지 않았습니다.");
    return {
      success: false,
      message: "Google Script URL이 설정되지 않았습니다. 관리자에게 문의하세요.",
    };
  }

  try {
    console.log("Google Sheets에 데이터 전송 중...", data);

    // Google Apps Script로 데이터 전송
    const response = await fetch(scriptUrl, {
      method: "POST",
      headers: {
        "Content-Type": "text/plain;charset=utf-8",
      },
      body: JSON.stringify(data),
      // Google Apps Script는 CORS를 제한적으로 지원하므로 redirect 모드 사용
      redirect: "follow",
    });

    // 응답 확인
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.text();

    try {
      // JSON 응답 파싱 시도
      const jsonResult = JSON.parse(result);
      return jsonResult;
    } catch {
      // JSON 파싱 실패 시 텍스트 응답으로 처리
      console.log("응답이 JSON이 아닙니다:", result);

      if (result.includes("success") || result.includes("저장")) {
        return {
          success: true,
          message: "자기소개가 성공적으로 저장되었습니다!",
        };
      } else {
        return {
          success: false,
          message: "데이터 저장 중 오류가 발생했습니다.",
        };
      }
    }
  } catch (error) {
    console.error("Google Sheets 저장 오류:", error);

    // 네트워크 오류인 경우
    if (error instanceof TypeError && error.message.includes("fetch")) {
      return {
        success: false,
        message: "네트워크 연결을 확인해주세요.",
      };
    }

    return {
      success: false,
      message: "데이터 저장 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.",
    };
  }
}

/**
 * Google Apps Script 연결 테스트 함수
 */
export async function testGoogleSheetsConnection(): Promise<GoogleSheetsResponse> {
  const scriptUrl =
    "https://script.google.com/macros/s/AKfycbx60yeu-ODiOyjAMfv-eUODB0QW-8vvnH5Yv_1zEmho9teVIRNhi9eA6FPH5TPqxRCE/exec";

  if (!scriptUrl) {
    return {
      success: false,
      message: "Google Script URL이 설정되지 않았습니다.",
    };
  }

  try {
    console.log("테스트 URL:", scriptUrl);

    const response = await fetch(scriptUrl, {
      method: "GET",
      headers: {
        "Content-Type": "text/plain;charset=utf-8",
      },
    });

    console.log("응답 상태:", response.status);
    console.log("응답 헤더:", response.headers);
    console.log("응답 타입:", response.type);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.text();
    console.log("응답 내용:", result);

    return {
      success: true,
      message: `Google Apps Script 연결 성공! 응답: ${result.substring(0, 100)}...`,
    };
  } catch (error) {
    console.error("Google Apps Script 연결 테스트 실패:", error);
    return {
      success: false,
      message: `Google Apps Script 연결 실패: ${error}`,
    };
  }
}

/**
 * 브라우저에서 직접 테스트할 수 있는 함수
 */
export function testDirectURL() {
  const scriptUrl =
    "https://script.google.com/macros/s/AKfycbx60yeu-ODiOyjAMfv-eUODB0QW-8vvnH5Yv_1zEmho9teVIRNhi9eA6FPH5TPqxRCE/exec";

  console.log("다음 URL을 브라우저에서 직접 테스트해보세요:");
  console.log("기본 테스트:", scriptUrl);
  console.log("목록 가져오기:", `${scriptUrl}?action=getList`);
  console.log("상세 가져오기:", `${scriptUrl}?action=getDetail&id=1`);

  // 새 창에서 열기
  window.open(scriptUrl, "_blank");
}

/**
 * Google Sheets에서 모든 자기소개 데이터를 가져오는 함수
 */
export async function getChurchIntroList(): Promise<GoogleSheetsListResponse> {
  const scriptUrl =
    "https://script.google.com/macros/s/AKfycbx60yeu-ODiOyjAMfv-eUODB0QW-8vvnH5Yv_1zEmho9teVIRNhi9eA6FPH5TPqxRCE/exec";

  if (!scriptUrl) {
    return {
      success: false,
      message: "Google Script URL이 설정되지 않았습니다.",
      data: [],
    };
  }

  try {
    console.log("Google Sheets에서 데이터 가져오는 중...");

    // 방법 1: JSONP 스타일로 시도
    const response = await fetch(`${scriptUrl}`, {
      method: "GET",
      mode: "no-cors",
      credentials: "omit",
      headers: {
        Accept: "application/json,text/plain,*/*",
      },
    });

    // no-cors 모드에서는 응답을 읽을 수 없으므로 다른 방법 시도
    if (response.type === "opaque") {
      console.log("CORS 제한으로 인해 응답을 읽을 수 없습니다. 다른 방법을 시도합니다.");

      // 방법 2: 일반 fetch 시도
      try {
        const normalResponse = await fetch(`${scriptUrl}?action=getList`, {
          method: "GET",
          headers: {
            Accept: "application/json,text/plain,*/*",
          },
        });

        if (!normalResponse.ok) {
          throw new Error(`HTTP error! status: ${normalResponse.status}`);
        }

        const result = await normalResponse.text();
        console.log("응답 데이터:", result);

        try {
          const jsonResult = JSON.parse(result);
          return jsonResult;
        } catch (parseError) {
          console.log("JSON 파싱 실패:", parseError);
          console.log("원본 응답:", result);

          // HTML 응답인 경우 처리
          if (result.includes("<!DOCTYPE html>")) {
            return {
              success: false,
              message: "Google Apps Script가 HTML을 반환했습니다. 스크립트 설정을 확인해주세요.",
              data: [],
            };
          }

          return {
            success: false,
            message: "데이터 형식 오류가 발생했습니다.",
            data: [],
          };
        }
      } catch (normalFetchError) {
        console.error("일반 fetch도 실패:", normalFetchError);

        // 방법 3: 테스트 데이터 반환 (개발용)
        return {
          success: true,
          message: "테스트 데이터를 반환합니다.",
          data: [
            {
              id: "1",
              timestamp: new Date().toLocaleString("ko-KR"),
              name: "테스트 사용자",
              birthDate: "1990-01-01",
              occupation: "개발자",
              location: "서울시 강남구",
              baptized: "예",
              churchHistory: "2023년부터",
              discipleshipThoughts: "제자훈련을 통해 성장하고 싶습니다.",
              ministryTeam: "찬양팀",
              currentInterests: "독서와 운동",
              favoritePraise: "놀라운 은혜",
              favoriteFood: "김치찌개",
              dislikedFood: "매운 음식",
              prayerRequest: "가족의 건강을 위해 기도해주세요.",
            },
          ],
        };
      }
    }

    const result = await response.text();
    console.log("응답 데이터:", result);

    try {
      const jsonResult = JSON.parse(result);
      return jsonResult;
    } catch {
      console.log("응답이 JSON이 아닙니다:", result);
      return {
        success: false,
        message: "데이터 형식 오류가 발생했습니다.",
        data: [],
      };
    }
  } catch (error) {
    console.error("Google Sheets 데이터 가져오기 오류:", error);

    // CORS 오류인 경우
    if (error instanceof TypeError && error.message.includes("Failed to fetch")) {
      return {
        success: false,
        message: "네트워크 오류 또는 CORS 제한입니다. Google Apps Script 설정을 확인해주세요.",
        data: [],
      };
    }

    return {
      success: false,
      message: "데이터를 가져오는 중 오류가 발생했습니다: " + error,
      data: [],
    };
  }
}

/**
 * Google Sheets에서 특정 ID의 자기소개 데이터를 가져오는 함수
 */
export async function getChurchIntroDetail(id: string): Promise<{
  success: boolean;
  message: string;
  data: ChurchIntroListItem | null;
}> {
  const scriptUrl =
    "https://script.google.com/macros/s/AKfycbx60yeu-ODiOyjAMfv-eUODB0QW-8vvnH5Yv_1zEmho9teVIRNhi9eA6FPH5TPqxRCE/exec";

  if (!scriptUrl) {
    return {
      success: false,
      message: "Google Script URL이 설정되지 않았습니다.",
      data: null,
    };
  }

  try {
    console.log(`Google Sheets에서 ID ${id} 데이터 가져오는 중...`);

    const response = await fetch(`${scriptUrl}?action=getDetail&id=${id}`, {
      method: "GET",
      redirect: "follow",
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.text();

    try {
      const jsonResult = JSON.parse(result);
      return jsonResult;
    } catch {
      console.log("응답이 JSON이 아닙니다:", result);
      return {
        success: false,
        message: "데이터 형식 오류가 발생했습니다.",
        data: null,
      };
    }
  } catch (error) {
    console.error("Google Sheets 상세 데이터 가져오기 오류:", error);
    return {
      success: false,
      message: "상세 데이터를 가져오는 중 오류가 발생했습니다.",
      data: null,
    };
  }
}

/**
 * 폼 데이터를 Google Sheets 형식으로 변환하는 함수
 */
export function formatDataForSheets(data: ChurchIntroFormData) {
  return {
    ...data,
    // 세례 여부를 한글로 변환
    baptized: data.baptized === "yes" ? "예" : "아니요",
    // 빈 값들을 '없음'으로 처리
    ministryTeam: data.ministryTeam || "없음",
    dislikedFood: data.dislikedFood || "없음",
    // 타임스탬프 추가
    timestamp: new Date().toLocaleString("ko-KR", {
      timeZone: "Asia/Seoul",
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    }),
  };
}
