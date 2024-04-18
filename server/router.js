const { static, json } = require("express");
const { mongodbLoader } = require("./config/mongodbLoader");
const { fileService } = require("./file/file.service");
const path = require("path");

const { movie_router } = require("./movie_router");
const { accountService } = require("./account/account.service");

const router = async ({ app }) => {
  app.get("/", (req, res) => {
    res.status(200).send("Server sẵn sàng").end();
  });
  await mongodbLoader();
  //   app.use(urlencoded({ extended: false }));
  app.use(json());
  app.use(`/file`, static(path.join(__dirname, "../files")));

  movie_router(app);

  // common router
  accountService(app);
  fileService(app);
};

module.exports = { router };
