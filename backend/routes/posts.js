// this file contains routes for posts

import express from 'express';

//import controller
import { getPosts, createPost, updatePost, deletePost, likePost } from '../controllers/posts.js';

//import model
import postmessage from '../models/postMessage.js';

const postRouter = express.Router();

postRouter.get('/', getPosts)
postRouter.post('/', createPost)
postRouter.patch('/:id', updatePost)
postRouter.patch('/:id/likepost', likePost)
postRouter.delete('/:id', deletePost)

export default postRouter;