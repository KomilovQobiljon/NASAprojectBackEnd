const express = require("express");
const launchesController = require("./launches.controller");

const launchesRouter = express.Router();

launchesRouter
  .route("/launches")
  .get(launchesController.httpGetAllLaunches)
  .post(launchesController.httpAddNewLaunch);

launchesRouter
  .route("/launches/:id")
  .delete(launchesController.httpAbortLaunch);

module.exports = launchesRouter;
