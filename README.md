# 자기소개 폼 프로젝트

Next.js, TypeScript, React Hook Form, Zustand, Zod, Tailwind CSS, shadcn/ui를 활용한 완전한 개발환경 데모입니다.

## 🚀 기술 스택

- **Next.js 15** - React 프레임워크
- **TypeScript** - 타입 안전성
- **React Hook Form** - 폼 상태 관리 및 유효성 검사
- **Zustand** - 전역 상태 관리
- **Zod** - 스키마 유효성 검사
- **Tailwind CSS** - 유틸리티 기반 CSS 프레임워크
- **shadcn/ui** - 재사용 가능한 UI 컴포넌트

## 📁 프로젝트 구조

```
src/
├── app/
│   ├── globals.css          # 글로벌 스타일
│   ├── layout.tsx           # 루트 레이아웃
│   └── page.tsx             # 메인 페이지
├── components/
│   ├── ui/                  # shadcn/ui 컴포넌트들
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── form.tsx
│   │   ├── input.tsx
│   │   ├── label.tsx
│   │   └── select.tsx
│   └── IntroduceForm.tsx    # 메인 폼 컴포넌트
├── lib/
│   ├── schemas.ts           # Zod 스키마 정의
│   └── utils.ts             # 유틸리티 함수
└── store/
    └── userStore.ts         # Zustand 스토어
```

## 🛠️ 주요 기능

### 1. 폼 유효성 검사

- **Zod 스키마**로 강력한 타입 안전성과 유효성 검사
- **React Hook Form**으로 효율적인 폼 상태 관리
- 실시간 에러 메시지 표시

### 2. 전역 상태 관리

- **Zustand**로 간단하고 효율적인 상태 관리
- 로컬 스토리지에 자동 저장 (persist 미들웨어)
- DevTools 지원

### 3. 현대적인 UI

- **shadcn/ui**로 일관된 디자인 시스템
- **Tailwind CSS**로 반응형 디자인
- 접근성을 고려한 컴포넌트

### 4. TypeScript 지원

- 완전한 타입 안전성
- IntelliSense 지원
- 컴파일 타임 에러 검출

## 🚀 시작하기

### 필수 조건

- Node.js 18.0 이상
- npm 또는 yarn

### 설치 및 실행

1. 의존성 설치:

```bash
npm install
```

2. 개발 서버 실행:

```bash
npm run dev
```

3. 브라우저에서 [http://localhost:3000](http://localhost:3000) 접속

### 빌드

```bash
npm run build
npm start
```

## 📚 사용된 라이브러리 설정

### React Hook Form + Zod

```typescript
const form = useForm<UserProfileFormData>({
  resolver: zodResolver(userProfileSchema),
  defaultValues: {
    /* ... */
  },
});
```

### Zustand 스토어

```typescript
export const useUserStore = create<UserState>()(
  devtools(
    persist(
      (set, get) => ({
        // 상태 및 액션 정의
      }),
      { name: "user-storage" }
    )
  )
);
```

### Zod 스키마

```typescript
export const userProfileSchema = z.object({
  name: z.string().min(2, "이름은 최소 2글자 이상이어야 합니다."),
  email: z.string().email("올바른 이메일 형식을 입력해주세요."),
  // ...
});
```

## 🎨 UI 컴포넌트

shadcn/ui 컴포넌트를 사용하여 일관된 디자인 시스템을 구축했습니다:

- **Button** - 다양한 variant와 size 지원
- **Input** - 폼 입력 필드
- **Card** - 콘텐츠 컨테이너
- **Form** - React Hook Form과 통합된 폼 컴포넌트
- **Select** - 드롭다운 선택 컴포넌트

## 🔧 개발 팁

1. **타입 안전성**: Zod 스키마에서 TypeScript 타입을 자동 추론
2. **상태 관리**: Zustand의 간단한 API로 복잡한 상태 로직 구현
3. **폼 최적화**: React Hook Form의 uncontrolled 컴포넌트로 성능 최적화
4. **스타일링**: Tailwind의 유틸리티 클래스로 빠른 스타일링

## 📄 라이선스

MIT License
