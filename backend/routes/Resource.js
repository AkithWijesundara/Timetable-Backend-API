const router = require("express").Router();
const { authenticateToken } = require("../middleware/authorization");

const {
    createResource
} = require("../controllers/resourceController");

//create resource
router.post('/createResource',authenticateToken,createResource);

module.exports = router;