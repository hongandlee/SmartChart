# SmartChart

>
>
> 기간 : 2023년 8월 1일 ~ 2023년 12월 18일

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

<br />

## 💪팀원명

 | <img src="https://avatars.githubusercontent.com/u/91598778?v=4" width="120" height="120" /> | <img src="https://avatars.githubusercontent.com/u/116433637?v=4" width="120" height="120" /> | <img src="https://avatars.githubusercontent.com/u/92508550?v=4" width="120" height="120" /> |
 :-----------------------------------------------------------------------------------------: | :--------------------------------------------------------------------------------------------------------------------------------------------: | :-----------------------------------------------------------------------------------------: |
|                           [jeongmin7](https://github.com/jeongmin7)                           |                                                     [dbfl720](https://github.com/dbfl720)                                                      |                          [hongwr](https://github.com/hongwr)                          |
|                                         이정민(front)                                          |                                                                   홍유리(Back)                                                                 |                                         홍왕열(front)                                          |


<br />

## 📝프로젝트 설명
환자는 SmartChart를 통해 병원예약, 문진, 실시간 의료상담, 진료비 관리를 진행할 수 있으며 의사는 예약된 환자를 관리하고 매출을 관리하는 등 환자와 의사의 소통을 돕는 서비스입니다. 

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
  <summary>1 </summary>
    <div markdown="1">
    </div>
</details>


<details>
  <summary>2</summary>
    <div markdown="1">
    </div>
</details>

<details>
  <summary>3</summary>
    <div markdown="1">
    </div>
</details>

<details>
  <summary> 4  </summary>
    <div markdown="1">
     
    </div>
</details>



<br />

## 📌배포링크

https://smartchart.store

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

## 💯과제목표

#### 로그인 

- 
#### 병원 예약하기

- 

#### 환자 관리하기 

- 



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
 ┃ ┣ 📜kakao_login_medium_wide.png
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
 ┗ 📜routesCollection.js


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
 </div>

### Back
<div align=left>
<img src="https://img.shields.io/badge/java-007396?style=for-the-badge&logo=java&logoColor=white"/>
<img src="https://img.shields.io/badge/Spring-6DB33F?style=for-the-badge&logo=Spring&logoColor=white"/>
<img src="https://img.shields.io/badge/Amazon AWS-232F3E?style=for-the-badge&logo=amazonaws&logoColor=white"/>
<img src="https://img.shields.io/badge/MySQL-4479A1?style=for-the-badge&logo=MySQL&logoColor=white"/>

</div>
<br />
