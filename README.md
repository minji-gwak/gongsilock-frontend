# 공시락 프론트엔드 (Gongsilock Frontend)
![공시락 Gongsilock](https://github.com/Dosilock/Frontend/assets/48979587/90f35306-037a-42c0-be58-843b49872499)

공시락 서비스의 프론트엔드 레포지토리입니다.

_**🚧 현재 서비스를 개발하고 있습니다.**_

## 목차

1. [📖 프로젝트 개요 (Project Overview)](-#프로젝트-개요-project-overview)
2. [✨ 기능 (Features)](-#기능-features)
3. [🚀 시작하기 (Getting Started)](-#시작하기-getting-started)
   - [📋 필수 조건 (Prerequisites)](-#필수-조건-prerequisites)
   - [💻 설치 (Installation)](-#설치-installation)
   - [▶️ 실행 (Running the Project)](-#실행-running-the-project)
4. [📂 폴더 구조 (Folder Structure)](-#폴더-구조-folder-structure)
5. [🛠️ 사용된 기술 (Technologies Used)](-#사용된-기술-technologies-used)
6. [📜 스크립트 (Scripts)](-#스크립트-scripts)
7. [🧪 테스트 (Testing)](-#테스트-testing)
8. [🤝 기여 (Contributing)](-#기여-contributing)
9. [📄 라이센스 (License)](-#라이센스-license)
10. [📬 문의 (Contact)](-#문의-contact)

## 📖 프로젝트 개요 (Project Overview)

> 여러분의 하루 시간표를 계획하고 실천하는 데 도움을 주는 멋진 스터디 서비스에요.
- 혼자서 하루 계획을 짜기 어려우신 분들을 위해, 공시락은 같은 목표를 가진 **친구들과 함께 시간을 보내며 서로 격려할 수 있는 환경**을 마련해 주고 있어요.
- 이렇게 함께 공부하다 보면, 여러분의 하루를 더욱 계획적으로 보내고 **정서적 지지와 동기부여**를 받아 개인의 의지와 마음가짐을 다질 수 있답니다.
- 공시락 서비스는 여러분이 **보다 생산적이고 보람찬 하루**를 보내실 수 있도록 도와드리며, 나아가 여러분의 **성취감을 높이고 삶의 질을 향상**시키는 것을 목표로 하고 있어요.
- 앞으로도 공시락 서비스가 여러분의 하루를 더욱 알차고 행복하게 만들어 드릴 수 있도록 최선을 다하겠습니다.

## ✨ 기능 (Features)

- 사용자 인증 및 프로필 관리
- 반 생성 및 가입
- 시간표 생성 및 관리
- 실시간 공부 시간 공유 및 랭킹 시스템
- 실시간 캠/채팅

## 🚀 시작하기 (Getting Started)

### 📋 필수 조건 (Prerequisites)

- Node.js (버전 16 이상)
- npm 또는 pnpm

### 💻 설치 (Installation)

>```bash
>git clone https://github.com/dosilock/frontend.git
>cd frontend
>pnpm install
>```

### ▶️ 실행 (Running the Project)

>```bash
>pnpm devs
>```

## 📂 폴더 구조 (Folder Structure)

- 추후 작성 예정

## 🛠️ 사용된 기술 (Technologies Used)

- Next.js (React 프레임워크)
- Tailwind CSS (스타일링)
- Zustand (상태 관리)
- Axios (HTTP 클라이언트)
- Socket.IO (실시간 통신)
- Zod (데이터 유효성 검사)
- React Hook Form (폼 관리)

## 📜 스크립트 (Scripts)

>```json
>{
>  "scripts": {
>    "dev": "next dev",
>    "devs": "next dev --experimental-https",
>    "build": "next build",
>    "start": "next start",
>    "lint": "next lint",
>    "prepare": "husky"
>  }
>}
>```

- `dev`: 개발 서버 실행
- `devs`: HTTPS 모드로 개발 서버 실행
- `build`: 프로덕션 빌드
- `start`: 프로덕션 서버 실행
- `lint`: 코드 린팅
- `prepare`: Husky 설정

## 🧪 테스트 (Testing)

- 현재 프로젝트에는 테스트 프레임워크나 라이브러리가 포함되어 있지 않습니다.
- 추후 테스트 코드를 추가할 예정입니다.

## 📄 라이센스 (License)

>```markdown
>This project is licensed under the MIT License - see the LICENSE file for details.
>```

## 📬 문의 (Contact)

- 프로젝트 관련 문의는 [이슈](https://github.com/dosilock/frontend/issues)를 통해 할 수 있습니다.
- 메인테이너: [팀 도시락](https://github.com/dosilock)
