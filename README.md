#  서비스 소개

<img src=https://github.com/hongandlee/apuda/assets/91598778/72e3da4d-ee5b-4203-87ee-757c212ab6e0/>

<br/>

## [👍 SmartChart 사용해보기](https://smartchart.vercel.app)
 의사 로그인: 아이디 - doctor@gmail.com 비밀번호 - doctor
 <br/>
 환자 로그인 : 아이디 patient@naver.com  비밀번호 - patient


<br />

## 📖 목차

- [팀원명](#팀원명)
- [프로젝트 설명](#프로젝트-설명)
- [프로젝트 실행 방법](#프로젝트-실행-방법)
- [프로젝트 gif](#프로젝트-gif)
- [배포링크](#배포링크)
- [협업과정](#협업과정)
- [팀 코드 컨벤션](#팀-코드-컨벤션)
- [과제목표](#과제목표)
- [폴더구조](#폴더구조)
- [사용기술](#사용기술)
- [Service Architecture](#Service-Architecture)

<br />

## 💪팀원명

 | <img src="https://avatars.githubusercontent.com/u/91598778?v=4" width="120" height="120" /> | <img src="https://avatars.githubusercontent.com/u/116433637?v=4" width="120" height="120" /> | <img src="https://avatars.githubusercontent.com/u/92508550?v=4" width="120" height="120" /> |
 :-----------------------------------------------------------------------------------------: | :--------------------------------------------------------------------------------------------------------------------------------------------: | :-----------------------------------------------------------------------------------------: |
|                           [jeongmin7](https://github.com/jeongmin7)                           |                                                     [dbfl720](https://github.com/dbfl720)                                                      |                          [hongwr](https://github.com/hongwr)                          |
|                                         이정민(front)                                          |                                                                   홍유리(Back)                                                                 |                                         홍왕열(front)                                          |


<br />

## 📝프로젝트 설명
환자는 SmartChart를 통해 병원예약, 문진, 실시간 의료상담, 진료비 확인 또는 지불할 수 있으며 의사는 예약된 환자를 관리하고 매출을 관리하는 등 환자와 의사의 소통을 돕는 서비스입니다. 

<br />

## 🖥프로젝트 실행 방법

```shell

# 프로젝트 clone
$ git clone https://github.com/jeongmin7/apuda.git

# client 파일로 접근
$ cd client

# npm 설치
$ npm install

# 프로젝트 실행
$ npm start

```
<br />

## 📝프로젝트 gif

<details>
  <summary>환자-회원가입 </summary>
    <div markdown="1">
     <img src=https://github.com/hongandlee/apuda/assets/91598778/894082a9-59f1-4cd2-88e1-7c360a844a16/>
    </div>
</details>
<details>
  <summary>환자-로그인</summary>
    <div markdown="1">
     <img src=https://github.com/hongandlee/apuda/assets/91598778/5d42578a-fba4-4392-ad70-136d12774e3d/>
    </div>
</details><details>
  <summary>환자-병원예약하기 </summary>
    <div markdown="1">
        <img src=https://github.com/hongandlee/apuda/assets/91598778/1d3425c7-863f-4b67-8778-8842041f874d/>
     병원예약하기
    <img src=https://github.com/hongandlee/apuda/assets/91598778/43618274-8105-4a6f-9750-ab159e3fa4bd/>
     내위치 주변 병원 찾기 
    <img src=https://github.com/hongandlee/apuda/assets/91598778/eee10e04-4e89-475f-ad8d-6c2c601be711/>
예약 불가
</div>
</details><details>
  <summary>환자-진료비 내기  </summary>
    <div markdown="1">
    <img src=https://github.com/hongandlee/apuda/assets/91598778/6e28563a-e9a3-40e8-b852-437d36604ed1/>
진료비 보기 
         <img src=https://github.com/hongandlee/apuda/assets/91598778/a5b85fc4-0aaa-4427-985d-587bd19fa820/>
     진료비 내기 
    </div>
</details><details>
  <summary>환자-스마트문진 </summary>
    <div markdown="1">
     <img src=https://github.com/hongandlee/apuda/assets/91598778/9715e828-c226-461f-b988-a47c617928e0/>
    </div>
</details><details>
  <summary>환자-마이페이지 </summary>
    <div markdown="1">
    <img src=https://github.com/hongandlee/apuda/assets/91598778/734a4344-9cd3-4feb-82af-4296feb64aa1/>
회원정보 수정(전화번호)
     <img src=https://github.com/hongandlee/apuda/assets/91598778/52639210-eeb6-4d25-843d-2468cd81f653/>
     예약 취소
    </div>
</details><details>
  <summary>의사-회원가입 </summary>
    <div markdown="1">
     <img src=https://github.com/hongandlee/apuda/assets/91598778/27f508a0-1d77-41e9-b577-0ea98652b305/>
    </div>
</details>
<details>
  <summary>의사-로그인</summary>
    <div markdown="1">
     <img src=https://github.com/hongandlee/apuda/assets/91598778/ee2c48b0-449a-485b-8efd-9780c088c97d/>
    </div>
</details>
<details>
  <summary>의사-예약/진료관리 </summary>
    <div markdown="1">
 <img src=https://github.com/hongandlee/apuda/assets/91598778/b976c296-5612-4780-ac31-9a5743561a84/>
     예약확정 문자
<img src=https://github.com/hongandlee/apuda/assets/91598778/d1dc6274-3419-40d9-ab29-29cd4c5da0c4/>
진료비 청구 
<img src=https://github.com/hongandlee/apuda/assets/91598778/55150fbf-2465-4b16-b62b-c8cb6427ebf8/>
예약관리 검색 
    <img src=https://github.com/hongandlee/apuda/assets/91598778/90cc0e72-6d35-4f54-aec6-3e63f2898912/>
     진료관리 
     <img src=https://github.com/hongandlee/apuda/assets/91598778/2ec2a25d-0c0d-401d-92c2-f90374ba3c02/>
     환자의 건강체크 확인 
    </div>
</details>
<details>
  <summary>의사-대기환자 관리  </summary>
    <div markdown="1">
<img src=https://github.com/hongandlee/apuda/assets/91598778/8e91f278-6569-4f1a-a5c5-83afe3f4f665/>
    </div>
</details>
<details>
  <summary>의사-매출관리 </summary>
    <div markdown="1">
    <img src=https://github.com/hongandlee/apuda/assets/91598778/2d6236d3-0164-4444-8342-0de119eb290b/>
    </div>
</details>
<details>
  <summary>의사-병원페이지(정보 수정)</summary>
    <div markdown="1">
     <img src=https://github.com/hongandlee/apuda/assets/91598778/5294da15-5482-4608-ae94-f0a4e3848e40/>
    </div>
</details>
<details>
  <summary>공용-비밀번호 찾기  </summary>
    <div markdown="1">
    <img src=https://github.com/hongandlee/apuda/assets/91598778/6323f76a-406c-49fa-a11f-6075f6544112/>
    </div>
</details>
<details>
  <summary>공용-실시간 진료 관리  </summary>
    <div markdown="1">
    <img src=https://github.com/hongandlee/apuda/assets/91598778/d9630304-02e8-4798-b7b4-9048b3ea3faf/>
    </div>
</details>


<br />

## 📌배포링크

https://smartchart.vercel.app

<br />
<br />


 
## 😊협업과정


<br />

#### 💡팀 코드 컨벤션

- git commit message 컨벤션

| 커밋 유형        | 의미                                                         |
| ---------------- | ------------------------------------------------------------ |
| Feat             | 새로운 기능 추가                                             |
| Fix              | 버그, 기능 수정                                              |
| Docs             | 문서 수정                                                    |
| Style            | 코드 formatting, 세미콜론 누락, 코드 자체의 변경이 없는 경우 |
| Refactor         | 코드 리팩토링                                                |
| Test             | 테스트 코드, 리팩토링 테스트 코드 추가                       |
| Chore            | 패키지 매니저 수정, 그 외 기타 수정 ex) .gitignore           |
| Design           | CSS 등 사용자 UI 디자인 변경                                 |
| Comment          | 필요한 주석 추가 및 변경                                     |
| Rename           | 파일 또는 폴더 명을 수정하거나 옮기는 작업만인 경우          |
| Remove           | 파일을 삭제하는 작업만 수행한 경우                           |
| !BREAKING CHANGE | 커다란 API 변경의 경우                                       |
| !HOTFIX          | 급하게 치명적인 버그를 고쳐야 하는 경우                      |
| Setting          | prettier, eslint 등 전역 설정 변경, 삭제, 추가하는 경우      |
| ReadMe           | 리드미파일 추가, 수정, 삭제                                  |

<br />

## 목표

#### 병원 예약하기
- 지도 api를 사용하여 원하는 병원을 찾고 내 주변에 있는 병원을 검색할 수 있습니다.
- 병원을 선택한 후 해당병원이 특정시간에 예약가능한지 확인 후 예약할 수 있습니다.
#### 병원비 지불하기
- 환자는 처방된 내역을 확인 할 수 있으면 카카오 페이를 통해 지불할 수 있습니다.
#### 환자 관리하기 
- 의사는 예약한 환자들의 데이터를 한번에 관리 할 수 있습니다.
- 환자가 작성한 문진 리스트를 확인하고 진료비를 청구하거나 진료 내역을 저장할 수 있습니다.
#### 환자 대기 관리 
- 드래그앤드롭을 사용해여 그 날 방문 예정인 환자의 상태를 대기중, 진료중, 완료로 구별하여 관리 할 수 있습니다.
#### 병원 매출관리 조회 
- Chart.js를 사용하여 의사는 병원의 매출을 한번에 관리할 수 있습니다. 년별, 월별, 주별, 일별, 기간별 데이터를 한번에 확인 할 수 있습니다. 
#### 실시간 진료 상담
- WebSocket을 사용하여 환자와 의사가 실시간으로 채팅할 수 있도록 구현하였습니다. 

<br />


## 📁폴더구조

```

📦src
 ┣ 📂Container
 ┃ ┣ 📜AccountingContainer.jsx
 ┃ ┣ 📜AdminAppointmentContainer.jsx
 ┃ ┣ 📜AdminWaitingListContainer.jsx
 ┃ ┣ 📜AppointmentContainer.jsx
 ┃ ┣ 📜BillingContainer.jsx
 ┃ ┣ 📜ChatContainer.jsx
 ┃ ┣ 📜HospitalContainer.jsx
 ┃ ┣ 📜LoginContainer.jsx
 ┃ ┣ 📜MakeAppointmentContainer.jsx
 ┃ ┣ 📜MypageContainer.jsx
 ┃ ┣ 📜PayContainer.jsx
 ┃ ┣ 📜SelfDiagnosisContainer.jsx
 ┃ ┗ 📜SignUpContainer.jsx
 ┣ 📂assets
 ┃ ┣ 📜ChatIcon.jsx
 ┃ ┣ 📜doctor_female.png
 ┃ ┣ 📜doctor_male.png
 ┃ ┣ 📜patient.png
 ┃ ┣ 📜questions.js
 ┃ ┗ 📜smartLogo.png
 ┣ 📂components
 ┃ ┣ 📂api
 ┃ ┃ ┗ 📜index.js
 ┃ ┣ 📂chart
 ┃ ┃ ┣ 📜AverageAgeChart.jsx
 ┃ ┃ ┣ 📜DailyChart.jsx
 ┃ ┃ ┣ 📜LatestChart.jsx
 ┃ ┃ ┣ 📜MonthlyChart.jsx
 ┃ ┃ ┣ 📜PatientGenderTrends.jsx
 ┃ ┃ ┣ 📜PeriodChart.jsx
 ┃ ┃ ┣ 📜RecentChart.jsx
 ┃ ┃ ┣ 📜RevenueChart.jsx
 ┃ ┃ ┣ 📜Table.jsx
 ┃ ┃ ┣ 📜WeeklyChart.jsx
 ┃ ┃ ┗ 📜YearlyChart.jsx
 ┃ ┣ 📜AccountingComponent.jsx
 ┃ ┣ 📜AdminAppointmentComponent.jsx
 ┃ ┣ 📜AdminWaitingListComponent.jsx
 ┃ ┣ 📜AppointmentComponent.jsx
 ┃ ┣ 📜BillingComponent.jsx
 ┃ ┣ 📜Button.jsx
 ┃ ┣ 📜ChatComponent.jsx
 ┃ ┣ 📜CheckBox.jsx
 ┃ ┣ 📜DatePickerComponent.jsx
 ┃ ┣ 📜HospitalComponent.jsx
 ┃ ┣ 📜InfoBox.jsx
 ┃ ┣ 📜Input.jsx
 ┃ ┣ 📜Invoice.jsx
 ┃ ┣ 📜Loader.jsx
 ┃ ┣ 📜LoginComponent.jsx
 ┃ ┣ 📜Logo.jsx
 ┃ ┣ 📜MakeAppointmentComponent.jsx
 ┃ ┣ 📜Map.jsx
 ┃ ┣ 📜MapComponent.jsx
 ┃ ┣ 📜Maps.jsx
 ┃ ┣ 📜Markers.jsx
 ┃ ┣ 📜Modal.jsx
 ┃ ┣ 📜MypageComponent.jsx
 ┃ ┣ 📜NavItem.jsx
 ┃ ┣ 📜Pagination.jsx
 ┃ ┣ 📜PatientBill.jsx
 ┃ ┣ 📜PayComponent.jsx
 ┃ ┣ 📜SalesTable.jsx
 ┃ ┣ 📜SaveIdCheckbox.jsx
 ┃ ┣ 📜SearchHospital.jsx
 ┃ ┣ 📜SelectData.jsx
 ┃ ┣ 📜SelfDiagnosisComponent.jsx
 ┃ ┣ 📜SendSMS.jsx
 ┃ ┣ 📜SignUpComponent.jsx
 ┃ ┣ 📜ToolTip.jsx
 ┃ ┗ 📜TreatmentAndCost.jsx
 ┣ 📂hooks
 ┃ ┗ 📜useActiveChart.js
 ┣ 📂layout
 ┃ ┗ 📜Navbar.jsx
 ┣ 📂modules
 ┃ ┗ 📂define
 ┃ ┃ ┗ 📜path.js
 ┣ 📂pages
 ┃ ┣ 📜Accounting.jsx
 ┃ ┣ 📜AdminAppointment.jsx
 ┃ ┣ 📜AdminWaitingList.jsx
 ┃ ┣ 📜Appointment.jsx
 ┃ ┣ 📜Billing.jsx
 ┃ ┣ 📜Chat.jsx
 ┃ ┣ 📜HospitalPage.jsx
 ┃ ┣ 📜Login.jsx
 ┃ ┣ 📜MakeAppointment.jsx
 ┃ ┣ 📜MedicalCareManagement.jsx
 ┃ ┣ 📜MyPage.jsx
 ┃ ┣ 📜NotFound.jsx
 ┃ ┣ 📜Pay.jsx
 ┃ ┣ 📜SelfDiagnosis.jsx
 ┃ ┣ 📜SignUp.jsx
 ┃ ┗ 📜TeleConsult.jsx
 ┣ 📂stores
 ┃ ┣ 📜answerAtom.js
 ┃ ┣ 📜billingStatusAtom.js
 ┃ ┣ 📜dateAtom.js
 ┃ ┣ 📜invoiceAtom.js
 ┃ ┣ 📜sizeStore.js
 ┃ ┗ 📜userInfo.js
 ┣ 📂styles
 ┃ ┣ 📜CommonStyle.js
 ┃ ┣ 📜GlobalStyles.js
 ┃ ┗ 📜TableStyle.js
 ┣ 📜App.css
 ┣ 📜App.js
 ┣ 📜index.css
 ┣ 📜index.js
 ┣ 📜routesCollection.js
 ┗ 📜setupProxy.js


```

<br />

## 🛠사용기술

### Front
<div align=left>
<img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black"/>
<img src="https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=React&logoColor=white" >
<img src="https://img.shields.io/badge/Recoil-3578E5?style=for-the-badge&logo=recoil&logoColor=white" />
<img src="https://img.shields.io/badge/styledcomponents-DB7093?style=for-the-badge&logo=styledcomponents&logoColor=white" >
<img src="https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=Vercel&logoColor=white"/>
<img src="https://img.shields.io/badge/sockJS-010101?style=for-the-badge&logo=socket.io&logoColor=white"> 
<img src="https://img.shields.io/badge/StompJS-010101?style=for-the-badge&logo=STOMP&logoColor=white">
</div>

### Back
<div align=left>
<img src="https://img.shields.io/badge/java-007396?style=for-the-badge&logo=java&logoColor=white"> <img src="https://img.shields.io/badge/spring-6DB33F?style=for-the-badge&logo=spring&logoColor=black">  <img src="https://img.shields.io/badge/SpringBoot-6DB33F?style=for-the-badge&logo=SpringBoot&logoColor=black"> 
 <img src="https://img.shields.io/badge/springsecurity-6DB33F?style=for-the-badge&logo=springsecurity&logoColor=white">
 <img src="https://img.shields.io/badge/WebSocket-010101?style=for-the-badge&logo=WebSocket&logoColor=white">
<img src="https://img.shields.io/badge/sockJS-010101?style=for-the-badge&logo=socket.io&logoColor=white"> 
 <img src="https://img.shields.io/badge/STOMP-010101?style=for-the-badge&logo=STOMP&logoColor=white">
 <img src="https://img.shields.io/badge/JPA-F0047F?style=for-the-badge&logo=JPA&logoColor=white">
  <img src="https://img.shields.io/badge/MySQL-4479A1?style=for-the-badge&logo=MySQL&logoColor=white">
  <img src="https://img.shields.io/badge/amazons3-569A31?style=for-the-badge&logo=amazons3&logoColor=black">
<img src="https://img.shields.io/badge/amazonec2-FF9900?style=for-the-badge&logo=amazonec2&logoColor=black">
<img src="https://img.shields.io/badge/amazonrds-527FFF?style=for-the-badge&logo=amazonrds&logoColor=black">
<img src="https://img.shields.io/badge/githubactions-2088FF?style=for-the-badge&logo=githubactions&logoColor=black">
<img src="https://img.shields.io/badge/amazonCodeDeploy-F7A81B?style=for-the-badge&logo=amazonCodeDeploy&logoColor=black">
<img src="https://img.shields.io/badge/nginx-009639?style=for-the-badge&logo=nginx&logoColor=black">
<img src="https://img.shields.io/badge/ubuntu-E95420?style=for-the-badge&logo=ubuntu&logoColor=black">
</div>
<br />

## Service Architecture
<img src=https://github.com/hongandlee/apuda/assets/91598778/3ca4894a-8a4d-4a7b-80c2-b58db391635f/>

<br />
