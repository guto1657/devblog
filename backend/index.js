const express = require('express');
const cors = require('cors');

const app = express();

const port = process.env.PORT || 5000;

//setting dotenv config
require('dotenv').config();

//imports
const conn = require('./db/conn');

//setting cors
app.use(
  cors({
    credentials: true,
    origin: process.env.ORIGIN_URL,
  }),
);

//setting json response
app.use(express.json());

//setting public folder
app.use(express.static('public'));

//routes
const userRouter = require('./routes/userRoutes');
const postRouter = require('./routes/postRoutes');
const commentRouter = require('./routes/commentRoutes');

app.use('/users', userRouter);
app.use('/posts', postRouter);
app.use('/comments', commentRouter);

//listen
app.listen(port, () => {
  console.log('Servidor Online!');
});
