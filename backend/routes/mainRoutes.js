const express = require("express");

const mainController = require("../controller/mainController");
const campaignController = require("../controller/campaignController");
const listController = require("../controller/listController");

const router = express.Router();
const app = express();
const multer = require("multer");

var storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, "./uploads");
  },
  filename: function(req, file, cb) {
    cb(null, file.originalname);
  }
});

var upload = multer({ storage: storage });

router.route("/").get(mainController.index);
router.route("/campaign").get(mainController.campaign);
router.route("/edit").get(mainController.edit);
router.route("/delete").get(mainController.del);
router.route("/copy").get(mainController.copy);
router.route("/campaigns/completed").get(mainController.completed_campaigns);
router.route("/createlist").get(mainController.createList);
router.route("/list").get(mainController.list);

router.route("/campaign").post(upload.single("file"), campaignController.index);
router.route("/edit").post(upload.single("file"), campaignController.edit);
router.route("/createList").post(upload.single("file"), listController.createList)

module.exports = router;
