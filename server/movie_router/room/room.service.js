const { Router } = require("express");
const { authMiddleware } = require("../../config/auth.middleware");
const RoomModel = require("./room.model");

const router = Router();
const char_code = "1256903467".split("");

const roomService = (app) => {
  app.use("/movie/room", router);

  router.get("/:code", async (req, res) => {
    if (!req.params?.code)
      res.json({ code: 400, message: "Thiếu /product/:code" });

    const buffer = await RoomModel.findOne({
      code: req.params?.code,
    });

    res.json(buffer);
  });

  router.get("", async (req, res, next) => {
    const page = Number(req.query.page) || 0;
    const size = Number(req.query.size) || 999;

    const textSearch = req.query?.textSearch || "";
    const result = await RoomModel.find({
      $or: [
        { nameRoom: { $regex: textSearch, $options: "i" } },
        { codeRoom: { $regex: textSearch, $options: "i" } },
      ],
    })
      .sort({ createdAt: -1 })
      .skip(page * size)
      .limit(size);
    res.json({ code: 200, data: result });
  });

  router.post("", authMiddleware, async (req, res, next) => {
    try {
      const productModel = new RoomModel(req.body);
      productModel.codeRoom = ((await RoomModel.countDocuments({})) + "")
        .padStart(4, "0")
        .split("")
        .map((i) => char_code[Number(i)])
        .join("");

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
      if (["nameRoom"].some((k) => !body[k])) {
        res.json({
          code: 400,
          message: "nameRoom is required",
        });
        return;
      }

      const id = body._id;
      delete body._id;
      delete body.createdAt;
      delete body.updatedAt;
      console.log(body, "body");

      const data = await RoomModel.updateOne({ _id: id }, body);

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
  roomService,
};
