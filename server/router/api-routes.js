const router = require('express').Router();
const logController = require('../controller/logController');

router.route('/logs')
    .get(logController.page)
    .post(logController.parse);



module.exports = router;