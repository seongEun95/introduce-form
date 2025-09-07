# Google Sheets 연동 설정 가이드

교회 자기소개 폼을 Google Sheets와 연동하는 방법을 단계별로 안내합니다.

## 📋 1. Google Sheets 준비

### 1-1. 새 스프레드시트 생성

1. [Google Sheets](https://sheets.google.com)에 접속
2. 새 스프레드시트 생성
3. 제목을 "교회 자기소개 폼 응답"으로 변경

### 1-2. 헤더 설정

첫 번째 행(A1~N1)에 다음 헤더를 입력하세요:

| A        | B    | C        | D           | E      | F        | G            | H            | I            | J          | K            | L            | M            | N        |
| -------- | ---- | -------- | ----------- | ------ | -------- | ------------ | ------------ | ------------ | ---------- | ------------ | ------------ | ------------ | -------- |
| 제출일시 | 이름 | 생년월일 | 하는일/전공 | 사는곳 | 세례여부 | 교회출석기간 | 제자훈련생각 | 섬기는사역팀 | 요즘관심사 | 좋아하는찬양 | 좋아하는음식 | 싫어하는음식 | 기도제목 |

## 🔧 2. Google Apps Script 설정

### 2-1. Apps Script 열기

1. 구글 시트에서 `확장 프로그램` → `Apps Script` 클릭
2. 새 프로젝트가 생성됩니다

### 2-2. 코드 작성

기본 `myFunction`을 삭제하고 다음 코드를 붙여넣으세요:

```javascript
function doPost(e) {
  try {
    // 스프레드시트와 시트 가져오기
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Sheet1");

    // POST 데이터 파싱
    const data = JSON.parse(e.postData.contents);

    // 교회 자기소개 폼 데이터 추출
    const {
      name, // 이름
      birthDate, // 생년월일
      occupation, // 하는 일/전공
      location, // 사는 곳
      baptized, // 세례 여부 (yes/no)
      churchHistory, // 사랑의 교회 출석 기간
      discipleshipThoughts, // 제자훈련에 대한 생각
      ministryTeam, // 섬기는 사역팀 (선택사항)
      currentInterests, // 요즘 관심사
      favoritePraise, // 좋아하는 찬양
      favoriteFood, // 좋아하는 음식
      dislikedFood, // 싫어하는 음식 (선택사항)
      prayerRequest, // 기도제목
    } = data;

    // 필수 필드 검증
    if (
      !name ||
      !birthDate ||
      !occupation ||
      !location ||
      !baptized ||
      !churchHistory ||
      !discipleshipThoughts ||
      !currentInterests ||
      !favoritePraise ||
      !favoriteFood ||
      !prayerRequest
    ) {
      return ContentService.createTextOutput(
        JSON.stringify({
          success: false,
          message: "필수 항목이 누락되었습니다.",
        })
      ).setMimeType(ContentService.MimeType.JSON);
    }

    // 현재 시간 (한국 시간대)
    const timestamp = new Date().toLocaleString("ko-KR", {
      timeZone: "Asia/Seoul",
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });

    // 세례 여부를 한글로 변환
    const baptizedText = baptized === "yes" ? "예" : "아니요";

    // 구글 시트에 데이터 추가 (헤더 순서에 맞게)
    sheet.appendRow([
      timestamp, // A열: 제출일시
      name, // B열: 이름
      birthDate, // C열: 생년월일
      occupation, // D열: 하는 일/전공
      location, // E열: 사는 곳
      baptizedText, // F열: 세례 여부
      churchHistory, // G열: 교회 출석 기간
      discipleshipThoughts, // H열: 제자훈련 생각
      ministryTeam || "없음", // I열: 섬기는 사역팀
      currentInterests, // J열: 요즘 관심사
      favoritePraise, // K열: 좋아하는 찬양
      favoriteFood, // L열: 좋아하는 음식
      dislikedFood || "없음", // M열: 싫어하는 음식
      prayerRequest, // N열: 기도제목
    ]);

    // 성공 응답 (JSON 형태)
    return ContentService.createTextOutput(
      JSON.stringify({
        success: true,
        message: "자기소개가 성공적으로 저장되었습니다! 🎉",
      })
    ).setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    // 에러 처리
    console.error("Google Sheets 저장 오류:", error);

    return ContentService.createTextOutput(
      JSON.stringify({
        success: false,
        message: "서버 오류가 발생했습니다: " + error.toString(),
      })
    ).setMimeType(ContentService.MimeType.JSON);
  }
}

// GET 요청 처리 (테스트용 및 데이터 읽기)
function doGet(e) {
  const action = e.parameter.action;

  if (action === "getList") {
    return getIntroductionList();
  } else if (action === "getDetail") {
    const id = e.parameter.id;
    return getIntroductionDetail(id);
  } else {
    // 기본 테스트 응답
    return ContentService.createTextOutput(
      JSON.stringify({
        success: true,
        message: "교회 자기소개 폼 Google Apps Script가 정상 작동중입니다.",
        timestamp: new Date().toLocaleString("ko-KR", { timeZone: "Asia/Seoul" }),
      })
    ).setMimeType(ContentService.MimeType.JSON);
  }
}

// 모든 자기소개 데이터 가져오기
function getIntroductionList() {
  try {
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Sheet1");
    const data = sheet.getDataRange().getValues();

    // 헤더 제거 (첫 번째 행)
    const headers = data[0];
    const rows = data.slice(1);

    // 데이터를 객체 배열로 변환
    const introductions = rows
      .map((row, index) => ({
        id: (index + 1).toString(), // 행 번호를 ID로 사용
        timestamp: row[0] || "",
        name: row[1] || "",
        birthDate: row[2] || "",
        occupation: row[3] || "",
        location: row[4] || "",
        baptized: row[5] || "",
        churchHistory: row[6] || "",
        discipleshipThoughts: row[7] || "",
        ministryTeam: row[8] || "",
        currentInterests: row[9] || "",
        favoritePraise: row[10] || "",
        favoriteFood: row[11] || "",
        dislikedFood: row[12] || "",
        prayerRequest: row[13] || "",
      }))
      .reverse(); // 최신순으로 정렬

    return ContentService.createTextOutput(
      JSON.stringify({
        success: true,
        message: "데이터를 성공적으로 가져왔습니다.",
        data: introductions,
      })
    ).setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    console.error("데이터 가져오기 오류:", error);
    return ContentService.createTextOutput(
      JSON.stringify({
        success: false,
        message: "데이터를 가져오는 중 오류가 발생했습니다: " + error.toString(),
        data: [],
      })
    ).setMimeType(ContentService.MimeType.JSON);
  }
}

// 특정 ID의 자기소개 데이터 가져오기
function getIntroductionDetail(id) {
  try {
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Sheet1");
    const data = sheet.getDataRange().getValues();

    // 헤더 제거
    const rows = data.slice(1);

    // ID는 행 번호 (1부터 시작)
    const rowIndex = parseInt(id) - 1;

    if (rowIndex < 0 || rowIndex >= rows.length) {
      return ContentService.createTextOutput(
        JSON.stringify({
          success: false,
          message: "해당 ID의 데이터를 찾을 수 없습니다.",
          data: null,
        })
      ).setMimeType(ContentService.MimeType.JSON);
    }

    const row = rows[rowIndex];
    const introduction = {
      id: id,
      timestamp: row[0] || "",
      name: row[1] || "",
      birthDate: row[2] || "",
      occupation: row[3] || "",
      location: row[4] || "",
      baptized: row[5] || "",
      churchHistory: row[6] || "",
      discipleshipThoughts: row[7] || "",
      ministryTeam: row[8] || "",
      currentInterests: row[9] || "",
      favoritePraise: row[10] || "",
      favoriteFood: row[11] || "",
      dislikedFood: row[12] || "",
      prayerRequest: row[13] || "",
    };

    return ContentService.createTextOutput(
      JSON.stringify({
        success: true,
        message: "데이터를 성공적으로 가져왔습니다.",
        data: introduction,
      })
    ).setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    console.error("상세 데이터 가져오기 오류:", error);
    return ContentService.createTextOutput(
      JSON.stringify({
        success: false,
        message: "상세 데이터를 가져오는 중 오류가 발생했습니다: " + error.toString(),
        data: null,
      })
    ).setMimeType(ContentService.MimeType.JSON);
  }
}
```

### 2-3. 저장 및 배포

1. `Ctrl+S`로 저장
2. 프로젝트 이름을 "교회 자기소개 폼"으로 변경
3. `배포` → `새 배포` 클릭
4. 설정:
   - **유형**: 웹 앱
   - **설명**: "교회 자기소개 폼 데이터 수집"
   - **실행 계정**: 나
   - **액세스 권한**: 모든 사용자
5. `배포` 클릭
6. **웹 앱 URL 복사** (예: `https://script.google.com/macros/s/AKfycby.../exec`)

## 🔐 3. 환경 변수 설정

### 3-1. .env.local 파일 생성

프로젝트 루트에 `.env.local` 파일을 생성하고 다음 내용을 입력:

```bash
# Google Apps Script 웹 앱 URL
NEXT_PUBLIC_GOOGLE_SCRIPT_URL=https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec

# 개발 환경 설정
NODE_ENV=development
```

### 3-2. URL 설정

- `YOUR_SCRIPT_ID` 부분을 실제 배포된 웹 앱 URL로 교체하세요
- URL은 Google Apps Script 배포 시 생성된 것을 사용

## 🧪 4. 테스트

### 4-1. 연결 테스트

1. 개발 서버 실행: `npm run dev`
2. 자기소개 폼 페이지로 이동
3. "🔗 Google Sheets 연결 테스트" 버튼 클릭
4. 성공 메시지 확인

### 4-2. 폼 제출 테스트

1. 자기소개 폼을 모두 작성
2. "자기소개 저장하기 💝" 버튼 클릭
3. 성공 메시지 확인
4. Google Sheets에서 데이터 확인

## 🔧 5. 문제 해결

### 5-1. 일반적인 오류

**"Google Script URL이 설정되지 않았습니다"**

- `.env.local` 파일의 `NEXT_PUBLIC_GOOGLE_SCRIPT_URL` 확인
- 개발 서버 재시작

**"네트워크 연결을 확인해주세요"**

- 인터넷 연결 확인
- Google Apps Script URL이 올바른지 확인

**"서버 오류가 발생했습니다"**

- Google Apps Script 코드 확인
- 스프레드시트 권한 확인

### 5-2. 디버깅

**Google Apps Script에서 로그 확인:**

1. Apps Script 에디터에서 `실행` → `doGet` 실행
2. 실행 로그 확인
3. 오류 메시지 분석

**브라우저 개발자 도구:**

1. F12로 개발자 도구 열기
2. Console 탭에서 오류 메시지 확인
3. Network 탭에서 요청/응답 확인

## 📊 6. 데이터 관리

### 6-1. 스프레드시트 활용

- 응답 데이터를 필터링하여 분석
- 차트나 그래프로 시각화
- 다른 Google 서비스와 연동

### 6-2. 백업

- 정기적으로 스프레드시트 복사본 생성
- Google Drive에 자동 백업 설정

## 🚀 완료!

이제 교회 자기소개 폼이 Google Sheets와 완전히 연동되었습니다!

- ✅ 실시간 데이터 저장
- ✅ 자동 타임스탬프
- ✅ 에러 처리
- ✅ 연결 테스트 기능
- ✅ 사용자 친화적 메시지
