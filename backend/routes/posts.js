// this file contains routes for posts

import express from 'express';

//import controllers
import { getPost, getPosts, createPost, updatePost, deletePost, likePost, getPostsBySearchQuery } from '../controllers/posts.js';

// import authentication middleware, it will dump unauthenticated requests if made to protected routes
import isAuthenticated from '../middleware/auth.js'

const postRouter = express.Router();

// open routes

/***** IMPORTANT NOTE ******/
// NOTE THAT THE ORDER OF THE ROUTES MATTERS, THE SEARCH ROUTE SHOULD BE BEFORE THE ID ROUTE, OTHERWISE THE SEARCH ROUTE WILL BE TAKEN AS AN ID
// HERE THE PRIORITY GOES TO SEARCH, IF SEARCH IS DETECTED THEN ONLY THE REQUEST WILL BE FORWARDED TO THE SEARCH ROUTE HANDLER
// IF IT DOES NOT MATCH WITH SEARCH, THEN THE REQUEST WILL BE FORWARDED TO THE POSTID ROUTE HANDLER
postRouter.get('/', getPosts)
postRouter.get('/search', getPostsBySearchQuery)
postRouter.get('/:id', getPost)

// added isAuthenticated middleware to protected routes
postRouter.post('/',isAuthenticated, createPost)
postRouter.patch('/:id',isAuthenticated, updatePost)
postRouter.patch('/:id/likepost',isAuthenticated, likePost)
postRouter.delete('/:id',isAuthenticated, deletePost)

export default postRouter;