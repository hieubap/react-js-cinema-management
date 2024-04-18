const { filmService } = require("./film/film.service");
const { roomService } = require("./room/room.service");
const { ticketService } = require("./ticket/ticket.service");
const { timeTableService } = require("./timetable/timetable.service");

const movie_router = (app) => {
  filmService(app);
  roomService(app);
  ticketService(app);
  timeTableService(app);
};
module.exports = { movie_router };
