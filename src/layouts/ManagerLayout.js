import React from "react";
import ManagerFilm from "../views/manager/film";
import ManagerRoom from "../views/manager/room";
import ManagerSchedule from "../views/manager/schedule";
import ManagerTicket from "../views/manager/ticket";
import AdminHeader from "@/components/headers/AdminHeader";
import { Redirect, Route, Switch } from "react-router-dom/cjs/react-router-dom.min";
import Footer from "@/components/Footer";

function ManagerLayout() {
  const routes = [
    {
      name: "Film",
      path: "/manager/film",
      //   icon: <Icon as={MdPerson} width="20px" height="20px" color="inherit" />,
      component: ManagerFilm,
    },
    {
      name: "Room",
      path: "/manager/room",
      //   icon: <Icon as={MdPerson} width="20px" height="20px" color="inherit" />,
      component: ManagerRoom,
    },
    {
      name: "Schedule",
      path: "/manager/schedule",
      //   icon: <Icon as={MdPerson} width="20px" height="20px" color="inherit" />,
      component: ManagerSchedule,
    },
    {
      name: "Ticket",
      path: "/manager/ticket",
      //   icon: <Icon as={MdPerson} width="20px" height="20px" color="inherit" />,
      component: ManagerTicket,
    },
  ];

  return (
    <div>
      <AdminHeader />
      <Switch>
        {routes.map((item, index) => (
          <Route
            exact
            path={item.path}
            key={index}
            component={item.component}
          />
        ))}
        <Redirect from="/manager" to="/manager/film" />
      </Switch>
      <Footer />
    </div>
  );
}

export default ManagerLayout;
