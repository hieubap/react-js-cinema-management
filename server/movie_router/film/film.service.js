const { Router } = require("express");
const { authMiddleware } = require("../../config/auth.middleware");
const FilmModel = require("./film.model");

const router = Router();
const char_code = "5432198760".split("");

const filmService = (app) => {
  app.use("/movie/film", router);

  router.get("", async (req, res, next) => {
    const page = Number(req.query.page) || 0;
    const size = Number(req.query.size) || 999;

    const textSearch = req.query?.textSearch || "";
    const result = await FilmModel.find({
      $or: [
        { nameFilm: { $regex: textSearch, $options: "i" } },
        { codeFilm: { $regex: textSearch, $options: "i" } },
      ],
      [req.query?.id ? "_id" : undefined]: req.query?.id,
    })
      .sort({ createdAt: -1 })
      .skip(page * size)
      .limit(size);
    res.json({ code: 200, data: result });
  });

  router.post("", authMiddleware, async (req, res, next) => {
    try {
      const productModel = new FilmModel(req.body);
      productModel.codeFilm = ((await FilmModel.countDocuments({})) + "")
        .padStart(6, "0")
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
      if (["nameFilm"].some((k) => !body[k])) {
        res.json({
          code: 400,
          message: "nameFilm is required",
        });
        return;
      }

      const id = body._id;
      delete body._id;
      delete body.createdAt;
      delete body.updatedAt;
      console.log(body, "body");

      const data = await FilmModel.updateOne({ _id: id }, body);

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

module.exports = { filmService };
