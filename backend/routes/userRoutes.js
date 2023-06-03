//controller
const UserController = require('../controllers/UserController');
//helpers
const verifyToken = require('../helpers/verify-token');
const upload = require('../helpers/cloudinary-image-upload');

const router = require('express').Router();

//register new user
router.post('/register', UserController.register);
//login
router.post('/login', UserController.login);
//check current user
router.get('/checkuser', UserController.checkUser);
//get user by id
router.get('/user/:id', UserController.getUserById);
//update user information (PRIVATE)
router.patch(
  '/update',
  verifyToken,
  upload.single('image'),
  UserController.update,
);

module.exports = router;
