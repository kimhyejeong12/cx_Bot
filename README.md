# cx_Bot

간단한 고객경험(CX) 챗봇 데모 프로젝트입니다. 이 저장소는 React + Vite 기반 프론트엔드에 Gemini(또는 유사 LLM) 연동 서비스를 포함하며, 로컬에서 빠르게 실행하고 개발할 수 있도록 구성되어 있습니다.

## 주요 기능

- React(Typescript) 기반 UI 컴포넌트
- Gemini API 연동 서비스(`services/geminiService.ts`)
- 메시지 버블, 채팅 입력 등 기본 채팅 위젯 컴포넌트

## 요구사항

- Node.js 18+ (권장)
- npm 또는 yarn

## 빠른 시작

1. 저장소 루트에서 의존성 설치

npm install

2. 환경변수 설정

프로젝트는 Gemini(또는 GenAI) API 키를 필요로 합니다. 루트에 `.env.local` 파일을 만들고 다음 값을 설정하세요:

```
GEMINI_API_KEY=your_gemini_api_key_here
```

3. 개발 서버 실행

```bash
npm run dev
```

4. 빌드 및 미리보기

```bash
npm run build
npm run preview
```

> `package.json`의 스크립트:

- `dev` : 개발 서버(vite)
- `build` : 프로덕션 빌드
- `preview` : 빌드 결과 미리보기

## 프로젝트 구조 (요약)

- `App.tsx` - 앱 진입점
- `index.tsx`, `index.html`, `vite.config.ts` - Vite/React 설정
- `components/` - UI 컴포넌트
  - `ChatWidget.tsx`, `ChatInput.tsx`, `MessageBubble.tsx`
- `services/` - 외부 서비스 연동 코드
  - `geminiService.ts` - Gemini API 호출 및 래퍼
- `constants.ts`, `types.ts` - 상수 및 타입 정의

전체 구조는 루트 폴더를 참고하세요.

## geminiService (간단 설명)

`services/geminiService.ts`는 Gemini(혹은 @google/genai) 클라이언트를 초기화하고, 챗 메시지를 전송/수신하는 역할을 합니다. 실제 API 호출 전에 환경변수 `GEMINI_API_KEY`가 설정되어 있어야 합니다. 보안상 키는 절대 커밋하지 마세요.

예시 흐름:

1. 프론트엔드에서 사용자가 메시지 입력
2. 컴포넌트는 `geminiService`에 요청을 보냄
3. `geminiService`가 Gemini API로 요청, 응답을 받아 반환
