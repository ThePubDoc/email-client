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
router.route("/campaigns/create").get(mainController.create_campaign);
router.route("/campaigns/edit").get(mainController.edit_campaign);
router.route("/campaigns/delete").get(mainController.del_campaign);
router.route("/campaigns/copy").get(mainController.copy_campaign);
router.route("/campaigns/completed").get(mainController.completed_campaigns);
router.route("/lists/create").get(mainController.create_list);
router.route("/lists").get(mainController.lists);

router
  .route("/campaigns/create")
  .post(upload.single("file"), campaignController.index);
router
  .route("/campaigns/edit")
  .post(upload.single("file"), campaignController.edit);
router
  .route("/lists/create")
  .post(upload.single("file"), listController.createList);

module.exports = router;
