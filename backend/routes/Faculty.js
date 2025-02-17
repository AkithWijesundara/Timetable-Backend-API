const router = require("express").Router();

const {
    createFaculty
} = require("../controllers/facultyController");

//create
router.post('/createFaculty',createFaculty);

module.exports = router;