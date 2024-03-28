import React from "react";
import ManagerFilm from "../views/manager/film";
import ManagerTimetable from "../views/manager/timetable";
import ManagerTicket from "../views/manager/ticket";
import AdminHeader from "@/components/headers/AdminHeader";
import {
  Redirect,
  Route,
  Switch,
} from "react-router-dom/cjs/react-router-dom.min";
import Footer from "@/components/Footer";
import ManagerRoom from "../views/manager/room";

export const managerRoutes = [
  {
    name: "Phim",
    path: "/manager/film",
    //   icon: <Icon as={MdPerson} width="20px" height="20px" color="inherit" />,
    component: ManagerFilm,
  },
  {
    name: "Phòng",
    path: "/manager/room",
    //   icon: <Icon as={MdPerson} width="20px" height="20px" color="inherit" />,
    component: ManagerRoom,
  },
  {
    name: "Lịch chiếu",
    path: "/manager/schedule",
    //   icon: <Icon as={MdPerson} width="20px" height="20px" color="inherit" />,
    component: ManagerTimetable,
  },
  {
    name: "Vé",
    path: "/manager/ticket",
    //   icon: <Icon as={MdPerson} width="20px" height="20px" color="inherit" />,
    component: ManagerTicket,
  },
];

function ManagerLayout() {
  return (
    <div>
      <AdminHeader />
      <Switch>
        {managerRoutes.map((item, index) => (
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
