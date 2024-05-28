import axios from 'axios'

// setting a base url to hit using an axios instance

// replace the ip address below with current ip address for testing on other devices on local network
// const baseURL = process.env.NODE_ENV === 'develpment' ? "http://192.168.29.215:5555" :

let baseURL;

if(process.env.NODE_ENV === 'development'){
    baseURL = 'http://192.168.29.215:5555'
}
else if(process.env.NODE_ENV === 'localdev'){
    baseURL = 'http://localhost:5555'
}
else if (process.env.NODE_ENV === 'production'){
    // TODO --- MENTION PRODUCTION URL HERE
}

const API = axios.create({ baseURL })
// now requests can be called directly on this axios instance
// no need to do axios.get(__fullURL__ **just the endpoint, since the baseURL will be prepended internally)
// do this ... API.get(...) 

// interceptor
API.interceptors.request.use((req) => {
    const profile = JSON.parse(localStorage.getItem('profile'))
    console.log("profile given to interceptor:",profile);
    if (profile) {
        req.headers.Authorization = `Bearer ${profile.token}`
        // console.log("auth header:", req.headers.Authorization);
    }
    // console.log("HELLLOOOO");
    return req;
})

const postsEndpoint = "/posts"
const signinEndpoint = "/user/signin"
const signupEndpoint = "/user/signup"
const searchPostsEndpoint = "/posts/search"
// const fetchPostEndpoint = "/posts"

// this function fetches posts from the server
// this function is called by the action creator
// this is asynchronous, after its completion, 
// the action object is dispatched to the redux store through the action creator(which is the one that calls this function)
export const fetchPosts = (page) => {console.log("page received by fetchposts api:", page); return API.get( `${postsEndpoint}?page=${page}` )} 

export const fetchPost = (id) => {console.log("id at fetchpost get api:", id); return API.get(`${postsEndpoint}/${id}`)};

export const createPost = (newPost) => API.post(postsEndpoint, newPost)

export const updatePost = (id, updatedPost) => API.patch(`${postsEndpoint}/${id}`, updatedPost)

export const likePost = (id) => API.patch(`${postsEndpoint}/${id}/likepost`)

export const deletePost = (id) => API.delete(`${postsEndpoint}/${id}`)

// the makeup of this URL is crucial
export const getPostsBySearchQuery_api = (query) => API.get(`${searchPostsEndpoint}?searchQuery=${query.searchQuery || null}&tagsQuery=${query.tagsQuery}`)

//for login actions
export const signin = (loginFormData) => API.post(signinEndpoint, loginFormData)
export const signup = (signupFormData) => API.post(signupEndpoint, signupFormData)
