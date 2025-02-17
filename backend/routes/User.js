const router = require("express").Router();
const { authenticateToken } = require("../middleware/authorization");

const {
    registerUser,
    login,
    test
} = require("../controllers/userController");


//register
router.post('/signup',registerUser);

//login
router.post('/login',login);

//test
router.get('/test',authenticateToken,test);

module.exports = router;