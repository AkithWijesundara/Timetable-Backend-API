const router = require("express").Router();
const { authenticateToken } = require("../middleware/authorization");

const {
    enrollStudent,
    viewEnrollments,
    manageEnrollments
} = require("../controllers/enrollController");

//Enroll student
router.post('/enrollStudent',authenticateToken,enrollStudent);

//View enrollments
router.get('/viewEnrollments',authenticateToken,viewEnrollments);

//Manage enrollments
router.put('/manageEnrollments/:id',authenticateToken,manageEnrollments);

module.exports = router;