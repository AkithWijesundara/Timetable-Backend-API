const router = require("express").Router();
const { authenticateToken } = require("../middleware/authorization");

const {
    createTimeTable,
    updateTimeTable,
    viewTimeTable
} = require("../controllers/TimeTableController");

//Create Time table
router.post('/createTimeTable',authenticateToken,createTimeTable);

//update time table
router.put('/updateTimeTable/:id',authenticateToken,updateTimeTable);

//get time table
router.get('/viewTimeTable/:id',authenticateToken,viewTimeTable);

module.exports = router;