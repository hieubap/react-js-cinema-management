const { Router } = require("express");
const { authMiddleware } = require("../../config/auth.middleware");
const TimetableModel = require("./timetable.model");
// const { ObjectId } = require("mongoose");
const ObjectId = require("mongoose").Types.ObjectId;

const router = Router();

const timeTableService = (app) => {
  app.use("/movie/timetable", router);

  router.get("", async (req, res, next) => {
    const matchItem = {};

    if (req.query?.id) {
      matchItem._id = ObjectId(req.query?.id);
    }
    if (req.query?.filmId) {
      matchItem.filmId = req.query?.filmId;
    }
    const result = await TimetableModel.aggregate([
      { $match: matchItem },
      {
        $addFields: {
          // Convert _bId to ObjectId type
          filmObjectId: { $toObjectId: "$filmId" },
          roomObjectId: { $toObjectId: "$roomId" },
          id: { $toString: "$_id" },
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
        $lookup: {
          from: "movie___rooms",
          localField: "roomObjectId",
          foreignField: "_id",
          as: "room",
        },
      },
      {
        $lookup: {
          from: "movie___tickets",
          localField: "id",
          foreignField: "timetableId",
          as: "tickets",
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
          startAt: -1,
        },
      },
    ]);
    res.json({ code: 200, data: result });
  });

  router.post("", authMiddleware, async (req, res, next) => {
    try {
      const body = req.body;
      if (["filmId", "roomId"].some((k) => !body[k])) {
        res.json({
          code: 400,
          message: "filmId, roomId is required",
        });
        return;
      }

      const productModel = new TimetableModel(req.body);

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

  router.put("", authMiddleware, async (req, res, next) => {
    try {
      const body = req.body;

      const id = body._id;
      delete body._id;
      delete body.createdAt;
      delete body.updatedAt;
      console.log(body, "body");

      const data = await TimetableModel.updateOne({ _id: id }, body);

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
  timeTableService,
};
