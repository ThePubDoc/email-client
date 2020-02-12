const express = require("express");

const mainController = require("../controller/mainController");
const campaignController = require("../controller/campaignController");
const listController = require("../controller/listController");

const router = express.Router();
const app = express();
const multer = require("multer");

var campaignStorage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, "./uploads/campaign");
  },
  filename: function(req, file, cb) {
    cb(null, file.originalname);
  }
});

var campaignFiles = multer({ storage: campaignStorage });

var listStorage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, "./uploads/list");
  },
  filename: function(req, file, cb) {
    cb(null, file.originalname);
  }
});

var listFiles = multer({ storage: listStorage });

router.route("/").get(mainController.index);

router.route("/campaigns").get(mainController.index);
router.route("/campaigns/create").get(mainController.create_campaign);
router.route("/campaigns/edit").get(mainController.edit_campaign);
router.route("/campaigns/delete").get(mainController.del_campaign);
router.route("/campaigns/copy").get(mainController.copy_campaign);
router.route("/campaigns/view").get(mainController.view_campaign);
router.route("/campaigns/completed").get(mainController.completed_campaigns);
router.route("/campaigns/send").get(mainController.send_campaign);

router.route("/lists").get(mainController.lists);
router.route("/lists/create").get(mainController.create_list);
router.route("/lists/edit").get(mainController.edit_list);
router.route("/lists/delete").get(mainController.del_list);
router.route("/lists/copy").get(mainController.copy_list);
router.route("/lists/view").get(mainController.view_list);

router.route("/reports").get(mainController.reports);
router.route("/listreports").get(mainController.listreports);

router
  .route("/campaigns/create")
  .post(campaignFiles.single("file"), campaignController.index);
router
  .route("/campaigns/edit")
  .post(campaignFiles.single("file"), campaignController.edit);
router.route("/campaigns/send").post(campaignController.send);

router
  .route("/lists/create")
  .post(listFiles.single("file"), listController.createList);
router
  .route("/lists/edit")
  .post(listFiles.single("file"), listController.edit_list);

module.exports = router;
