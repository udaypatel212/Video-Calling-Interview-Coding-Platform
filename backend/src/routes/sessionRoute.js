const express=require('express');
const router=express.Router();
const {protectRoute}=require('../middleware/protectRoute');
const {createSession,getActiveSessions,getMyRecentSessions,joinSession,getSessionById,endSession}=require('../controllers/sessionController');

router.post('/create',protectRoute,createSession);
router.get('/active',getActiveSessions);
router.get('/my-recent',protectRoute,getMyRecentSessions);

router.post('/:id/join',protectRoute,joinSession);
router.get('/:id',protectRoute,getSessionById);
router.post('/:id/end',protectRoute,endSession);

module.exports=router;