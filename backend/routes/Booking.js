const router = require("express").Router();
const { authenticateToken } = require("../middleware/authorization");

const {
    createBooking
} = require("../controllers/bookingController");

// create booking

router.post('/createBooking',authenticateToken,createBooking);

module.exports = router;