import axios from 'axios'

const postsURL = "http://10.7.223.89:5555/posts"

// const postsURL = "http://localhost:5555/posts"

// this function fetches posts from the server
// this function is called by the action creator
// this is asynchronous, after its completion, 
// the action object is dispatched to the redux store through the action creator(which is the one that calls this function)
export const fetchPosts = () => axios.get(postsURL)

export const createPost = (newPost) => axios.post(postsURL, newPost)

export const updatePost = (id, updatedPost) => axios.patch(`${postsURL}/${id}`, updatedPost)

export const likePost = (id) => axios.patch(`${postsURL}/${id}/likepost`)

export const deletePost = (id) => axios.delete(`${postsURL}/${id}`)