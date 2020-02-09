const express = require('express');
const mainController = require('../controller/mainController');
const campaignController = require('../controller/campaignController')
const router = express.Router();
const app = express();

router.route('/').get(mainController.index)

router.route('/campaign').get(mainController.campaign)
router.route("/campaign").post(campaignController.index)

module.exports = router;