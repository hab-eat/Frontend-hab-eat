import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

// 전역적인 설정을 관리 하는 파트이다.
// src파일의 입구 파일이라고 할 수 있는 index.js가 있다. npm start 명령어를 사용해서 create-react-app을 구동시키면 index.js를 찾아서 적혀 있는 코드에 따라 작동이 되게 된다.
// index.js에는 여러 전역 설정들이 들어간다. 이후에 app.js에서 내용을 편집하면서 ui를 변경하면된다.

