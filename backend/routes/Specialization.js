const router = require("express").Router();
const { authenticateToken } = require("../middleware/authorization");

const {
    createSpecialization
} = require("../controllers/specializationController");

//create specialization
router.post('/createSpecialization',authenticateToken,createSpecialization);

module.exports = router;