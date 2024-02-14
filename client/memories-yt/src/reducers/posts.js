import {FETCH_ALL, UPDATE, LIKE, DELETE, CREATE} from '../constants/actionTypes'

// state always has to be initialized with something, so we set it to an empty array
const reducer = (posts = [], action) => {
    switch (action.type) {
        case FETCH_ALL:
            //TODO
            return action.payload;
        case CREATE:
            //TODO
            return [...posts, action.payload];

        //this syntax does not work
        case UPDATE:
        case LIKE:
            // roughly speaking, map will create a new array
            // it will iterate through each post
            // if the id of some post matched with the one updated by the user, then that post will get a new value in its place
            // this is just a cleaner way to write a whole for loop for that
            // a new array is prepared, since it is required to trigger a re-render
            console.log("action:", action);
            // for some reason action.payload._id and action.payload.id were both working. well okay that might be because ...idk😭
            return posts.map((post) => {console.log("post:", post);return post._id === action.payload._id ? action.payload : post})
            //also handling likes

        case DELETE:
            //TODO

            //payload has the value of the id of the post just deleted
            return posts.filter((post) => post._id !== action.payload)

            // return posts.map((post) => {
            //     if(post._id !== action.payload.id) return post
            // })
        default:
            return posts;
    }
}

export default reducer;