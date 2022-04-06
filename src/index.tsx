import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import axios from "axios";
import Auth from "./context/Auth";
axios.defaults.baseURL = "https://app-chatnodejs.herokuapp.com/api/v1";


const container: any = document.getElementById("root");
const root = ReactDOM.createRoot(container);
root.render(
  <Auth>
    <App />
  </Auth>
);
