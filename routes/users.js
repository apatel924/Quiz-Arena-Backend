const express = require('express');
const router = express.Router();
const userController = require('../controllers/user');
const { verifyToken } = require('../sockets/middleware/jwtMiddleware');

router.get('/', userController.getAllUsers);
router.get('/:userId', userController.getUserById);
router.get('/friends', verifyToken, userController.getFriends);
router.post('/', userController.createUser);
router.post('/addFriend', verifyToken, userController.addFriend);
router.get('/notifications', verifyToken, userController.getUserNotifications);
router.post('/notifications', verifyToken, userController.createUserNotification);
router.delete('/notifications/:notificationId', verifyToken, userController.deleteUserNotification);

module.exports = router;
