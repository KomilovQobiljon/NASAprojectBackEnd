const {
  getAllLaunches,
  existsLaunchWithId,
  addNewLaunch,
  abortLaunchById,
} = require("../../models/launches.model");

function httpGetAllLaunches(req, res) {
  return res.status(200).json(getAllLaunches());
}

function httpAddNewLaunch(req, res) {
  const launch = req.body;

  if (
    !launch.mission ||
    !launch.rocket ||
    !launch.target ||
    !launch.launchDate
  ) {
    return res.status(400).json({
      status: "fail",
      message: "Missing required launch property",
    });
  }

  launch.launchDate = new Date(launch.launchDate);
  if (isNaN(launch.launchDate)) {
    return res.status(400).json({
      status: "fail",
      message: "Invalid launch date",
    });
  }

  addNewLaunch(launch);
  return res.status(201).json({
    status: "success",
    data: launch,
  });
}

function httpAbortLaunch(req, res) {
  const id = Number(req.params.id);

  if (!existsLaunchWithId(id)) {
    return res.status(404).json({
      error: "Launch not found!",
    });
  } else {
    const aborted = abortLaunchById(id);
    return res.status(200).json({
      message: "Aborted",
      body: {
        aborted,
      },
    });
  }
}

module.exports = {
  httpGetAllLaunches,
  httpAddNewLaunch,
  httpAbortLaunch,
};
