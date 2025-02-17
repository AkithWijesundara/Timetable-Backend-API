const router = require("express").Router();
const { authenticateToken } = require("../middleware/authorization");

const {
    createRoom
} = require("../controllers/roomController");

//create room
router.post('/createRoom',authenticateToken,createRoom);

module.exports = router;