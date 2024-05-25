// this file contains routes for posts

import express from 'express';

//import controllers
import { getPosts, createPost, updatePost, deletePost, likePost, getPostsBySearchQuery } from '../controllers/posts.js';

// import authentication middleware, it will dump unauthenticated requests if made to protected routes
import isAuthenticated from '../middleware/auth.js'

const postRouter = express.Router();

// open routes
postRouter.get('/', getPosts)
postRouter.get('/search', getPostsBySearchQuery)

// added isAuthenticated middleware to protected routes
postRouter.post('/',isAuthenticated, createPost)
postRouter.patch('/:id',isAuthenticated, updatePost)
postRouter.patch('/:id/likepost',isAuthenticated, likePost)
postRouter.delete('/:id',isAuthenticated, deletePost)

export default postRouter;