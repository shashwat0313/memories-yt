import * as api from '../api'
import {FETCH_ALL, UPDATE, LIKE, DELETE, CREATE} from '../constants/actionTypes'

export const getPosts = () => async (dispatch) => {
    try {
        //fetch the posts through the api
        const { data } = await api.fetchPosts();
        dispatch({type: FETCH_ALL, payload:data})
    } catch (error) {
        console.error("getPosts action creator has some error: ", error);
    }
}


//this is a function that returns a function(a function that is async) which in the end returns an action through dispatch
export const createPost = (newPost) => async (dispatch) => {
    try {

        // this calls the api to create a post
        // the api then calls axios' post to make a post request to the server
        const { data } = await api.createPost(newPost)
        console.log("data got from reponse on post request: ", data);
        dispatch({type:CREATE, payload:data})

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
        dispatch({type:DELETE, payload:id})
    } catch (error) {
        console.log("some error occured with delete action creator:", error)
    }
}

export const likePost = (id) => async (dispatch) => {
    try {
        const response = await api.likePost(id)
        console.log("response form like request:", response);
        dispatch({type:LIKE, payload:response.data})
    } catch (error) {
        console.log("some error occured with like post action creator:", error);
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

// function getPosts(){
//     return {
//         type: 'FETCH_ALL',
//         payload : []
//     }
// }

//acting asynchronously

// export function getPosts(){
//     return async (dispatch) => {

//         try {
//             //fetchPosts is defined in api's index.js. 
//             //fetchPosts makes request to the server to get posts
//             console.log("attempting to fetch 1");
            
//             const { data } = await api.fetchPosts();
//             console.log("attempting to fetch 2");
            
//             // now that the payload is received, the dispatch call below will send the action object to the redux store,
//             dispatch({type:"FETCH_ALL", payload:data})
//             // then the redux store triggers the reducer function, which then checks the type of the action
//             // when the type is determined ---
//             // then the reducer performs the respective logic with/on this payload
//             // lets say the payload was modified a bit, then this change in payload causes a resultant change in state(which is not yet in effect)
//             // now the new state(the new payload) is returned to the redux store and the respective states are updated

//         } catch (error) {
//             console.error("getPosts action creator has some error");
//         }

//     }
// }
