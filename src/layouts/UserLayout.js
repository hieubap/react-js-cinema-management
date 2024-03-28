import React from "react";
import {
    Route,
    Router,
    Switch,
    Redirect,
  } from "react-router-dom/cjs/react-router-dom.min";
import SignIn from "../views/user/sign-in";
import SignUp from "../views/user/sign-up";
import PageHeader from "@/components/headers/PageHeader";
import Footer from "@/components/Footer";

function UserLayout() {
    const routes = [
        {
          name: "Đăng nhập",
          path: "/user/sign-in",
          //   icon: <Icon as={MdPerson} width="20px" height="20px" color="inherit" />,
          component: SignIn,
        },
        {
            name: "Đăng ký",
            path: "/user/sign-up",
            //   icon: <Icon as={MdPerson} width="20px" height="20px" color="inherit" />,
            component: SignUp,
          },
      ];
  return (
    <div>
      <PageHeader />
      <Switch>
        {routes.map((item, index) => (
          <Route
            exact
            path={item.path}
            key={index}
            component={item.component}
          />
        ))}
        <Redirect from="/user" to="/user/sign-in" />
      </Switch>
      <Footer />
    </div>
  );
}

export default UserLayout;
