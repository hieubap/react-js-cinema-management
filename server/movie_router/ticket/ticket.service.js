const { Router } = require("express");
const { authMiddleware } = require("../../config/auth.middleware");
const TicketModel = require("./ticket.model");
const TimetableModel = require("../timetable/timetable.model");
const RoomModel = require("../room/room.model");
const FilmModel = require("../film/film.model");

const router = Router();

const ticketService = (app) => {
  app.use("/movie/ticket", router);

  router.get("/:id", async (req, res, next) => {
    const ticket = await TicketModel.findOne({
      _id: req.params.id,
    });
    const timetable = await TimetableModel.findOne({
      _id: ticket.timetableId,
    });
    const film = await FilmModel.findOne({
      _id: timetable.filmId,
    });
    const room = await RoomModel.findOne({
      _id: timetable.roomId,
    });
    const result = {
      ticket,
      timetable,
      film,
      room,
    };
    res.json({ code: 200, data: result });
  });

  router.get("", async (req, res, next) => {
    const result = await TicketModel.aggregate([
      {
        $match: {
          [req.query?.timetableId ? "timetableId" : ""]: req.query?.timetableId,
        },
      },
      {
        $addFields: {
          timetableObjectId: { $toObjectId: "$timetableId" },
        },
      },
      {
        $lookup: {
          from: "movie___timetables",
          localField: "timetableObjectId",
          foreignField: "_id",
          as: "timetable",
        },
      },
      {
        $set: {
          timetable: { $arrayElemAt: ["$timetable", 0] },
        },
      },
      {
        $addFields: {
          // Convert _bId to ObjectId type
          filmObjectId: { $toObjectId: "$timetable.filmId" },
          roomObjectId: { $toObjectId: "$timetable.roomId" },
        },
      },
      {
        $lookup: {
          from: "movie___rooms",
          localField: "roomObjectId",
          foreignField: "_id",
          as: "room",
        },
      },
      {
        $lookup: {
          from: "movie___films",
          localField: "filmObjectId",
          foreignField: "_id",
          as: "film",
        },
      },
      {
        $set: {
          film: { $arrayElemAt: ["$film", 0] },
          room: { $arrayElemAt: ["$room", 0] },
        },
      },
      {
        $sort: {
          createdAt: -1,
        },
      },
    ]);
    res.json({ code: 200, data: result });
  });

  router.post("", async (req, res, next) => {
    try {
      const body = req.body;
      if (["timetableId", "phone", "positions"].some((k) => !body[k])) {
        res.json({
          code: 400,
          message: "timetableId, phone, positions is required",
        });
        return;
      }

      const productModel = new TicketModel(req.body);

      await productModel.save();
      res.json({
        code: 0,
        data: productModel,
      });
    } catch (e) {
      res.json({
        code: 500,
        message: e?.toString(),
      });
    }
  });

  router.put("", async (req, res, next) => {
    try {
      const body = req.body;

      const id = body._id;
      delete body._id;
      delete body.createdAt;
      delete body.updatedAt;
      console.log(body, "body");

      const data = await TicketModel.updateOne({ _id: id }, body);

      res.json({
        code: 0,
        data,
      });
    } catch (error) {
      res.json({
        code: 500,
        message: error?.message,
      });
    }
  });
};

module.exports = {
  ticketService,
};
