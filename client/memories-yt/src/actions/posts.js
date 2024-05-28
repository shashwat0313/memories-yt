import * as api from '../api'
import {FETCH_ALL, UPDATE, LIKE, DELETE, CREATE, SEARCH, START_LOADING, END_LOADING} from '../constants/actionTypes'

export const getPosts = (page) => async (dispatch) => {
    try {

        // start loading
        dispatch({type:START_LOADING}) 
        
        // fetch the posts through the api
        console.log("getposts action creator called");
        const response = await api.fetchPosts(page);
        console.log("getposts response:", response);
        dispatch({type: FETCH_ALL, payload:response.data})

        // end loading
        dispatch({type:END_LOADING}) 
    } catch (error) {
        console.error("getPosts action creator has some error: ", error);
    }
}


//this is a function that returns a function(a function that is async) which in the end returns an action through dispatch
export const createPost = (newPost) => async (dispatch) => {
    try {
        dispatch({type:START_LOADING}) 

        // this calls the api to create a post
        // the api then calls axios' post to make a post request to the server
        const { data } = await api.createPost(newPost)
        console.log("data got from reponse on post request: ", data);
        dispatch({type:CREATE, payload:data})
        
        // end loading
        dispatch({type:END_LOADING}) 

    } catch (error) {
        console.log("error in createpost action creator : ", error);
    }
}

export const updatePost = (currentId, updatedPost) => async (dispatch) =>{
    try {
        const response = await api.updatePost(currentId, updatedPost)
        console.log("updated post object:", response.data);
        dispatch({type:UPDATE, payload:response.data})
    } catch (error) {
        console.log("error in updatepost action creator : ", error);
    }
}

export const deletePost = (id) => async(dispatch) => {
    try {
        const response = await api.deletePost(id);
        console.log("Response from delete request:", response);
        dispatch({type:DELETE, payload:{id}})
    } catch (error) {
        console.log("some error occured with delete action creator:", error)
    }
}

export const likePost = (id) => async (dispatch) => {
    try {
        const response = await api.likePost(id)
        console.log("response from like request:", response);
        dispatch({type:LIKE, payload:response.data})
    } catch (error) {
        console.log("some error occured with like post action creator:", error);
    }
}

export const getPostsBySearchQuery = (query) => async (dispatch) =>{
    // console.log("inside action creator");
    try { 

        dispatch({type:START_LOADING}) 

        //make api call to backend
        console.log("action creator getpostsbysearchq_api called");
        console.log("query received is:", query);
        const data = await api.getPostsBySearchQuery_api(query)
        console.log("response by getpostsbysq_api(.data):", data.data);
        dispatch({type:SEARCH, payload:data.data})

        // end loading
        dispatch({type:END_LOADING}) 
                
    } catch (error) {
        console.log("some error occured in searchpost action creator");
    }
}

//Action creator
// it is a function that creates and returns an action object.
// the action object is then passsed to the reducer function
// the reducer function then computes the new state

// an action mandatorily contains a type property and a payload(payload may be renamed, type must remain)


// We need the fetch to be done and handled asynchronously
// for this, the code below will not work, obviously
// but this is still a valid action creator
