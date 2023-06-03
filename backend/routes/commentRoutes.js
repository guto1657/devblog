//controller
const CommentController = require('../controllers/CommentController');
//helpers
const verifyToken = require('../helpers/verify-token');

const router = require('express').Router();

//create new comment (PRIVATE)
router.post('/create', verifyToken, CommentController.create);
//get all user comments (PRIVATE)
router.get('/mycomments', verifyToken, CommentController.getUserComments);
// update comment by id (PRIVATE)
router.patch('/update/:id', verifyToken, CommentController.updateCommentById);
//remove comment by id (PRIVATE)
router.delete('/remove/:id', verifyToken, CommentController.removeCommentById);
//get all post comments
router.get('/post/:id', CommentController.getPostComments);
//get all comments
router.get('/all', verifyToken, CommentController.getAllComments);

module.exports = router;
