const router = require("express").Router();
const { authenticateToken } = require("../middleware/authorization");

const {
    createCourse,
    getCourse,
    getCourseByFaculty,
    updateCourse,
    deleteCourse,
    assingFaculty
} = require("../controllers/courseController");

//create course
router.post('/createCourse',authenticateToken,createCourse);

//Get all courses
router.get('/getCourses',authenticateToken,getCourse);

// Get course by faculty
router.get('/getCourseByFaculty',authenticateToken,getCourseByFaculty);

//Update Course
router.put('/updateCourse/:id',authenticateToken,updateCourse);

//delete Course
router.delete('/deleteCourse/:id',authenticateToken,deleteCourse);

//assign faculty
router.put('/assignFaculty/:id',authenticateToken,assingFaculty);

module.exports = router;