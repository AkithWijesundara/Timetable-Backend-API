const router = require("express").Router();
const { authenticateToken } = require("../middleware/authorization");

const {
    createLocation
} = require("../controllers/locationController");

//create Location
router.post('/createLocation',authenticateToken,createLocation);

module.exports = router;