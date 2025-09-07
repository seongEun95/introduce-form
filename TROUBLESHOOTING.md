# 🔧 데이터 가져오기 문제 해결 가이드

Google Sheets에서 데이터를 가져오지 못할 때의 해결 방법을 단계별로 안내합니다.

## 🔍 1. 문제 진단

### 1-1. 브라우저 개발자 도구 확인

1. **F12**를 눌러 개발자 도구 열기
2. **Console** 탭에서 오류 메시지 확인
3. **Network** 탭에서 요청/응답 상태 확인

### 1-2. URL 직접 테스트

목록 페이지에서 **"🔧 URL 테스트"** 버튼을 클릭하거나 다음 URL들을 브라우저에서 직접 테스트:

```
기본 테스트:
https://script.google.com/macros/s/AKfycbx60yeu-ODiOyjAMfv-eUODB0QW-8vvnH5Yv_1zEmho9teVIRNhi9eA6FPH5TPqxRCE/exec

목록 가져오기:
https://script.google.com/macros/s/AKfycbx60yeu-ODiOyjAMfv-eUODB0QW-8vvnH5Yv_1zEmho9teVIRNhi9eA6FPH5TPqxRCE/exec?action=getList

상세 가져오기:
https://script.google.com/macros/s/AKfycbx60yeu-ODiOyjAMfv-eUODB0QW-8vvnH5Yv_1zEmho9teVIRNhi9eA6FPH5TPqxRCE/exec?action=getDetail&id=1
```

## 🛠️ 2. 일반적인 문제와 해결책

### 2-1. Google Apps Script가 업데이트되지 않음

**증상:** URL 테스트 시 이전 버전의 응답이 나옴

**해결책:**

1. Google Apps Script 에디터에서 코드를 최신 버전으로 업데이트
2. **새로운 버전으로 재배포** 필요:
   - `배포` → `배포 관리` → `편집` 버튼
   - 버전을 **"새 버전"**으로 변경
   - `배포` 클릭

### 2-2. CORS (Cross-Origin Resource Sharing) 오류

**증상:**

- Console에 CORS 관련 오류 메시지
- "Failed to fetch" 오류

**해결책:**

1. **Google Apps Script 재배포**
   - 액세스 권한이 "모든 사용자"로 설정되어 있는지 확인
2. **브라우저 캐시 삭제**
   - Ctrl+Shift+R (하드 새로고침)
   - 또는 개발자 도구에서 Network 탭 → "Disable cache" 체크

### 2-3. Google Sheets 권한 문제

**증상:**

- "권한이 없습니다" 오류
- 빈 데이터 반환

**해결책:**

1. **스프레드시트 공유 설정**

   - Google Sheets에서 `공유` 버튼 클릭
   - Apps Script 서비스 계정 이메일 추가 (편집자 권한)

2. **Apps Script 실행 권한**
   - Apps Script 에디터에서 `실행` → `doGet` 함수 실행
   - 권한 승인 대화상자가 나타나면 승인

### 2-4. 스프레드시트 구조 문제

**증상:**

- 데이터 형식 오류
- 일부 필드가 누락됨

**해결책:**

1. **헤더 행 확인**

   - A1~N1에 올바른 헤더가 있는지 확인
   - 헤더 순서: 제출일시, 이름, 생년월일, 하는일/전공, 사는곳, 세례여부, 교회출석기간, 제자훈련생각, 섬기는사역팀, 요즘관심사, 좋아하는찬양, 좋아하는음식, 싫어하는음식, 기도제목

2. **시트 이름 확인**
   - 시트 이름이 "Sheet1"인지 확인
   - 다른 이름이면 Apps Script 코드에서 수정

## 🔧 3. 고급 문제 해결

### 3-1. Apps Script 로그 확인

1. **Apps Script 에디터**에서 `실행` → `doGet` 실행
2. **실행 로그** 확인:
   - `보기` → `실행 내역`
   - 오류 메시지나 로그 확인

### 3-2. 네트워크 문제 진단

1. **개발자 도구 Network 탭**에서:

   - 요청 상태 코드 확인 (200, 404, 500 등)
   - 응답 헤더 확인
   - 응답 본문 내용 확인

2. **일반적인 상태 코드:**
   - `200`: 성공
   - `404`: URL을 찾을 수 없음 (잘못된 스크립트 ID)
   - `403`: 권한 없음
   - `500`: 서버 오류 (Apps Script 코드 오류)

### 3-3. 테스트 데이터 확인

현재 코드는 실제 데이터를 가져올 수 없을 때 테스트 데이터를 반환합니다:

```javascript
// 테스트 데이터가 표시되면 실제 Google Sheets 연결에 문제가 있음을 의미
{
  name: "테스트 사용자",
  occupation: "개발자",
  location: "서울시 강남구"
  // ...
}
```

## 📋 4. 체크리스트

문제 해결을 위한 단계별 체크리스트:

### ✅ Google Apps Script 설정

- [ ] 최신 코드로 업데이트됨
- [ ] 새 버전으로 재배포됨
- [ ] 액세스 권한: "모든 사용자"
- [ ] doGet 함수 실행 및 권한 승인

### ✅ Google Sheets 설정

- [ ] 시트 이름이 "Sheet1"
- [ ] A1~N1에 올바른 헤더 존재
- [ ] 최소 1개 이상의 데이터 행 존재
- [ ] Apps Script 서비스 계정에 편집자 권한 부여

### ✅ 브라우저/네트워크

- [ ] 브라우저 캐시 삭제
- [ ] 개발자 도구에서 오류 메시지 확인
- [ ] URL 직접 테스트로 응답 확인
- [ ] 네트워크 연결 상태 양호

### ✅ 코드 설정

- [ ] 올바른 Google Apps Script URL 사용
- [ ] 환경 변수 설정 (필요시)
- [ ] 최신 버전의 코드 사용

## 🆘 5. 여전히 해결되지 않는 경우

1. **Google Apps Script 완전 재생성:**

   - 새로운 Apps Script 프로젝트 생성
   - 코드 다시 붙여넣기
   - 새 URL로 배포

2. **브라우저 변경:**

   - Chrome, Firefox, Safari 등 다른 브라우저에서 테스트

3. **네트워크 환경 변경:**

   - 다른 Wi-Fi나 모바일 핫스팟 사용

4. **시간 간격:**
   - Google Apps Script 변경사항이 반영되는데 몇 분이 걸릴 수 있음

## 💡 6. 추가 팁

- **정기적인 백업:** 중요한 데이터는 정기적으로 백업
- **버전 관리:** Apps Script 코드 변경 시 버전 메모 작성
- **모니터링:** 정기적으로 연결 상태 확인
- **로그 활용:** Console.log를 활용한 디버깅

이 가이드를 따라해도 문제가 해결되지 않으면, 개발자 도구의 Console과 Network 탭 스크린샷을 함께 문의해주세요! 🙏
