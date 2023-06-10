
import React from "react";
import './index.css';
import ReactDOM from "react-dom/client";
import {
  BrowserRouter,  // Đây là một component từ thư viện react-router-dom để cung cấp định tuyến cho ứng dụng React. thay đổi URL và đồng bộ hóa hiển thị giao diện.
  RouterProvider,  // Đây là một component từ thư viện react-router-dom để cung cấp Context Provider cho định tuyến
} from "react-router-dom";
import "./index.css";
import App from "./App";


ReactDOM.createRoot(document.getElementById("root")).render(  //ReactDOM.createRoot Phương thức này chỉ có sẵn từ phiên bản React 18 trở đi
  <React.StrictMode>
    <BrowserRouter><App></App></BrowserRouter>

  </React.StrictMode>
);