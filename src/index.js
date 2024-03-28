import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import { Switch, BrowserRouter } from "react-router-dom";
import { Route } from "react-router-dom";
import UserLayout from "./layouts/UserLayout";
import ManagerLayout from "./layouts/ManagerLayout";
import { Redirect } from "react-router-dom/cjs/react-router-dom.min";
import PageLayout from "./layouts/PageLayout";
import "./template/css/bootstrap.min.css";
import "./template/css/elegant-icons.css";
import "./template/css/font-awesome.min.css";
import "./template/css/nice-select.css";
import "./template/css/owl.carousel.min.css";
import "./template/css/plyr.css";
import "./template/css/slicknav.min.css";
import "./template/css/style.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <Switch>
      <Route path={`/page`} component={PageLayout} />
      <Route path={`/user`} component={UserLayout} />
      <Route path={`/manager`} component={ManagerLayout} />
      <Redirect from="/" to="/page" />
    </Switch>
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
