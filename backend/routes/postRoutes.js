//controller
const PostController = require('../controllers/PostController');
//helpers
const verifyToken = require('../helpers/verify-token');
const upload = require('../helpers/cloudinary-image-upload');

const router = require('express').Router();

//create new post (PRIVATE)
router.post(
  '/create',
  verifyToken,
  upload.single('image'),
  PostController.create,
);
//get all posts
router.get('/all', PostController.getAllPosts);
//get posts from user (PRIVATE)
router.get('/myposts', verifyToken, PostController.getUserPosts);
//get post by id
router.get('/post/:id', PostController.getPostById);
//update post (PRIVATE)
router.patch(
  '/update/:id',
  verifyToken,
  upload.single('image'),
  PostController.updatePostById,
);
//remove post by id (PRIVATE)
router.delete('/remove/:id', verifyToken, PostController.removePostById);

module.exports = router;
