import React from "react";
import PageHome from "../views/page/home";
import {
  Route,
  Router,
  Switch,
  Redirect,
} from "react-router-dom/cjs/react-router-dom.min";
import PageHeader from "@/components/headers/PageHeader";
import Footer from "@/components/Footer";
import PageFilm from "../views/page/film";

function PageLayout() {
  const routes = [
    {
      name: "Trang chủ",
      path: "/page/home",
      //   icon: <Icon as={MdPerson} width="20px" height="20px" color="inherit" />,
      component: PageHome,
    },
    {
        name: "Film",
        path: "/page/film/:id",
        //   icon: <Icon as={MdPerson} width="20px" height="20px" color="inherit" />,
        component: PageFilm,
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
        <Redirect from="/page" to="/page/home" />
      </Switch>
      <Footer />
    </div>
  );
}

export default PageLayout;
