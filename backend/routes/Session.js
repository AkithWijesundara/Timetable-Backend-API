const router = require("express").Router();
const { authenticateToken } = require("../middleware/authorization");

const {
    createSession,
    updateSession,
    deleteSession
} = require("../controllers/sessionController");

//create session
router.post('/createSession',authenticateToken,createSession);

//update session
router.put('/updateSession/:id',authenticateToken,updateSession);

//delete session
router.delete('/deleteSession/:id',authenticateToken,deleteSession);


module.exports = router;